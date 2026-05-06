const Report = require("../models/Report");

exports.getReports = async (req, res) => {
  try {
    const reports = await Report.find().sort({ createdAt: -1 });
    res.json(reports);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createReport = async (req, res) => {
  try {
    const { name, category } = req.body;
    const newReport = new Report({
      name,
      category: category || "Sales",
      createdBy: req.user.name || "System User"
    });
    await newReport.save();
    res.status(201).json(newReport);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteReports = async (req, res) => {
  try {
    console.log("Delete All Reports requested");
    const result = await Report.deleteMany({});
    console.log("Delete result:", result);
    res.json({ message: "All reports cleared", count: result.deletedCount });
  } catch (error) {
    console.error("Delete All Reports error:", error);
    res.status(500).json({ message: error.message });
  }
};
