async function index(req, res) {
    try {
        res.send(res.locals.AuthUser);
    } catch (error) {
        res.send(error);
    }
}

module.exports = {
    index
}