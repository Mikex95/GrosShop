const mongoose = require("mongoose");
const productSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    // product_id: {
    //   type: String,
    //   unique: true,
    // },
    product_name: {
      type: String,
      required: true,
    },
    product_price: {
      type: Number,
      required: true,
    },
    product_weight: {
      type: Number,
      required: true,
    },
    product_measurement: {
      type: String,
      required: true,
    },
    product_category: {
      type: String,
    },
    product_image: {
      type: String,
      default:
        "https://e7.pngegg.com/pngimages/250/132/png-clipart-avatar-creator-android-logo-portafolio-product-design-professional-used-photography-orange-thumbnail.png",
    },
    product_stock: {
      type: Number,
      default: 0,
    },
    product_rating: {
      type: Number,
      min: [1, "Rating must be at least 1"],
      max: [5, "Rating must can not be more than 5"],
    },
  },
  { timestamps: true }
);
const Product = mongoose.model("Products", productSchema, "PRODUCTS");
module.exports = { Product: Product };
