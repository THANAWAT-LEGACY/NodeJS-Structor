const express = require('express');
const app = express();

const products = require('./productsRouter');
const users = require('./usersRouter');

app.use('/users',users);


module.exports = app;