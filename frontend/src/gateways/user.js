const axios = require('axios');

exports.getUserInfos = () => {
    return new Promise((resolve, reject) => {
        axios.get('http://localhost:3000/api/user')
            .then(() => {

            })
            .catch(() => {

            });
    })
}