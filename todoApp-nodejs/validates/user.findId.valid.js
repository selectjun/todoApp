const { check } = require("express-validator");

const userFindId = [
  check("email").trim()
    .not().isEmpty().withMessage("이메일을 입력해주세요")
    .isEmail().withMessage("이메일 형식에 맞게 입력해주세요"),
];

module.exports = userFindId;