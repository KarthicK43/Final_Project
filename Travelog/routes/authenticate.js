var express=require("express");
var router=express.Router();
var User = require("../models/users");
var Place = require("../models/places");
var passport=require("passport");


// Login redirect
router.get("/",function(req,res){
	res.redirect("/login");
})
// Login page
router.get("/login",function(req,res){
    res.render("login",{regError:false,logError:false});
})
// Login Error
router.get("/login/error",function(req,res){
    res.render("login",{regError:false,logError:true});
})
// Login authentication
router.post("/login/user",passport.authenticate("local",{successRedirect:"/home/visited",failureRedirect:"/login/error"}),function(req,res){
})
// Register and authentication
router.post("/register/user",function(req,res){
	user={
        username:req.body.username,
        password:req.body.password
    }
    signUpUser(req,res,user);
})
// Register user exists
router.get("/register/error",function(req,res){
    res.render("login",{regError:true,logError:false})
})
// logout session
router.get("/logout",function(req,res){
	req.logOut();
	res.redirect("/")
})
// Register Function
function signUpUser(req,res,user){
    User.register(new User({username:user.username}),user.password,function(err,userAuth){
        if(err){
            res.redirect("/register/error");
            return;
        }
        else{
            userAuth.yourName=req.body.yname;
            userAuth.phone=req.body.phone;
            userAuth.email=req.body.email,
            userAuth.save();
            passport.authenticate("local")(req,res,function(){
                res.redirect("/home/visited");
                return;
            })
        }
    })
}
module.exports=router;