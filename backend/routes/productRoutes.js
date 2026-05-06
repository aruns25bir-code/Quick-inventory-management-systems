const router = require("express").Router();
const auth = require("../middleware/auth");
const {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getLowStock
} = require("../controllers/productController");

router.get("/", auth, getProducts);
router.get("/low-stock", auth, getLowStock);
router.post("/", auth, createProduct);
router.put("/:id", auth, updateProduct);
router.delete("/:id", auth, deleteProduct);

module.exports = router;
