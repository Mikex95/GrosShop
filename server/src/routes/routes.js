const express = require("express");
const {
  Verify_Access_Token,
  Create_New_Access_Token,
} = require("../middlewares/auth-controller");
const router = express.Router();
const {
  loginUser,
  signupUser,
  logoutUser,
  forgotPassword,
  addItemToUserWishList,
  deleteAllItemsFromWishList,
  deleteAnItemFromWishList,
  getWishListItems,
  addItemToCart,
  removeItemFromCart,
  getUserCartList,
  resetPassword,
  verificationEmail,
  getUserProfile,
} = require("../controllers/user-controller");
const {
  getAllProducts,
  getProductById,
} = require("../controllers/product-controller");

//user routes
router.post("/user/login", loginUser);
router.post("/user/signup", signupUser);
router.post("/user/verify-email", verificationEmail);
router.delete("/user/logout", logoutUser);
router.post("/user/forgot-password", forgotPassword);
// router.post("/user/reset-password/:token", resetPassword);
router.post("/user/reset-password", resetPassword);
router.get("/user/profile", Verify_Access_Token, getUserProfile);

// silent refresh
router.post("/user/silent-refresh", Create_New_Access_Token);

//poructs routes
router.get("/products", getAllProducts);
router.get("/product/:id", getProductById);
// router.get("/products/categories", getAllCategories);

//user wish list routes
router.post(
  "/user/wishlist/additem",
  Verify_Access_Token,
  addItemToUserWishList
);
router.delete(
  "/user/wishlist/deleteitems",
  Verify_Access_Token,
  deleteAllItemsFromWishList
);
router.delete(
  "/user/wishlist/deleteitem/:id",
  Verify_Access_Token,
  deleteAnItemFromWishList
);
router.get("/user/wishlist", Verify_Access_Token, getWishListItems);

//user cart routes
router.post("/user/cart/additem", Verify_Access_Token, addItemToCart);
router.delete(
  "/user/cart/removeitem/:id",
  Verify_Access_Token,
  removeItemFromCart
);
router.get("/user/cart", Verify_Access_Token, getUserCartList);

module.exports = { router: router };
