const express = require("express");
const router = express.Router();

const { Op } = require("sequelize");
const sequelize = require("../config/sequlize");
const todoModel = sequelize.import("../models/todo");

/**
 * To Do 목록 가져오기
 */
router.get("/", (req, res) => {
  let response = {};

  todoModel.findAll({
    where: {
      isDelete: false
    }
  }).then(todoList => {
    response.success = true;
    response.todoList = todoList;
    res.json(response);
  }).catch(err => {
    response.success = false;
    response.message = err;
  });
});

/**
 * To Do 가져오기
 */
router.get("/:todoId/", (req, res) => {
  const todoId = req.params.todoId;
  let response = {};

  if (!todoId) {
    response.success = false;
    response.message = "[todoId] 값이 존재하지 않습니다."
    res.json(response);
  }

  todoModel.findOne({
    where: {
      todoId: todoId,
      isDelete: false
    }
  }).then(todo => {
    response.success = true;
    response.todo = todo;
    res.json(response);
  }).catch(err => {
    response.success = false;
    response.message = err;
    res.json(response);
  });
});

/**
 * To Do 등록하기
 */
router.post("/", (req, res) => {
  let response = {};

  if (!req.query.title) {
    response.success = false;
    response.message = "[title] 값을 입력해주세요"
    res.json(response);
  }

  todoModel.create(req.query).then(todo => {
    response.success = true;
    response.todoId = todo.todoId;
    res.json(response);
  }).catch(err => {
    response.success = false;
    response.message = err;
    res.json(response);
  });
});

/**
 * To Do 수정하기
 */
router.put("/:todoId/", (req, res) => {
  let response = {};
  
  todoModel.update(req.query, {
    where: {
      todoId: req.params.todoId
    }
  }).then(todo => {
    response.success = true;
    response.todoId = todo.todoId;
    res.json(response);
  }).catch(err => {
    response.success = false;
    response.message = err;
    res.json(response);
  });
});

/**
 * To Do 삭제하기
 */
router.put("/:todoId/delete/", (req, res) => {
  let response = {};
  const todoId = req.params.todoId;

  if (!todoId) {
    response.success = false;
    response.message = "[todoId] 값이 존재하지 않습니다."
    res.json(response);
  }
  
  todoModel.update({isDelete: true}, {
    where: {
      todoId: req.params.todoId
    }
  }).then(() => {
    response.success = true;
    res.json(response);
  }).catch(err => {
    response.success = false;
    response.message = err;
    res.json(response);
  });

});

module.exports = router;