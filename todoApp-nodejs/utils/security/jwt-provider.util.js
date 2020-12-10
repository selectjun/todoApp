
const jwt = require('jsonwebtoken');
const config = require("../../config/config.json").dev;

/**
 * JWT Token 생성
 * @param userPk    회원 구별 정보(아이디)
 * @param roles     회원 권한
 * @return          token
 */
const createToken = (userPk, roles) => {
  return jwt.sign({
    subject: userPk,
    roles: roles
  }, btoa(config.jwt.secretKey), {
    expiresIn: config.jwt.expiration
  });
}

/**
 * 권한 가져오기
 * @param token token
 * @return      권한
 */
const getAuthentication = (token) => {
  return jwt.verify(token, btoa(config.jwt.secretKey)).roles;
}

/**
 * 회원 구별 정보(아이디) 추출
 * @param token token
 * @return      회원 구별 정보(아이디)
 */
const getUserPk = (token) => {
  return jwt.verify(token, btoa(config.jwt.secretKey)).subject;
}

/**
 * Header에서 Token 파싱
 * @param request   요청 객체
 * @return          token
 */
const resolveToken = (req) => {
  return req.get("X-AUTH-TOKEN");
}

/**
 * Token 유효성 및 만료 일자 확인
 * @param token 토큰
 * @return      유효성 여부
 */
const validToken = (token) => {
  try {
    if (jwt.verify(token, btoa(config.jwt.secretKey))) {
      return true;
    }
  } catch(err) {
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