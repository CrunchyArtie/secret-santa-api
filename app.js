const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const sassMiddleware = require('node-sass-middleware');
const cors = require('cors');
const sessions = require('express-session');

// Web routers
const indexRouter = require('./routes/web/index');
const authRouter = require('./routes/web/auth');
const webUsersRouter = require('./routes/web/users');
const configRouter = require('./routes/web/config');

// Api routers
const limitDateRouter = require('./routes/api/limit-date');
const luckyFriendRouter = require('./routes/api/lucky-friend');
const apiUsersRouter = require('./routes/api/users');
const maintenanceRouter = require('./routes/api/maintenance');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(sassMiddleware({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: true, // true = .sass and false = .scss
  sourceMap: true
}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

// session middleware
app.use(sessions({
  secret: process.env.SESSION_SECRET,
  saveUninitialized:true,
  cookie: { maxAge: 1000 * 60 * 60 * 24 }, // One day
  resave: false
}));

// Check login middleware
app.use((req, res, next) => {
    res.locals.token = req?.session?.token;
    next();
});

// Setup routing
app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use('/users', webUsersRouter);
app.use('/config', configRouter);
app.use('/api/users', apiUsersRouter);
app.use('/api/limit-date', limitDateRouter);
app.use('/api/lucky-friend', luckyFriendRouter);
app.use('/api/maintenance', maintenanceRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('page-error');
});

module.exports = app;
