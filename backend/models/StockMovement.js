const mongoose = require("mongoose");

const stockMovementSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
  type: { type: String, enum: ["IN", "OUT", "ADJUSTMENT"], required: true },
  quantity: { type: Number, required: true },
  reason: { type: String, default: "" },
  date: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model("StockMovement", stockMovementSchema);
