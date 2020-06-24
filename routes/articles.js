let express 	= require('express');
let router 		= express.Router();
let middleware	= require('../middleware');
let Article 	= require('../models/article');
let Comment		= require('../models/comment');

// *****************************************************
// *** FOR THE MIDDLEWARE :: see Middelware folder ! ***
// *****************************************************


// ***********************
// **** Article ROUTES ***
// ***********************

// REST :: INDEX -> shows ALL articles 
router.get("/", function(req, res){  
	Article.find({}).sort({ createdAt: -1}).exec(function(err, allArticles){
		if(err){
			console.log("ERROR @ getting ALL articles from the db.");
		} else {
			res.render('articles/articles', {articles: allArticles});
		}
	});	
});

// REST :: LOCAL -> shows all 'scope:local' articles
router.get("/local", function(req, res){
	Article.find({scope: "local"}).sort({ createdAt: -1}).exec(function(err, localArticles){
		if(err){
			console.log("ERROR @ getting Local articles from the db.");
		} else {
			res.render('articles/local', {articles: localArticles});
		}
	});
});

// REST :: COUNTRY -> shows all 'scope:country' articles
router.get("/country", function(req, res){
	Article.find({scope: "country"}).sort({ createdAt: -1}).exec(function(err, countryArticles){
		if(err){
			console.log("ERROR @ getting Local articles from the db.");
		} else {
			res.render('articles/country', {articles: countryArticles});
		}
	});
});

// REST :: CONTINENT -> shows all 'scope:continent' articles
router.get("/continent", function(req, res){
	Article.find({scope: "continent"}).sort({ createdAt: -1}).exec(function(err, continentArticles){
		if(err){
			console.log("ERROR @ getting Local articles from the db.");
		} else {
			res.render('articles/continent', {articles: continentArticles});
		}
	});
});

// REST :: WORLD -> shows all 'scope:world' articles
router.get("/world", function(req, res){
	Article.find({scope: "world"}).sort({ createdAt: -1}).exec(function(err, worldArticles){
		if(err){
			console.log("ERROR @ getting Local articles from the db.");
		} else {
			res.render('articles/world', {articles: worldArticles});
		}
	});
});

// REST :: Politics -> show all 'category: politics' articles
router.get("/politics", function(req, res){
	Article.find({category: "politics"}).sort({createdAt: -1}).exec(function(err, politicsArticles){
		if(err){
			console.log("ERROR @ finding the local/politics articles from db");
		} else {
			res.render('articles/politics', {articles: politicsArticles});
		}
	});
});

// REST :: Economy -> show all 'category: economy' articles
router.get("/economy", function(req, res){
	Article.find({category: "economy"}).sort({createdAt: -1}).exec(function(err, economyArticles){
		if(err){
			console.log("ERROR @ finding the economy articles from db");
		} else {
			res.render('articles/economy', {articles: economyArticles});
		}
	});
});

// REST :: Technology -> show all 'category: technology' articles
router.get("/technology", function(req, res){
	Article.find({category: "technology"}).sort({createdAt: -1}).exec(function(err, technologyArticles){
		if(err){
			console.log("ERROR @ finding the technology articles from db");
		} else {
			res.render('articles/technology', {articles: technologyArticles});
		}
	});
});

// REST :: Science -> show all 'category: science' articles
router.get("/science", function(req, res){
	Article.find({category: "science"}).sort({createdAt: -1}).exec(function(err, scienceArticles){
		if(err){
			console.log("ERROR @ finding the science articles from db");
		} else {
			res.render('articles/science', {articles: scienceArticles});
		}
	});
});

// REST :: Sports -> show all 'category: sports' articles
router.get("/sports", function(req, res){
	Article.find({category: "sports"}).sort({createdAt: -1}).exec(function(err, sportsArticles){
		if(err){
			console.log("ERROR @ finding the sports articles from db");
		} else {
			res.render('articles/sports', {articles: sportsArticles});
		}
	});
});

// REST :: Culture -> show all 'category: culture' articles
router.get("/culture", function(req, res){
	Article.find({category: "culture"}).sort({createdAt: -1}).exec(function(err, cultureArticles){
		if(err){
			console.log("ERROR @ finding the culture articles from db");
		} else {
			res.render('articles/culture', {articles: cultureArticles});
		}
	});
});

// REST :: Other -> show all 'category: other' articles
router.get("/other", function(req, res){
	Article.find({category: "other"}).sort({createdAt: -1}).exec(function(err, otherArticles){
		if(err){
			console.log("ERROR @ finding the other articles from db");
		} else {
			res.render('articles/other', {articles: otherArticles});
		}
	});
});

// REST :: NEW -> show form to create new
router.get("/new", middleware.isLoggedIn, function(req, res){  //Page to Create a new article
	res.render('articles/new');
});


// REST :: CREATE -> add 'New' article to the database (POST request!)
router.post("/", middleware.isLoggedIn, function(req, res){  // POST route to create a new article
	
	//get ALL data from form
	let url = req.body.url;
	let title = req.body.title;
	let image = req.body.image;
	let summary = req.body.summary;
	let scope = req.body.scope;
	let category = req.body.category;
	let tags = req.body.tags;
	let user = {
		id: req.user._id,
		username: req.user.username
		};
	let isNews = 0;
	let hasComment = 0;
	let theEmotions = [
						{ emotion: "Amazed", eCount: 0 }, 
						{ emotion: "Happy", eCount: 0 }, 
						{ emotion: "Neutral", eCount: 0 },
						{ emotion: "Sad", eCount: 0 },
						{ emotion: "Angry", eCount: 0 }		
					];
	
	// compile all info an object to 'save'
	let newArticle = {  
		url: url, 
		title: title, 
		image: image,
		summary: summary, 
		scope: scope,
		category: category, 
		tags: tags,
		user: user,
		isNewsCount: isNews,
		comCount: hasComment,
		emotions: theEmotions,
	};
	
	//add to articles database
	Article.create(newArticle, function(err, newArticle){
		if(err){
			console.log("ERROR @ Creating New Article");
		} else {
			console.log("SUCCESS @ Creating New Article");
			res.redirect('/articles');	// redirect user to main articles page
		}
	});
});


// REST :: POST for 'isNews-icon'
router.post("/:id/isNews", middleware.isLoggedIn, function(req,res){
	Article.findById(req.params.id, function(err, foundArticle){
			if(err){
				console.log("ERROR @ finding *this* article by ID in isNews");
				return res.redirect('/articles');
			}
		
			let foundUserOk = foundArticle.isNews.some(function(news){
				return news.equals(req.user._id);
			});
		
			if(foundUserOk){
				foundArticle.isNewsCount -= 1;
				foundArticle.isNews.pull(req.user._id);
			} else {
				foundArticle.isNewsCount += 1;
				foundArticle.isNews.push(req.user);
			}
			foundArticle.save(function(err){

			if(err){
				console.log("ERROR @ saving the isNews for *this* Article");
				return res.redirect('/articles/' + foundArticle._id);
			}
			return res.redirect('/articles/' + foundArticle._id);
		});
	});
});


// REST :: SHOW -> show more info on ONE item in database
router.get("/:id", function(req, res){  						// NOTE, any ID until check! ( *** DEV !!! )
	Article.findById(req.params.id).populate('comments likes').exec(function(err, foundArticle){
		if(err || !foundArticle){
			console.log("ERROR @ finding *this* article by ID in SHOW");
			res.redirect('back');
		} else {
			res.render('articles/show', {article: foundArticle});	
		}
	});
});


// REST :: EDIT -> shows a form to EDIT
router.get("/:id/edit", middleware.checkArticlePermissions, function(req, res){
	Article.findById(req.params.id, function(err, foundArticle){
		if(err || !foundArticle){
			console.log("ERROR @ Finding Article for EDIT");
			res.redirect('back');
		} else {
			console.log("SUCCESS @ Finding Article for EDIT");
			res.render('articles/edit', {article: foundArticle});
		}
	});
});


// REST :: UPDATE -> updates data from the EDIT form
router.put('/:id', middleware.checkArticlePermissions, function(req, res){
	
	//get ALL data from **EDIT form**
	let title = req.body.title;
	let image = req.body.image;
	let summary = req.body.summary;
	let scope = req.body.scope;
	let category = req.body.category;
	let tags = req.body.tags;
	let user = {
			id: req.user._id,
			username: req.user.username
			};
	
	// compile all info an object to 'save'
	let editedArticle = {
		title: title, 
		image: image,
		summary: summary, 
		scope: scope,
		category: category, 
		tags: tags,
		user: user
		};
	
	//add to articles database
	Article.findByIdAndUpdate(req.params.id, editedArticle, function(err, editArticle){
		if(err){
			console.log("ERROR @ Update Edited Article)");
		} else {
			console.log("SUCCESS @ Update Edited Article)");
			res.redirect('/articles/' + req.params.id);			// redirect user to updated articles show page
		}
	});	
});


// REST :: DESTROY -> delete the article
router.delete('/:id', middleware.checkArticlePermissions, function(req, res){
	Article.findByIdAndRemove(req.params.id, function(err, articleRemoved){
		if(err){
			console.log("ERROR @ DESTROY article by ID");
			res.redirect('/articles');
		} else {
			Comment.deleteMany({_id: {$in: articleRemoved.comments} }, function(err){
				if(err){
					console.log("ERROR @ Destroying Article Comments");
				} else {
					console.log("SUCCESS @ Destroying article and comments by IDs");
					res.redirect('/articles');
				}
			});
		}
	});
});

	
// *** EXPORTING THE ROUTES ***
module.exports = router;

