const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

let posts = []; // In-memory storage

// Home - View all posts
app.get("/", (req, res) => {
  res.render("index", { posts });
});

// New Post Form
app.get("/new", (req, res) => {
  res.render("new");
});

// Create New Post
app.post("/create", (req, res) => {
  const { title, content } = req.body;
  const id = Date.now().toString();
  posts.push({ id, title, content });
  res.redirect("/");
});

// Edit Post Form
app.get("/edit/:id", (req, res) => {
  const post = posts.find(p => p.id === req.params.id);
  res.render("edit", { post });
});

// Update Post
app.post("/update/:id", (req, res) => {
  const { title, content } = req.body;
  const post = posts.find(p => p.id === req.params.id);
  if (post) {
    post.title = title;
    post.content = content;
  }
  res.redirect("/");
});

// Delete Post
app.post("/delete/:id", (req, res) => {
  posts = posts.filter(p => p.id !== req.params.id);
  res.redirect("/");
});

app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});

