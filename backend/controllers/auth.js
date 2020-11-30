const sequelize = require('../database');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { Op } = require("sequelize");

const dotenv = require('dotenv');
const result = dotenv.config();
if (result.error) {
    throw result.error;
}

const User = require('../models/User.model')(sequelize);

exports.login = (req, res, next) => {
    //find username or email depending on login type
    console.log(`email:   ${req.body.email}`);
    console.log(`username: ${req.body.username}`);
    emailQ = req.body.email;
    usernameQ = req.body.username;
    if (usernameQ == null) { usernameQ = "" };
    if (emailQ == null) { emailQ = "" };

    User.findOne({
        where: {
            [Op.or]: [
                { email: emailQ },
                { username: usernameQ }
            ]
        }
    })
        .then(user => {
            if (!user) {
                console.log('user null');
                return res.status(401).json({ error: "USER NOT FOUND!!!" });
            }
            console.log('user not null');
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({ error: "WRONG PASSWORD!!!" });
                    }
                    res.status(200).json({
                        userId: user.id,
                        token: jwt.sign(
                            { userId: user.id },
                            process.env.SECRETKEY,
                            { expiresIn: '24h' }
                        )
                    })
                })
                .catch((error) => {
                    res.status(500).json({ error: "bcrypt error" });
                });
        })
        .catch(error => {
            res.status(500).json({ error: "findOne error" });
        });
};
exports.signup = (req, res, next) => {
    //check if username and email is already in the database
    console.log("----------------------" + req.body);
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            //create instance and save it to database with create instead of build and save
            const user = User.create({
                email: req.body.email,
                username: req.body.username,
                password: hash
            })
                .then((user) => {
                    res.status(200).json({ message: "user created" });
                })
                .catch((error) => res.status(400).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};