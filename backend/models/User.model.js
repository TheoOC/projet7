const { DataTypes } = require('sequelize');
const sequelize = require('../database');

module.exports = (sequelize) => {
    const User = sequelize.define('User', {
        //model attributes
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true

        },
        isAdmin: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        }
    }, {
        timestamps: true
    });


    return User;
};
