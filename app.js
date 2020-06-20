const express = require("express");
const mongoose = require("mongoose");
const { MONGO_URL } = require("./env");
const app = express();
const PORT = 3000;

mongoose.connect(MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.get("/", (req, res) => {
  res.send("hi");
});

app.listen(PORT, () => {
  console.log("Server is running...");
});
