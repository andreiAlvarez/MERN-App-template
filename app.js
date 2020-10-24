require('dotenv').config();

const cookieParser = require('cookie-parser');
const express = require('express');
const favicon = require('serve-favicon');
const logger = require('morgan');
const path = require('path');
// require all the packages you install
// ... here

const app = express();

// require database configuration
require('./configs/db.config');

// require CORS (Cross-Origin Resource Sharing)
// ... here

// Middleware Setup
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// require session
// ... here

// require passport
// ... here

app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));

// routes middleware
app.use('/', require('./routes/index.routes'));

module.exports = app;
