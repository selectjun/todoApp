const { Sequelize, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("todo", {
    todoId: {
      field: "TODO_ID",
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      field: "TITLE",
      type: DataTypes.STRING,
      allowNull: false
    },
    contents: {
      field: "CONTENTS",
      type: DataTypes.TEXT,
      allowNull: true
    },
    startAt: {
      field: "START_AT",
      type: DataTypes.DATE,
      allowNull: true,
    },
    endAt: {
      field: "END_AT",
      type: DataTypes.DATE,
      allowNull: true,
    },
    userId: {
      field: "USER_ID",
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
    isComplete: {
      field: "IS_COMPLETE",
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    isDelete: {
      field: "IS_DELETE",
      type: DataTypes.BOOLEAN,  
      allowNull: false,
      defaultValue: false
    }
  }, {
    tableName: "TODO",
    timestamps: false
  });
};