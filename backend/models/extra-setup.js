function applyExtraSetup(sequelize) {
    console.log("in extra setup");

    //create table if it does not exist
    sequelize.sync()
        .then(() => {
            console.log("synced all models")
        })
        .then(() => {
            const { Comment, User, Post } = sequelize.models;
            console.log('creating associations');
            Comment.belongsTo(User, {
                onDelete: 'cascade',
                foreignKey: {
                    allowNull: false
                }
            });
            Comment.belongsTo(Post, {
                onDelete: 'cascade',
                foreignKey: {
                    allowNull: false
                }
            });

            User.hasMany(Post, {
                onDelete: 'cascade',
                foreignKey: {
                    allowNull: false
                }
            });
            User.hasMany(Comment, {
                onDelete: 'cascade',
                foreignKey: {
                    allowNull: false
                }
            });

            Post.hasMany(Comment, {
                onDelete: 'cascade',
                foreignKey: {
                    allowNull: false
                }
            });
            Post.belongsTo(User, {
                onDelete: 'cascade',
                foreignKey: {
                    allowNull: false
                }
            });
        })
        .then(() => {
            sequelize.sync({ force: true })
                .then(() => {
                    console.log("applied associations");
                })
                .catch((error) => {
                    console.log("failed to apply associations" + error);
                })
        })
        .catch(error => {
            console.log("failed to sync models" + error);
        })
}

module.exports = { applyExtraSetup };
