const aes256 = require('aes256');

const config = require("../../config/config.json").dev;

const cipher = aes256.createCipher(config.aes256.key);

module.exports = {
  encrypt: (plaintext) => {
    try {
      return cipher.encrypt(plaintext);
    } catch(err) {
      new Error(`AES-256 암화화 과정 중, 에러가 발생하였습니다\n${err}`);
    }
  },
  decrypt: (plaintext) => {
    try {
      return cipher.decrypt(plaintext);
    } catch(err) {
      new Error(`AES-256 복화화 과정 중, 에러가 발생하였습니다\n${err}`);
    }
  }
}
