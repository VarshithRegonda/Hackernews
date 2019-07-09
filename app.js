const app = require('express')();
const passport = require('passport');
const ejs = require('ejs')
const bodyParser = require('body-parser');
const mongoose = require('mongoose')
const users = require('./routes/user')
const profile = require('./routes/profile')
var blogs = require('./routes/blog')
const jwt = require("jsonwebtoken")
const db = require('./config/keys').uri;
const Blogs = require('./models/blog')
mongoose.connect(db, {
        useNewUrlParser: true,
        useCreateIndex: true
    })
    .then(() => console.log('mongodb is connected..'))
    .catch(err => console.log(err));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: false
}))
app.set('view engine', 'ejs')
app.use('/user', users)
app.use('/profile', profile);
app.use('/blog', blogs)
app.use(passport.initialize());
app.get('/', function (req, res) {
    res.render('home', {
        welcomeMesssage: "This message was rendered on the server",
        headerTitle: "HACKER NEWS HOME PAGE"
    })
    app.get('/login', function (req, res) {
        res.render('login', {
            message: "Enter the credentials"
        })
        
        })
        app.get('/submit/', function (req, res) {
            res.render('addposts', {
                message: "Enter the credentials"
            })
    })
  
    
        })
    
const PORT = process.env.port || 5000;
app.listen(PORT, () => console.log('sever listening on port' + PORT));
