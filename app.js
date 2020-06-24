console.log("The News-App has started.");

let express			= require('express'),
	app				= express(),
	bodyParser		= require('body-parser'),
	mongoose		= require('mongoose'),
	passport		= require('passport'),
	localStrategy	= require('passport-local'),
	methodOverride	= require('method-override'),
	Article			= require('./models/article'),
	Comment			= require('./models/comment'),
	User			= require('./models/user')

let	indexRoutes		= require('./routes/index'), 
	authRoutes		= require('./routes/auth'),
	articleRoutes	= require('./routes/articles'),
	commentRoutes	= require('./routes/comments')

app.set('view engine', 'ejs');

app.locals.moment	= require('moment');  			// adds in 'time since post' functionality

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public/styles'));			// Style Sheets
app.use(express.static('public/icons'));			// included icons
app.use(express.static('public/jscripts/random_adverts'));	// serving advert dummies
app.use(express.static('public/jscripts'));
app.use(express.static('public/images'));

app.use(methodOverride('_method'));					// Needed to do a PUT request



/* 	****************************
	** CONNECTING TO DATABASE **
	**************************** */

// ONLINE DataBase @ mongodb/ATLAS
mongoose.connect(process.env.DATABASEURL, 
				{useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false})
				.then(() => { 
					console.log("Connected to ATLAS:DB");
				}).catch(err => {
					console.log("ERROR @ Connecting to ATLAS", err.message);
				});

// LOCAL DB @ Dev. Computer 
//	mongoose.connect('mongodb://localhost:27017/our_news', {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false});



// ******************************
// *** PASSPORT CONFIGURATION ***
// ******************************

app.use(require('express-session')({	
	secret: process.env.SECRETLINE,
	resave: false,
	saveUninitialized: false
}));						
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


/*	**************************
	*** GENERAL MIDDLEWARE *** 			makes sure all pages use these if a route is called.
	************************** */

// checks for a currentUser
app.use(function(req, res, next){
	res.locals.currentUser = req.user;
	next();
});

// sends hotArticles along for Rating overview
app.use(function(req, res, next){
	Article.find({}).sort({'isNewsCount': -1}).exec(function(err, hotArticles){
		if(err){
			console.log("ERROR @ getting hotArticles from the db.");
		} else {
			res.locals.hotArticles = hotArticles;
			next();
		}
	});
});

// sends hotDiscussions along for Rating overview
app.use(function(req, res, next){
	Article.find({}).sort({'comCount': -1}).exec(function(err, hotDiscussions){
		if(err){
			console.log("ERROR @ getting hotDiscussions articles from the db.");
		} else {
			res.locals.hotDiscussions = hotDiscussions;
			next();
		}
	});
});

// sends hotEmotions along for Rating overview.
app.use(function(req, res, next){
	Article.find({}).sort({'emotions.eCount': -1}).exec(function(err, hotEmotions){
		if(err){
			console.log("ERROR @ getting hotEmotions articles from the db.");
		} else {
			res.locals.hotEmotions = hotEmotions;
			next();
		}
	});
});


// ***************************
// *** BASIC ROUTING BELOW ***  *!* see routes folder for specific routing
// ***************************

app.use('/articles', articleRoutes);
app.use('/articles/:id/comments', commentRoutes);
app.use('/', authRoutes);
app.use('/', indexRoutes);


// ****************************
// *** Innitiate the SERVER ***  Tells the app to start serverside NODE and port to listen on
// ****************************

app.listen(process.env.PORT, process.env.IP, function(){
	console.log("Server started :: listening on port :: " + process.env.PORT);	 
	});