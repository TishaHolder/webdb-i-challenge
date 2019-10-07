//import express
const express = require('express');

//import server
const server = require('./server.js');

//set up dynamic port
const PORT = process.env.PORT || 6000;

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});