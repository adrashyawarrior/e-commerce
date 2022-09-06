function IncorrectDataError(message, error = "Wrong data provided!") {
    return {
        success: false,
        message: message,
        error: error
    };
}

module.exports = IncorrectDataError;