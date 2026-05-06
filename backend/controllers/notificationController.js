const Notification = require("../models/Notification");
const socketHelper = require("../socket");

exports.getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find().sort({ createdAt: -1 }).limit(20);
    res.json(notifications);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch notifications" });
  }
};

exports.markAsRead = async (req, res) => {
  try {
    await Notification.findByIdAndUpdate(req.params.id, { read: true });
    socketHelper.emitEvent("notifications_changed");
    res.json({ message: "Notification marked as read" });
  } catch (error) {
    res.status(500).json({ message: "Failed to update notification" });
  }
};

exports.clearNotifications = async (req, res) => {
  try {
    await Notification.deleteMany({});
    socketHelper.emitEvent("notifications_changed");
    res.json({ message: "All notifications cleared" });
  } catch (error) {
    res.status(500).json({ message: "Failed to clear notifications" });
  }
};

exports.createNotification = async (data) => {
  try {
    const exists = await Notification.findOne({ message: data.message, read: false });
    if (!exists) {
      await Notification.create(data);
      socketHelper.emitEvent("notifications_changed");
    }
  } catch (error) {
    console.error("Internal notification error:", error);
  }
};
