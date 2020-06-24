let express 	= require('express');
let router 		= express.Router({mergeParams: true});
let Article 	= require('../models/article');

// *****************************
// *** BASIC ROUTES BELOW !! ***
// *****************************

/*
router.get("/", function(req,res){
	res.render('landing');
});*/

router.get("/", async function(req, res){  //route to landing-page/index
	
	/*	******************* DEV :: WARNING :: *********************
		** This code breaks if there aren't any articles to find **
		** so when pushing this code live, either include a 	 **
		** seed(), or post a 'dummy' article in each category 	 ** 
		***********************************************************	*/

		try{
			let frontpageArticles = []
			
			let firstPol = Article.find({category: "politics"}).sort({ createdAt: -1}).limit(1);
			let firstEcon = Article.find({category: "economy"}).sort({ createdAt: -1}).limit(1);
			let firstTech = Article.find({category: "technology"}).sort({ createdAt: -1}).limit(1);
			let firstScience = Article.find({category: "science"}).sort({ createdAt: -1}).limit(1);
			let firstSports = Article.find({category: "sports"}).sort({ createdAt: -1}).limit(1);
			let firstCulture = Article.find({category: "culture"}).sort({ createdAt: -1}).limit(1);
			let firstOther = Article.find({category: "other"}).sort({ createdAt: -1}).limit(1);
	
			let result = await Promise.all([firstPol, firstEcon, firstTech, firstScience, firstSports, firstCulture, firstOther]);
			
			for(let i = 0; i < result.length; i++){
				frontpageArticles.push(result[i][0]);
			}	
			res.render('landing', {articles: frontpageArticles});
		} catch (err) {
			console.log("something went wrong");
		}
});


router.get("/faq", function(req, res){ //route to Frequently Asked Questions
		res.render('faq');
});


router.get("/about", function(req, res){
	res.render('about')
});

router.get("/contact", function(req, res){
	res.render('contact');
});

router.get("/burger", function(req,res){
	res.render('burger');
});

// * Catch all route *
router.get("*", function(req, res){   //Default landing route for non existing pages
	res.send("ERROR 404: Your Page Was Not Found.");
});


// *** EXPORTING THE ROUTES ***
module.exports = router;