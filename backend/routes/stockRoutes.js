const express = require("express");
const router = express.Router();
const stockController = require("../controllers/stockController");
const auth = require("../middleware/auth");

router.post("/move", auth, stockController.addMovement);
router.get("/movements", auth, stockController.getMovements);

module.exports = router;
