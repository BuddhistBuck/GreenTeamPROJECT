const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

// MongoDB Admin Schema 
const adminSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      min: 3,
      max: 20,
      default: "",
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      default: "",
    },
  },
  { timestamps: true }
);

adminSchema.methods.generateHash = function (password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

adminSchema.methods.validPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model("Admin", adminSchema);
