const validationError = require("../../responses/validation-error");

const schema = Joi.object({
    name: Joi.string().required(),
    title: Joi.string().required(),
    group: Joi.string().required(),
    permissions: Joi.array()
});

async function RoleStoreRequest(req, res, next) {
    try {
        await schema.validateAsync(req.body);
        next();
    } catch (error) {
        res.status(400).send(validationError(error));
    }
}

module.exports = RoleStoreRequest;