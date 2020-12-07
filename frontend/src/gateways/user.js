const axios = require('axios');

exports.getUserInfos = (uid) => {
    return new Promise((resolve, reject) => {
        axios.get(`http://localhost:3000/api/user/${uid}`)
            .then((user) => {
                console.log(`successfully got user from api`);
                resolve(user);
            })
            .catch((error) => {
                console.log(`${error}`);
                reject(error);
            });
    })

}
