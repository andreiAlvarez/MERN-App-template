require('dotenv').config();

const cookieParser = require('cookie-parser');
const express = require('express');
const favicon = require('serve-favicon');
const logger = require('morgan');
const path = require('path');
// require all the packages you install
// ... here
const cors = require('cors');

const app = express();

// require database configuration
require('./configs/db.config');

// require CORS (Cross-Origin Resource Sharing)
// ... here
app.use(
  cors({
    origin: [process.env.FRONTEND_POINT],
    credentials: true // this needs set up on the frontend side as well
    //                   in axios "withCredentials: true"
  })
);

// Middleware Setup
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// require session
// ... here
require('./configs/session.config')(app);

// require passport
// ... here
require('./configs/passport/passport.config.js')(app);

app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));

// routes middleware
app.use('/', require('./routes/index.routes'));
app.use('/', require('./routes/author.routes'));
app.use('/', require('./routes/book.routes'));
app.use('/', require('./routes/authentication.routes'));

module.exports = app;
