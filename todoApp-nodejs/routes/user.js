const express = require("express");
const { validationResult } = require('express-validator');
const router = express.Router();

/**
 * Database Models
 */
const { models } = require('../sequelize');

/**
 * User 유효성 객체
 */
const userInsertValid = require("../validates/user.insert.valid");

/**
 * AES-256 암호화 객체
 */
const aes256 = require("../utils/security/aes256.util");

/**
 * JWT Provider
 */
const jwtProvider = require("../utils/security/jwt-provider.util");

/**
 * 사용자 등록
 */
router.post("/", userInsertValid, (req, res, next) => {
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
      if (count > 0) {
        res.status(400).json({
          success: false,
          message: "이미 등록된 ID가 있습니다"
        });
      } else {
        req.query.email = aes256.encrypt(req.query.email);
        next();
      }
    }).catch(err => {
      res.status(500).json({
        success: false,
        message: err
      });
    });
  }
}, (req, res, next) => {
  models.user.create(req.query).then(user => {
    req.query.user = user;
    next();
  }).catch(err => {
    res.status(500).json({
      success: false,
      message: err
    });
  });
}, (req, res) => {
  console.log(req.query);
  models.userAuthority.create({
    userId: req.query.id,
    authorityName: "ROLE_USER"
  }).then(() => {
    res.status(200).json({
      success: true,
      id: req.query.id
    });
  }).catch(err => {
    res.status(500).json({
      success: false,
      message: err
    });
  });
});

/**
 * 사용자 패스워드 일치 여부 조회
 */
router.post("/password/:password/", (req, res, next) => {
  const token = jwtProvider.resolveToken(req);
  if (jwtProvider.validToken(token)) {
    next();
  } else {
    res.status(403).json({
      success: false,
      message: "권한이 없습니다"
    });
  }
}, (req, res) => {
  const token = jwtProvider.resolveToken(req);
  const id = jwtProvider.getUserPk(token);
  const password = req.params.password;

  models.user.count({
    where: {
      id: id,
      password: password
    }
  }).then(count => {
    if (count > 0) {
      res.status(200).json({
        success: true,
        message: "본인인증 되었습니다"
      });
    } else {
      res.status(400).json({
        success: false,
        message: "패스워드가 일치하지 않습니다"
      });
    }
  }).catch(err => {
    res.status(500).json({
      success: false,
      message: err
    });
  });
});

/**
 * 사용자 정보 조회
 */
router.get("/", (req, res, next) => {
  const token = jwtProvider.resolveToken(req);
  if (jwtProvider.validToken(token)) {
    next();
  } else {
    res.status(403).json({
      success: false,
      message: "권한이 없습니다"
    });
  }
}, (req, res) => {
  const token = jwtProvider.resolveToken(req);
  const id = jwtProvider.getUserPk(token);
  const password = req.query.password;

  models.user.count({
    where: {
      id: id,
      password: password
    }
  }).then(count => {
    if (count > 0) {
      models.user.findOne({
        where: {
          id: id
        },
        attributes: {
          exclude: ["password"]
        }
      }).then(user => {
        user.email = aes256.decrypt(user.email);
        res.status(200).json({
          success: 200,
          user: user
        });
      }).catch(err => {
        res.status(500).json({
          success: false,
          message: err
        });
      });
    } else {
      res.status(500).json({
        success: false,
        message: "잘못된 접근입니다"
      });
    }
  }).catch(err => {
    res.status(500).json({
      success: false,
      message: err
    });
  });
});

module.exports = router;