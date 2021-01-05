const axios = require('axios');

exports.autoAuthVerification = () => {
    return new Promise((resolve, reject) => {
        axios.get('http://localhost:3000/api/auth/autoAuth')
            .then((res) => {
                console.log(`user in autoAuthVerification gateway: ${JSON.stringify(res.data)}`);
                resolve(res.data);
            })
            .catch((error) => {
                console.log(`failed auto login`);
                reject(error);
            });
    })
};

exports.login = (data) => {
    return new Promise((resolve, reject) => {
        axios.post('http://localhost:3000/api/auth/login', data)
            .then(res => {
                console.log(`login request success: ${JSON.stringify(res.data)}`);
                resolve(res.data);
            })
            .catch((error) => {
                console.log(`login request failed: `);
                if (error.response.status == 422) {
                    reject(JSON.stringify(error.response.data.details[0].message));
                }
                reject(error);
            });

    });
};

exports.signup = (data) => {
    return new Promise((resolve, reject) => {
        console.log(data);
        axios.post('http://localhost:3000/api/auth/signup', data)
            .then((res) => {
                console.log("success call to signup api");
                resolve(res.data);
            })
            .catch((error) => {
                console.log(`signup request failed`);
                console.log(` ${JSON.stringify(error.response.data.details[0].message)} `)
                if (error.response.status == 422) {
                    reject(JSON.stringify(error.response.data.details[0].message));
                }
                reject(error);
            });
    })
}