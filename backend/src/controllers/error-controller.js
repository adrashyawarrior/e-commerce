async function notFound(req, res) {
    try {
        res.send("Oops! Page Not Found.");
    } catch (error) {
        res.send(error);
    }
}

function successResponse(message, data) {
    return {
        success: true,
        message: message,
        data: data
    };
}

function errorResponse(error) {
    return {
        success: false,
        message: "Something went wrong.",
        data: error
    };
}

module.exports = {
    notFound,
    successResponse,
    errorResponse
}