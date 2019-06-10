const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('../models/user');

router.post('/signup', function(req, res) {
   bcrypt.hash(req.body.password, 10, function(err, hash){
    console.log(err);  
    if(err) {
         return res.status(500).json({
            error: err

         });

      }
      else {
         const user = new User({
            // _id: new  mongoose.Types.ObjectId(),
            username:req.body.username,
            email: req.body.email,
            password: hash    
         });
         user.save().then(function(result) {
            console.log(result);
            res.status(200).json({
               success: 'New user has been created'
            });
         }).catch(error => {
            res.status(500).json({
               error: err
            });
         });
      }
   });
});

module.exports = router;