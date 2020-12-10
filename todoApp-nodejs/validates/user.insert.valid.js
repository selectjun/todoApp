const { check } = require('express-validator');

const user = [
  check("id").trim()
    .not().isEmpty().withMessage("아이디를 입력해주세요"),
  check("password").trim()
    .not().isEmpty().withMessage("암호를 입력해주세요"),
  check("name").trim()
    .not().isEmpty().withMessage("이름을 입력해주세요")
];

module.exports = user;