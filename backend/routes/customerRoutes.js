const router = require("express").Router();
const auth = require("../middleware/auth");
const { 
  getCustomers, 
  createCustomer, 
  updateCustomer, 
  deleteCustomer 
} = require("../controllers/customerController");

router.get("/", auth, getCustomers);
router.post("/", auth, createCustomer);
router.put("/:id", auth, updateCustomer);
router.delete("/:id", auth, deleteCustomer);

module.exports = router;
