const nodemailer = require("nodemailer");

/**
 * 설정
 */
const config = require("../config/config.json").dev;

/**
 * SMTP 접속 정보
 */
const SMTPConnection = config.mail.config;

/**
 * Logging
 */
const { logger } = require("../config/winston");

module.exports = {
  /**
   * 메일 발송
   * @param {*} data 
   */
  send: (data) => {
    logger.info("Send mail.");
    console.log(data);
    try {
      let message = {
        from: config.mail.from,
        to: data.to,
        subject: data.subject,
        html: data.html
      };
      let transporter = nodemailer.createTransport(SMTPConnection);
      transporter.sendMail(message);
    } catch (err) {
      logger.error(error);
    }
  }
}