const { Sequelize, DataTypes } = require('sequelize');
const { applyExtraSetup } = require('./models/extra-setup');
const mysql = require('mysql2');

//create connection
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: ""
});
//create the database if it is not already created
connection.connect(function (err) {
    if (err) throw err;
    console.log("Connected");
    connection.query(`CREATE DATABASE IF NOT EXISTS projet7;`, function (err, result) {
        if (err) throw err;
        console.log("Database created");
    })
})


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

