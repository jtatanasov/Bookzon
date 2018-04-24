var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongodb = require('mongodb');
var monk = require('monk');
var db = monk('bookzonproject:bookzon@ds247439.mlab.com:47439/bookzondb');
var sha1 = require('sha1');
var session = require('express-session');


// var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var booksRouter = require('./routes/books');
var loginRouter = require('./routes/login');
var registerRouter = require('./routes/register');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({ secret: 'abcd1234' }));
app.use(function (req, res, next) {
    req.db = db;
    next();
});

function checkLogin(req, res, next) {
    if ((req.session) && (req.session.user)) {
        next();
    } else {
        res.status(401);
        res.json({ status: 'not authorized' });
    }
}

// app.use('/', indexRouter);
app.use('/login', loginRouter);
app.use('/register', registerRouter);
app.use('/users', checkLogin, usersRouter);
app.use('/api/books', booksRouter);
app.use('/logout', checkLogin, function (req, res, next) {
    req.session.destroy();
    res.redirect('/login.html');
  });

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
