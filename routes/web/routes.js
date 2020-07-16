const express = require('express');

const welcome = require('./index');


const app = express();

app.use('/', welcome);

module.exports = app;