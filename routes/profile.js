
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

const Profile = require("../models/profile");
const User =require("../models/user")
const validateProfileInput=require("../validation/profile") 



//get current users profile
router.get(
  "/profile",
  // passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        if (!profile) {
          errors.noprofile = "There is no profile for this user";
          return res.status(400).json(errors);
        }
        res.json(profile);
      })
      .catch(err => {res.status(404).json(err)
  });

//create and update user profile
router.post(
  "/allposts",(req,res)=>{
    const errors ={}
    Profile.find().then(profile=>{
      if(!profile){
        errors.noprofile="profile not found"
        res.status(404).json(errors);
      }
      res.json(profiles);
    })
  .catch(err=>{
    res.status(404).json({profile:"no Profiles found"});
  });
  })
  
    });
    router.get("/handle/:handle",(req,res)=>{
      const errors={};
      Profile.findOne({handle:req.params.handle})
      .then(profile=>{
        if(!profile){
          errors.noprofile="There is no Profile for this user";
          res.status(404).json(errors);
        }
        res.json(profile);
        })
        .catch(err=>
          res.status(404).json({profile:"this is no profile for this user "})
          );
        })
    
        router.get("/user/:user_id", (req, res) => {
          console.log("test");
          const errors = {};
          Profile.findOne({ user: req.params.user_id })
            .then(profile => {
              if (!profile) {
                errors.noprofile = "There is no profile for this user";
                res.status(404).json(errors);
              }
              res.json(profile);
            })
            .catch(err =>
              res.status(404).json({ profile: "There is no profile for this user" })
            );
        });
  router.post(
    "/",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
      const { errors, isValid } = validateProfileInput(req.body);
      //console.log(req.body);
      //check validation
      if (!isValid) {
        return res.status(400).json(errors);
      }
      const profileFields = {};
    //getting id from logged in user
    profileFields.user = req.user.id;
    //checking if handle is sent through our form
    if (req.body.handle) {
      profileFields.handle = req.body.handle;
    }
    if (req.body.company) {
      profileFields.company = req.body.company;
    }
    if (req.body.website) {
      profileFields.website = req.body.website;
    }
    if (req.body.location) {
      profileFields.location = req.body.location;
    }
    if (req.body.status) {
      profileFields.status = req.body.status;
    }
    if (req.body.bio) {
      profileFields.bio = req.body.bio;
    }
    if (req.body.githubusername) {
      profileFields.githubusername = req.body.githubusername;
    }
    //skills split into array
    if (typeof req.body.skills !== "undefined") {
      profileFields.skills = req.body.skills.split(",");
    }
    //social
    profileFields.social = {};
    if (req.body.youtube) {
      profileFields.social.youtube = req.body.youtube;
    }
    if (req.body.twitter) {
      profileFields.social.twitter = req.body.twitter;
    }
    if (req.body.linkedin) {
      profileFields.social.linkedin = req.body.linkedin;
    }
    if (req.body.facebook) {
      profileFields.social.facebook = req.body.facebook;
    }
    if (req.body.instagram) {
      profileFields.social.instagram = req.body.instagram;
    }

    Profile.findOne({ user: req.user.id }).then(profile => {
      if (profile) {
        //update
        Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        ).then(profile => {
          res.json(profile);
        });
      } else {
        //create
        //check if handle exists
        Profile.findOne({ handle: profileFields.handle }).then(profile => {
          if (profile) {
            errors.handle = "That handle already exists";
            res.status(400).json(errors);
          }
          //save profile
          new Profile(profileFields).save().then(profile => {
            res.json(profile);
          });
        });
      }
    });
  }
);

//add experience
router.post(
  "/experience",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateExperienceInput(req.body);
    //console.log(req.body);
    //check validation
    if (!isValid) {
      return res.status(400).json(errors);
    }

    Profile.findOne({ user: req.user.id }).then(profile => {
      const newExp = {
        title: req.body.title,
        company: req.body.company,
        location: req.body.location,
        from: req.body.from,
        to: req.body.to,
        current: req.body.current,
        description: req.body.description
      };
      //add to profile
      profile.experience.unshift(newExp);

      profile.save().then(profile => {
        res.json(profile);
      });
    });
  }
);

//add education


//delete experience
router.delete(
  "/experience/:exp_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        //console.log(profile);
        //get index to remove
        const removeindex = profile.experience
          .map(item => item.id)
          .indexOf(req.params.exp_id);
        //console.log(removeindex);
        //splice out of array
        profile.experience.splice(removeindex, 1);
        //console.log(profile);
        profile.save().then(profile => {
          console.log(profile);
          res.json(profile);
        });
        //console.log(profile);
      })
      .catch(err => res.status(404).json(err));
  }
);
  
module.exports = router
