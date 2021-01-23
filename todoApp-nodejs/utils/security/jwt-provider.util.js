const jwt = require('jsonwebtoken');
const config = require("../../utils/config.util").getConfg();

/**
 * Logging
 */
const { logger } = require("../../config/winston");

/**
 * JWT Token 생성
 * @param userPk    회원 구별 정보(아이디)
 * @param roles     회원 권한
 * @return          token
 */
const createToken = (userPk, roles) => {
  logger.info("Called createToken.");
  return jwt.sign({
    subject: userPk,
    roles: roles
  }, Buffer.from(config.jwt.secretKey).toString("base64"), {
    expiresIn: config.jwt.expiration
  });
}

/**
 * 권한 가져오기
 * @param token token
 * @return      권한
 */
const getAuthentication = (token) => {
  logger.info("Called getAuthentication.");
  return jwt.verify(token, Buffer.from(config.jwt.secretKey).toString("base64")).roles;
}

/**
 * 회원 구별 정보(아이디) 추출
 * @param token token
 * @return      회원 구별 정보(아이디)
 */
const getUserPk = (token) => {
  logger.info("Called getUserPk.");
  return jwt.verify(token, Buffer.from(config.jwt.secretKey).toString("base64")).subject;
}

/**
 * Header에서 Token 파싱
 * @param request   요청 객체
 * @return          token
 */
const resolveToken = (req) => {
  logger.info("Called resolveToken.");
  return req.get("X-AUTH-TOKEN");
}

/**
 * Token 유효성 및 만료 일자 확인
 * @param token 토큰
 * @return      유효성 여부
 */
const validToken = (token) => {
  logger.info("Called validToken.");
  try {
    if (jwt.verify(token, Buffer.from(config.jwt.secretKey).toString("base64"))) {
      return true;
    }
  } catch(err) {
    logger.error(err.message);
    return false;
  }
}

module.exports = {
  createToken,
  getAuthentication,
  getUserPk,
  resolveToken,
  validToken
};