const express = require("express");
const { validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");
const router = express.Router();
const multer  = require("multer");
const path = require("path");

/**
 * Logging
 */
const { logger } = require("../config/winston");

/**
 * 설정
 */
const config = require("../utils/config.util").getConfg();

/**
 * 인증
 */
const { auth } = require("./auth");

/**
 * Database Models
 */
const { models } = require("../sequelize");

/**
 * To Do 유효성 객체
 */
const todoInsertValid = require("../validates/todo.insert.valid");

/**
 * To Do 수정 유효성 객체
 */
const todoUpdateValid = require("../validates/todo.update.valid");

/**
 * 페이지 당 게시물 수
 */
const RECORDS_PER_PAGE = 20;

/**
 * Auth Interceptor
 */
router.all("/*", auth);

/**
 * JWT Provider
 */
const jwtProvider = require("../utils/security/jwt-provider.util");

/**
 * To Do - Upload 설정
 */
const todoUpload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, config.upload.physicalPath + "/todo/")
    },
    filename: function (req, file, cb) {
      cb(null, "todo_" + Date.now())
    }
  }),
  limits: {
    fields: 1,
    fileSize: 200 * 1024 * 1024,
  },
  fileFilter: (req, file, cb) => {
    const allowExtNames = /jpeg|jpg|png|gif/;
    const isMimeTypes = allowExtNames.test(file.mimetype);
    const isExt = allowExtNames.test(path.extname(file.originalname).toLowerCase());

    if (isMimeTypes && isExt) {
      return cb(null, true);
    } else {
      req.uploadError = "EXT_MISSMATCH";
      return cb(null, false, new Error("EXT_MISSMATCH"));
    }
  }
}).single("file");

/**
 * To Do 목록 가져오기
 */
router.get("/", (req, res) => {
  logger.info("GET /api/todo/");
  const page = (!isNaN(req.query.page) && req.query.page > 0) ? req.query.page : 1;
  const limit = RECORDS_PER_PAGE;
  const offset = RECORDS_PER_PAGE * (page - 1);
  
  const token = jwtProvider.resolveToken(req);
  const userId = jwtProvider.getUserPk(token);

  models.todo.findAll({
    where: {
      isDelete: false,
      userId: userId
    },
    order: [
      ["todoId", "DESC"]
    ],
    //limit: limit,
    //offset: offset
  }).then(todoList => {
    res.status(200).json({
      success: true,
      todoList: todoList
    });
  }).catch(err => {
    logger.error(err.message);
    res.status(500).json({
      success: false,
      message: "에러가 발생하였습니다\n다시 시도해주세요"
    });
  });
});

/**
 * To Do 전체 개수 가져오기
 */
router.get("/count/", (req, res) => {
  logger.info("GET /api/todo/count/");
  const token = jwtProvider.resolveToken(req);
  const userId = jwtProvider.getUserPk(token);

  models.todo.count({
    where: {
      isDelete: false,
      userId: userId
    }
  }).then(count => {
   res.status(200).json({
     success: true,
     count: count
   });
  }).catch(err => {
    logger.error(err.message);
    res.status(500).json({
      success: false,
      message: "에러가 발생하였습니다\n다시 시도해주세요"
    });
  });
});

/**
 * To Do 가져오기
 */
router.get("/:todoId/", (req, res) => {
  logger.info(`GET /api/todo/${req.params.todoId}/`);
  const todoId = req.params.todoId;
  
  if (!todoId) {
    res.status(400).json({
      success: false,
      message: "[todoId] 값이 존재하지 않습니다."
    });
  } else {
    models.todo.findOne({
      where: {
        todoId: todoId,
        isDelete: false
      },
      include: [
        {
          model: models.file,
          required: false,
          attributes: ["originalName"]
        },
      ],
      raw: true,
      nest: true
    }).then(todo => {
      res.status(200).json({
        success: true,
        todo: {
          ...todo,
          file: todo.fileId 
            ? {
              ...todo.file,
              path: todo.fileId ? `/file/${todo.fileId}/` : null
            }
            : null
        }
      });
    }).catch(err => {
      logger.error(err.message);
      res.status(500).json({
        success: false,
        message: "에러가 발생하였습니다\n다시 시도해주세요"
      });
    });
  }
});

/**
 * To Do 등록하기
 */
router.post("/", todoInsertValid, (req, res) => {
  logger.info("POST /api/todo/");
  const valid = validationResult(req);

  const token = jwtProvider.resolveToken(req);
  const userId = jwtProvider.getUserPk(token);
  req.query.userId = userId;

  if (!valid.isEmpty()) {
    res.status(400).json({
      success: false,
      param: valid.errors[0].param,
      message: valid.errors[0].msg
    });
  } else {
    todoUpload(req, res, async (err) => {
      if(req.uploadError === "EXT_MISSMATCH") {
        res.status(400).json({
          success: false,
          message: "허용되지 않는 파일입니다"
        });
      } else {
        const fileId = req.file ? (await models.file.create({
          originalName: req.file.originalname,
          saveName: req.file.filename
        })).get({ plain: true }).fileId : null;

        models.todo.create({
          title: req.query.title,
          contents: req.query.contents,
          startAt: req.query.startAt,
          endAt: req.query.endAt,
          isComplete: req.query.isComplete,
          fileId: fileId,
          userId: userId
        }).then(todo => {
          res.status(200).json({
            success: true,
            todoId: todo.todoId
          });
        }).catch(err => {
          logger.error(err.message);
          res.status(500).json({
            success: false,
            message: "에러가 발생하였습니다\n다시 시도해주세요"
          });
        });
      }
    });
  }
});

/**
 * To Do 수정하기
 */
router.put("/:todoId/", todoUpdateValid, asyncHandler(async (req, res) => {
  logger.info("PUT /api/todo/:todoId/");
  const valid = validationResult(req);
  const todoId = req.params.todoId;

  if (!valid.isEmpty()) {
    res.status(400).json({
      success: false,
      param: valid.errors[0].param,
      message: valid.errors[0].msg
    });
  } else {
    todoUpload(req, res, async (err) => {
      if(req.uploadError === "EXT_MISSMATCH") {
        res.status(400).json({
          success: false,
          message: "허용되지 않는 파일입니다"
        });
      } else {
        try {
          const fileId = await createFile(req.query.fileId, req.file);
          models.todo.update({
            title: req.query.title,
            contents: req.query.contents,
            startAt: req.query.startAt,
            endAt: req.query.endAt,
            isComplete: req.query.isComplete,
            fileId: fileId
          }, {
            where: {
              todoId: todoId
            }
          }).then(() => {
            res.status(200).json({
              success: true,
              todoId: todoId
            });
          }).catch(err => {
            logger.error(err.message);
            res.status(500).json({
              success: false,
              message: "에러가 발생하였습니다\n다시 시도해주세요"
            });
          });
        } catch (err) {
          logger.error(err.message);
          res.status(400).json({
            success: false,
            message: "에러가 발생하였습니다\n다시 시도해주세요"
          });
        }
      }
    });
  };
}));

/**
 * To Do 완료하기
 */
router.put("/:todoId/complete/", (req, res) => {
  logger.info("PUT /api/todo/:todoId/complete/");
  const todoId = req.params.todoId
  
  if (!todoId) {
    res.status(400).json({
      success: false,
      message: "[todoId] 값이 존재하지 않습니다"
    });
  } else {
    models.todo.findByPk(todoId).then(todo => {
      models.todo.update({
        isComplete: !todo.isComplete
      }, {
        where: {
          todoId: todoId
        }
      }).then(() => {
        res.status(200).json({
          success: true,
          todoId: todoId
        });
      }).catch(err => {
        logger.error(err.message);
        res.status(500).json({
          success: false,
          message: "에러가 발생하였습니다\n다시 시도해주세요"
        });
      });
    }).catch(err => {
      logger.error(err.message);
      res.status(500).json({
        success: false,
        message: "에러가 발생하였습니다\n다시 시도해주세요"
      });
    });;
  }
});

/**
 * To Do 삭제하기
 */
router.put("/:todoId/delete/", (req, res) => {
  logger.info("PUT /api/todo/:todoId/delete/");
  const todoId = req.params.todoId;

  if (!todoId) {
    res.status(400).json({
      success: false,
      message: "[todoId] 값이 존재하지 않습니다"
    });
  } else {
    models.todo.update({isDelete: true}, {
      where: {
        todoId: req.params.todoId
      }
    }).then(() => {
      res.status(200).json({
        success: true,
        todoId: todoId
      });
    }).catch(err => {
      logger.error(err.message);
      res.status(500).json({
        success: false,
        message: "에러가 발생하였습니다\n다시 시도해주세요"
      });
    });
  }
});

/**
 * 파일 생성
 * @param {*} fileId 
 * @param {*} file 
 */
const createFile = async (fileId, file) => {
  const isFileId = (
    fileId === null || fileId === undefined || fileId === NaN ||
    fileId === "null" || fileId === "undefined" || fileId === "Nan" || fileId.tirm() === ""
  ) ? false : true ;
  const isFile = (
    file === null || file === undefined || file === NaN ||
    file === "null" || file === "undefined" || file === "Nan" || file.tirm() === ""
  ) ? false : true;

  if (!isFileId && !isFile) {
    logger.debug("Called createFile - DELETE");
    return null;
  } else if (!isFileId && isFile) {
    logger.debug("Called createFile - INSERT/CHANGE");
    return (await models.file.create({
      originalName: file.originalname,
      saveName: file.filename
    })).get({ plain: true }).fileId;
  } else if (isFileId && !isFile) {
    logger.debug("Called createFile - KEEP");
    return fileId;
  } else {
    logger.error("Called CreateFile");
    new Error("파일 요청 형식이 잘못되었습니다");
  }
}

module.exports = router;