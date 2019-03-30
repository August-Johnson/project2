/* eslint-disable prettier/prettier */
module.exports = function (sequelize, DataTypes) {
    var Message = sequelize.define("Message", {
        name: {
            type: DataTypes.STRING,
            allowNull: true,
            len: [1]
        },
        body: {
            type: DataTypes.TEXT,
            allowNull: true,
            len: [1]
        }
    });
Message.associate = function (models) {
    Message.belongsTo(models.User);
};
return Message;
  };
