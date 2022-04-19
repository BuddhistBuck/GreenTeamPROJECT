const mongoose = require("mongoose");

const adminListSchema = new mongoose.Schema({
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

module.exports = mongoose.model("AdminList", adminListSchema);
