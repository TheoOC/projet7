const axios = require('axios');

exports.createComment = (data) => {
    return new Promise((resolve, reject) => {
        axios.post(`http://localhost:3000/api/comment`, data)
            .then((res) => {
                console.log(`created comment: ${res}`);
                resolve()
            })
            .catch((error) => {
                console.log(`failed to create comment: ${error}`);
                reject(error);
            });
    })
}
exports.updateComment = () => {

}
exports.deleteComment = () => {

}