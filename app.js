const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const logger = require("morgan");
const request = require("request");
const twig = require('twig');
const router = require('./routes/index');
const webhookRouter = require("./routes/webhook.js");
const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
app.engine('html', twig.__express);
app.set('port', (process.env.PORT || 5000));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(logger("dev"));

app.use('^/', router);
app.use('^/webhook', webhookRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error', {error : err});
});

app.listen(app.get('port'));