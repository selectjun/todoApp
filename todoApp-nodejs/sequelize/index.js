const { Sequelize } = require('sequelize');
const { applyExtraSetup } = require('./extra-setup');

/**
 * Logging
 */
const { logger } = require("../config/winston");

logger.info("Lodding databases.");

/**
 * 설정
 */
const config = require("../utils/config.util").getConfg();

const sequelize = new Sequelize(
  // Schema Name
  config.datasource.database,
  // Username
  config.datasource.username,
  // Password
  config.datasource.password, 
  {
    // Database Host
    host: config.datasource.host,
    // Database Driver
    dialect: config.datasource.driver,
    // Database Pool Configure
    pool: config.datasource.pool
  }
);

// 연결 여부 확인
sequelize
  .authenticate()
  .then(() => {
    logger.info("Connection has been established successfully.");
  })
  .catch(err => {
    logger.error("Unable to connect to the database: ", err);
  });

// Model 정의
const modelDefiners = [
  require("./models/todo.model"),
  require("./models/user.model"),
  require("./models/authority.model"),
  require("./models/userAuthority.model"),
  require("./models/file.model"),
	// Add more models here...
	// require("./models/item"),
];

// We define all models according to their files.
for (const modelDefiner of modelDefiners) {
	modelDefiner(sequelize);
}

// We execute any extra setup after the models are defined, such as adding associations.
applyExtraSetup(sequelize);

// We export the sequelize connection instance to be used around our app.
module.exports = sequelize;