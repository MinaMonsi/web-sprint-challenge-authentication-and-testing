const db = require('../../data/dbConfig.js')

module.exports = {
    add, 
    getUser,
    findByUsername,
}

async function add(user)  {
    const [id] = await db('users').insert(user);
    return db('users').where({id}).first();
}

function getUser(username){
    return db('users').where({username}).first();
}

function findByUsername(username){
    return db("users")
        .select("*").where("username", username).first()
}
