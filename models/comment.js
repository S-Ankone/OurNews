let mongoose = require('mongoose');

let commentSchema = mongoose.Schema({
	text: String,
	emotion: String,
	createdAt: { type: Date, default: Date.now },
	user: 
		{
		id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User"
			},
		username: String
		}
});

let Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;