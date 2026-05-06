const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, default: "Sales" },
  createdBy: { type: String, default: "User" },
  lastVisited: { type: String, default: "-" },
  createdAt: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model("Report", reportSchema);
