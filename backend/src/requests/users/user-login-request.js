const Joi = require('joi');
const validationError = require('../../responses/validation-error');

const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
});

async function UserLoginRequest(req, res, next) {
    try {
        await schema.validateAsync(req.body);
        next();
    } catch (error) {
        res.status(400).send(validationError(error));
    }
}

module.exports = UserLoginRequest;