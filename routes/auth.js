const express = require("express");
const bcrypt = require("bcryptjs");
const router = express.Router();

const User = require("../models/user");

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

router.post("/signin", (req, res) => {
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
          res.json({ message: "Successfully signed in." });
        } else {
          return res.status(422).json({ error: "Incorrect credentials." });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  });
});
router.get("/", (req, res) => {
  res.send({ message: "Welcome" });
});

module.exports = router;
