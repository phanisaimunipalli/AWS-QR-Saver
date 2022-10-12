const mongoose = require("mongoose");
// const dynamoose = require("dynamoose");

const UserSchema = new mongoose.Schema({
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
  date: {
    type: Date,
    default: Date.now,
  },
  level: {
    type: String,
    required: true,
  },
});

const User = mongoose.model("user", UserSchema);

// const User = dynamoose.model("User", UserSchema);
// console.log("models.user.User: ", User.email);

module.exports = User;
