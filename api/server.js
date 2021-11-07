const express = require('express');
const path = require('path');
const cors = require('cors');
const helmet = require('helmet');

const restrict = require('./middleware/restricted.js');

const authRouter = require('./auth/auth-router.js');
const jokesRouter = require('./jokes/jokes-router.js');

const server = express();
server.use(express.static(path.join(__dirname, '../client')))

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use('/api/auth', authRouter);
server.use('/api/jokes', restrict, jokesRouter); // only logged-in users should have access!

server.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../client', 'index.html'));
  });
  

module.exports = server;
