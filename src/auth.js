/*
 * Auth.js
 */

var express = require('express');
var router = express.Router();
var passport = require('passport');
var SteamStrategy = require('passport-steam').Strategy;

passport.use(new SteamStrategy({
    returnURL: 'http://localhost:3000/auth/steam/return',
    realm: 'http://localhost:3000/',
    apiKey: '20087C97D27C353C48D3EB5CBF8F7B19',
    stateless: true
  },
  function(identifier, profile, done) {
    // asynchronous verification, for effect...
    process.nextTick(function () {
      // To keep the example simple, the user's Steam profile is returned to
      // represent the logged-in user.  In a typical application, you would want
      // to associate the Steam account with a user record in your database,
      // and return that user instead.
      profile.identifier = identifier;
      return done(null, profile);
    });
  }
));

passport.serializeUser(function(user, done) {
  console.log('serialize', user);
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  console.log('deserialize')
  done(null, obj);
});

router.use(function (req, res, next) {
  console.log(req.originalUrl);
  next();
});

router.get('/steam',
  passport.authenticate('steam'),
  function(req, res) {
    // shouldn't be called because of redirect
    res.redirect('/');
  });

router.get('/steam/return',
  passport.authenticate('steam', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
  });

module.exports = router;