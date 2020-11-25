const sequelize = require('../database');

const User = require('../models/User.model')(sequelize);
const bcrypt = require('bcrypt');

exports.login = (req, res, next) => {
};
exports.signup = (req, res, next) => {
    //check if username and email is already in the database
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            //create instance and save it to database with create instead of build and save
            const user = User.create({
                email: req.body.email,
                username: req.body.username,
                password: hash
            })
                .then((user) => {
                    res.status(200).json({ message: "user created" })
                })
                .catch((error) => res.status(400).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};