var express = require('express');
var app = express();
var pkg = require('./package.json');
var users = require('./src/router/users');
var teams = require('./src/router/teams');
var matches = require('./src/router/matches');
var db = require('./src/db');
var auth = require('./src/auth');
var compression = require('compression');
app.use(compression());

app.set('port', process.env.PORT || 3000);

app.get('/', function (req, res) {
  res.send(pkg.name + ' ' + pkg.version);
});

var passport = require('passport');
app.use(passport.initialize());

app.use('/auth', auth);
app.use('/users', users);
app.use('/teams', teams);
app.use('/matches', matches);


// handling 404 errors
app.use(function(err, req, res, next) {
  if (err.status !== 404) {
    return next();
  }
 
  res.send(err.message || '** no unicorns here **');
});

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {

  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: err
    });
  });

} else {
  // production error handler
  // no stacktraces leaked to user
  app.use(function(err, req, res, next) {
      res.status(err.status || 500);
      res.render('error', {
          message: err.message,
          error: {}
      });
  });
}

app.listen(app.get('port'), function () {
  console.log(pkg.name, pkg.version);
  console.log('Listening on port', app.get('port'))
});