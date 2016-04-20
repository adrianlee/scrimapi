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
      console.log(err);
      res.status(400);
    });
});

// Count of all users
router.get('/count', function(req, res) {
  db.User
    .count("id")
    .then(function (count) {
      res.send(count);
    }).catch(function(err) {
      console.log(err);
      res.status(400);
    });
});

// Create new user
router.post('/', function(req, res) {
  res.send('POST users');
});

// Get user by id
router.get('/:userid', function(req, res) {
  new db.User({ "id": req.params.userid })
    .fetch()
    .then(function (user) {
      if (!user) return res.sendStatus(404);
      res.json(user.toJSON());
    }).catch(function(err) {
      console.log(err);
      res.sendStatus(400);
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
      res.json(user.toJSON());
    }).catch(function(err) {
      console.log(err);
      res.sendStatus(400);
    });
});

// Delete existing user
router.delete('/:userid', function(req, res) {
  res.send('DEL users');
});

module.exports = router;