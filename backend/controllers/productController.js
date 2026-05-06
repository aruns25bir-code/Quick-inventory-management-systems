const Product = require("../models/Product");
const Category = require("../models/Category");
const notifController = require("./notificationController");
const socketHelper = require("../socket");

exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch products" });
  }
};

exports.createProduct = async (req, res) => {
  try {
    const { name, category, supplier, price, stock } = req.body;
    
    if (!name || !category || !supplier || price === undefined || stock === undefined) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const product = await Product.create(req.body);

    if (category) {
      const existing = await Category.findOne({ name: category });
      if (!existing) {
        await Category.create({ name: category });
        socketHelper.emitEvent("categories_changed");
      }
    }

    if (product.stock < 10) {
      await notifController.createNotification({
        title: "Low Stock Alert",
        message: `${product.name} has been added with low stock (${product.stock} units).`,
        type: "alert",
        link: "/inventory/low"
      });
    }

    socketHelper.emitEvent("products_changed");
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message || "Failed to create product" });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    
    if (req.body.category) {
      const existing = await Category.findOne({ name: req.body.category });
      if (!existing) {
        await Category.create({ name: req.body.category });
        socketHelper.emitEvent("categories_changed");
      }
    }
    if (!product) return res.status(404).json({ message: "Product not found" });

    if (product.stock < 10) {
      await notifController.createNotification({
        title: "Low Stock Alert",
        message: `${product.name} is running low on stock (${product.stock} units left).`,
        type: "alert",
        link: "/inventory/low"
      });
    }

    socketHelper.emitEvent("products_changed");
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: "Failed to update product" });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    
    socketHelper.emitEvent("products_changed");
    res.json({ message: "Product deleted" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete product" });
  }
};

exports.getLowStock = async (req, res) => {
  try {
    const products = await Product.find({ stock: { $lt: 10 } });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch low stock" });
  }
};
