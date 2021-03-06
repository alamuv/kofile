// import express from 'express';
const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');

const app = express();
app.use(bodyParser.json());

const port = process.env.PORT || 8000;

// prefix routes with api
app.use('/orders', routes);

// start the server
/* eslint-disable no-console */
app.listen(port, () => {
  console.log('Kofile API listening on ' + port);
});

module.exports = app;