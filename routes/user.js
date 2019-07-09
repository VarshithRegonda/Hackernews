const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const User = require('../models/user');
const passport = require('passport')
const validateRegisterInput = require("../validation/registration");
const validateLoginInput = require("../validation/login");

router.post("/register", (req, res,  ) => {
  const {
    errors,
    isValid
  } = validateRegisterInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
    
  }

  User.findOne({
    email: req.body.email
  }).then(user => {
    if (user) {
      return res.status(400).json({
        error: "user exists"
      });
    } else
      var nuser = new User({
        username: req.body.name,
        email: req.body.email,
        password: req.body.password
      });

    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(nuser.password, salt, (err, hash) => {
        if (err) {
          throw err;
        }
        nuser.password = hash;
        nuser
          .save()
          .then(user => res.json(user))
          .catch(err => console.log(err));
      });
    });
  });
  
})

router.post("/login", (req, res) => {
  console.log("dshadhflksahd" +req.body.email);
  console.log("fdsafdasf" +req.body.password)
  const email = req.body.email;
  const password = req.body.password;

  //find user by email
  User.findOne({
    email
  }).then(user => {
    const {
      errors,
      isValid
    } = validateLoginInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    if (!user) {
      errors.email = "user  not found";
      return res.status(404).json(errors);
    }
    
    //check password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        //user matched sign token
        // console.log("ddddddd"+isMatch +user)
        const payload = {
          id: user.id,
          name: user.email,
          password: user.password
        }; //create jwt payload
        jwt.sign(
          payload,
          'secret',
          {
            expiresIn: 3600
          },
          (err,token) => {
            
            res.json({
              success: true,
              token: "Bearer " + token
            });
            res.render('addposts',blog)
          });
      } else {
        return res.status(400).json({
          password: "password incorrect"
        });
      }
    });
  });
});

//return current user (private route)
router.get(
  "/current",
  passport.authenticate("jwt", {
    session: false
  }),
  (req, res) => {
    res.json({
      id: req.user._id,
      name: req.user.username,
      email: req.user.email
    });
  
  }
);

module.exports = router;