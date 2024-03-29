const mongoose = require("mongoose");

// MongoDB UserSession Schema 
const userSessionSchema = new mongoose.Schema({
  userId: {
    type: String,
    default: "",
  },
  timestamp: {
    type: Date,
    default: Date.now(),
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("UserSession", userSessionSchema);
