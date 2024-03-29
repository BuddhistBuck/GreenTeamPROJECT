const mongoose = require("mongoose");

// MongoDB AdminList Schema 
const adminListSchema = new mongoose.Schema({
  listTitle: {
    type: String,
    required: true,
  },
  listTerms: {
    type: [String],
    default: "",
  },
});

module.exports = mongoose.model("AdminList", adminListSchema);
