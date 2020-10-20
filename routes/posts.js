const express = require("express");
const fs = require("fs");
const router = express.Router();

const posts = require("../db/posts.json");
const comments = require("../db/comments.json");

router.route("/")
  .get((req, res) => {
    res.send(posts);
  })
  .post((req, res) => {
    const newPost = {...req.body};
    posts.push(newPost);
    fs.writeFileSync("./db/posts.json", JSON.stringify(posts));
    res.send(newPost);
  });


router.route("/:id")
  .get((req, res) => {
    const postId = parseInt(req.params.id);
    res.send(posts.find(post => post.id === postId));
  })
  .delete((req, res) => {
    const postId = parseInt(req.params.id);
    const index = posts.findIndex(post => post.id === postId);
    posts.splice(index, 1);
    res.send(fs.writeFileSync("./db/posts.json", JSON.stringify(posts)));
  })
  .put((req, res) => {
    const postId = parseInt(req.params.id);
    const index = posts.findIndex(post => post.id === postId);
    posts[index] = {...req.body};
    fs.writeFileSync("./db/posts.json", JSON.stringify(posts));
    res.send(posts[index]);
  });

router.get("/:id/comments", (req, res) => {
  const postId = parseInt(req.params.id);
  res.send(comments.filter(comment => comment.postId === postId));
});

module.exports = router;