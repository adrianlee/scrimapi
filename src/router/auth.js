/*
 * Auth.js
 */

var express = require('express');
var router = express.Router();
var passport = require('passport');
var SteamStrategy = require('passport-steam').Strategy;
var jwt = require('jsonwebtoken');
var config = require('../../config');

passport.use(new SteamStrategy({
    returnURL: 'http://localhost:3000/auth/steam/return',
    realm: 'http://localhost:3000/',
    apiKey: config.steamApiKey,
    stateless: true
  },
  function(identifier, profile, done) {
    var token = jwt.sign({ id: profile.id }, config.jwtSecret, {
      expiresIn: 60 * 60 * 24 * 7 // in seconds
    });

    return done(null, token);
  }
));

passport.serializeUser(function(user, done) {
  // This should never get called
  console.log('serializeUser');
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  console.log('deserializeUser');
  done(null, obj);
});

router.use(passport.initialize());

router.get('/steam',
  passport.authenticate('steam'),
  function(req, res) {
    // shouldn't be called because of redirect
    res.send('Sign-in via steam failed. Try again.');
  });

router.get('/steam/return',
  passport.authenticate('steam', { failureRedirect: '/' }),
  function(req, res) {
    res.redirect(config.steamRedirect + '/login?token=' + req.user);
  });

module.exports = router;
