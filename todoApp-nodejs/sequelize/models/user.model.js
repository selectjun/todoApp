const { Sequelize, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("user", {
    id: {
      field: "ID",
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
      primaryKey: true
    },
    password: {
      field: "PASSWORD",
      type: DataTypes.STRING,
      allowNull: false
    },
    name: {
      field: "NAME",
      type: DataTypes.STRING,
      allowNull: false
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
    tableName: "USER",
    timestamps: false
  });
};