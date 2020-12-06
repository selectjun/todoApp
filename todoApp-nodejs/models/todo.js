const { Sequelize } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  return sequelize.define('TODO', {
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
}