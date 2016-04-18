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
    // asynchronous verification, for effect...
    process.nextTick(function () {
      var token = jwt.sign({ id: profile.id }, config.jwtSecret, {
        expiresIn: 60 * 60 * 24 * 7 // in seconds
      });

      return done(null, token);
    });
  }
));

passport.serializeUser(function(user, done) {
  // console.log('serialize', user);
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  console.log('deserialize')
  done(null, obj);
});

router.use(passport.initialize());

// router.use(function (req, res, next) {
//   next();
// });

router.get('/steam',
  passport.authenticate('steam'),
  function(req, res) {
    // shouldn't be called because of redirect
    res.redirect('/');
  });

router.get('/steam/return',
  passport.authenticate('steam', { failureRedirect: '/' }),
  function(req, res) {
    // console.log(req.user);
    res.redirect(config.steamRedirect + '/login?token=' + req.user);
  });

module.exports = router;