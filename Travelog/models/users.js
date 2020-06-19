var mongoose=require("mongoose")
var passportLocal=require("passport-local-mongoose");

var userSchema = new mongoose.Schema({
    yourName:String,
    email:String,
    phone:String,
    username:String,
    password:String
})
userSchema.plugin(passportLocal);
module.exports=mongoose.model("user",userSchema)