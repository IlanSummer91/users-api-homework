const express = require("express");
const fs = require("fs");
const router = express.Router();

const users = require("../db/users.json");
const posts = require("../db/posts.json");

router.get("/", (req, res) => {
  res.send(users);
});

router.route("/:id")
  .get((req, res) => {
    const userId = parseInt(req.params.id);
    res.send(users.find(user => user.id === userId));
  })
  .delete((req, res) => {
    const userId = parseInt(req.params.id);
    const index = users.findIndex(user => user.id === userId);
    users.splice(index, 1);
    res.send(fs.writeFileSync("./db/users.json", JSON.stringify(users)));
  })
  .put((req, res) => {
    const userId = parseInt(req.params.id);
    const index = users.findIndex(user => user.id === userId);
    users[index] = {...req.body};
    fs.writeFileSync("./db/users.json", JSON.stringify(users));
    res.send(users[index]);
  });

router.get("/:id/posts", (req, res) => {
  const userId = parseInt(req.params.id);
  res.send(posts.filter(post => post.userId === userId));
});

module.exports = router;