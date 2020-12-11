module.exports = function (sequelize, DataTypes) {
  const Character = sequelize.define("Character", {
    category: DataTypes.STRING,
    name: DataTypes.STRING,
    health: DataTypes.INTEGER,
    
    // TODO: Days of the week?
  });

  // Player.associate = function (models) {
  //   Player.belongsToMany(models.Game, {
  //     through: "PlayerGames",
  //     foreignKey: "playerId",
  //   });
  // };

  return Character;
};
