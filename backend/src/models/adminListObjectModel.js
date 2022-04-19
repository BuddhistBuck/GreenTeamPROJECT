const mongoose = require("mongoose");

const adminListObjectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
  },
);

module.exports = mongoose.model("AdminListObject", adminListObjectSchema);