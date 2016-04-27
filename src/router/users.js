/*
 * Users.js
 */

var express = require('express');
var router = express.Router();
var db = require('../db');

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
  // console.log('Time: ', Date.now());
  next();
});

// List all users
router.get('/', function(req, res) {
  db.User
    .fetchAll()
    .then(function (user) {
      res.json(user.toJSON());
    }).catch(function(err) {
      console.error(err);
      res.sendStatus(500);
    });
});

// Count of all users
router.get('/count', function(req, res) {
  db.User
    .count("id")
    .then(function (count) {
      res.send(count);
    }).catch(function(err) {
      console.error(err);
      res.sendStatus(500);
    });
});

// Create new user
router.post('/', function(req, res) {
  var model = new db.User({
      email: req.body.email,
      alias: req.body.alias,
      steamid: req.body.steamid,
      steamid64: req.body.steamid64,
      avatar: req.body.avatar
    })
    .save()
    .then(function(user) {
      console.log(user && user.toJSON());
      res.status(204).send(JSON.stringify(model));
    })
    // Catching constrain errors - https://github.com/tgriesser/knex/issues/272
    .catch(isUniqueConstraintError, function(err) {
      console.log('isUniqueConstraintError', err);
      res.status(400).send(err);
    })
    .catch(function(err) {
      console.error(err);
      res.sendStatus(400);
    });
});

// Get user by id
router.get('/:userid', function(req, res) {
  new db.User({ "id": req.params.userid })
    .fetch()
    .then(function (user) {
      if (!user) return res.sendStatus(404);
      res.json(user.toJSON());
    })
    .catch(function(err) {
      console.error(err);
      res.sendStatus(500);
    });
});

// Update existing user
router.put('/:userid', function(req, res) {
  console.log('PUT users');

  if (!req.body) {
    return res.sendStatus(400);
  }

  new db.User({ "id": req.params.userid })
    .save(req.body, { patch: true })
    .then(function (user) {
      if (!user) return res.sendStatus(404);
      res.sendStatus(200);
    })
    .catch(function(err) {
      console.error(err);
      res.sendStatus(500);
    });
});

// Delete existing user
router.delete('/:userid', function(req, res) {
  new db.User({ "id": req.params.userid })
    .destroy({ require: true })
    .then(function (user) {
      console.log(user);
      if (!user) return res.sendStatus(404);
      res.json(user.toJSON());
    })
    .catch(db.User.NoRowsDeletedError, function () {
      res.sendStatus(404);
    })
    .catch(function(err) {
      console.error(err);
      res.sendStatus(500);
    });
});

function isUniqueConstraintError(err) {
    if (!err) return false;
    var re = /^duplicate key value violates unique constraint/;
    return re.test(err.message);
}

module.exports = router;
