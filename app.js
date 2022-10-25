let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
// Helmet & body parser
const helmet = require("helmet");
const bodyParser = require('body-parser');

// Deploy Heroku - uncomment path for normal use
//let indexRouter = require('./routes/index');
let usersRouter = require('./routes/users');
let registerRouter = require('./routes/register');
let loginRouter = require('./routes/login');
let verifyUserPasswordsPageRouter = require('./routes/verifyUser');
let passwordRouter = require('./routes/password');

let app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
//app.use(express.static(path.join(__dirname, 'public')));

// imported
app.use(helmet());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// Deploy Heroku - uncomment path for normal use
//app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/register', registerRouter);
app.use('/login', loginRouter);
app.use('/verifypasswordspage', verifyUserPasswordsPageRouter);
app.use('/password', passwordRouter);

// Heroku production
if (process.env.NODE_ENV === "production") {
  app.use(express.static("frontend/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
  });
}

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
