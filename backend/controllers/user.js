const sequelize = require('../database');

const User = require('../models/User.model')(sequelize);

exports.getUser = (req, res, next) => {
    console.log(`user_id ---------> ${req.params.user_id}`);
    const idQ = parseInt(req.params.user_id);
    User.findOne({
        where: {
            id: idQ
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
    idQ = parseInt(req.params.user_id);
    User.destroy({
        where: {
            id: idQ
        }
    })
        .then(() => { res.status(200).json({ message: "deleted user" }) })
        .catch((error) => { res.status(400) });
};