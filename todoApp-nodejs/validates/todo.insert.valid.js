const { check } = require('express-validator');

const todoInsertValid = [
  check("title").trim()
    .not().isEmpty().withMessage("제목을 입력해주세요"),
  check("startAt")
    .custom((value, { req }) => /(\d{4})\-(\d{2})\-(\d{2})T(\d{2}):(\d{2}):(\d{2})\.(\d{3})Z/.test(value) || value === "null" || value === "undefined" || value === "")
    .withMessage("[startAt] 타입이 맞지 않습니다"),
  check("endAt")
    .custom((value, { req }) => /(\d{4})\-(\d{2})\-(\d{2})T(\d{2}):(\d{2}):(\d{2})\.(\d{3})Z/.test(value) || value === "null" || value === "undefined" || value === "")
    .withMessage("[endAt] 타입이 맞지 않습니다"),
  check("fileId")
    .custom((value, { req }) => Number.isInteger(parseInt(value)) || value === "null" || value === "undefined" || value === "")
    .withMessage("[fileId] 타입이 맞지 않습니다"),
  check("isComplete")
    .isBoolean().withMessage("[isComplete] 타입이 맞지 않습니다")
];

module.exports = todoInsertValid;