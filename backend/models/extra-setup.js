function applyExtraSetup(sequelize) {

    sequelize.sync({ force: true })
        .then(() => {
            console.log("synced all models")
        })
        .then(() => {
            const { Comment, User, Post } = sequelize.models;
            console.log('creating associations');
            Comment.belongsTo(User);
            Comment.belongsTo(Post);

            User.hasMany(Post, {
                onDelete: 'cascade',
            });
            User.hasMany(Comment, {
                onDelete: 'cascade',
            });

            Post.hasMany(Comment, {
                onDelete: 'cascade',
            });
            Post.belongsTo(User);
        })
        .then(() => {
            sequelize.sync({ force: true }).then(() => {
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
