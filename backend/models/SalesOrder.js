const mongoose = require("mongoose");

const salesOrderSchema = new mongoose.Schema({
  customerName: { type: String, required: true },
  items: [{
    product: { type: String, required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true }
  }],
  totalAmount: { type: Number, required: true },
  status: { type: String, enum: ["Pending", "Shipped", "Delivered", "Cancelled"], default: "Pending" },
  orderDate: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model("SalesOrder", salesOrderSchema);
