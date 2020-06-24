let mongoose = require('mongoose');
let passportLocalMongoose = require('passport-local-mongoose');

let userSchema = new mongoose.Schema({
	email: 	{
			type: String, 
			required: true
	},
	username: {
				type: String, 
				unique: true, 
				required: true
	},
	password: String,
	isModerator: {
				type: Boolean, 
				default: false
	},
	isAdmin: {
				type: Boolean, 
				default: false
	}

});

userSchema.plugin(passportLocalMongoose);

let User = mongoose.model("User", userSchema);

module.exports = User;