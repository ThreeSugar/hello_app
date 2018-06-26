var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');
var salt = bcrypt.genSaltSync(10);
var User = require('../models/users');

var passport  = require('passport');
var LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy(function(username, pass, cb){
  User.findOne({
    where: {
      username: username
    }
  }).then(function(user, err){
    if (err) { return cb(err); }
    if (!user) { 
    return cb(null, false); }
    if (!bcrypt.compareSync(pass, user.password)){ 
      return cb(null, false); }
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
  res.render('signup', { title: 'Express' });
});

router.post("/", function(req, res, next){
  var email = req.body.email;
	var username = req.body.username;
	var password = req.body.password;
	var password2 = req.body.password2;

	// Validation
	req.checkBody('email', 'Email is required').notEmpty();
	req.checkBody('email', 'Email is not valid').isEmail();
	req.checkBody('username', 'Username is required').notEmpty();
	req.checkBody('password', 'Password is required').notEmpty();
  req.checkBody('password1', 'Passwords do not match').equals(req.body.password);

  var errors = req.validationErrors();
  
  if(errors) {
    console.log(errors);
		res.render('signup', {
			errors:errors
		});
  } else {
      User.findOne({
        where: {
        username: req.body.username
        }
      }).then(function(user){
        if(!user){
          User.create({
            username: req.body.username,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, salt)
          }).then(function(user){
            passport.authenticate("local", {failureRedirect:"/signup", successRedirect: "/"})(req, res, next)
          }).catch(function(err){
            res.redirect('/signup', 200, {message:'Email or Username already taken!'}); //will have error if no 200.
          })
        } else {
          res.render('signup', {message:'Email or Username already taken!'});
        }
      })
    }
  });

module.exports = router;