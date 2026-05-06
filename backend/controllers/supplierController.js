const Supplier = require("../models/Supplier");
const socketHelper = require("../socket");

exports.getSuppliers = async (req, res) => {
  try {
    const suppliers = await Supplier.find().sort({ createdAt: -1 });
    res.json(suppliers);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch suppliers" });
  }
};

exports.createSupplier = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) return res.status(400).json({ message: "Supplier name is required" });

    const supplier = await Supplier.create(req.body);
    socketHelper.emitEvent("suppliers_changed");
    res.status(201).json(supplier);
  } catch (error) {
    res.status(500).json({ message: "Failed to create supplier" });
  }
};

exports.deleteSupplier = async (req, res) => {
  try {
    const supplier = await Supplier.findByIdAndDelete(req.params.id);
    if (!supplier) return res.status(404).json({ message: "Supplier not found" });
    
    socketHelper.emitEvent("suppliers_changed");
    res.json({ message: "Supplier deleted" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete supplier" });
  }
};
