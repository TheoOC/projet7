const axios = require('axios');

exports.getAllCommentsOfPost = (post_id) => {
    return new Promise((resolve, reject) => {
        axios.get(`http://localhost:3000/api/comment/post/${post_id}`)
            .then((res) => {
                console.log(`got all comments of post: ${post_id}`);
                resolve(res);
            })
            .catch((error) => {
                console.log(`failed to get comments of post: ${post_id}`);
                reject(error);
            });
    })

}

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
};

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
};

exports.updatePost = (data, post_id) => {
    return new Promise((resolve, reject) => {
        axios.put(`http://localhost:3000/api/post/${post_id}`, data)
            .then(() => {
                console.log(`updated post: ${post_id}`);
                resolve();
            })
            .catch((err) => {
                console.log(`failed to update post: ${post_id}`);
                reject(err);
            });
    })
};

exports.deletePost = (post_id) => {
    return new Promise((resolve, reject) => {
        axios.delete(`http://localhost:3000/api/post/${post_id}`)
            .then(() => {
                console.log(`deleted post`);
                resolve();
            })
            .catch((err) => {
                console.log(`failed to delete post`);
                reject(err);
            });
    })
}
