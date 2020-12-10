const { Sequelize, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("authority", {
    name: {
      field: "NAME",
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
      primaryKey: true,
    },
    description: {
      field: "DESCRIPTION",
      type: DataTypes.STRING,
      allowNull: true
    },
    createAt: {
      field: "CREATE_AT",
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.NOW
    },
    updateAt: {
      field: "UPDATE_AT",
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.NOW
    },
    isDelete: {
      field: "IS_DELETE",
      type: DataTypes.BOOLEAN,  
      allowNull: false,
      defaultValue: false
    }
  }, {
    tableName: "AUTHORITY",
    timestamps: false
  });
};