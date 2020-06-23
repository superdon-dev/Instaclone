const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const requireLogin = require("../middlewares/requireLogin");
const { JWT_SECRET } = require("../env");
const router = express.Router();

const User = require("../models/user");

router.get("/protected", requireLogin, (req, res) => {
  res.send("Hello User");
});

router.post("/signup", (req, res) => {
  const { name, email, password } = req.body;
  if (!email || !password || !name) {
    return res.status(422).json({ error: "Please add all fields." });
  }
  User.findOne({ email: email })
    .then((savedUser) => {
      if (savedUser) {
        return res.status(422).json({ error: "User already exists." });
      }
      bcrypt.hash(password, 12).then((hashedPassword) => {
        const user = new User({ email, name, password: hashedPassword });
        user
          .save()
          .then((user) => {
            res.json({ message: "User signed up." });
          })
          .catch((err) => {
            console.log(err);
          });
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post("/login", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(422).json({ error: "Please add email and password." });
  }
  User.findOne({ email: email }).then((savedUser) => {
    if (!savedUser) {
      return res.status(422).json({ error: "Incorrect credentials." });
    }
    bcrypt
      .compare(password, savedUser.password)
      .then((doMatch) => {
        if (doMatch) {
          const token = jwt.sign({ _id: savedUser._id }, JWT_SECRET);
          const { _id, name, email, followers, following } = savedUser;
          res.json({ token, user: { _id, name, email, followers, following } });
        } else {
          return res.status(422).json({ error: "Incorrect credentials." });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  });
});

module.exports = router;
