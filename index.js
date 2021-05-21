var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

//////////////////////////////////////////////
var session = require('express-session')
const MongoStore = require('connect-mongo')
require('dotenv').config()

async function setDbConnection() {
  const mongoose = require('mongoose')
  const databaseAccess = process.env.DATABASE_URI
  process.env.TZ = "Asia/Phnom_Penh"

  if (mongoose.connections[0].readyState) {
    return
  }

  await mongoose.connect(databaseAccess, {
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useNewUrlParser: true
  })

  app.use(session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: databaseAccess })
  }))
}


//mongoose.connect(databaseAccess, {useNewUrlParser: true, useUnifiedTopology: true})
//////////////////////////////////////////////

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//////////////////////////////////////////////
setDbConnection()
//////////////////////////////////////////////

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;