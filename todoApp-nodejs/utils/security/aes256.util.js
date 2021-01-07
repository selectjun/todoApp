const Crypto = require("crypto");

const config = require("../../config/config.json").dev;

const encryptWithAES256 = (secretKey, plainText) => {
  const secretKeyToByteArray = Buffer.from(secretKey, "utf8");
  const ivParameter = Buffer.from(secretKey.slice(0, 16));
  const cipher = Crypto.createCipheriv("aes-256-cbc", secretKeyToByteArray, ivParameter);
  let encryptedValue = cipher.update(plainText, "utf8", "base64");
  encryptedValue += cipher.final("base64");
  return encryptedValue;
};

const decryptWithAES256 = (secretKey, encryptedText) => {
  const secretKeyToBufferArray = Buffer.from(secretKey, "utf8");
  const ivParameter = Buffer.from(secretKey.slice(0, 16));
  const cipher = Crypto.createDecipheriv("aes-256-cbc", secretKeyToBufferArray, ivParameter);
  let decryptedValue = cipher.update(encryptedText, "base64", "utf8");
  decryptedValue += cipher.final("utf8");
  return decryptedValue;
};

module.exports = {
  encrypt: (plaintext) => {
    try {
      return encryptWithAES256(config.aes256.key, plaintext);
    } catch(err) {
      new Error(`AES-256 복화화 과정 중, 에러가 발생하였습니다\n${err}`);
    }
  },
  decrypt: (plaintext) => {
    try {
      return decryptWithAES256(config.aes256.key, plaintext);
    } catch(err) {
      new Error(`AES-256 복화화 과정 중, 에러가 발생하였습니다\n${err}`);
    }
  }
}
