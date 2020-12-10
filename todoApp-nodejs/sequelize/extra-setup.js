/**
 * Database 정의
 * @param sequelize Sequelize 객체
 */
const applyExtraSetup = (sequelize) => {
  //const { user, authority } = sequelize.models;

  //user.belongsToMany(authority, {as: "user", through: "USER_AUTHORITY", foreignKey: "ID"});
  //authority.belongsTo(user, {as: "authority", through: "USER_AUTHORITY", foreignKey: "NAME"});
}

module.exports = { applyExtraSetup };