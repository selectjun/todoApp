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
const userInsertSchema = require("../schemas/user.insert.schema");

/**
 * 사용자 등록
 */
router.post("/", userInsertSchema, (req, res, next) => {
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
        res.status(200).json({
          success: false,
          message: "이미 등록된 계정이 있습니다"
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

module.exports = router;