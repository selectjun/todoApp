const { Sequelize, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("userAuthority", {
    userId: {
      field: "USER_ID",
      type: DataTypes.STRING,
      allowNull: false,
    },
    authorityName: {
      field: "AUTHORITY_NAME",
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    tableName: "USER_AUTHORITY",
    timestamps: false
  }).removeAttribute("id");
};