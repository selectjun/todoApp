const sha256 = require("sha256");

/**
 * 암호 암호화(SHA-256)
 * @param rawPassword   원시 암호
 * @return              암호화된 암호
 */
const encode = function(rawPassword) {
  return sha256(rawPassword);
}

/**
 * 암호 일치여부 확인
 * @param rawPassword     원시 암호
 * @param encodePassword  암호화된 암호
 * @return                결과
 */
const match = function(rawPassword, encodePassword) {
  return rawPassword == encodePassword;
}

module.exports = { encode, match };