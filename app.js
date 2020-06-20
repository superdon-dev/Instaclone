const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth");

const { MONGO_URL } = require("./env");
const app = express();
const PORT = 5000;

app.use(express.json());
app.use(authRoutes);

mongoose.connect(MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
app.listen(PORT, () => {
  console.log("Server is running...");
});
