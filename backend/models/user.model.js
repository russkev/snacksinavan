const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const saltRounds = 10;


const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      unique: false
    },
    lastName: {
      type: String,
      required: false,
      unique: false,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.methods.generateHash = function(password) {
  return bcrypt.hash(password, saltRounds, null)
}

userSchema.methods.validPassword = function(password) {
  return bcrypt.compare(password, this.password);
}

const User = mongoose.model("User", userSchema);
module.exports = User;
