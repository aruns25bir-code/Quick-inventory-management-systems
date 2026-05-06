const router = require("express").Router();
const auth = require("../middleware/auth");
const { 
  getNotifications, 
  markAsRead, 
  clearNotifications 
} = require("../controllers/notificationController");

router.get("/", auth, getNotifications);
router.put("/:id/read", auth, markAsRead);
router.delete("/", auth, clearNotifications);

module.exports = router;
