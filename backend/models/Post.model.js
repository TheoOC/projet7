const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Post = sequelize.define('Post', {
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        textContent: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        imageUrl: {
            type: DataTypes.STRING,
            allowNull: true
        },
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        }
    }, {
        timestamps: true
    });

   //Post.associate = function (models) {
   //    Post.hasMany(Comment, {
   //        onDelete: 'cascade',
   //    });
   //    Post.belongsTo(User);
   //};


    //Post.sync({ force: true })
    //    .then(() => { console.log("post model synchronized!! ") })
    //    .catch((error) => { console.error("failed to alter the post table", error) });

    return Post;
};