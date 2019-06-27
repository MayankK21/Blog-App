var express    = require("express"),
	router     = express.Router();
	Blog       = require("../models/blogSchema"),
	Comment    = require("../models/commentSchema"),
	middleware = require("../middleware");




//===============
//COMMENTS ROUTE
//===============
router.get("/blogs/:id/comments/new", middleware.isLoggedIn, function(req, res){
	res.render("comments", {id: req.params.id});	
})


router.post("/blogs/:id/comments", middleware.isLoggedIn, function(req, res){
	Blog.findById(req.params.id, function(err, found){
		if(err){
			req.flash("error", "Blog not found!");
			res.redirect("back");
		} else{
			Comment.create(req.body.comment, function(err, newComment){
				if(err){
					req.flash("error", "Comment not found!");
					res.redirect("back");
				} else{
					newComment.author.id = req.user._id;
					newComment.author.username = req.user.username;
					newComment.save();
					found.comments.push(newComment);
					found.save();
					req.flash("success", "Comment ADDED Successfully!");
					res.redirect("/blogs/" + req.params.id);		
				}
			});	
		}
	});
});


router.get("/blogs/:id/comments/:comment_id/edit", function(req, res){
	Comment.findById(req.params.comment_id, function(err, found){
		if(err){
			req.flash("error", "Comment not found!");
			res.redirect("back");
		} else{
			res.render("editComment", {blog_id: req.params.id, comment: found});		
		}
	})
});


router.put("/blogs/:id/comments/:comment_id", function(req, res){
	Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, found){
		if(err){
			req.flash("error", "Comment not found!");
			res.redirect("back");
		} else{
			req.flash("success", "Comment UPDATED Successfully!");
			res.redirect("/blogs/" + req.params.id);		
		}
	})
})

router.delete("/blogs/:id/comments/:comment_id", function(req, res){
	Comment.findByIdAndRemove(req.params.comment_id, function(err){
		if(err){
			req.flash("error", "Comment not found!");
			res.redirect("back");
		} else {
			req.flash("success", "Comment DELETED Successfully!");
			res.redirect("/blogs/" + req.params.id);
		}
	})
})




module.exports = router;