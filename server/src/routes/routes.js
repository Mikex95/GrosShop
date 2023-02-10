const express = require("express");
const router = express.Router();
const {
  loginUser,
  signupUser,
  logoutUser,
  forgotPassword,
} = require("../controllers/user-controller");

router.post("/user/login", loginUser);
router.post("/user/signup", signupUser);
router.delete("/user/logout", logoutUser);
router.post("/user/forgot-password", forgotPassword);

module.exports = { router: router };
