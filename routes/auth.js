let express		= require('express');
let router		= express.Router({mergeParams: true});
let passport	= require('passport');
let User		= require('../models/user');

// **************************
// **** USER AUTH ROUTES ****
// **************************

router.get("/register", function(req, res){
	res.render('register');	
});

router.post("/register", function(req, res){
	let newUser = new User({username: req.body.username, email: req.body.email}); 
	User.register( newUser, req.body.password, function(err, user){
		if(err){
			console.log("ERROR @ Creating New User !");
			return res.render('register');
		}
		console.log("SUCCESS @ Creating New User !");
		// then logging in..
		passport.authenticate('local')(req, res, function(){
			res.redirect('/');
		});
	});
});

router.get("/login", function(req, res){
	res.render('login');
});

router.post("/login", passport.authenticate('local', 
	{
		successRedirect: '/',
		failureRedirect: '/register'
	}), function(req, res){           });

router.get("/logout", function(req, res){
	req.logout();
	res.redirect('/');
});

function isLoggedIn(req, res, next){
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect('/login');
}


// *** EXPORTING THE ROUTES ***
module.exports = router;
