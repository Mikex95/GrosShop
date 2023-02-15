const jwt = require("jsonwebtoken");
const { User } = require("../models/user-model");
const colors = require("colors");
const dotenv = require("dotenv");
dotenv.config();

const Verify_Access_Token = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  // Bearer <TOKEN>
  const accessToken = authHeader && authHeader.split(" ")[1];
  const Access_Token_Secrets = process.env.ACCESS_TOKEN_SECRETS;
  // this means if we have an authHeader then return the first portion of the
  //authHeader which is the token otherwidse return undifined
  if (!accessToken) {
    return res
      .status(401)
      .json({ message: "a token is required for authentication" });
  }
  try {
    const decoded = jwt.verify(accessToken, Access_Token_Secrets);
    console.log(colors.bgRed(decoded.sub));
    console.log(colors.bgGreen(decoded));
    req.user = await User.findById(decoded.sub);
    // console.log(colors.bgYellow(req.user));
    // req.user = decoded.sub;
    next();
  } catch (err) {
    console.log(err);
  }
};

const Create_New_Access_Token = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  const Refresh_Token_Secrets = process.env.REFRESH_TOKEN_SECRETS;
  const Access_Token_Secrets = process.env.ACCESS_TOKEN_SECRETS;
  console.log(refreshToken);
  if (!refreshToken) {
    return res.status(401).json({ message: "Refresh Token is missing" });
  }
  try {
    const decodeToken = jwt.verify(refreshToken, Refresh_Token_Secrets);
    const accessToken = jwt.sign(decodeToken, Access_Token_Secrets, {
      expiresIn: "10m",
    });
    return res.status(200).json({ accessToken: accessToken });
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  Verify_Access_Token,
  Create_New_Access_Token,
};
