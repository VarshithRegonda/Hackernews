const jwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const mongoose = require('mongoose');
const User = mongoose.model('User');
const keys = require('./keys');

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrKey;

module.exports = passport =>{
    passport.use(new jwtStrategy(opts,(jwt_payload, done) =>{  //jwt payload is the user info
       User.findById(jwt_payload.id).then((user) =>{
           if(user){
               return done(null,user);//if we find a user
           }
           return done(null,false);//if we doesnt find a user

       }).catch((err) =>{
           console.log(err);
       })
    }));
};