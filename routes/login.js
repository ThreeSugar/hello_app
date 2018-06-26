var express = require('express');
var router = express.Router();
var User = require('../models/users');

var bcrypt = require('bcrypt');

var passport  = require('passport');
var LocalStrategy = require('passport-local').Strategy;


passport.use(new LocalStrategy(function(username, pass, cb){
  User.findOne({
    where: {
      username: username
    }
  }).then(function(user, err){
    if (err) { return cb(err); }
    if (!user) { return cb(null, false)}
    if (!bcrypt.compareSync(pass, user.password)){ 
      return cb(null, false)}
    return cb(null, user);
  })
}))

passport.serializeUser(function(user, cb) {
  cb(null, user.id);
});

passport.deserializeUser(function(id, cb) {
  User.findById(id).then(function(user){
    cb(null, user);
  });
});


router.get('/', function(req, res, next) {
  res.render('login', {failure_message: req.flash('error')});
});

router.post("/", passport.authenticate('local', { 
  failureRedirect: '/login',
  successRedirect: '/',
  failureFlash: 'Username or Password is incorrect!'
}))

module.exports = router;