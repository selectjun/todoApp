const { check } = require('express-validator');

const token = [
  check("id").trim()
    .not().isEmpty().withMessage("아이디를 입력해주세요"),
  check("password").trim()
    .not().isEmpty().withMessage("암호를 입력해주세요")
];

module.exports = token;