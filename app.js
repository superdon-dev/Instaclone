const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth");
const postRoutes = require("./routes/post");
const userRoutes = require("./routes/user");

const { MONGO_URL } = require("./env");
const app = express();
const PORT = 5000;

mongoose.connect(MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(express.json());
app.use(authRoutes);
app.use(postRoutes);
app.use(userRoutes);

app.listen(PORT, () => {
  console.log("Server is running...");
});
