var express = require('express');
var app = express();
var pkg = require('./package.json');
var users = require('./src/router/users');
var teams = require('./src/router/teams');
var matches = require('./src/router/matches');
var db = require('./src/db');
var auth = require('./src/router/auth');
var jwt2user = require('./src/middleware').jwt2user;
var config = require('./config');
var bodyParser = require('body-parser');

// gzip
var compression = require('compression');
app.use(compression());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// endpoints
app.get('/', function (req, res) {
  res.send(pkg.name + ' ' + pkg.version);
});

app.get('/current', jwt2user, function (req, res) {
  // console.log("Logged in with", req.user);
  res.json(req.user);
});

// routers
app.use('/auth', auth);
app.use('/users', jwt2user, users);
app.use('/teams', jwt2user, teams);
app.use('/matches', jwt2user, matches);

// handling 404
app.use(function(req, res, next) {
  res.status(404).send('Invalid endpoint');
});

// handle 500 errors
app.use(function(err, req, res, next) {
  console.error(err.stack, err.status, err.message);

  res.status(500).send({
      message: err.message,
      error: err
  });
  // res.status(500).send('Something broke');
});

// start server
app.set('port', process.env.PORT || config.defaultPort);
app.listen(app.get('port'), function () {
  console.log(pkg.name, pkg.version);
  console.log('Listening on port', app.get('port'))
});