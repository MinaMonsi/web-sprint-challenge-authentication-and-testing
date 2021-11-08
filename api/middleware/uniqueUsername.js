const Users = require("../users/users-model")

module.exports = async function(req, res, next){
    const user = await Users.getUser(req.body.username)
    if (user) {
        res.status(400).json({message: "Select another username." })  
    } else if(!user) {
        req.user = Users.add()
        next()
    }
} 
//talk to db
//take username from req.body 
//use the getUser model function
//if there's a user by that name return error message
//if not else next

//apply it the reistartion route
//test it and register a new user
