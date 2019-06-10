const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const UserSchema = new Schema({
  username:{
      type:String,
      required:true
  } ,
  email:{
      type:String,
      unique:true,
      required:true,
  },
  password:{
      type:String,
      required:true
  },
  date:{
      type:Date,
      default:Date.now
  }
})
const User = mongoose.model("User",UserSchema)
module.exports=User;