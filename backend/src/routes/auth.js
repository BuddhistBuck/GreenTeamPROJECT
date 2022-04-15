// Import express
const express = require("express");
const router = express.Router();

// Import controllers
const {
  userCreate,
  userLogin,
  userVerify,
  userLogout,
} = require("../controllers/userAuth");

const {
  adminCreate,
  adminLogin,
  adminVerify,
  adminLogout,
} = require("../controllers/adminAuth");

// User routes
router.post("/user-create", userCreate);
router.post("/user-login", userLogin);
router.get("/user-verify", userVerify);
router.get("/user-logout", userLogout);

// Admin routes
router.post("/admin-create", adminCreate);
router.post("/admin-login", adminLogin);
router.get("/admin-verify", adminVerify);
router.get("/admin-logout", adminLogout);

module.exports = router;
