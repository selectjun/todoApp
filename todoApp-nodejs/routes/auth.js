
const jwtProvider = require("../utils/security/jwt-provider.util");

/**
 * Logging
 */
const { logger } = require("../config/winston");

/**
 * 인증
 */
const auth = (req, res, next) => {
  const token = jwtProvider.resolveToken(req);
  if (jwtProvider.validToken(token)) {
    next();
  } else {
    logger.error("No atuthentification.");
    res.status(403).json({
      success: false,
      message: "권한이 없습니다"
    });
  }
}

module.exports = { auth };