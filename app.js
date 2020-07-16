const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const cors = require('cors')
const env = require('dotenv')

// const indexRouter = require('./routes/index');
// const apiRouter = require('./routes/api/routes');
const routes = require('./routes/router');
const bodyParser = require('body-parser');
const compression = require('compression');
const helmet = require('helmet');

const app = express();

// load env
env.config();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// middleware
app.use(compression())
app.use(bodyParser.json({ limit: '50mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }))
app.use(morgan('dev'));
app.use(cors({
    origin: "*",
    methods: "GET,POST,DELETE,PUT,PATCH",
}));
app.use(helmet());
app.use(cookieParser());


app.use('/', routes)

module.exports = app;
