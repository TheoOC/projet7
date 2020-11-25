const axios = require('axios');

exports.login = () => {
    return new Promise((resolve, reject) => {
        axios.get('http://localhost:3000/api/auth/login')
            .then(res => { console.log(res) })
            .catch(() => reject('there was an error'));

    })
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