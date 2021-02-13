const { User, Friends, friendRequests } = require('../models');

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

exports.addFriend = (req, res, next) => {
    //add to friendrequests table
}
exports.acceptFriend = (req, res, next) => {
    //move from friendrequest table to friends table
}
exports.declineFriend = (req, res, next) => {
    //remove from friendrequest table
}
exports.deleteFriend = (req, res, next) => {
    //remove from friends table
}
exports.getFriends = (req, res, next) => {
    //get friends form friends table 
    //get all FriendId witch have the UserId column corresponding to the :user_id
    //of the uri in the row
}
exports.getFriendRequestReceived = (req, res, next) => {
    //get all addresseeId from the friendrequest table witch 
    //have the same id as the :user_id in uri
}
exports.getFriendRequestSent = (req, res, next) => {
    //get all requesterId from the friendrequest table witch 
    //have the same id as the :user_id in uri

}