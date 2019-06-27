var express    = require("express"),
	router     = express.Router(),
	Blog       = require("../models/blogSchema"),
	User       = require("../models/userSchema"),
	Comment    = require("../models/commentSchema"),
	middleware = require("../middleware");

var nodeGeocoder = require("node-geocoder");

var options = {
	provider: "google",
	httpAdapter: "https",
	apiKey: process.env.GEOCODER_API_KEY,
	formatter: null
}

var geocoder = nodeGeocoder(options); 


//CREATE NEW BLOG
router.get("/blogs/new", middleware.isLoggedIn, function(req, res){
	res.render("newBlog");
});




router.post("/blogs", middleware.isLoggedIn, function(req, res){
	var title = req.sanitize(req.body.title);
	var image = req.body.image;
	var content = req.sanitize(req.body.content);
	var price = req.sanitize(req.body.price);
	var author = {
		id: req.user._id,
		username: req.user.username
	}
	

	Blog.create({
		title: title,
		price: price,
		location: location,
		lat: lat,
		lng: lng,
		image: image,
		content: content,
		author: author
	}, 

	function(err, addBlog){
		if(err){
			req.flash("error", "Unable to CREATE Blog!");
			res.redirect("back");
		} else {
			req.flash("success", "Blog ADDED Successfully!");
			res.redirect("/blogs")
		}
	});

});


// SHOW A PARTICULAR BLOG
router.get("/blogs/:id", function(req, res){
	Blog.findById(req.params.id).populate("comments").exec(function(err, found){
		if(err){
			req.flash("error", "Blog not found!");
			res.redirect("back");
		} else {
			res.render("viewBlog", {blog: found});
		}
	})
});


//EDIT A PARTICULAR BLOG
router.get("/blogs/:id/edit", middleware.isLoggedIn, middleware.isAuthorized, function(req, res){
	Blog.findById(req.params.id, function(err, update){
		if(err){
			req.flash("error", "Blog not found!");
			res.redirect("back");
		} else {
			res.render("updateForm", {blog: update});
		}
	});
});


// UPDATING A PARTICULAR BLOG
router.post("/blogs/:id", middleware.isLoggedIn, middleware.isAuthorized, function(req, res){
	Blog.findById(req.params.id, function(err, id){
		if(err){
			req.flash("error", "Blog not found!");
			res.redirect("back");
		} else {
			Blog.updateOne(
				{_id: id}, 
				{$set: {title: req.sanitize(req.body.newTitle),
						price: req.sanitize(req.body.newPrice),
						image: req.body.newImage, 
						content: req.sanitize(req.body.newContent)}
				}, 
				{ upsert: true },
				function(err, doc){
				if(err){
					req.flash("error", "Unable to UPDATE Blog!");
					res.redirect("back");
				} else {
					console.log("POST method used");
					// console.log(id.title + " has been Updated!");
					req.flash("success", "Blog UPDATED Successfully!");
					res.redirect("/blogs/" + req.params.id);
				}
			})
		}
	})
});



// UPDATING A PARTICULAR BLOG - ALTER
router.put("/blogs/:id", middleware.isLoggedIn, middleware.isAuthorized, function(req, res){
	Blog.findByIdAndUpdate(req.params.id, 
		{ 
			title: req.sanitize(req.body.newTitle),
			price: req.sanitize(req.body.newPrice),
			image: req.body.newImage, 
			content: req.sanitize(req.body.newContent)
		},

		function(err, id){
		if(err){
			req.flash("error", "Unable to UPDATE Blog!");
			res.redirect("back");
		} else {
			console.log("PUT method used");
			// console.log(id.title + " has been Updated!");
			req.flash("success", "Blog UPDATED Successfully!");
			res.redirect("/blogs/" + req.params.id);
		}
	})
});


// DESTROY A BLOG
router.get("/blogs/:id/delete", middleware.isLoggedIn, middleware.isAuthorized, function(req, res){
	Blog.findById(req.params.id, function(err, del){
		if(err){
			req.flash("error", "Blog not found!");
			res.redirect("back");
		} else {
			Blog.deleteOne({_id: del._id}, function(err, doc){
				if(err){
					req.flash("error", "Unable to DELETE Blog!");
					res.redirect("back");
				} else {
					console.log("GET method used");
					// console.log(del.title + " has been deleted!");
					req.flash("success", "Blog DELETED Successfully!");
					res.redirect("/blogs");
				}
			})
		}
	});
});


// DESTROY A BLOG - alter
router.delete("/blogs/:id", middleware.isLoggedIn, middleware.isAuthorized, function(req, res){
	Blog.findByIdAndRemove(req.params.id, function(err, del){
		if(err){
			req.flash("error", "Blog not found!");
			res.redirect("back");
		} else {
			console.log("DELETE method used");
			// console.log(del.title + " has been deleted!");
			req.flash("success", "Blog DELETED Successfully!");
			res.redirect("/blogs");
		}
	})
});




//===========================================================================================
//									ADMIN AUTHORIZATION
//===========================================================================================






//DELETE COMMENT BY ADMIN
router.post("/comments/:id", middleware.isAdmin, function(req, res){
	Comment.findByIdAndRemove(req.params.id, function(err, del){
		if(err){
			req.flash("error", "Comment not found!");
			res.redirect("back");
		} else {
			req.flash("success", "Comment DELETED Successfully!");
			res.redirect("/show");
		}
	})
})



//USER PROFILE
router.get("/users/:id/profile", function(req, res){
	User.findById(req.params.id, function(err, found){
		if(err){
			req.flash("error", "User not found");
			res.redirect("back");
		} else{
			res.render("profile", {user: found});		
		}
	})
	
})


//DELETE USERS BY ADMIN
router.post("/users/:id", middleware.isAdmin, function(req, res){
	User.findByIdAndRemove(req.params.id, function(err, del){
		if(err){
			req.flash("error", "User not found!");
			res.redirect("back");
		} else {
			req.flash("success", "User DELETED Successfully!");
			res.redirect("/show");
		}
	})
})








module.exports = router;