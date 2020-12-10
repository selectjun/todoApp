const { check } = require('express-validator');

const todo = [
  check("title").trim()
    .not().isEmpty().withMessage("제목을 입력해주세요")
];

module.exports = todo;