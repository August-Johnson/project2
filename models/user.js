/* eslint-disable indent */
/* eslint-disable prettier/prettier */
module.exports = function (sequelize, DataTypes) {
    var User = sequelize.define("User", {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        imageURL: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        goalsMade: {
            type: INTEGER,
            defaultValue: 0
        },
        goalsSucceeded: {
            type: INTEGER,
            defaultValue: 0
        },
        goalsDeleted: {
            type: INTEGER,
            defaultValue: 0
        }
    });

    User.associate = function (models) {
        User.hasMany(models.Goal, {
            onDelete: "cascade"
        });
    };
    return User;
};