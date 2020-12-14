
function applyExtraSetup(sequelize) {
    console.log("in extra setup");


    sequelize.sync({ force: true })
        .then(() => {
            console.log("synced all models")
        })
        .then(() => {
            const { Comment, User, Post } = sequelize.models;
            console.log('creating associations');
            Comment.belongsTo(User, {
                foreignKey: {
                    allowNull: false
                }
            });
            Comment.belongsTo(Post, {
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
