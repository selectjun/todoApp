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
      // TODO: 절대경로, 상대경로에 따른 쉬운 저장위치 변경이 가능하도록 처리
      const path = `${__dirname}/../${config.upload.physicalPath}/${"todo"}/${file.saveName}`;
      fs.access(path, fs.F_OK, (err) => {
        if (err) {
          return res.status(404).json({
            success: false,
            message: "파일이 존재하지 않습니다"
          });
        }
        // TODO: 현재 다운로드가 되지 않고 있음.
        const fileStream = fs.createReadStream(path);
        fileStream.pipe(res);
      });
    }).catch(err => {
      res.status(500).json({
        success: false,
        message: err
      });
    });
  }
});

module.exports = router;