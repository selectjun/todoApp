const express = require("express");
const fs = require("fs");
const router = express.Router();

/**
 * Database Models
 */
const { models } = require('../sequelize');

/**
 * 설정
 */
const config = require("../config/config.json").dev;

/**
 * 인증
 */
//const { auth } = require("./auth");

/**
 * Auth Interceptor
 */
//router.all("/*", auth);

/**
 * 사용자 등록
 */
router.get("/:fileId/", (req, res) => {
  const fileId = req.params.fileId;

  if (!fileId) {
    res.status(400).json({
      success: false,
      message: "[fileId] 값이 존재하지 않습니다"
    });
  } else {
    models.file.findOne({
      where: {
        fileId: fileId
      }
    }).then(file => {
      // TODO: 파일이 존재하지 않을 경우, 서버가 중지되는 문제가 있음
      res.setHeader("Content-Disposition", "attachment;filename=" + encodeURI(file.originalName));
      res.setHeader("Content-Type","binary/octet-stream");

      // TODO: 절대경로, 상대경로에 따른 쉬운 저장위치 변경이 가능하도록 처리
      const fileStream = fs.createReadStream(`${__dirname}/../${config.upload.physicalPath}/${"todo"}/${file.saveName}`);
      fileStream.pipe(res);
    }).catch(err => {
      res.status(500).json({
        success: false,
        message: err
      });
    });
  }
});

module.exports = router;