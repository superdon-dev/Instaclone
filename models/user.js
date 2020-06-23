const mongoose = require("mongoose");
const { ObjectID, ObjectId } = require("bson");
const Schema = mongoose.Schema;

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  followers: [{ type: ObjectId, ref: "User" }],
  following: [{ type: ObjectId, ref: "User" }],
  image: {
    type: String,
    default:
      "https://res.cloudinary.com/de2hosdqv/image/upload/v1592908362/no-user-image-icon-23_iddbyi.png",
  },
});

module.exports = mongoose.model("User", userSchema);
