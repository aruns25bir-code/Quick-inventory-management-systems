const PurchaseOrder = require("../models/PurchaseOrder");
const SalesOrder = require("../models/SalesOrder");
const Product = require("../models/Product");
const socketHelper = require("../socket");

exports.createPurchaseOrder = async (req, res) => {
  try {
    const order = new PurchaseOrder(req.body);
    await order.save();
    socketHelper.emitEvent("orders_changed");
    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getPurchaseOrders = async (req, res) => {
  try {
    const orders = await PurchaseOrder.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updatePurchaseOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const order = await PurchaseOrder.findById(id);
    
    if (!order) return res.status(404).json({ message: "Order not found" });

    if (status === "Received" && order.status !== "Received") {
      for (const item of order.items) {
        await Product.findOneAndUpdate(
          { name: item.product },
          { $inc: { stock: item.quantity } }
        );
      }
      socketHelper.emitEvent("products_changed");
    }

    order.status = status;
    await order.save();
    socketHelper.emitEvent("orders_changed");
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createSalesOrder = async (req, res) => {
  try {
    const order = new SalesOrder(req.body);
    await order.save();
    socketHelper.emitEvent("orders_changed");
    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getSalesOrders = async (req, res) => {
  try {
    const orders = await SalesOrder.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateSalesOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const order = await SalesOrder.findById(id);

    if (!order) return res.status(404).json({ message: "Order not found" });

    if (status === "Shipped" && order.status !== "Shipped") {
      for (const item of order.items) {
        const product = await Product.findOne({ name: item.product });
        if (product) {
          product.stock -= item.quantity;
          await product.save();
        }
      }
      socketHelper.emitEvent("products_changed");
    }

    order.status = status;
    await order.save();
    socketHelper.emitEvent("orders_changed");
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
