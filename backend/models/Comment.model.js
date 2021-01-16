const { DataTypes } = require('sequelize');
const sequelize = require('../database');

module.exports = (sequelize) => {
    const Comment = sequelize.define('Comment', {
        textContent: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        }
    }, {
        timestamps: true,

    });


    return Comment;
};