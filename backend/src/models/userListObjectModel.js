const mongoose = require("mongoose");

// MongoDB UserListObject Schema 
const userListObjectSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("UserListObject", userListObjectSchema);
