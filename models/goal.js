/* eslint-disable prettier/prettier */
module.exports = function (sequelize, DataTypes) {
  var Goal = sequelize.define("Goal", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      len: [1]
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    category: {
      type: DataTypes.STRING,
      defaultValue: "General"
    },
    goalMet: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  });
  Goal.associate = function (models) {
    Goal.belongsTo(models.User);
  };
  return Goal;
};
