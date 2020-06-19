// Invoking packages
var express = require("express");
var app=express();
var request = require("request"); 
var bodyParser=require("body-parser");
var mongoose= require("mongoose");
var passport = require("passport");
var LocalStrategy = require("passport-local")
var methodOverride=require("method-override");
// models
var Place = require("./models/places");
var User = require("./models/users");
// Routes
var authRoute=require("./routes/authenticate");
var mainRoute=require("./routes/places");
// configs
mongoose.connect("mongodb://localhost:27017/travelog",{useNewUrlParser:true,useUnifiedTopology:true,useFindAndModify:false});
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine","ejs");
app.use(express.static(__dirname + "/public"))
app.use(methodOverride("_method"));
var sessionE = require("express-session")({
	secret: 'secret',
	resave: false,
	saveUninitialized: false
});

// passport config
app.use(sessionE);
app.use(passport.initialize())
app.use(passport.session())
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())
// header assign
app.use(function(req,res,next){
	res.locals.curuser=req.user;
	next();
});
// Using Routes
app.use(mainRoute);
app.use(authRoute);
// Listener
app.listen(process.env.PORT||2000,process.env.IP,function(){
    console.log("Server Started");
})