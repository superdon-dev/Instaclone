const express = require("express");
const requireLogin = require("../middlewares/requireLogin");
const router = express.Router();

const Post = require("../models/post");

router.get("/posts", (req, res) => {
  Post.find()
    .populate("postedBy", "_id name")
    .then((posts) => {
      res.json({ posts });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post("/create-post", requireLogin, (req, res) => {
  const { title, body, photo } = req.body;
  if (!title || !body) {
    res.status(422).json({ error: "Please add all the fields." });
  }
  req.user.password = undefined;
  const post = new Post({ title, body, photo, postedBy: req.user });
  post
    .save()
    .then((result) => {
      res.json({ post: result });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get("/my-post", requireLogin, (req, res) => {
  Post.find({ postedBy: req.user._id })
    .populate("postedBy", "_id name")
    .then((post) => {
      res.json({ post });
    })
    .catch((err) => console.log(err));
});

module.exports = router;
