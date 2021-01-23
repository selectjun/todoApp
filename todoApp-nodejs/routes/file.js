const express = require("express");
const fs = require("fs");
const router = express.Router();

/**
 * Logging
 */
const { logger } = require("../config/winston");

/**
 * Database Models
 */
const { models } = require('../sequelize');

/**
 * 설정
 */
const config = require("../utils/config.util").getConfg();

/**
 * 인증
 */
const { auth } = require("./auth");

/**
 * Auth Interceptor
 */
router.all("/*", auth);

/**
 * 사용자 등록
 */
router.get("/:fileId/", (req, res) => {
  logger.info(`GET /file/${req.params.fileId}/`);
  const fileId = req.params.fileId;

  if (!fileId) {
    logger.error("fileId is undefined.");
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
      const path = `${__dirname}/../${config.upload.physicalPath}/${"todo"}/${file.saveName}`;
      fs.access(path, fs.F_OK, (err) => {
        if (err) {
          logger.error("File is not exist.");
          return res.status(404).json({
            success: false,
            message: "파일이 존재하지 않습니다"
          });
        }
        const fileStream = fs.createReadStream(path);
        fileStream.pipe(res);
      });
    }).catch(err => {
      logger.error(err.message);
      res.status(500).json({
        success: false,
        message: err
      });
    });
  }
});

module.exports = router;