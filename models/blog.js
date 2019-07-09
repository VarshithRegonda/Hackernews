var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BlogSchema = new Schema({
  user:{
    type:Schema.Types.ObjectId,
    ref:"User"
},
  title:  String,
  author: String,
  body:   String,
  comments: [{ body: String, date: Date }],
  date: { type: Date, default: Date.now },
  hidden: Boolean,
  meta: {
    votes: Number,
    favs:  Number
  }
});const Blog = mongoose.model("Blog",BlogSchema);
module.exports=Blog