const mongoose =require('mongoose')
const Schema  =mongoose.Schema
const commentsSchema = new Schema({
    user:{
        type:Schema.Types.ObjectId,
        ref:"User"
    },
    comments:{
        type:String
    },
    description:{
     type:String
},
upvotes:{
    type:Number
}
})
const Comment = mongoose.model("Comment",commentsSchema)
module.exports=Comment