const express = require("express");
const { Verify_Access_Token } = require("../middlewares/auth-controller");
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
} = require("../controllers/user-controller");
const {
  getAllProducts,
  getProductById,
} = require("../controllers/product-controller");

//user routes
router.post("/user/login", loginUser);
router.post("/user/signup", signupUser);
router.delete("/user/logout", logoutUser);
router.post("/user/forgot-password", forgotPassword);

//poructs routes
router.get("/products", getAllProducts);
router.get("/product/:id", getProductById);
// router.get("/products/categories", getAllCategories);

//user wish list routes
router.post(
  "user/wishlist/additem",
  Verify_Access_Token,
  addItemToUserWishList
);
router.delete(
  "user/wishlist/deleteitem",
  Verify_Access_Token,
  deleteAllItemsFromWishList
);
router.delete(
  "user/wishlist/deleteitem/:id",
  Verify_Access_Token,
  deleteAnItemFromWishList
);
router.get("user/wishlist", Verify_Access_Token, getWishListItems);

//user cart routes
router.post("user/cart/additem", Verify_Access_Token, addItemToCart);
router.delete(
  "user/cart/removeitem/:id",
  Verify_Access_Token,
  removeItemFromCart
);
router.get("/cart", Verify_Access_Token, getUserCartList);

module.exports = { router: router };
