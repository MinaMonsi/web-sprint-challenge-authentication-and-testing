const router = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const dbConfig = require('../../data/dbConfig');
const {jwtSecret} = require('../../data/dbConfig')
const Users = require('../users/users-model')
const usernameExists = require('../middleware/usernameExists')
const uniqueUsername = require('../middleware/uniqueUsername')
const checkLogin = require('../middleware/checkLogin')

const secret = process.env.SECRET || "adkljffkjh,kjsdhfakjd;" 

function makeToken(user){
  const payload = {
    subject:user.id,
    username:user.username
  }
  const options = {
    expiresIn: "1d"
  }
  return jwt.sign(payload, secret, options)

}

router.post('/register', uniqueUsername, checkLogin, async (req, res) => {
  try {
    const {username, password} = req.body
    const newUser = await Users.add({
      username, 
      password: bcrypt.hashSync(password, 8),
    })
    res.status(201).json(newUser)
    
  } catch (error) {
    res.status(500).json({message: error.message})
  }
  
  /*
    IMPLEMENT
    You are welcome to build additional middlewares to help with the endpoint's functionality.
    DO NOT EXCEED 2^8 ROUNDS OF HASHING!

    1- In order to register a new account the client must provide `username` and `password`:
      {
        "username": "Captain Marvel", // must not exist already in the `users` table
        "password": "foobar"          // needs to be hashed before it's saved
      }

    2- On SUCCESSFUL registration,
      the response body should have `id`, `username` and `password`:
      {
        "id": 1,
        "username": "Captain Marvel",
        "password": "2a$08$jG.wIGR2S4hxuyWNcBf9MuoC4y0dNy7qC/LbmtuFBSdIhWks2LhpG"
      }

    3- On FAILED registration due to `username` or `password` missing from the request body,
      the response body should include a string exactly as follows: "username and password required".

    4- On FAILED registration due to the `username` being taken,
      the response body should include a string exactly as follows: "username taken".
  */
});

router.post('/login', usernameExists, async(req, res, next ) => {
  try {
    const {username, password} = req.body
    if (bcrypt.compareSync(password,req.user.password)) {
      res.status(200).json({message: `Welcome, ${req.user.username}`, token: makeToken(req.user)})
    } else {
      res.status(401).json({message: "Invalid credentials"})
    }

  } catch (error) {
    res.status(500).json({message: error.message })
  }
  /*
    IMPLEMENT
    You are welcome to build additional middlewares to help with the endpoint's functionality.

    1- In order to log into an existing account the client must provide `username` and `password`:
      {
        "username": "Captain Marvel",
        "password": "foobar"
      }

    2- On SUCCESSFUL login,
      the response body should have `message` and `token`:
      {
        "message": "welcome, Captain Marvel",
        "token": "eyJhbGciOiJIUzI ... ETC ... vUPjZYDSa46Nwz8"
      }

    3- On FAILED login due to `username` or `password` missing from the request body,
      the response body should include a string exactly as follows: "username and password required".

    4- On FAILED login due to `username` not existing in the db, or `password` being incorrect,
      the response body should include a string exactly as follows: "invalid credentials".
  */
});

module.exports = router;
