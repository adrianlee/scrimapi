/*
 * Teams.js
 */

var express = require('express');
var router = express.Router();
var db = require('../db');

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
});

// List all teams
router.get('/', function(req, res) {
  db.Team
    .fetchAll()
    .then(function (teams) {
      res.json(teams.toJSON());
    }).catch(function(err) {
      console.log(err);
      res.sendStatus(500);
    });
});

// Create new team
router.post('/', function(req, res) {
  res.send('POST teams');
});

// Get team by id
router.get('/:teamid', function(req, res) {
  new db.Team({ "id": req.params.teamid })
    .fetch()
    .then(function (team) {
      if (!team) return res.sendStatus(404);
      res.json(team.toJSON());
    })
    .catch(function(err) {
      console.log(err);
      res.sendStatus(500);
    });
});

// Update existing team
router.put('/:teamid', function(req, res) {
    console.log('PUT users');

  if (!req.body) {
    return res.sendStatus(400);
  }

  new db.User({ "id": req.params.teamid })
    .save(req.body, { patch: true })
    .then(function (team) {
      if (!team) return res.sendStatus(404);
      res.sendStatus(200);
    })
    .catch(function(err) {
      console.log(err);
      res.sendStatus(500);
    });
});

// Delete existing team
router.delete('/:teamid', function(req, res) {
  res.send('DEL teams');
});

module.exports = router;
