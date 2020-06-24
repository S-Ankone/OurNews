let mongoose = require('mongoose');
let Comment = require('./comment');

//SCHEMA SETUP
let articleSchema = new mongoose.Schema({
	url: String,
	title: String,
	image: String,
	summary: String,
	scope: String,
	category: String,
	tags: [String],
    createdAt: { type: Date, default: Date.now },
	user: {
			id:{
				type: mongoose.Schema.Types.ObjectId,
				ref: "User"
			},
			username: String
		},
	comments: [
				{
				type: mongoose.Schema.Types.ObjectId,
				ref: "Comment"
				}
			],
	comCount: Number,
	isNews: [
				{
				type: mongoose.Schema.Types.ObjectId,
				ref: "User"
				}
			],
	isNewsCount: Number,
	
	// emotion counters
	emotions: [
		{ 
			emotion: String, 
			eCount: Number
		}
	]
});

//Turn Schema into model, assign to 'class'
let Article = mongoose.model("Article", articleSchema);

module.exports = Article;