async function notFound(req, res) {
    try {
        res.send("Oops! Page Not Found.");
    } catch (error) {
        res.send(error);
    }
}

module.exports = {
    notFound
}