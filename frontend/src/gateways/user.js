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
exports.updateUser = (username, user_id) => {
    return new Promise((resolve, reject) => {
        axios.put(`http://localhost:3000/api/user/${user_id}`, username)
            .then(() => {
                console.log(`updated user: ${user_id}`);
                resolve();
            })
            .catch((error) => {
                console.log(`update user request failed: `);
                if (error.response.status == 422) {
                    reject(JSON.stringify(error.response.data.details[0].message));
                }
                reject(error);
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
        axios.get(`http://localhost:3000/api/comment/user/${user_id}`)
            .then((res) => {
                console.log(`got all comments of user: ${user_id}`);
                resolve(res);
            })
            .catch((err) => {
                console.log(`failed to get comments of user: ${user_id}`);
                reject(err);
            });
    })
}
exports.getAllPostsOfUser = (user_id) => {
    return new Promise((resolve, reject) => {
        axios.get(`http://localhost:3000/api/post/user/${user_id}`)
            .then((res) => {
                console.log(`got all posts of user: ${user_id}`);
                resolve(res);
            })
            .catch((err) => {
                console.log(`failed to get posts of user: ${user_id}`);
                reject(err);
            });
    })
}
exports.getAllUsers = () => {
    return new Promise((resolve, reject) => {
        console.log(`in get all users`);
        axios.get(`http://localhost:3000/api/user`)
            .then((res) => {
                console.log(`got all users: ${res}`);
                resolve(res);
            })
            .catch((err) => {
                console.log(`failed to get all users`);
                reject(err);
            });
    })
}