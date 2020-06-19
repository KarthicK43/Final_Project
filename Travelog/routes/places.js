var express=require("express");
var router=express.Router({mergeParams:true});
var passport=require("passport");
var Place = require("../models/places");
var User=require("../models/users");

// Home route
router.get("/home",isLoggedIn,function(req,res){
	res.redirect("/home/visited");
})
// New place Form
router.get("/home/add",isLoggedIn,function(req,res){
	res.render("addplace");
})
// New place Creation
router.post("/home",isLoggedIn,function(req,res){
    var place={
        city:req.body.city,
        imgurl:req.body.imgurl,
        description:req.body.description,
        visited:req.body.visited,
        bucketList:req.body.bucketList,
        travelDate:req.body.travelDate
    }
    addPlace(req,res,place);
	res.redirect("/home/visited");
})
// Place deletion
router.get("/home/:id/delete",isLoggedIn,function(req,res){
    deletePlace(req.params.id)
    res.redirect("/home");
})
// Edit form
router.get("/home/:id/edit",isLoggedIn,function(req,res){
	Place.findById(req.params.id,function(err,place){
		if(err){
			console.log(err);
		}
		else{
			res.render("edit",{place:place});
		}
	})
})
// Place Update Route
router.put("/home/visited/:id",isLoggedIn,function(req,res){
    updatePlace(req.params.id,req.body.place);
    res.redirect("/home");
})
// Home page
router.get("/home/:mode",isLoggedIn,function(req,res){
	if(req.params.mode=="bucket"){
		Place.find({bucketList:true,username:req.user.username},function(err,bucketPlaces){
			if(err){
				console.log(err);
			}
			else{
				res.render("home",{places:bucketPlaces,mode:true})			
			}
		})
    }
	else if(req.params.mode=="visited"){
		Place.find({$and:[{visited:true,username:req.user.username}]},function(err,visitedPlaces){
			if(err){
				console.log(err);
			}
			else{
				res.render("home",{places:visitedPlaces,mode:false})
			}
		})
	}
})



// Function to update
function updatePlace(ID,place){
    Place.findByIdAndUpdate(ID,place,function(err,place){
		if(err){
			console.log(err);
        }
    })
    return;

}
// Function to Delete
function deletePlace(ID){
    Place.findByIdAndRemove(ID,function(err){
		if(err){
			console.log(err);
		}
	})
}

// Function to Create place
function addPlace(req,res,place){
    if(place.visited==undefined){
        place.visited=false;
    }else if(place.bucketList==undefined){
        place.bucketList=false;
    }
    
    if((place.visited==undefined)&&(place.bucketList==undefined)){
        return;
    }else{
        Place.create(place,function(err,place){
            if(err)
            {
                console.log(err+"hlo");
            }
            else{
                place.userId=req.user._id;
                place.username=req.user.username;
                place.save();
            }
        })
    }
    return;
}
// Function to whether user is logged in
function isLoggedIn(req,res,next){
	if(req.isAuthenticated()){
		return next();
	}
	else{
		res.redirect("/")
	}
}
module.exports=router;