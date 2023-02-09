const bcrypt = require("bcrypt");
const colors = require("colors");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
dotenv.config();
const { User } = require("../models/user-model");

/* -------------------------------------------------------------------------- */
/*                             LOGIN-USER HANDLER                             */
/* -------------------------------------------------------------------------- */

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
      return res.status(400).json({ message: "email doesn't exist!!" });
      //4-otherwise compare password with the one saved on Database
    }
    const match = await bcrypt.compare(password, user.password);
    if (match) {
      //5-create access and refresh token
      const payload = {
        sub: user._id,
      };
      const Access_Token_Secrets = process.env.ACCESS_TOKEN_SECRETS;
      const Refresh_Token_Secrets = process.env.REFRESH_TOKEN_SECRETS;
      const accessToken = jwt.sign(payload, Access_Token_Secrets, {
        expiresIn: "10m",
      });

      const refreshToken = jwt.sign(payload, Refresh_Token_Secrets, {
        expiresIn: "1000m",
      });
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        maxAge: 1000,
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

/* ----------------------------------- END ---------------------------------- */

/* -------------------------------------------------------------------------- */
/*                             SIGNUP-USER HANDLER                            */
/* -------------------------------------------------------------------------- */

const signupUser = async (req, res) => {
  try {
    //1-get user inputs
    const { firstname, lastname, username, email, password } = req.body;
    //2-validate user inputs
    if (!(firstname && lastname && username && email && password))
      res.status(400).json({ message: "All inputs are required" });

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
    const user = {
      firstname,
      lastname,
      username,
      email: email.toLowerCase(),
      password: hashedPassword,
    };
    const newUser = new User(user);
    newUser.save();
    return res.status(200).json({
      message: "Signup was Successfull...",
    });
  } catch (err) {
    console.log(colors.bgRed(err));
    return res.status(500).json({ message: "Error while Signing up ..." });
  }
};

/* ----------------------------------- END ---------------------------------- */

/* -------------------------------------------------------------------------- */
/*                             LOGOUT-USER HANDLER                            */
/* -------------------------------------------------------------------------- */

const logoutUser = async (req, res) => {};

module.exports = {
  loginUser: loginUser,
  signupUser: signupUser,
  logoutUser: logoutUser,
};
