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