const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require("mongoose");
require('dotenv').config();

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(require('./routes'));

/*// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});*/

// error handler
/*const errorHandler = (err, req, res, next) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    
    // render the error page
    res.status(err.status || 500);
    res.render('error');
}

app.use(errorHandler);*/


mongoose.connect(process.env.MONGODB_URL)
    .then(() => {
        console.log('Connected to MongoDB')
    })
    .catch(err => {
        console.log('Error connecting to MongoDB', err)
    })
module.exports = app;
