/* eslint-disable indent */
/* eslint-disable prettier/prettier */
module.exports = function (sequelize, DataTypes) {
    var User = sequelize.define("User", {
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            len: [5, 20]
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            len: [5]
        },
        imageURL: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        goalsMade: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        goalsSucceeded: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        goalsDeleted: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        }
    });

    User.associate = function (models) {
        User.hasMany(models.Goal, {
            onDelete: "cascade"
        });

        User.hasMany(models.Message, {
            onDelete: "cascade"
        });
    };
    return User;
};