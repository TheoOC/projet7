const axios = require('axios');

exports.getAllCommentsOfPost = (post_id) => {
    return new Promise((resolve, reject) => {
        axios.get(`http://${process.env.VUE_APP_API_HOST}:${process.env.VUE_APP_API_PORT}/api/comment/post/${post_id}`)
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
        axios.get(`http://${process.env.VUE_APP_API_HOST}:${process.env.VUE_APP_API_PORT}/api/post/${post_id}`)
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

exports.getAllPosts = () => {
    return new Promise((resolve, reject) => {
        axios.get(`http://${process.env.VUE_APP_API_HOST}:${process.env.VUE_APP_API_PORT}/api/post`)
            .then((res) => {
                console.log("got all posts from api");
                resolve(res);
            })
            .catch((error) => {
                console.log(`failed to get all post from api ${error}`);
                reject(error);
            });
    });
};

exports.createPost = (post, image) => {
    return new Promise((resolve, reject) => {
        const formData = new FormData();
        formData.append('post', JSON.stringify(post));
        formData.append('image', image);
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        };
        axios.post(`http://${process.env.VUE_APP_API_HOST}:${process.env.VUE_APP_API_PORT}/api/post`, formData, config)
            .then((res) => {
                console.log(`response: ${res}`);
                console.log(`created post: ${JSON.stringify(res.data)}`);
                resolve();
            })
            .catch((error) => {
                console.log(`create post request failed: `);
                if (error.response.status == 422) {
                    reject(JSON.stringify(error.response.data.details[0].message));
                }
                reject(error);
            })
    });
};

exports.updatePost = (post, image, post_id) => {
    return new Promise((resolve, reject) => {
        const formData = new FormData()
        formData.append('post', JSON.stringify(post));
        formData.append('image', image);
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        };
        axios.put(`http://${process.env.VUE_APP_API_HOST}:${process.env.VUE_APP_API_PORT}/api/post/${post_id}`, formData, config)
            .then(() => {
                console.log(`updated post: ${post_id}`);
                resolve();
            })
            .catch((error) => {
                console.log(`update post request failed: `);
                if (error.response.status == 422) {
                    reject(JSON.stringify(error.response.data.details[0].message));
                }
                reject(error);
            });
    })
};

exports.deletePost = (post_id) => {
    return new Promise((resolve, reject) => {
        axios.delete(`http://${process.env.VUE_APP_API_HOST}:${process.env.VUE_APP_API_PORT}/api/post/${post_id}`)
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
