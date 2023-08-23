const mongoose = require("mongoose");

// MongoDB AdminEvent Schema 
const adminEventSchema = new mongoose.Schema({
  admin: {
    type: String,
    required: true,
  },
  eventType: {
    type: String,
    required: true,
  },
  eventDetails: {
    type: String,
    required: true,
  },
  timeCreated: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("AdminEvent", adminEventSchema);
