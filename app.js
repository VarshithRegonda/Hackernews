const app = require('express')();
const passport = require('passport');
const bodyParser= require('body-parser');
const mongoose = require('mongoose')
const user =require('./routes/user')
const db = require('./config/keys').uri;
mongoose.connect(db,{useNewUrlParser:true})
.then(()=>console.log('mongodb is connected..'))
.catch(err=>console.log(err));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use('/user',user)
const PORT = process.env.port || 5000;
app.listen(PORT,()=>console.log('sever listening on port' +PORT))
