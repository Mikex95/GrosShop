const colors = require("colors");
const { Product } = require("../models/product-model");
/* 
  ┌─────────────────────────────────────────────────────────────────────────┐
  │ //?   @description : Fetch All Products                                                │
  │ //?   @method : GET /api/products                                                     │
  │ //?   @access : Public Route                                                      │
  └─────────────────────────────────────────────────────────────────────────┘
 */
const getAllProducts = async (req, res) => {
  const allProducts = await Product.find({});
  res.json({ allProducts });
};

/* 
  ┌─────────────────────────────────────────────────────────────────────────┐
  │ //?   @description : Get a single product based on ID                                    │
  │ //?   @method : /api/product/:id                                                    │
  │ //?   @access : Public Route                                                        │
  └─────────────────────────────────────────────────────────────────────────┘
 */
const getProductById = async (req, res) => {
  const theProduct = await Product.findById(req.params.id);
  if (theProduct) {
    res.send(theProduct);
  } else {
    res.status(404).json({ message: "Something went wrong :(" });
  }
};

module.exports = {
  getAllProducts: getAllProducts,
  getProductById: getProductById,
};
