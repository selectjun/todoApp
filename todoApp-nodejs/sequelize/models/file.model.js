const { Sequelize, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("file", {
    fileId: {
      field: "FILE_ID",
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    originalName: {
      field: "ORIGINAL_NAME",
      type: DataTypes.STRING,
      allowNull: false
    },
    saveName: {
      field: "SAVE_NAME",
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    tableName: "FILE",
    timestamps: false
  });
};