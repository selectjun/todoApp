const express = require("express");
const { validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");
const router = express.Router();
const multer  = require("multer");
const path = require("path");

/**
 * 설정
 */
const config = require("../config/config.json").dev;

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
    limit: limit,
    offset: offset
  }).then(todoList => {
    res.status(200).json({
      success: true,
      todoList: todoList
    });
  }).catch(err => {
    res.status(500).json({
      success: false,
      message: err
    });
  });
});

/**
 * To Do 전체 개수 가져오기
 */
router.get("/count/", (req, res) => {
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
    res.status(500).json({
      success: false,
      message: err
    });
  });
});

/**
 * To Do 가져오기
 */
router.get("/:todoId/", (req, res) => {
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
          file: {
            ...todo.file,
            path: todo.fileId ? `/file/${todo.fileId}/` : null
          }
        }
      });
    }).catch(err => {
      res.status(500).json({
        success: false,
        message: err
      });
    });
  }
});

/**
 * To Do 등록하기
 */
router.post("/", todoInsertValid, (req, res) => {
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
    models.todo.create(req.query).then(todo => {
      res.status(200).json({
        success: true,
        todoId: todo.todoId
      });
    }).catch(err => {
      res.status(500).json({
        success: false,
        message: err
      });
    });
  }
});

/**
 * To Do 수정하기
 */
router.put("/:todoId/", todoUpdateValid, asyncHandler(async (req, res) => {
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
        models.todo.update({
          title: req.query.title,
          contents: req.query.contents,
          startAt: req.query.startAt,
          endAt: req.query.endAt,
          isComplete: req.query.isComplete,
          fileId: await createFile(req, res, { fileId: req.query.fileId, file: req.file })
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
          res.status(500).json({
            success: false,
            message: err
          });
        });
      }
    });
  };
}));

/**
 * To Do 완료하기
 */
router.put("/:todoId/complete/", (req, res) => {
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
        res.status(500).json({
          success: false,
          message: err
        });
      });
    }).catch(err => {
      res.status(500).json({
        success: false,
        message: err
      });
    });;
  }
});

/**
 * To Do 삭제하기
 */
router.put("/:todoId/delete/", (req, res) => {
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
      res.status(500).json({
        success: false,
        message: err
      });
    });
  }
});

/**
 * 파일 생성
 * @param number fileId 
 * @param object file 
 */
const createFile = async (req, res, data) => {
  let { fileId, file } = data;

  if (!(fileId || file)) {
    // 삭제
    return null;
  } else if (file) {
    console.log("변경");
    // 변경
    return (await models.file.create({
      originalName: file.originalname,
      saveName: file.filename
    })).get({ plain: true }).fileId;
  } else {
    return fileId;
  }
}

module.exports = router;