const router = require("express").Router();
const auth = require("../middleware/auth");
const { getSuppliers, createSupplier, deleteSupplier } = require("../controllers/supplierController");

router.get("/", auth, getSuppliers);
router.post("/", auth, createSupplier);
router.delete("/:id", auth, deleteSupplier);

module.exports = router;
