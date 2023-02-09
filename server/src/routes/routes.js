const express = require("express");
const router = express.Router();
const {
  loginUser,
  signupUser,
  logoutUser,
} = require("../controllers/user-controller");

router.post("/user/login", loginUser);
router.post("/user/signup", signupUser);
router.delete("/user/logout", logoutUser);

module.exports = { router: router };
