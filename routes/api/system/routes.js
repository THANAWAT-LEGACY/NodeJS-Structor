const express = require('express');
const app = express();

const logs = require('./logs/routes');
const master = require('./master/routes');

app.use('/logs', logs);
app.use('/master', master);


module.exports = app;