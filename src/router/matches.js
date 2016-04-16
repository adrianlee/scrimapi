/*
 * Matches.js
 */

var express = require('express');
var router = express.Router();

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
});

// List all matches
router.get('/', function(req, res) {
  res.send('GET matches');
});

// Create new match
router.post('/', function(req, res) {
  res.send('POST matches');
});

// Get match by id
router.get('/:matchid', function(req, res) {
  res.send('DEL matches');
});

// Update existing match
router.put('/:matchid', function(req, res) {
  res.send('PUT matches');
});

// Delete existing match
router.delete('/:matchid', function(req, res) {
  res.send('DEL matches');
});

module.exports = router;