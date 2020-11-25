const { Sequelize, DataTypes } = require('sequelize');
const { applyExtraSetup } = require('./models/extra-setup');

//add code to create database if it does not exist
const sequelize = new Sequelize('projet7', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});

const models = [
    require('./models/User.model'),
    require('./models/Post.model'),
    require('./models/Comment.model'),
];
for (const model of models) {
    model(sequelize);
}

applyExtraSetup(sequelize);

//Object.keys(models).forEach(key => {
//console.log(models[key]);
//models[key].associate(models);
//})
//sequelize.sync({ force: true });

module.exports = sequelize;

