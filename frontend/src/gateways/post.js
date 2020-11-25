const axios = require('axios');

exports.getAllPosts = function () {
    return new Promise((resolve, reject) => {
        axios.get('http://localhost:3000/api/post/')
            .then((res) => {
                console.log("got all posts from api");
                resolve(res);
            })
            .catch((error) => {
                console.log(`failed to get all post from api ${error}`);
                reject(error);
            });
    })
}

exports.createPost = function(data){
    return new Promise((resolve,reject)=>{
        axios.post('http://localhost:3000/api/post/',data)
        .then(()=>{
            resolve('created post');
        })
        .catch((error)=>{
            console.log(`there was an error creating the post ${error}`);
            reject(error);
        })
    })
}