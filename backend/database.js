const { Sequelize, DataTypes } = require('sequelize');
const { applyExtraSetup } = require('./models/extra-setup');

const dotenv = require('dotenv');
const result = dotenv.config();
if (result.error) {
    throw result.error;
}

const sequelize = new Sequelize(
    process.env.DATABASE_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
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


module.exports = sequelize;




