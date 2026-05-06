const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");
const auth = require("../middleware/auth");

router.post("/purchase", auth, orderController.createPurchaseOrder);
router.get("/purchase", auth, orderController.getPurchaseOrders);
router.put("/purchase/:id", auth, orderController.updatePurchaseOrderStatus);

router.post("/sales", auth, orderController.createSalesOrder);
router.get("/sales", auth, orderController.getSalesOrders);
router.put("/sales/:id", auth, orderController.updateSalesOrderStatus);

module.exports = router;
