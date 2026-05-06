const StockMovement = require("../models/StockMovement");
const Product = require("../models/Product");
const notifController = require("./notificationController");

exports.addMovement = async (req, res) => {
  try {
    const { productId, type, quantity, reason } = req.body;
    
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: "Product not found" });

    // Update stock level
    if (type === "IN") {
      product.stock += Number(quantity);
      
      await notifController.createNotification({
        title: "Stock Received",
        message: `${quantity} units of ${product.name} have been added to inventory.`,
        type: "success",
        link: "/inventory/in"
      });

    } else if (type === "OUT") {
      if (product.stock < quantity) return res.status(400).json({ message: "Insufficient stock" });
      product.stock -= Number(quantity);

      if (product.stock < 10) {
        await notifController.createNotification({
          title: "Low Stock Alert",
          message: `${product.name} is now critical (${product.stock} left) after stock-out.`,
          type: "alert",
          link: "/inventory/low"
        });
      }

    } else if (type === "ADJUSTMENT") {
      product.stock = Number(quantity);
    }

    await product.save();

    const movement = new StockMovement({ productId, type, quantity, reason });
    await movement.save();

    res.status(201).json({ message: "Stock updated successfully", product });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getMovements = async (req, res) => {
  try {
    const movements = await StockMovement.find().populate("productId").sort({ createdAt: -1 });
    res.json(movements);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
