const express = require('express');

const system = require('./system/routes');

const app = express();


app.use('/system',system);


module.exports = app;