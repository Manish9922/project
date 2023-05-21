//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const kebabCase = require('lodash/kebabCase');

const aboutContent = `We are developers of this web blog and lets build it together. If any issues are faced then kindly contact us...`
const contactContent = "Phone no : +91-9523338938 || Email id : mimanish54@gmail.com";

const app = express();
var posts = [];
var user;

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", function(req, res) {
  res.render("home", {
    user: user,
    posts: posts
  });
});

app.get("/about", function(req, res) {
  res.render("about", {
    aboutContent: aboutContent,
    contactContent: contactContent
  });
});

app.get("/login", function(req, res) {
  res.render("login");
});

app.post("/login", function(req, res) {
  const username = {
    username: req.body.username
  };
  user=username.username;
  res.redirect("/");
  
});

app.get("/compose", function(req, res) {
  res.render("compose");
});

app.get("/posts/:postTitle", function(req, res) {
  var requestedTitle = kebabCase(req.params.postTitle);
  var c=0;
  posts.forEach(function(post) {
    var postTitle = kebabCase(post.title);
    if (postTitle === requestedTitle) {
      c=1;
      res.render("post", {
        postTitle : post.title,
        postBody : post.body
      });
    }
  });
  if (c==0){
    res.render("error");
  }
});

app.post("/compose", function(req, res) {
  const post = {
    title: req.body.postTitle,
    body: req.body.postBody
  };
  posts.push(post);
  res.redirect("/");
  
});

app.listen(process.env.PORT || 3000, function() {
  console.log("Server started");
});
//server : https://lit-retreat-52782.herokuapp.com
