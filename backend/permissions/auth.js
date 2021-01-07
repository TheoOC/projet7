const Joi = require('joi');


function validateSignInput(req) {
    return new Promise((resolve, reject) => {
        //trim input
        req.body.email = req.body.email.trim()
        req.body.username = req.body.username.trim()
        req.body.password = req.body.password.trim()
        const user = {
            email: req.body.email,
            username: req.body.username,
            password: req.body.password
        };
        console.log(`validate signup input : ${JSON.stringify(user)}`);

        const schema = Joi.object({
            email: Joi.string()
                .required()
                .email({ minDomainSegments: 2, tlds: true }),
            username: Joi.string()
                .required()
                .min(3)
                .max(30)
                .pattern(new RegExp(/^[^\s].+[^\s]$/)),
            password: Joi.string()
                .required()
                .min(4)
                .max(30)
                .pattern(new RegExp(/^[^\s][^\s]+[^\s]$/)),
        })
        const { error, value } = schema.validate({
            email: user.email,
            username: user.username,
            password: user.password
        });

        if (Joi.isError(error)) {
            reject(error);
        }
        resolve();
    })
}

function validateLogInput(req) {
    return new Promise((resolve, reject) => {
        //trim input
        req.body.email = req.body.email.trim()
        req.body.username = req.body.username.trim()
        req.body.password = req.body.password.trim()
        const user = {
            email: req.body.email,
            username: req.body.username,
            password: req.body.password
        };
        console.log(`validate login input: ${JSON.stringify(user)}`);

        const schema = Joi.object({
            email: Joi.string()
                .email({ minDomainSegments: 2, tlds: true }),
            username: Joi.string()
                .min(3)
                .max(30)
                .pattern(new RegExp(/^[^\s].+[^\s]$/)),
            password: Joi.string()
                .required()
                .min(4)
                .max(30)
                .pattern(new RegExp(/^[^\s][^\s]+[^\s]$/)),
        })
            //use xor because one of the keys is required but both at the same time is not authorized
            .xor('email', 'username');
        //if there is an email validate the schema
        if (user.email != "") {
            //check if error is a validation error
            const { error, value } = schema.validate({ email: user.email, password: user.password });
            //if input is invalid error will be assigned a ValidationError
            if (Joi.isError(error)) {
                reject(error);
            }
        }
        //else if there is a username do the same
        else if (user.username != "") {
            const { error, value } = schema.validate({ username: user.username, password: user.password });
            //if input is invalid error will be assigned a ValidationError
            if (Joi.isError(error)) {
                reject(error);
            }
        }
        //else reject and send error msg wich ask for an email or username
        else {
            reject(`you need to enter some input`);
        }

        //else continue
        resolve();
    })
}
module.exports = {
    validateLogInput,
    validateSignInput
}