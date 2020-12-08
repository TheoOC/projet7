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
