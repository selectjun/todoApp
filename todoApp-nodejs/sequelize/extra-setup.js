/**
 * Database 정의
 * @param sequelize Sequelize 객체
 */
const applyExtraSetup = (sequelize) => {
  const { user, authority, todo, file } = sequelize.models;

  file.hasMany(todo, {
    foreignKey: "fileId",
  });
  todo.belongsTo(file, {
    foreignKey: "fileId",
  });
}

module.exports = { applyExtraSetup };