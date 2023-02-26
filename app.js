//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const kebabCase = require('lodash/kebabCase');

const homeStartingContent = `Hey! Whatsup...
Welcome to my daily blog website.
Here I will be daily new contents and also share my experience with you.
So be in touch Daily...`
const aboutContent = `I am Manish Kumar Singh, Computer Science Engineer and currently working as Assistant Software Developer at TCS.
Hope my contents are helping you.
If any issues are faced then kindly contact me...`
const contactContent = "Phone no : +91-9523338938 Email id : mimanish54@gmail.com";

const app = express();
const posts = [];

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", function(req, res) {
  res.render("home", {
    homeStartingContent: homeStartingContent,
    posts: posts
  });
});

app.get("/about", function(req, res) {
  res.render("about", {
    aboutContent: aboutContent
  });
});

app.get("/contact", function(req, res) {
  res.render("contact", {
    contactContent: contactContent
  });
});

app.get("/compose", function(req, res) {
  res.render("compose");
});

app.get("/posts/:postTitle", function(req, res) {
  const requestedTitle = kebabCase(req.params.postTitle);

  posts.forEach(function(post) {
    const postTitle = kebabCase(post.title);
    if (postTitle === requestedTitle) {
      res.render("post", {
        postTitle : post.title,
        postBody : post.body
      });
    }
    else{
      res.render("error");
    }
  });
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
