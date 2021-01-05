const axios = require('axios');

exports.getComment = (comment_id) => {
    return new Promise((resolve, reject) => {
        axios.get(`http://localhost:3000/api/comment/${comment_id}`)
            .then((comment) => {
                console.log(`successfully got comment from api:${JSON.stringify(comment.data)} `);
                resolve(comment.data);

            })
            .catch((error) => {
                console.log(`failed to get comment from api`)
                reject(error)
            });
    })
}

exports.createComment = (data) => {
    return new Promise((resolve, reject) => {
        axios.post(`http://localhost:3000/api/comment`, data)
            .then((res) => {
                console.log(`created comment: ${res}`);
                resolve()
            })
            .catch((error) => {
                console.log(`create comment request failed: `);
                if (error.response.status == 422) {
                    reject(JSON.stringify(error.response.data.details[0].message));
                }
                reject(error);
            });
    })
}

exports.updateComment = (data, comment_id) => {
    return new Promise((resolve, reject) => {
        axios.put(`http://localhost:3000/api/comment/${comment_id}`, data)
            .then(() => {
                console.log(`updated comment: ${comment_id}`);
                resolve();
            })
            .catch((error) => {
                console.log(`update comment request failed: `);
                if (error.response.status == 422) {
                    reject(JSON.stringify(error.response.data.details[0].message));
                }
                reject(error);
            });
    })
}

exports.deleteComment = (comment_id) => {
    return new Promise((resolve, reject) => {
        axios.delete(`http://localhost:3000/api/comment/${comment_id}`)
            .then(() => {
                console.log(`deleted comment`);
                resolve();
            })
            .catch((err) => {
                console.log(`failed to delete comment`);
                reject(err);
            });
    })
}