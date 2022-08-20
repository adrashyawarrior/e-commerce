async function index(req, res) {
    try {
        res.send("Users List");
    } catch (error) {
        res.send(error);
    }
}

module.exports = {
    index
}