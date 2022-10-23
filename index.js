//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');

const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("views"));

//Database Connection//
mongoose.connect("mongodb+srv://shawntez32:Tezzyk32@cluster0.wpzbm.mongodb.net/?retryWrites=true&w=majority", {useNewUrlParser: true});

//Databases//

//User//
const userSchema = {
  email: String,
  pword: String,
  fname: String,
  lname: String
};

const User = mongoose.model('User', userSchema);

//Book Move//
const bookingSchema = {
  fullName: String,
  email: String,
  phoneNum: String,
  address: String,
  numOfMov: String,
  moveDate: String,
  details: String
};

const BookedMove = mongoose.model('BookedMove', bookingSchema);

const jobBoardSchema = {
  companyName: String,
  location: String,
  date: String,
  payout: String
}

const JobBoard = mongoose.model("JobBoard", jobBoardSchema);


//Home Route//
app.route("/")

.get(function(req, res){
  x = 'Tez';
  if (typeof window !== 'undefined') {
    console.log('You are on the browser')
  } else {
    console.log('You are on the server')
  }

  res.render("home", {user: x});
})

//Sign-Up//
.post(function(req, res){

  const newUser = new User({
    email: req.body.uemail,
    pword: req.body.upword,
    fname: req.body.fname,
    lname: req.body.lname
  });

  newUser.save(function(err){
    if (!err){
      console.log(req.body.uemail);
      res.redirect("/");
    } else {
      res.send(err);
    }
  });
})

//Login//

//Delete Account//
.delete(function(req, res){

  User.deleteMany(function(err){
    if (!err){
      res.send("Successfully deleted all Users.");
    } else {
      res.send(err);
    }
  });
});

//Client//
app.route("/Client")

//Book Move//
.post(function(req,res){
  const newMove = new BookedMove({
    fullName: req.body.fullName,
    email: req.body.email,
    phoneNum: req.body.phoneNum,
    address: req.body.address,
    numOfMov: req.body.numOfMov,
    moveDate: req.body.moveDate,
    details: req.body.details
  });

  const jobBoardPost = new JobBoard({
    companyName: req.body.email,
    location: req.body.address,
    date: req.body.moveDate,
    payout: '$15 per hour'
  });


  newMove.save(function(err){
    if(!err) {
      console.log('Success');

      res.render("clientprofile", {clientHistory: defaultJobPost});
    }
  });
});

app.get("/:customClient", function(req,res){
  const customClientName = _.capitalize(req.params.customClient);


});

app.get("/:customUser", function(req, res){
  const customUserName = _.capitalize(req.params.customUser);

  List.findOne({Uname: customUser}, function(err, foundList){
    if (!err){
      if (!foundList){
        res.redirect("home");
      } else {
        //Show an existing list
        res.render("userprofile", {jobBoardSchema: foundList.items});
      }
    }
  });
});

app.get('/booking', function(req,res) {
  const bookings = BookedMove.find({}, function(err, items) {
    res.render("clientprofile");
  });
});

app.post("/booking", function(req,res) {
  x = 2;
});

defaultJobPost = [{
    companyName: 'Mcdowell',
    location: '555 Range RD',
    date: 'Today',
    payout: '$15 per hour'
},{companyName: 'Piqsqual',
location: '8295 Range RD',
date: 'Today',
payout: '$15 per hour'
},{companyName: 'Piqsqual',
location: '8295 Range RD',
date: 'Today',
payout: '$15 per hour'
},{
  companyName: 'Mcdowell',
  location: '555 Range RD',
  date: 'Today',
  payout: '$15 per hour'
},{companyName: 'Piqsqual',
location: '8295 Range RD',
date: 'Today',
payout: '$15 per hour'
},{companyName: 'Piqsqual',
location: '8295 Range RD',
date: 'Today',
payout: '$15 per hour'
},{
  companyName: 'Mcdowell',
  location: '555 Range RD',
  date: 'Today',
  payout: '$15 per hour'
},{companyName: 'Piqsqual',
location: '8295 Range RD',
date: 'Today',
payout: '$15 per hour'
},{companyName: 'Piqsqual',
location: '8295 Range RD',
date: 'Today',
payout: '$15 per hour'
}]

//User//
app.post("/LoginUser", function(req,res) {
  const uemail = req.body.uemail;
  const upword = req.body.upword;
  
  User.findOne({email:uemail}, function(err, foundUser) {
    if(foundUser.legnth ) {
      JobBoard.find({}, function(err, jobPost) {
        if(!err) {

          res.render("userprofile", {jobBoardPost:defaultJobPost});
        }
      })
      
    }else{
      res.render("home");
    }
  });
});



const port = process.env.PORT;
if (port == null || port == '') {
  let port = 5500;
}

app.get("/new1", function(req,res){
  res.redirect("google.com");
});

app.listen(5500, function() {
  console.log("Server has started Successfully!");
});
