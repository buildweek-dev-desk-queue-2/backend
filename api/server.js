const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const authenticate = require('../routes/auth/authenticate-middleware.js');
const authRoute = require('../routes/auth/auth-route');
const ticket = require('../routes/tickets/ticket-route.js');
const feedback = require('../routes/feedback/feedback-route');
const users = require('../routes/users/user-route.js');

const server = express();

server.use(express.json());
server.use(helmet());
server.use(cors());

server.use('/', authRoute);
server.use('/users', authenticate, users);
server.use('/ticket', authenticate, ticket);
server.use('/feedback', authenticate, feedback);

server.get('/', (req, res) => {
    res.status(200).json({message: 'server is running'})
})

module.exports = server;