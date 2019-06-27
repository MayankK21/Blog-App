var mongoose = require("mongoose");

var blogSchema = new mongoose.Schema({
	title: String,
	price: String,
	image: String,
	content: String,
	author: {
		id: {
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
	time : { type : Date, default: Date.now }
});

module.exports = mongoose.model("Blog", blogSchema);