const express = require("express");
const router = express.Router();
const reportController = require("../controllers/reportController");
const auth = require("../middleware/auth");

router.get("/", auth, reportController.getReports);
router.post("/", auth, reportController.createReport);
router.delete("/", auth, reportController.deleteReports);

module.exports = router;
