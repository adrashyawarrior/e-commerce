function validationError(error) {
    return {
        success: false,
        message: error.details[0].message,
        error: "Invalid data provided!"
    };
}

module.exports = validationError;