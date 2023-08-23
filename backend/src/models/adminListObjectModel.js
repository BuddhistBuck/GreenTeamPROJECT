const mongoose = require("mongoose");

// MongoDB AdminListObject Schema 
const adminListObjectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
  },
);

module.exports = mongoose.model("AdminListObject", adminListObjectSchema);