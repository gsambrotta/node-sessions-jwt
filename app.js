var express = require('express');
const session = require('express-session')
require('dotenv').config()
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var usersJWTRouter = require('./routes/users-jwt');
var usersSessionRouter = require('./routes/users-session');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
    'secret': 'ThisIsMySup3rS3cr3t'
  }))
app.use(express.static(path.join(__dirname, 'public')));

app.use('/users-jwt', usersJWTRouter);
app.use('/users-session', usersSessionRouter);

module.exports = app;
