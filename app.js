require("dotenv").config();
var express 			  = require("express"),
	app 				  = express(),
	mongoose 			  = require("mongoose"),
	bodyParser 			  = require("body-parser"),
	expressSanitizer 	  = require("express-sanitizer"),
	methodOverride 		  = require("method-override"),
	flash				  = require("connect-flash"),
	passport              = require("passport"),
	localStrategy         = require("passport-local"),
	passportLocalMongoose = require("passport-local-mongoose"),
	seedDB 				  = require("./models/seed"),
	Comment 			  = require("./models/commentSchema"),
	User 				  = require("./models/userSchema"),
	expressSession		  = require("express-session");


var blogsRoute    = require("./routes/blogs"),
	commentsRoute = require("./routes/comments"),
	indexRoute    = require("./routes/index");

var Blog = require("./models/blogSchema");

mongoose.connect("mongodb://localhost/blog_new", {useNewUrlParser: true});

app.use(expressSession({
	secret: "Jackson_Bawa is Awesome",
	resave: false,
	saveUninitialized: false
}));
// seedDB();





app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static("public"));
app.use(expressSanitizer());
app.use(methodOverride("_method"));
app.use(flash());





//=============================================================
//PASSPORT CONFIGURATION
//=============================================================
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


//MIDDLEWARE
app.use(function(req, res, next){
	res.locals.currentUser = req.user;
	res.locals.error = req.flash("error");
	res.locals.success = req.flash("success");
	next();
})


//
app.use(blogsRoute);
app.use(commentsRoute);
app.use(indexRoute);


app.listen(3000, function(){
	console.log("Blog Site Online!");
});



