var mongoose=require("mongoose");

var placeSchema=new mongoose.Schema({
    city:String,
    imgurl:String,
    description:String,
    visited:Boolean,
    bucketList:Boolean,
    travelDate:String,
    username:String,
    userId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"user",
        }
});
module.exports=mongoose.model("place",placeSchema);