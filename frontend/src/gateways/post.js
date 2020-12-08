const axios = require('axios');

exports.getPost = (post_id) => {
    return new Promise((resolve, reject) => {
        axios.get(`http://localhost:3000/api/post/${post_id}`)
            .then((post) => {
                console.log(`successfully got post from api:${JSON.stringify(post.data)} `);
                resolve(post.data);

            })
            .catch((error) => {
                console.log(`failed to get post from api`)
                reject(error)
            });
    })
}

exports.createPost = (data) => {
    return new Promise((resolve, reject) => {
        axios.post('http://localhost:3000/api/post', data)
            .then((res) => {
                console.log(`created post: ${res}`);
                resolve();
            })
            .catch((error) => {
                console.log(`there was an error creating the post ${error}`);
                reject(error);
            })
    })
};

exports.getAllPosts = () => {
    return new Promise((resolve, reject) => {
        axios.get('http://localhost:3000/api/post')
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
