const User = require('../models/User');

exports.getUser = (req, res, next) => {
    console.log(`user_id ---------> ${req.params.user_id}`);
    const idQ = parseInt(req.params.user_id);
    User.findOne({
        where: {
            id: idQ
        }
    })
        .then((user) => {
            if (user === null) {
                console.log(`user not found`);
                res.status(400).json({ error });
            }
            res.status(200).json(user);
        })
        .catch(error => res.status(400).json({ error }));
};

exports.getAllUsers = (req, res, next) => {
    console.log("get all users");
    User.findAll()
        .then((users) => {
            res.status(200).json(users);
        })
        .catch(error => res.status(400).json({ error }));
};

exports.updateUser = (req, res, next) => {
    console.log(`in update user`);
    const idQ = req.params.user_id
    User.findOne({
        where: {
            id: idQ
        }
    })
        .then((user) => {
            if (user === null) {
                console.log(`failed to update user`)
                res.status(500).json({ error })
            }
            console.log(`user to update found
            new username: ${req.body.username}
            `)
            //change username
            user.username = req.body.username;
            user.save().then(() => {
                console.log(`user saved successfully`);
                res.status(200).json({ message: "user updated" });
            }).catch((error) => {
                console.log(`failed to update user`)
                res.status(400).json({ error });
            });
        })
        .catch((error) => { res.status(500).json({ error }) });
};

exports.deleteUser = (req, res, next) => {
    idQ = parseInt(req.params.user_id);
    User.destroy({
        where: {
            id: idQ
        }
    })
        .then(() => { res.status(200).json({ message: "deleted user" }) })
        .catch((error) => { res.status(400).json({ error }) });
};
