const sha256 = require("sha256");

const encode = function(rawPassword) {
  return sha256(rawPassword);
}

const match = function(rawPassword, encodePassword) {
  console.log(rawPassword);
  console.log(encodePassword);
  return rawPassword == encodePassword;
}

module.exports = { encode, match };