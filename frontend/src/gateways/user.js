const axios = require('axios');

exports.getUserInfos = (user_id) => {
    return new Promise((resolve, reject) => {
        axios.get(`http://localhost:3000/api/user/${user_id}`)
            .then((user) => {
                console.log(`successfully got user from api`);
                resolve(user.data);
            })
            .catch((error) => {
                console.log(`failed to get user infos`);
                reject(error);
            });
    })
}
exports.updateUser = (data, user_id) => {
    return new Promise((resolve, reject) => {
        axios.put(`http://localhost:3000/api/user/${user_id}`, data)
            .then(() => {
                console.log(`updated user: ${user_id}`);
                resolve();
            })
            .catch((err) => {
                console.log(`failed to update user: ${user_id}`);
                reject(err);
            });
    })
}
exports.deleteUser = (user_id) => {
    return new Promise((resolve, reject) => {
        axios.delete(`http://localhost:3000/api/user/${user_id}`)
            .then(() => {
                console.log(`delete user`);
                resolve();
            })
            .catch((err) => {
                console.log(`failed to delete user`);
                reject(err);
            });
    })
}
exports.getAllCommentsOfUser = (user_id) => {
    return new Promise((resolve, reject) => {
        axios.get(`http://localhost:3000/api/user/comment/${user_id}`)
            .then((res) => {
                console.log(`fot all comments of user: ${user_id}`);
                resolve(res);
            })
            .catch((err) => {
                console.log(`failed to get comments of user: ${user_id}`);
                reject(err);
            });
    })
}