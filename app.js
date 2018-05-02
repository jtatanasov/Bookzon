var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var logger = require('morgan');
var mongodb = require('mongodb');
var monk = require('monk');
var db = monk('bookzonproject:bookzon@ds247439.mlab.com:47439/bookzondb');
var sha1 = require('sha1');
var session = require('express-session');
var multer = require('multer');

var usersRouter = require('./routes/users');
var booksRouter = require('./routes/books');
var loginRouter = require('./routes/login');
var registerRouter = require('./routes/register');
var reviewsRouter = require('./routes/reviews');
var cartsRouter = require('./routes/carts');
var ordersRouter = require('./routes/orders');


var storage = multer.diskStorage({
    destination: function (req, file, next) {
        next(null, './public/assets/images/uploads/')
    },
    filename: function (req, file, next) {
        var origName = file.originalname;
        origName = origName.split('.');
        var ext = origName[origName.length - 1];
        next(null, 'bookImage-' + Date.now() + '.' + ext);

    }
});
var upload = multer({ storage: storage });


var app = express();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(upload.any());
app.use(session({
    secret: 'abcd1234',
    resave: true,
    saveUninitialized: true,
}));
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

app.use('/login', loginRouter);
app.use('/register', registerRouter);
app.use('/users', usersRouter);
app.use('/api/books', booksRouter);
app.use('/api/reviews', reviewsRouter);
app.use('/carts', cartsRouter);
app.use('/orders', ordersRouter);
app.use('/logout',  function (req, res, next) {
    req.session.destroy();
    res.status(200);
    res.json({message: 'success'});
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
