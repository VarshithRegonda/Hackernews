const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const 
const Blog = require('../models/blog');
const passport = require('passport')
const jwt = require('jsonwebtoken')
const validateBlogInput=require("../validation/blog") 
router.get("/",(req,res)=>{
    console.log("dskfadskasfadsfas")
    Blog.find().sort({
        date:-1
    })
.then(post=>{
    if(!post){
        return res.status(404).json({
            nobologs:"no post found"
        })
    }
    res.json(post);
})
.catch(err=>{
    res.status(404).json(err);
})
})
router.get("/blog/",(req,res)=>{
    console.log("fsafas333######################")
    Blog.findById(req.params.id)
.then(post=>{
    if(!post){
        return res
         .status(404)
         .json({
             nonpostfound:"No Post found with that id"
         })
    }
  return   res.json(post)
})
.catch(err=>{
    res.status(404).json(err)
})
})
 router.post('/submit/',(req,res)=>{
    
    console.log("fadsfdsfa", req.body)
    const {
        errors,
        isValid
    }=validateBlogInput(req.body);
    
if (!isValid) {
        return res.status(400).json(errors);
}
    
        const newBlog = new Blog({
            title: req.body.title,
            author:req.body.author,
            comments:req.body.comments,
            user : req.user.id
        })
        newBlog.save().then(blog=>{
            res.json(blog)
        console.log("blog is saved")
        })
    })

router.delete( "blog/submit/:id",passport.authenticate("jwt",{
    session:false
}),(req,res)=>{
    Blog.findById(req.params.id).then(post=>{
        if(post.user.toString()!==req.user.id){
            return res.status(401).json({
                notauthorized: "User not authorized"
            });
        }
        if(!post){
            return res.status(404).json({
                postnotfound: "No Post found"
            })
        }
        post.remove().then(()=>{
            res.json({
                msg:"Post deleted"
            })
        })
        .catch(err=>{
            res.status(404).json(err);
        })
    })
})

router.post(
    "/like/post/:id",
    passport.authenticate("jwt", {
      session: false
    }),
    (req, res) => {
      Profile.findOne({
        user: req.user.id
      }).then(profile => {
        Blog.findById(req.params.postid).then(post => {
          if (!post) {
            return res.status(404).json({
              postnotfound: "No Blog found"
            });
          }
        if(
            post.likes.filter(like=>like.user.toString===req.user.id).length>0
        ){
            return res 
            .status(400)
            .josn({
                alreadyliked: "User already liked this post"
            });
         }
         post.likes.unshift({
             user:req.user.id
         })
Blog.save().then(post=>{
    res.json(post)
})
})
      })
    })
router.post("/unlike/blog/:id",passport.authenticate("jwt",{
session:false
}),
(req,res)=>{
    Profile.findOne({
        user:req.user.id
    }).then(profile=>{
        Profile.findById(req.params.postid).then(post=>{
            if(!post){
                return res.status(404).json({
                    postnotfound: " No blog found"
                }) 
            }
            if(
                post.likes.filter(like=>like.user.toString().length===0) 
            ){
                return res
            .status(400)
            .json({
              notliked: "You have not liked the post"
            });
        }
        const removeIndex = post.likes
          .map(item => item.user.toString())
          .indexOf(req.user.id);

        //remove out of array
post.likes.splice(removeIndex, 1);

        post
          .save()
          .then(post=> {
            res.json(post);
          })
          .catch(err => {
            res.status(404).json(err);
          });
      });
    });
  }
);
router.post("/unlike/:post",passport.authenticate(jwt,{
    session:false
}),
(req,res)=>{
Blog.findOne({
    user:req.user.id
}).then(profile=>{
    Blog.findOne(req.params.postid).then(post=>{
        if(!post){
            return res.status(404).json({
                postnotfound:"no post found "
            })
        }
        
    })
})
    
        })

router.delete('/comment/:id/:comment_id', passport.authenticate('jwt', { session: false }), (req, res) => {

    post.findById(req.params.id).then((post) => {
      //check if the comment exists
      if (post.comments.filter(comment => comment._id.toString() === req.params.comment_id).length === 0) {
        return res.status(404).json({ commentNotFound: 'Comment not found' });
      }
  
      //get remove index
      const removeIndex = post.comments.map(item => item._id.toString()).indexOf(req.params.comment_id)
      //console.log(removeIndex);
  
      //splice comment to remove
post.comments.splice(removeIndex, 1);
      post.save().then(post => res.json(post)).catch((err) => {
        res.status(404).json({ postnotfound: 'No Post Found' })
      })
    });
  });


module.exports=router;