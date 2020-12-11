module.exports = function (sequelize, DataTypes) {
  const Question = sequelize.define("Question", {
    question: DataTypes.TEXT,
    optionA: DataTypes.TEXT,
    optionB: DataTypes.TEXT,
    optionC: DataTypes.TEXT,
    optionD: DataTypes.TEXT,
    answer: DataTypes.TEXT,
    // TODO: Time range
  });

  // Question.associate = function (models) {
  //   Question.belongsToMany(models.Character, {
  //     through: "PlayerGames",
  //     foreignKey: "gameId",
  //   });
  // };

  return Question;
};