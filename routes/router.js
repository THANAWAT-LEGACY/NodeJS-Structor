const express = require('express');

const web = require('./web/routes');
const api = require('./api/routes');

const app = express();

app.use('/', web);
app.use('/api', api);

module.exports = app;