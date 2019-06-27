var middlewareObj = {};
var Blog = require("../models/blogSchema");



middlewareObj.isLoggedIn = function(req, res, next){
	if(req.isAuthenticated()){
		return next();
	}
	req.flash("error", "You must be logged in first!");
	res.redirect("/login");
}


middlewareObj.isAuthorized = function(req, res, next){
	Blog.findById(req.params.id, function(err, found){
		if(err){
			req.flash("error", "Couldn't find what you are looking for!");
			res.redirect("back");
		} else {
			if(found.author.id.equals(req.user._id) || req.user._id.equals("5d132bb19f834c0c51ff109b")){
				return next();
			}
			req.flash("error", "You don't have permissions to do that!");
			res.redirect("/");
		}
	})
	
}


middlewareObj.isAdmin = function(req, res, next){
	if(req.user._id.equals("5d132bb19f834c0c51ff109b")){
		return next();
	}
	req.flash("error", "You are not the Admin!");
	res.redirect("/login");
}


module.exports = middlewareObj;