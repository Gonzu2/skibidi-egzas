const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  date: Date,
  name: String,
  location: String,
  description: String,
  author: String,
  approved: Boolean,
  // image: { type: Buffer },
});

module.exports = mongoose.model("Events", eventSchema);
