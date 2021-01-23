const express = require("express");
const { validationResult } = require('express-validator');
const router = express.Router();

/**
 * Logging
 */
const { logger } = require("../config/winston");

/**
 * JWT Provider
 */
const jwtProvider = require("../utils/security/jwt-provider.util");

/**
 * 암호 인코더
 */
const passwordEncoder = require("../utils/security/password-encoder.util");

/**
 * Database Modles
 */
const { models } = require('../sequelize');

/**
 * Token 유효성 객체
 */
const tokenGetValid = require("../validates/token.get.valid");

/**
 * Token 발급
 */
router.post("/", tokenGetValid, (req, res, next) => {
  logger.info("POST /api/token/");
  const valid = validationResult(req);

  if (!valid.isEmpty()) {
    logger.error(valid.errors[0].msg);
    res.status(400).json({
      success: false,
      param: valid.errors[0].param,
      message: valid.errors[0].msg
    });
  } else {
    models.user.count({
      where: {
        id: req.query.id
      }
    }).then(count => {
      if (count < 1) {
        logger.error(`User ${req.query.id} is not exist.`);
        res.status(400).json({
          success: false,
          message: "등록되지 않은 사용자입니다"
        });
      } else {
        next();
      }
    }).catch(err => {
      logger.error(err.message);
      res.status(500).json({
        success: false,
        message: "로그인 중 에러가 발생하였습니다\n다시 시도해주세요"
      });
    });
  }
}, (req, res) => {
  models.user.findOne({
    where: {
      id: req.query.id
    }
  }).then(user => {
    if (!passwordEncoder.match(req.query.password, user.password)) {
      logger.error(`Password missmatch.`);
      res.json({
        success: false,
        message: "암호가 맞지 않습니다"
      });  
    } else {
      models.userAuthority.findAll({
        where: {
          userId: user.id
        }
      }).then(userAuthority => {
        const token = jwtProvider.createToken(user.id, userAuthority);
        res.status(200).append("X-AUTH-TOKEN", token).json({
          success: true
        });
      }).catch(err => {
        logger.error(err.message);
        res.status(500).json({
          success: false,
          message: "로그인 중 에러가 발생하였습니다\n다시 시도해주세요"
        });
      });
    }
  }).catch(err => {
    logger.error(err.message);
    res.status(500).json({
      success: true,
      message: "로그인 중 에러가 발생하였습니다\n다시 시도해주세요"
    });
  });
});

module.exports = router;