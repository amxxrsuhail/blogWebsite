// !-------------database boilerplate---------------
const mongoose = require("mongoose");
mongoose.connect("mongodb+srv://ameersuhail:AMINAdavood41099@cluster1.e6mhuag.mongodb.net/blogPostDB");

const articleSchema = {
  articleTitle: { type: String, required: true },
  articleContent: { type: String, required: true },
};

const Article = mongoose.model("Article", articleSchema);

// !--------------express boilerplate----------------
const express = require("express");
const port = 4000;

const homeStartingContent =
  "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent =
  "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent =
  "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

const _ = require("lodash");

const ejs = require("ejs");

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  Article.find((err, posts) => {
    res.render("home", {
      summary: homeStartingContent,
      newPost: posts,
    });
  });
});

app.get("/contact", (req, res) => {
  res.render("contact", { contact: contactContent });
});

app.get("/about", (req, res) => {
  res.render("about", { about: aboutContent });
});

app.get("/compose", (req, res) => {
  res.render("compose");
});

// * the below method is taken from express routing docs in order to build dynamic website
// * also this method is used so that we could get hold of the name after "/post/:" in oder to display according to that


app.get("/posts/:postId", (req, res) => {
  const requestedPostId = req.params.postId;

  Article.findOne({ _id: requestedPostId }, (err, post) => {
    res.render("post", {
      individualTitle: post.articleTitle,
      individualSummary: post.articleContent,
    });
  });
});

app.post("/compose", (req, res) => {
  let title = req.body.title;
  let article = req.body.article;

  const newArticle = Article({ articleTitle: title, articleContent: article });
  newArticle.save((err) => {
    if (!err) {
      res.redirect("/");
    }
  });
});

app.listen(port, () => {
  console.log("Server started on port 4000");
});
