// import modules
const express = require('express');
const helmet = require('helmet');

// create server object
const server = express();

// import routers
const actionsRouter = require('./routers/actionsRouter.js');
const projectsRouter = require('./routers/projectsRouter.js');

// register global middleware
server.use(helmet());
server.use(express.json());

// Bind to Root URLs
server.use('/api/actions', actionsRouter);
server.use('api/projects', projectsRouter);


// Call handler for root "/"
server.get('/', (req, res) => {
    res
    .status(418)
    .send("I'm a teapot!");
});


// export server
module.exports = server;