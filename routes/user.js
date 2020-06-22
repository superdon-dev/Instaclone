const express = require("express");
const requireLogin = require("../middlewares/requireLogin");
const router = express.Router();

const Post = require("../models/post");
const User = require("../models/user");

router.get("/user/:userId", requireLogin, (req, res) => {
  User.findOne({ _id: req.params.userId })
    .select("-password")
    .then((user) => {
      Post.find({ postedBy: req.params.userId })
        .populate("postedBy", "_id name")
        .exec((err, posts) => {
          if (err) {
            return res.status(422).json({ error: err });
          }
          res.json({ user, posts });
        });
    })
    .catch((err) => {
      return res.status(404).json({ error: "User not found." });
    });
});

module.exports = router;
