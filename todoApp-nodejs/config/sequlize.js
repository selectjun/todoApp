const { Sequelize, DataTypes } = require("sequelize");

const config = require(__dirname + "/../config/config.json").dev;

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

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = sequelize;