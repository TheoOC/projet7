const { Sequelize, DataTypes } = require('sequelize');
const { applyExtraSetup } = require('./models/extra-setup');
const mysql = require('mysql2');

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


module.exports = sequelize;


/*
 function createDb() {
    return new Promise((resolve, reject) => {
        //create connection
        const connection = mysql.createConnection({
            host: "localhost",
            user: "root",
            password: ""
        })

        //create the database if it is not already created
        connection.execute('CREATE DATABASE IF NOT EXISTS projet7;', function (err, results, fields) {
            console.log(results);
            console.log(fields);
            if (err) reject(err);
            console.log("Database created");
            resolve();
        })

        resolve();
    })
}
*/
//Object.keys(models).forEach(key => {
//console.log(models[key]);
//models[key].associate(models);
//})
//sequelize.sync({ force: true });


