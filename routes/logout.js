var express = require('express');
var router = express.Router();

router.get('/', function(req, res){
	if(req.isAuthenticated()){
		req.logout();
		req.flash('logout', 'Successfully logged out!');
		res.redirect('/login');
	} else {
		res.redirect('/login')
	}
});

module.exports = router;