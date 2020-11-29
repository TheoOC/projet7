const { DataTypes } = require('sequelize');
const sequelize = require('../database');

module.exports = (sequelize) => {
    const User = sequelize.define('User', {
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

    //User.associate = function (models) {
    //    User.hasMany(Post, {
    //        onDelete: 'cascade',
    //    });
    //    User.hasMany(Comment, {
    //        onDelete: 'cascade',
    //    });
    //};

    //User.sync({ force: true })
    //    .then(() => console.log('user model synchronised!! '))
    //    .catch(error => { console.error("failed to alter the user table", error) });

    return User;
};

//a person can create more than 1 post and more than 1 person can comment on the post