const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
   name : {type:String, default:["guest"]},
   email : {type:String, required:[true, "email is required"]},
   password : {type:String, required:[true, "password is required"]},
   notes : {type:[mongoose.Schema.Types.ObjectId], default : [] }
})



module.exports = new mongoose.model("users", userSchema);