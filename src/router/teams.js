/*
 * Teams.js
 */

var express = require('express');
var router = express.Router();

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
});

// List all teams
router.get('/', function(req, res) {
  res.send('GET teams');
});

// Create new team
router.post('/', function(req, res) {
  res.send('POST teams');
});

// Get team by id
router.get('/:teamid', function(req, res) {
  res.send('DEL teams');
});

// Update existing team
router.put('/:teamid', function(req, res) {
  res.send('PUT teams');
});

// Delete existing team
router.delete('/:teamid', function(req, res) {
  res.send('DEL teams');
});

module.exports = router;