//import express
const express = require('express');

//creat server application
const server = express();

//middleware to use json
server.use(express.json());

//global get request
//server.get('/', (req, res) => {
    //res.send('<h2>Welcome to My API.</h2>');
//})

//import account router
const accountsRouter = require('./routers/accountsRouter.js');

//mount accounts router on the server
server.use('/api/accounts', accountsRouter);

//export server
module.exports = server;