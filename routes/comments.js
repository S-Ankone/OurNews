let express 	= require('express');
let router 		= express.Router({mergeParams: true});
let middleware	= require('../middleware');
let Article 	= require('../models/article');
let Comment 	= require('../models/comment');


// *****************************************************
// *** FOR THE MIDDLEWARE :: see Middelware folder ! ***
// *****************************************************


// ***********************
// *** Comments ROUTES ***
// ***********************


/* 	************** DEV :: NOTE FOR THE READER :! ****************
	** I 'wrestled' a lot with getting the hotEmotions working **
	** for the thorough reader i left in all my console.logs   **
	** to give you somewhat of an idea of how i got it to work **
	** and how i troubleshooted/tested the functionality 	   **
	************************************************************* */

// REST :: NEW --> shows form to input a new comment
router.get("/new", middleware.isLoggedIn, function(req, res){
	Article.findById(req.params.id, function(err, foundArticle){
		if(err){
			console.log("ERROR @ finding article by ID for COMMENT");
		} else {
			res.render('comments/new', {article: foundArticle});			
		}
	});
});

//REST :: CREATE --> actually creates a new comment
router.post("/", middleware.isLoggedIn, function(req, res){
	Article.findById(req.params.id, function(err, foundArticle){
		if(err){
			console.log("ERROR @ finding article to POST the COMMENT");
			res.redirect('/articles');
		} else {
			Comment.create(req.body.comment, function(err, createdComment){
				if(err){
					console.log("ERROR @ CREATing new COMMENT");
				} else {
					
	// *** DEV : TESTING HERE ***!!!***
					
					switch(createdComment.emotion){
						case "Amazed":
							foundArticle.emotions[0].eCount += 1;
	console.log("@create, amazedCount = " + foundArticle.emotions[0].eCount);
							break;
						case "Happy":
							foundArticle.emotions[1].eCount += 1;
	console.log("@create, happyCount = " +foundArticle.emotions[1].eCount);
							break;
						case "Neutral":
							foundArticle.emotions[2].eCount += 1;
	console.log("@create, neutralCount = " +foundArticle.emotions[2].eCount);	
							break;
						case "Sad":
							foundArticle.emotions[3].eCount += 1;
	console.log("@create, sadCount = " + foundArticle.emotions[3].eCount);
							break;
						case "Angry":
							foundArticle.emotions[4].eCount += 1;
	console.log("@create, angryCount = " + foundArticle.emotions[4].eCount);
							break;
						default:
							console.log("ERROR @ Emotion Switch in comments route");
					}
					//add username and id to comment
					createdComment.user.id = req.user._id;
					createdComment.user.username = req.user.username;
					createdComment.save();
					foundArticle.comments.push(createdComment);
					foundArticle.comCount += 1;
					foundArticle.save();
					console.log("SUCCESS @ CREATing new COMMENT");
					res.redirect('/articles/' + foundArticle._id);
				}		
			});
		}
	});
});


// REST :: EDIT --> shows a form to edit a comment
router.get("/:comment_id/edit", middleware.checkCommentPermissions, function(req, res){
	//find the comment
	Article.findById(req.params.id, function(err, foundArticle){
		if(err || !foundArticle){
			console.log("ERROR @ finding Article by ID for Edit comment");
			return res.redirect('back');
		} else {
			Comment.findById(req.params.comment_id, function(err, foundComment){
				if(err){
					console.log("ERROR @ finding comment by ID for edit");
					res.redirect('back');
				} else {
					console.log("SUCCESS @ finding comment by ID for edit");
					res.render('comments/edit', {article_id: req.params.id, comment: foundComment});
				}
			});
		}
	});
});


// REST :: UPDATE --> actually updates the comment
router.put("/:comment_id", middleware.checkCommentPermissions, function(req,res){
	Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
		if(err){
			console.log("ERROR @ Updating Comment");
			res.redirect('back');
		} else {
			let emoCheck = updatedComment.emotion;
			
// *** DEV : TESTING HERE ***!!!***
			
console.log("in the actual update, the emoCheck before the +/- else is: " + emoCheck);
console.log("the emotion is switched to :" + req.body.comment.emotion);

			if(req.body.comment.emotion != emoCheck){
				Article.findById(req.params.id, function(err, foundArticle){
					if(err){
						console.log("ERROR @ finding article by id in comment/UPDATE");
						res.redirect('back');
					} else {
	
						switch(emoCheck){  // decreasing the emotion counters, when the emotion gets changed
							case "Amazed":
								foundArticle.emotions[0].eCount -= 1;
	console.log("removing 1 from amazedCount");
	console.log("@edit, amazedCount = " + foundArticle.emotions[0].eCount);
								break;
							case "Happy":
								foundArticle.emotions[1].eCount -= 1;
	console.log("removing 1 from happyCount");
	console.log("@edit, happyCount = " + foundArticle.emotions[1].eCount);							
								break;
							case "Neutral":
								foundArticle.emotions[2].eCount -= 1;
	console.log("removing 1 from neutralCount");
	console.log("@edit, neutralCount = " + foundArticle.emotions[2].eCount);							
								break;
							case "Sad":
								foundArticle.emotions[3].eCount -= 1;
	console.log("removing 1 from sadCount");
	console.log("@edit, sadCount = " + foundArticle.emotions[3].eCount);							
								break;
							case "Angry":
								foundArticle.emotions[4].eCount -= 1;
	console.log("removing 1 from angryCount");
	console.log("@edit, angryCount = " + foundArticle.emotions[4].eCount);							

								break;
						default:
							console.log("ERROR @ Emotion Switch in comments route");
						}

						switch(req.body.comment.emotion){
							case "Amazed":
								foundArticle.emotions[0].eCount += 1;
	console.log("adding 1 to amazedCount");
	console.log("@ update, amazedCount = " + foundArticle.emotions[0].eCount);	
								break;
							case "Happy":
								foundArticle.emotions[1].eCount += 1;
	console.log("adding 1 to happyCount");								
	console.log("@ update, happyCount = " + foundArticle.emotions[1].eCount);	
								break;
							case "Neutral":
								foundArticle.emotions[2].eCount += 1;
	console.log("adding 1 to neutralCount");							
	console.log("@ update, neutralCount = " + foundArticle.emotions[2].eCount);									
								break;
							case "Sad":
								foundArticle.emotions[3].eCount += 1;
	console.log("adding 1 to sadCount");
	console.log("@ update, sadCount = " + foundArticle.emotions[3].eCount);	
								break;
							case "Angry":
								foundArticle.emotions[4].eCount += 1;
	console.log("adding 1 to angryCount");							
	console.log("@ update, angryCount = " + foundArticle.emotions[4].eCount);
								break;
						default:
							console.log("ERROR @ Emotion Switch in comments route");
						}
					foundArticle.save(function(err){
						if(err){
							console.log("ERROR @ saving after delete comment for *this* Article");
							return res.redirect('/articles');
						}
					});	
	console.log("Sending this page to the user with the emotion: " + req.body.comment.emotion);	
					res.redirect("/articles/" + req.params.id);
					}	
				});
			} else {
	console.log("Sending this page to the user with the emotion: " + updatedComment.emotion);
				res.redirect("/articles/" + req.params.id);
			}	
		}
	});
});


// REST :: DESTROY --> 'actually' deleting a comment
router.delete("/:comment_id", middleware.checkCommentPermissions, function(req,res){
	Article.findById(req.params.id, function(err, foundArticle){
		if(err || !foundArticle){
			console.log("ERROR @ finding Article by ID for delete comment");
			return res.redirect('back');
		} else {
			foundArticle.comments.pull(req.params.comment_id);
			foundArticle.comCount -= 1;
			Comment.findByIdAndRemove(req.params.comment_id, function(err, removedComment){
				if(err){
					console.log("ERROR @ Deleting the comment");
				} else {

// *** DEV : TESTING HERE ***!!!***

console.log("going into switch with: " + removedComment.emotion);				
					switch(removedComment.emotion){  // decreasing the emotion counters, when the comment gets deleted !
					case "Amazed":
						foundArticle.emotions[0].eCount -= 1;
console.log("removing 1 from amazedCount");
console.log("@delete, amazedCount = " + foundArticle.emotions[0].eCount);
						break;
					case "Happy":
						foundArticle.emotions[1].eCount -= 1;
console.log("removing 1 from happyCount");
console.log("@delete, happyCount = " + foundArticle.emotions[1].eCount);							
						break;
					case "Neutral":
						foundArticle.emotions[2].eCount -= 1;
console.log("removing 1 from neutralCount");
console.log("@delete, neutralCount = " + foundArticle.emotions[2].eCount);							
						break;
					case "Sad":
						foundArticle.emotions[3].eCount -= 1;
console.log("removing 1 from sadCount");
console.log("@delete, sadCount = " + foundArticle.emotions[3].eCount);	
						break;
					case "Angry":
						foundArticle.emotions[4].eCount -= 1;
console.log("removing 1 from angryCount");
console.log("@delete, angryCount = " + foundArticle.emotions[4].eCount);	
						break;
					default:
						console.log("ERROR @ Emotion Switch in comments route");
					}			
				
					foundArticle.save(function(err){
						if(err){
							console.log("ERROR @ saving after delete comment for *this* Article");
							return res.redirect('/articles');
						}
					});
					console.log("SUCCESS @ Deleting a comment");
					return res.redirect("/articles/" + foundArticle._id);
				}	
			});
		}
	});
});

// *** EXPORTING THE ROUTES ***
module.exports = router;
