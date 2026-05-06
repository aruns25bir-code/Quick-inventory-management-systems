const router = require("express").Router();
const auth = require("../middleware/auth");
const { register, login, profile, getLoginHistory, getUsers, changePassword } = require("../controllers/authController");

router.post("/register", register);
router.post("/login", login);


router.get("/profile", auth, profile);
router.get("/login-history", auth, getLoginHistory);
router.get("/users", auth, getUsers);
router.post("/change-password", auth, changePassword);

module.exports = router;
