const { check } = require('express-validator');

const todo = [
  check("todoId")
    .not().isEmpty().withMessage("[todoId] 값이 존재하지 않습니다"),
  check("title").trim()
    .not().isEmpty().withMessage("제목을 입력해주세요")
];

module.exports = todo;