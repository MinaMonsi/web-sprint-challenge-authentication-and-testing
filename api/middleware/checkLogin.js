module.exports = function(req, res, next){
    const username = req.body.username;
    const password = req.body.password;
    if (!username || !password) {
        return res.status(400).json(
            "username and password required"
        )
    } else {
        next()
    }
}

