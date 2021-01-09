const express = require("express");
const { validationResult } = require("express-validator");
const router = express.Router();
const Op = require("sequelize").Op;

/**
 * Logging
 */
const { logger } = require("../config/winston");

/**
 * 설정
 */
const config = require("../config/config.json").dev;

/**
 * Database Models
 */
const { models } = require('../sequelize');

/**
 * User 등록 유효성 객체
 */
const userInsertValid = require("../validates/user.insert.valid");

/**
 * User 수정 유효성 객체
 */
const userUpdateValid = require("../validates/user.update.valid");

/**
 * User 아이디 찾기 유효성 객체
 */
const userFindIdValid = require("../validates/user.findId.valid");

/**
 * User 비밀번호 찾기 유효성 객체
 */
const userFindPasswordValid = require("../validates/user.findPassword.valid");

/**
 * 메일 객체
 */
const mail = require("../utils/mail.util");

/**
 * AES-256 암호화 객체
 */
const aes256 = require("../utils/security/aes256.util");

/**
 * SHA-256 암호화 객체
 */
const sha256 = require("sha256");

/**
 * JWT Provider
 */
const jwtProvider = require("../utils/security/jwt-provider.util");

/**
 * 사용자 등록
 */
router.post("/", userInsertValid, (req, res, next) => {
  logger.info("POST /api/user/");
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
    }).then((count) => {
      if (count > 0) {
        res.status(400).json({
          success: false,
          message: "이미 등록된 ID가 있습니다"
        });
      } else {
        req.query.email = aes256.encrypt(req.query.email);
        next();
      }
    }).catch((err) => {
      logger.error(err.message);
      res.status(500).json({
        success: false,
        message: "에러가 발생하였습니다\n다시 시도해주세요"
      });
    });
  }
}, (req, res, next) => {
  models.user.create(req.query).then(user => {
    req.query.user = user;
    next();
  }).catch((err) => {
    logger.error(err.message);
    res.status(500).json({
      success: false,
      message: "에러가 발생하였습니다\n다시 시도해주세요"
    });
  });
}, (req, res) => {
  models.userAuthority.create({
    userId: req.query.id,
    authorityName: "ROLE_USER"
  }).then(() => {
    res.status(200).json({
      success: true,
      id: req.query.id
    });
  }).catch(err => {
    logger.error(err.message);
    res.status(500).json({
      success: false,
      message: "에러가 발생하였습니다\n다시 시도해주세요"
    });
  });
});

/**
 * 사용자 패스워드 일치 여부 조회
 */
router.post("/password/:password/", (req, res, next) => {
  logger.info(`POST /api/user/password/${req.params.password}/`);
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
  }).then((count) => {
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
  }).catch((err) => {
    logger.error(err.message);
    res.status(500).json({
      success: false,
      message: "에러가 발생하였습니다\n다시 시도해주세요"
    });
  });
});

/**
 * 사용자 정보 조회
 */
router.get("/", (req, res, next) => {
  logger.info("GET /api/user/");
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
  }).then((count) => {
    if (count > 0) {
      models.user.findOne({
        where: {
          id: id
        },
        attributes: {
          exclude: ["password"]
        }
      }).then((user) => {
        user.email = aes256.decrypt(user.email);
        res.status(200).json({
          success: 200,
          user: user
        });
      }).catch((err) => {
        logger.error(err.message);
        res.status(500).json({
          success: false,
          message: "에러가 발생하였습니다\n다시 시도해주세요"
        });
      });
    } else {
      res.status(400).json({
        success: false,
        message: "사용자 정보가 존재하지 않습니다"
      });
    }
  }).catch((err) => {
    logger.error(err.message);
    res.status(500).json({
      success: false,
      message: "에러가 발생하였습니다\n다시 시도해주세요"
    });
  });
});

/**
 * 사용자 정보 수정
 */
router.put("/", userUpdateValid, (req, res, next) => {
  logger.info("PUT /api/user/");
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
  const valid = validationResult(req);

  if (!valid.isEmpty()) {
    res.status(400).json({
      success: false,
      param: valid.errors[0].param,
      message: valid.errors[0].msg
    });
  } else {
    const token = jwtProvider.resolveToken(req);
    const id = jwtProvider.getUserPk(token);
    const currentPassword = req.query.currentPassword;

    models.user.count({
      where: {
        id: id,
        password: currentPassword
      }
    }).then((count) => {
      if (count > 0) {
        models.user.update({
          password: sha256(req.query.password),
          name: req.query.name,
          email: aes256.encrypt(req.query.email)
        }, {
          where: {
            id: id
          }
        }).then(() => {
          res.status(200).json({
            success: 200,
            message: "회원정보가 수정되었습니다",
            id: id
          });
        }).catch((err) => {
          logger.error(err.message);
          res.status(500).json({
            success: false,
            message: "에러가 발생하였습니다\n다시 시도해주세요"
          });
        });
      } else {
        res.status(400).json({
          success: false,
          message: "현재 패스워드가 일치하지 않습니다"
        });
      }
    }).catch((err) => {
      logger.error(err.message);
      res.status(500).json({
        success: false,
        message: "에러가 발생하였습니다\n다시 시도해주세요"
      });
    });
  }
});

/**
 * 사용자 아이디 찾기
 */
router.post("/find/id/", userFindIdValid, (req, res) => {
  logger.info("POST /api/user/find/id/");
  const valid = validationResult(req);

  if (!valid.isEmpty()) {
    res.status(400).json({
      success: false,
      param: valid.errors[0].param,
      message: valid.errors[0].msg
    });
  } else {
    const email = req.query.email;

    models.user.findOne({
      where: {
        email: aes256.encrypt(email)
      }
    }).then((user) => {
      if (!user) {
        res.status(400).json({
          success: false,
          message: "회원정보가 존재하지 않습니다\n다시 시도해주세요"
        });
      } else {
        res.status(200).json({
          success: true,
          message: "조회가 완료 되었습니다",
          id: user.id
        });
      }
    }).catch((err) => {
      logger.error(err.message);
      res.status(500).json({
        success: false,
        message: "에러가 발생하였습니다\n다시 시도해주세요"
      });
    });
  }
});

/**
 * 사용자 비밀번호 찾기
 */
router.post("/find/password/", userFindPasswordValid, (req, res) => {
  logger.info("POST /api/user/find/password/");
  const valid = validationResult(req);

  if (!valid.isEmpty()) {
    res.status(400).json({
      success: false,
      param: valid.errors[0].param,
      message: valid.errors[0].msg
    });
  } else {
    const id = req.query.id;
    const email = req.query.email;

    models.user.findOne({
      where: {
        id: id,
        email: aes256.encrypt(email)
      }
    }).then((user) => {
      if (!user) {
        res.status(400).json({
          success: false,
          message: "회원정보가 존재하지 않습니다\n다시 시도해주세요"
        });
      } else {
        const password = generatePassword();

        models.user.update({
          password: sha256(password)
        }, {
          where: {
            id: user.id
          }
        }).then(() => {
          sendFindPasswordMail({
            id: user.id,
            password: password,
            name: user.name,
            to: aes256.decrypt(user.email)
          });
          res.status(200).json({
            success: true,
            message: "조회가 완료 되었습니다",
            id: user.id
          });
        }).catch((err) => {
          logger.error(err.message);
          res.status(500).json({
            success: false,
            message: "에러가 발생하였습니다\n다시 시도해주세요"
          });
        });
      }
    }).catch((err) => {
      logger.error(err.message);
      res.status(500).json({
        success: false,
        message: "에러가 발생하였습니다\n다시 시도해주세요"
      });
    });
  }
});

/**
 * 패스워드 랜덤 생성
 * @return string 패스워드
 */
const generatePassword = () => {
  const chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz!@#$%^&*";
  const stringLength = 8;

  var randomString = "";
  for (let i = 0; i < stringLength; i++) {
    let randomNum = Math.floor(Math.random() * chars.length);
    randomString += chars.substring(randomNum, randomNum + 1);
  }

  return randomString;
}

/**
 * 임시 비밀번호 메일 발송
 * @param {*} data 
 */
const sendFindPasswordMail = (data) => {
  logger.info("Send mail for passsword find.");
  mail.send({
    to: data.to,
    subject: "[TODO] 임시 비밀번호 발송",
    html: `<h1>${data.name} 님</h1>` +
          `임시 비밀번호: ${data.password}<br />` +
          `<a href="http://localhost:9000/">로그인하러 가기</a>`
  });
}

module.exports = router;