const mongoose = require("mongoose");

const settingSchema = new mongoose.Schema({
  companyName: { type: String, default: "Quick Inventory" },
  companyEmail: { type: String, default: "admin@quickinventory.com" },
  companyPhone: { type: String, default: "+1234567890" },
  companyAddress: { type: String, default: "123 Business St, Tech City" },
  currency: { type: String, default: "$" },
  timezone: { type: String, default: "UTC" },
  updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
}, { timestamps: true });

module.exports = mongoose.model("Setting", settingSchema);
