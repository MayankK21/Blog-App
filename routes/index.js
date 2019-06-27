var express    = require("express"),
	router     = express.Router(),
	passport   = require("passport"),
	User       = require("../models/userSchema"),
	Comment    = require("../models/commentSchema"),
	Blog       = require("../models/blogSchema"),
	middleware = require("../middleware");




//INDEX PAGE
router.get("/", function(req, res){
	res.render("homepage");
})


// SHOW ALL BLOGS
router.get("/blogs", function(req, res){

	Blog.find({}, function(err, allBlogs){
		if(err){
			req.flash("error", "There are no Blogs!");
			res.redirect("back");
		} else {			
			res.render("allBlogs", {blog: allBlogs});
		}
	})
});




//LOGIN ROUTES
router.get("/login", function(req, res){
	res.render("login", {message: req.flash("error")});
});

router.post("/login", passport.authenticate("local", {
	successRedirect: "/blogs",
	failureRedirect: "/blogs/register"
}), function(req, res){})




//SIGNUP ROUTES
router.get("/register", function(req, res){
	res.render("register");
});

router.post("/register", function(req, res){
	User.register(new User({firstName: req.body.firstName, lastName: req.body.lastName, email: req.body.email, username: req.body.username, image: req.body.image}), req.body.password, function(err, user){
		if(err){
			req.flash("error", err.message);
			res.redirect("back");
		}
		
		passport.authenticate("local")(req, res, function(){
			req.flash("success", "Welcome " + user.username + "!");
			res.redirect("/blogs");
		});
	})
})




//LOGOUT ROUTE
router.get("/logout", function(req, res){
	req.logout();
	req.flash("success", "Successfully logged out!");
	res.redirect("/blogs");
});



router.get("/show", middleware.isAdmin, function(req, res){
	Blog.find({}).populate("comments").exec(function(err, blogs){
		if(err){
			req.flash("error", "Blog not found!");
			res.redirect("back");
		} else{

			User.find({}, function(err, users){
				if(err){
					req.flash("error", "User not found!");
			res.redirect("back");
				} else{
					Comment.find({}, function(err, comments){
						if(err){
							req.flash("error", "Comment not found!");
							res.redirect("back");
						} else{										
							res.render("admin", {admin: req.user, blogs: blogs, users: users, comments: comments});
						}
					})
				}
			})
		}
	})
	
})


router.post("/register/:id", middleware.isAdmin, function(req, res){
	User.findById(req.params.id, function(err, user){
		if(err){
			req.flash("error", "User not found!");
			res.redirect("back");
		} else{
			user.changePassword(req.body.oldpassword, req.body.newpassword, function(err){
				if(err){
					req.flash("error", "Unable to CHANGE password!");
					res.redirect("back");
				} else{
					// console.log(user.username + " updated!");
					req.flash("success", "Password Updated!");
					res.redirect("/show");
				}
			})
		}
	})
})




module.exports = router;