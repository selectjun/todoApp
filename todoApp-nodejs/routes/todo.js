const express = require("express");
const { validationResult } = require("express-validator");
const router = express.Router();

const { auth } = require("./auth");
const { models } = require("../sequelize");
const todoInsertSchema = require("../schemas/todo.insert.schema");

/**
 * 페이지 당 게시물 수
 */
const RECORDS_PER_PAGE = 2;

/**
 * Auth Interceptor
 */
router.all("/*", auth);

/**
 * To Do 목록 가져오기
 */
router.get("/", [

],(req, res) => {
  const page = (!isNaN(req.query.page) && req.query.page > 0) ? req.query.page : 1;
  const limit = RECORDS_PER_PAGE;
  const offset = RECORDS_PER_PAGE * (page - 1);

  models.todo.findAll({
    where: {
      isDelete: false
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
      }
    }).then(todo => {
      res.status(200).json({
        success: true,
        todo: todo
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
router.post("/", todoInsertSchema, (req, res) => {
  const valid = validationResult(req);

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
router.put("/:todoId/", (req, res) => {
  const todoId = req.params.todoId
  
  if (!todoId) {
    res.status(400).json({
      success: false,
      message: "[todoId] 값이 존재하지 않습니다"
    });
  } else {
    models.todo.update(req.query, {
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

/**
 * To Do 삭제하기
 */
router.put("/:todoId/delete/", (req, res, next) => {
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

module.exports = router;