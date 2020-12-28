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

exports.autoAuthVerification = (req, res, next) => {
    //token verified in auth middleware now need to check if user is valid
    const token = req.headers.authorization.split(' ')[1];
    //decode token
    const decodedToken = jwt.verify(token, process.env.SECRETKEY);
    //get user id in token
    const idQ = parseInt(decodedToken.userId);
    console.log(`user id in auto auth: ${idQ}`);
    //check if user is in database
    User.findByPk(idQ)
        .then((user) => {
            if (user === null) {
                console.log(`autoAuthVerification ctrl user not found`);
                res.status(400).json({ error });
            }
            console.log(`autoAuthVerification ctrl user found: ${user}`);
            res.status(200).json(user);
        }).catch((error) => {
            console.log(`autoAuthVerification ctrl user not found`);
            res.status(400).json({ error });
        });

}
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
        .then((user) => {
            if (!user) {
                console.log('user not found');
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
                        isAdmin: user.isAdmin,
                        token: jwt.sign(
                            { userId: user.id },
                            process.env.SECRETKEY,
                            { expiresIn: '1h' }
                        )
                    })
                })
                .catch((error) => {
                    res.status(500).json({ error: "bcrypt error" });
                });
        })
        .catch((error) => {
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