const nodemailer = require("nodemailer");

/**
 * 설정
 */
const config = require("../utils/config.util").getConfg();

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
    try {
      let transporter = nodemailer.createTransport(SMTPConnection);
      transporter.sendMail({
        from: config.mail.from,
        to: data.to,
        subject: data.subject,
        html: data.html
      });
      logger.info("Send mail.");
    } catch (err) {
      logger.error(error);
    }
  }
}