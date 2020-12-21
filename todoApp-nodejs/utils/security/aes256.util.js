const aes256 = require('aes256');

const config = require("../../config/config.json").dev;

const cipher = aes256.createCipher(config.aes256.key);

module.exports = {
  encrypt: (plaintext) => {
    return cipher.encrypt(plaintext);
  },
  decrypt: (plaintext) => {
    return cipher.decrypt(plaintext);
  }
}
