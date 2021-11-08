const Users = require("../users/users-model")

module.exports = async function(req, res, next){
    const user = await Users.getUser(req.body.username)
    if (user) {
        res.status(400).json({message: "Username is already taken. Please use another username." })  
    } else if(!user) {
        req.user = Users.add()
        next()
    }
} 

