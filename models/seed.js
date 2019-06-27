var mongoose = require("mongoose");
	Blog     = require("./blogSchema");
	Comment  = require("./commentSchema");


var blogData = [
	{
		title: "Mayank Jackson",
		image: "https://scontent.fluh2-1.fna.fbcdn.net/v/t1.0-9/43680062_2134649776567908_649300464180920320_n.jpg?_nc_cat=106&_nc_oc=AQnhCkQZZ8-sXQiFDzrYUTSuyjqJtwQSLcYIyB9MR4tOoFR5uT1RwCZjmHrvngGV5pkt-fLc99Im4xCArY9aYYdK&_nc_ht=scontent.fluh2-1.fna&oh=81fff8b82130cb880e75651751f5c262&oe=5D907BD6",
		content: "Mayank Mayank Mayank Mayank Mayank Mayank Mayank Mayank Mayank Mayank"
	},

	{
		title: "Rakesh Kumar",
		image: "https://scontent.fluh2-1.fna.fbcdn.net/v/t1.0-9/46149224_1236157913189260_7056620194902310912_n.jpg?_nc_cat=105&_nc_oc=AQkPghWtRaG8X4A2aonkXQc2RemhovbHIg6X5xH6ibpThsz33nbQb3pASp4E7KrSF-Ad-U8Uc0rO4Fd-I2cLTw8Y&_nc_ht=scontent.fluh2-1.fna&oh=1ed9b9d8ae304cd6ed39152e11a9ca3f&oe=5D97ACCD",
		content: "Rakesh Rakesh Rakesh Rakesh Rakesh Rakesh Rakesh Rakesh Rakesh Rakesh Rakesh "
	},

	{
		title: "Sourav Sahu",
		image: "https://scontent.fluh2-1.fna.fbcdn.net/v/t1.0-9/20914538_1208054615965208_2137658733888631444_n.jpg?_nc_cat=101&_nc_oc=AQlDdf77Melx_uTaJaKdxB_A_gdCH7G2TiFZjTQUJpN-hhM-bnj3CtvzJEKTfhva2kYp9aH5sz-6zYtKWLgmGosb&_nc_ht=scontent.fluh2-1.fna&oh=eef992aeb3df3ac30bbd54e62c96012c&oe=5D79F76F",
		content: "Sourav Sourav Sourav Sourav Sourav Sourav Sourav Sourav Sourav Sourav Sourav "
	}
]



function seedDB(){
	Blog.remove({}, function(err, data){
		// if(err){
		// 	console.log(err);
		// } else {
		// 	// console.log("All Blogs removed");

		// 	// Create a new Blog
		// 	blogData.forEach(function(seed){
		// 		Blog.create(seed, function(err, addBlog){
		// 			if(err){
		// 				console.log(err);
		// 			} else{
		// 				// console.log(addBlog);
		// 				Comment.remove({}, function(err, data){
		// 					if(err){
		// 						console.log(err);
		// 					} else {
		// 						// console.log("All Comments removed");


		// 						Comment.create({
		// 							text: "He is a great guy!",
		// 							author: "Shubham"
		// 						}, 

		// 						function(err, newComment){
		// 							if(err){
		// 								console.log(err);
		// 							} else{
		// 								addBlog.comments.push(newComment);
		// 								addBlog.save();

		// 							}
		// 						})			
		// 					}	
		// 				})	
		// 			}
		// 		})
		// 	})
		// }
	})
}


module.exports = seedDB;