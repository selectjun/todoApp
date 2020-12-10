const express = require("express");
const { validationResult } = require('express-validator');
const router = express.Router();

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
  const valid = validationResult(req);

  if (!valid.isEmpty()) {
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
        res.status(200).json({
          success: false,
          message: "등록되지 않은 사용자 없습니다"
        });
      } else {
        next();
      }
    }).catch(err => {
      res.status(500).json({
        success: false,
        message: err
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
        res.status(500).json({
          success: false,
          message: err
        });
      });
    }
  }).catch(err => {
    res.status(500).json({
      success: true,
      message: err
    });
  });
});

module.exports = router;