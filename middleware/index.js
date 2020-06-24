let Article 	= require('../models/article');
let Comment 	= require('../models/comment');

// *******************
// *** MIDDLEWARES ***
// *******************

let middlewareObj = {};


middlewareObj.isLoggedIn = function (req, res, next){
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect('/login');
}


middlewareObj.checkArticlePermissions = function (req, res, next){
	if(req.isAuthenticated()){
		Article.findById(req.params.id, function(err, foundArticle){
			if(err || !foundArticle){
				console.log("ERROR @ Finding Article in checkPermissions");
				res.redirect('back');
			} else {
				console.log("SUCCESS @ Finding Article in checkPermissions");
				if(foundArticle.user.id.equals(req.user._id) || req.user.isAdmin){
					next();
				} else {
					console.log("WARNING @ checkPermissions :: no permission!");
					res.redirect('back');
				}
			}
		});
	} else {
		console.log("WARNING @ checkPermissions :: User not logged in");
		res.redirect('back');
	}
}


middlewareObj.checkCommentPermissions = function (req, res, next){
	if(req.isAuthenticated()){
		Comment.findById(req.params.comment_id, function(err, foundComment){
			if(err || !foundComment){
				console.log("ERROR @ Finding Comment in checkCommentPermissions");
				res.redirect('back');
			} else {
				console.log("SUCCESS @ Finding Comment in checkCommentPermissions");
				if(foundComment.user.id.equals(req.user._id) || req.user.isAdmin){
					next();
				} else {
					console.log("WARNING @ checkCommentPermissions :: NO permission!");
					res.redirect('back');
				}
			}
		});
	} else {
		console.log("WARNING @ checkCommentPermissions :: User not logged in");
		res.redirect('back');
	}
}


	
// Exporting Middlewares
module.exports = middlewareObj;

