const Users = require("../users/users-model")

module.exports = async function(req, res, next){
    const user = await Users.getUser(req.body.username)
    if (!user) {
        res.status(400).json({message:'Unknown user'})
    } else {
        req.user = user
        next()
    }
}