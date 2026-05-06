const mongoose = require("mongoose");

const supplierSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, default: "" },
  phone: { type: String, default: "" },
  address: { type: String, default: "" },
  category: { type: String, enum: ["Premium", "Standard"], default: "Standard" }
}, { timestamps: true });

module.exports = mongoose.model("Supplier", supplierSchema);
