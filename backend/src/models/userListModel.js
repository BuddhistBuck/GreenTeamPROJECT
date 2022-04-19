const mongoose = require("mongoose");

const userListSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  listTitle: {
    type: String,
    lowercase: true,
    required: true,
  },
  listTerms: {
    type: [String],
    default: "",
    lowercase: true,
  },
});

module.exports = mongoose.model("UserList", userListSchema);
