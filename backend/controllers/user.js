const sequelize = require('../database');

const User = require('../models/User.model')(sequelize);

exports.getUser = (req, res, next) => {
    User.findOne({
        where: {
            id: req.params.id
        }
    })
        .then((user) => {
            res.status(200).json(user);
        })
        .catch(error => res.status(400).json({ error }));
}
exports.getAllUsers = (req, res, next) => {
    console.log("get all users");
    User.findAll()
        .then((users) => {
            res.status(200).json(users);
        })
        .catch(error => res.status(400).json({ error }));
}
exports.modifyUser = (req, res, next) => {

}
exports.deleteUser = (req, res, next) => {

};