const mongoose = require("mongoose");
const crypto = require("crypto");
const bcrypt = require("bcrypt");

const userSchema = mongoose.Schema(
  {
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    verify: {
      type: Boolean,
      default: false,
    },
    verificationCode: {
      type: String,
    },
    role: {
      type: String,
      enum: ["USER", "ADMIN"],
      default: "USER",
    },
    shippingAddress: {
      fullname: { type: String },
      address: { type: String },
      city: { type: String },
      postalCode: { type: String },
      state: { type: String },
      phone: { type: String },
    },

    // wishList: [
    //   {
    //     itemId: {
    //       type: mongoose.Schema.Types.ObjectId,
    //       required: true,
    //       ref: "Product",
    //     },
    //     productName: {
    //       type: String,
    //       required: true,
    //     },
    //     productPrice: {
    //       type: Number,
    //       required: true,
    //     },
    //     productImage: {
    //       type: String,
    //       required: true,
    //     },
    //     productRating: {
    //       type: Number,
    //       required: true,
    //     },
    //   },
    // ],
    wishList: [
      {
        itemId: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: "Product",
        },
      },
    ],
    cartList: [
      {
        itemId: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: "Product",
        },
        //   productName: {
        //     type: String,
        //     required: true,
        //   },
        //   productImage: {
        //     type: String,
        //     required: true,
        //   },
        //   productPrice: {
        //     type: Number,
        //     required: true,
        //   },
        //   countInStock: {
        //     type: Number,
        //     required: true,
        //   },
        //   quantity: {
        //     type: Number,
        //     required: true,
        //   },
      },
    ],
    resetPasswordToken: {
      type: String,
    },
    resetPasswordExpires: {
      type: Date,
    },
  },
  { timestamps: true }
);
userSchema.methods.generateResetPasswordToken = function () {
  const resetToken = crypto.randomBytes(20).toString("hex");

  //hash the resetToken and set it to this.resetPasswordToken

  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  // const salt = bcrypt.genSalt();
  // this.resetPasswordToken = bcrypt.hash(resetToken, salt);
  this.resetPasswordExpires = Date.now() + 100 * 60 * 1000;

  return resetToken;
};

const User = mongoose.model("User", userSchema, "USER");
module.exports = { User: User };
