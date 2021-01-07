/**
 * Logging
 */
const { logger } = require("../config/winston");

module.exports = {
  send: () => {
    logger.info("Send mail.");
  }
}