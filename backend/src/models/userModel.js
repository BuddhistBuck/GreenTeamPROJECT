const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      index: true,
      min: 3,
      max: 20,
      default: "",
      lowercase: true,
    },
    firstName: {
      type: String,
      required: true,
      trim: true,
      min: 3,
      max: 20,
      default: "",
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
      min: 3,
      max: 20,
      default: "",
    },
    occupation: {
      type: String,
      trim: true,
      min: 3,
      max: 20,
      default: "Not listed",
    },
    password: {
      type: String,
      required: true,
      default: "",
    },
    subscriptionStatus: {
      type: Boolean,
      default: false,
    },
    lastLoggedIn: {
      type: Date,
      default: Date.now,
    },
    emailConfirmed: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

userSchema.methods.generateHash = function (password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

userSchema.methods.validPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model("User", userSchema);
