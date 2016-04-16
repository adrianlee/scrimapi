/*
 * Users.js
 */

var express = require('express');
var router = express.Router();
var db = require('../db');

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
});

// List all users
router.get('/', function(req, res) {
  res.send('GET users');
});

// Create new user
router.post('/', function(req, res) {
  res.send('POST users');
});

// Get user by id
router.get('/:userid', function(req, res) {
  res.send('GET user ' + req.param('userid'));
});

// Update existing user
router.put('/:userid', function(req, res) {
  res.send('PUT users');
});

// Delete existing user
router.delete('/:userid', function(req, res) {
  res.send('DEL users');
});

module.exports = router;