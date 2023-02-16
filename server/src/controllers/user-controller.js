const bcrypt = require("bcrypt");
const colors = require("colors");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const dotenv = require("dotenv");
dotenv.config();
const { User } = require("../models/user-model");
const { verifyEmail } = require("../Utlis/verify-email");
const { sendEmail } = require("../Utlis/send-email");

/* 
  ┌─────────────────────────────────────────────────────────────────────────┐
  │ //?   @description : login user & get access&refresh-token              │
  │ //?   @method : POST /api/user/login                                    │
  │ //?   @access : public                                                  │
  └─────────────────────────────────────────────────────────────────────────┘
 */
const loginUser = async (req, res) => {
	try {
		//1-get user inputs
		const { email, password } = req.body;
		//2-validate user inputs
		if (!(email && password)) {
			return res.status(400).json({ message: "All inputs are required..." });
		}
		//3-validate if user exist in Database
		const user = await User.findOne({ email: email });
		if (!user) {
			return res.status(400).json({ message: "email doesn't exist..!!" });
			//4-otherwise compare password with the one saved on Database
		}
		const match = await bcrypt.compare(password, user.password);
		if (match) {
			//5-create access and refresh token
			const payload = {
				sub: user._id,
				// email:user.email
			};
			const Access_Token_Secrets = process.env.ACCESS_TOKEN_SECRETS;
			const Refresh_Token_Secrets = process.env.REFRESH_TOKEN_SECRETS;
			const accessToken = jwt.sign(payload, Access_Token_Secrets, {
				expiresIn: "600m",
			});

			const refreshToken = jwt.sign(payload, Refresh_Token_Secrets, {
				expiresIn: "1d",
			});
			res.cookie("refreshToken", refreshToken, {
				httpOnly: true,
				maxAge: 24 * 60 * 60 * 1000,
				// signed: true,
				secure: true,
			});
			res
				.status(200)
				.json({ accessToken: accessToken, refreshToken: refreshToken });
		} else {
			res.status(404).json({ message: "Password doesn't match" });
		}
	} catch (err) {
		console.log(colors.bgRed(err));
		res.status(500).json({ message: "Error While login attempt..." });
	}
};

/* 
  ┌─────────────────────────────────────────────────────────────────────────┐
  │ //?   @description : Signup User                                        │
  │ //?   @method : POST /api/user/signup                                   │
  │ //?   @access : public                                                  │
  └─────────────────────────────────────────────────────────────────────────┘
 */

const signupUser = async (req, res) => {
	try {
		//1-get user inputs
		const { firstname, lastname, username, email, password } = req.body;
		//2-validate user inputs
		if (!(firstname && lastname && username && email && password)) {
			console.log("test");
			return res.status(400).json({ message: "All inputs are required" });
		}
		//3-check if the user exists and validate in database
		const existingUser = await User.findOne({ email: email });
		if (existingUser) {
			return res
				.status(409)
				.json({ message: "User Already Exists. pleasde Login...." });
		}
		//4-hash and salt the user input password
		const salt = await bcrypt.genSalt();
		const hashedPassword = await bcrypt.hash(password, salt);
		//5-create the new user and save it in the Database

		//random six digit code
		const randomVerificationCode = crypto
			.randomInt(0, 999999)
			.toString()
			.padStart(6, "0");
		const user = {
			verificationCode: randomVerificationCode,
			// resetPasswordExpires: Date.now() + 10 * 60 * 1000,
			firstname,
			lastname,
			username,
			email: email.toLowerCase(),
			password: hashedPassword,
		};
		const newUser = new User(user);
		newUser.save();
		//6-send a verfication email that the signup was Successful
		const options = {
			email: newUser.email,
			subject: "Account Verification",
			code: randomVerificationCode,
			name: newUser.firstname,
		};
		await verifyEmail(options);
		return res.status(200).json({
			message: "Signup was Successful...",
		});
	} catch (err) {
		console.log(colors.bgRed(err));
		res.status(500).json({ message: "Error while Signing up ..." });
	}
};

/* 
  ┌─────────────────────────────────────────────────────────────────────────┐
  │ //?   @description : Verification Email                                 │
  │ //?   @method : POST /api/user/verify-email                             │
  │ //?   @access : public                                                  │
  └─────────────────────────────────────────────────────────────────────────┘
 */
const verificationEmail = async (req, res) => {
	const user = await User.findOne({
		verificationCode: req.body.verificationCode,
	});
	if (!user) {
		return res.status(401).json({ message: "Invalid verification Code !!!" });
	}
	if (user.verify) {
		return res
			.status(401)
			.json({ message: "You have already verified. Login to continue..." });
	}
	res.status(200).json({ message: "You have Succefully Verified your Email" });
	user.verify = true;
	user.save();
	// user.save({ validateBeforeSave: false });
};

/* 
  ┌─────────────────────────────────────────────────────────────────────────┐
  │ //?   @description : logout user                                        │
  │ //?   @method : DELETE /api/user/logout                                 │
  │ //?   @access : public                                                  │
  └─────────────────────────────────────────────────────────────────────────┘
 */

const logoutUser = async (req, res) => {
	// res.clearCookie("refreshToken", "loggedout", {
	res.clearCookie("refreshToken", refreshToken, {
		httpONly: true,
		secure: true,
	});
	res.status(200).json({ message: "signout success..." });
};

/* 
  ┌─────────────────────────────────────────────────────────────────────────┐
  │ //?   @description : Forgot Password Link                               │
  │ //?   @method : POST /api//user/forgot-password                         │
  │ //?   @access : public                                                  │
  └─────────────────────────────────────────────────────────────────────────┘
 */

const forgotPassword = async (req, res) => {
	// 1) Get user based on his email
	const { email } = req.body;
	const user = await User.findOne({ email: email });
	if (!user) {
		console.log(colors.bgRed(err));
		return res
			.status(404)
			.json({ message: "No user found with email ${email}" });
	}

	// 2) Generate the random reset token

	const resetToken = user.generateResetPasswordToken();
	await user.save();

	// 3) Send it to user's email
	const resetURL = `${req.protocol}://${req.get(
		"host"
	)}/api/user/reset-password/?token=${resetToken}`;

	const message = `Forgot your password? Submit a PATCH request before 10 minutes with your New password and passwordConfirm to:<br>
  ${resetURL}`;
	console.log("message:-", message);

	try {
		const options = {
			email: user.email,
			subject: "Password reset token ⚠️",
			message,
			url: resetURL,
		};
		await sendEmail(options);

		res.status(200).json({
			message: "ResetPassword Token sent to email...",
		});
	} catch (err) {
		console.log(colors.bgGreen(err));
		user.resetPasswordToken = undefined;
		user.resetPasswordExpires = undefined;
		await user.save();
	}
};

/* 
  ┌─────────────────────────────────────────────────────────────────────────┐
  │ //?   @description : Reset Password Link                                │
  │ //?   @method : POST /api/user/reset-password                           │
  │ //?   @access : public                                                  │
  └─────────────────────────────────────────────────────────────────────────┘
 */

const resetPassword = async (req, res) => {
	const resetToken = crypto
		.createHash("sha256")
		// .update(req.params.token)
		.update(req.body.token)
		.digest("hex");
	console.log(colors.bgRed(resetToken));
	const user = await User.findOne({
		resetPasswordToken: resetToken,
		resetPasswordExpires: { $gt: Date.now() },
	});
	if (!user) {
		return res
			.status(400)
			.json({ message: "Password reset token is invalid or has been expired" });
	}
	const newPassword = req.body.newPassword;
	const confirmPassword = req.body.confirmPassword;
	if (newPassword !== confirmPassword) {
		return res.status(400).json({ message: "Password doesn't match" });
	}

	// Set and hash new password
	try {
		const salt = await bcrypt.genSalt();
		const hashedNewPassword = await bcrypt.hash(newPassword, salt);
		user.password = hashedNewPassword;
		user.resetPasswordToken = undefined;
		user.resetPasswordExpires = undefined;
		await user.save();
		res
			.status(200)
			.json({ status: "success", message: "Your Password has beed changed" });
	} catch {
		res.status(500).json({ message: "Password reset Failed" });
	}
};

/* 
  ┌─────────────────────────────────────────────────────────────────────────┐
  │ //?   @description : Get User Profile                                   │
  │ //?   @method : GET /api/user/profile                                   │
  │ //?   @access : private                                                 │
  └─────────────────────────────────────────────────────────────────────────┘
 */
const getUserProfile = async (req, res) => {
	const user = await User.findById(req.user._id);
	if (user) {
		res.json(user);
	} else {
		return res.status(400).json({ message: "User not found" });
	}
};
/* 
  ┌─────────────────────────────────────────────────────────────────────────┐
  │ //?   @description : Change User Profile Information                    │
  │ //?   @method : PUT /api/user/profile-update                            │
  │ //?   @access : private                                                 │
  └─────────────────────────────────────────────────────────────────────────┘
 */
const changeUserProfile = async (req, res) => {
	const user = await User.findById(req.user._id);
	if (user) {
		user.username = req.body.username;
		if (req.body.password) {
			user.password = req.body.password;
		}
		const { address, city, postalCode, state, phone, fullname } = req.body;
		if (address) {
			user.shippingAddress.address = address;
		}
		if (city) {
			user.shippingAddress.city = city;
		}
		if (postalCode) {
			user.shippingAddress.postalCode = postalCode;
		}
		if (state) {
			user.shippingAddress.state = state;
		}
		if (phone) {
			user.shippingAddress.phone = phone;
		}
		if (fullname) {
			user.shippingAddress.fullname = fullname;
		}
		await user.save();
		res.status(200).json(user);
	} else {
		return res
			.status(404)
			.json({ message: "This is not suppose to be happening" });
	}
};
/* 
  ┌─────────────────────────────────────────────────────────────────────────┐
  │ //?   @description : Get the wishList                                   │
  │ //?   @method : GET /api/user/wishlist                                  │
  │ //?   @access : private                                                 │
  └─────────────────────────────────────────────────────────────────────────┘
 */

const getWishListItems = async (req, res) => {
	// const user = await User.findById(decoded._id);
	const user = await User.findOne(req.user);
	if (user) {
		const theWishList = [...user.wishList];
		res.status(200).send(theWishList);
	} else {
		res.status(404).json({ meseage: "User doesn't exist" });
	}
};

/* 
  ┌─────────────────────────────────────────────────────────────────────────┐
  │ //?   @description : Add an Item to the wishList                        │
  │ //?   @method : POST /api/user/wishlist/additem                         │
  │ //?   @access : private                                                 │
  └─────────────────────────────────────────────────────────────────────────┘
 */

const addItemToUserWishList = async (req, res) => {
	// const { itemId, productName, productPrice, productImage, productRating } =
	//   req.body;
	const { itemId } = req.body;
	const user = await User.findOne(req.user);
	const theItem = { itemId };
	console.log(colors.bgGreen(theItem));
	user.wishList.push(theItem);
	user.save();
	console.log(colors.bgBlue(user));
	return res.status(200).send(user);
};

/* 
  ┌─────────────────────────────────────────────────────────────────────────┐
  │   //?   @description : Delete an Item from the wishList                 │
  │ //?   @method : DELETE /api/user/wishlist/deleteitem/:id                │
  │ //?   @access : private                                                 │
  └─────────────────────────────────────────────────────────────────────────┘
 */
const deleteAnItemFromWishList = async (req, res) => {
	const wishListItemId = req.params.id;
	const user = await User.findOne(req.user);
	let deletedIndex;
	for (let i = 0; i < user.wishList.length; i++) {
		if (user.wishList[i]._id == wishListItemId) {
			deletedIndex = i;
			break;
		}
	}
	user.wishList.splice(deletedIndex, 1);
	await user.save();
	res.status(200);
	res.send("Deleting the item from User wishList was successfully");
};

/* 
  ┌─────────────────────────────────────────────────────────────────────────┐
  │ //?   @description : Delete all Items from the wishList                 │
  │ //?   @method : DELETE /api/user/wishlist/deleteitem                    │
  │ //?   @access : private                                                 │
  └─────────────────────────────────────────────────────────────────────────┘
 */
const deleteAllItemsFromWishList = async (req, res) => {
	const user = await User.findOne(req.user);

	if (user) {
		user.wishList = [];
		await user.save();
		res.status(200).send("Clear all items in the wish list successfully");
	} else {
		res
			.status(404)
			.json({ message: "Can't find the user that you are looking for" });
	}
};
/* 
  ┌─────────────────────────────────────────────────────────────────────────┐
  │ //?   @description : Add an Item to the Cart                            │
  │ //?   @method : POST /api/user/cart/additem                             │
  │ //?   @access : private                                                 │
  └─────────────────────────────────────────────────────────────────────────┘
 */
const addItemToCart = async (req, res) => {
	const user = await User.findOne(req.user);
	const {
		itemId,
		productName,
		productImage,
		productPrice,
		countInStock,
		quantity,
	} = req.body;
	if (user) {
		const theItem = {
			itemId,
			productName,
			productImage,
			productPrice,
			countInStock,
			quantity,
		};
		console.log(colors.bgGreen(user.cartList));
		user.cartList.push(theItem);
		const savedUser = await user.save();
		res.status(200).send(savedUser);
	} else {
		res.stauts(404).json({ message: "can't find the user" });
	}
};
/* 
  ┌─────────────────────────────────────────────────────────────────────────┐
  │ //?   @description : Remove an Item from the Cart                       │
  │ //?   @method : DELETE /api/user/cart/removeitem/:id                    │
  │ //?   @access : private                                                 │
  └─────────────────────────────────────────────────────────────────────────┘
 */
const removeItemFromCart = async (req, res) => {
	const user = await User.findOne(req.user);
	const cartItemId = req.params.id;

	if (user) {
		let deletedIndex;
		for (let i = 0; i < user.cartList.length; i++) {
			if (user.cartList[i].itemId == cartItemId) {
				deletedIndex = i;
				break;
			}
		}
		user.cartList.splice(deletedIndex, 1);
		await user.save();
		res.status(200).send("Delete item from cartList successfully");
	} else {
		res.status(404).json({ message: "User is not existed" });
	}
};

/* 
  ┌─────────────────────────────────────────────────────────────────────────┐
  │ //?   @description : GET all Items from the Cart                        │
  │ //?   @method : GET /api/user/cart                                      │
  │ //?   @access : private                                                 │
  └─────────────────────────────────────────────────────────────────────────┘
 */
const getUserCartList = async (req, res) => {
	const user = await User.findOne(req.user);
	if (user) {
		res.status(200).send(user.cartList);
	} else {
		res.status(404).json({ message: "Can't Find User With This ID" });
	}
};

module.exports = {
	loginUser: loginUser,
	signupUser: signupUser,
	verificationEmail: verificationEmail,
	logoutUser: logoutUser,
	forgotPassword: forgotPassword,
	resetPassword: resetPassword,
	getUserProfile: getUserProfile,
	changeUserProfile: changeUserProfile,
	getWishListItems: getWishListItems,
	addItemToUserWishList: addItemToUserWishList,
	deleteAnItemFromWishList: deleteAnItemFromWishList,
	deleteAllItemsFromWishList: deleteAllItemsFromWishList,
	addItemToCart: addItemToCart,
	removeItemFromCart: removeItemFromCart,
	getUserCartList: getUserCartList,
};
