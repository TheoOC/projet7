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

   //Comment.associate = function (models) {
   //    Comment.belongsTo(User);
   //    Comment.belongsTo(Post);
   //};


    //Comment.sync({ force: true })
    //    .then(() => { console.log("comment model synchronized!! ") })
    //    .catch((error) => { console.error("failed to alter the model table", error) });

    return Comment;
};