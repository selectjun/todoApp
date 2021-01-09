const config = require("../config/config.json");
const environment = process.env.NODE_ENV || "development";

module.exports = {
  getConfg: () => {
    return config[environment];
  }
}