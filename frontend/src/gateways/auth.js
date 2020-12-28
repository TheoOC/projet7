const axios = require('axios');

exports.login = (data) => {
    return new Promise((resolve, reject) => {
        axios.post('http://localhost:3000/api/auth/login', data)
            .then(res => {
                console.log(`login request success: ${JSON.stringify(res.data)}`);
                resolve(res.data);
            })
            .catch((error) => {
                console.log(`login request failed`);
                reject(`error trying to login: ${error}`)
            });

    });
};

exports.signup = (data) => {
    return new Promise((resolve, reject) => {
        console.log(data);
        axios.post('http://localhost:3000/api/auth/signup', data)
            .then((res) => {
                console.log("success call to signup api");
                resolve(res);
            })
            .catch((error) => {
                console.log(`error in call to signup api ${error}`);
                reject(error);
            });
    })
}