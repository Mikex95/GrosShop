const jwt = require("jsonwebtoken");
const { User } = require("../models/user-model");
const colors = require("colors");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
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
    req.user = await User.findById(decoded.sub);
    next();
  } catch (err) {
    console.log("verify access token error is :", err.message);
    fixme: 401;
    // return res.status(401).json({ message: "Access Token not found" });
  }
};

const Create_New_Access_Token = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  const Refresh_Token_Secrets = process.env.REFRESH_TOKEN_SECRETS;
  const Access_Token_Secrets = process.env.ACCESS_TOKEN_SECRETS;
  if (!refreshToken) {
    return res.status(401).json({ message: "Refresh Token is missing" });
  }
  try {
    const decodedPayload = jwt.verify(refreshToken, Refresh_Token_Secrets);
    console.log({ decodedPayload });
    //to get the user._id form the refreshToken payload
    const Payload = { sub: decodedPayload.sub };
    const newAccessToken = jwt.sign(Payload, Access_Token_Secrets, {
      expiresIn: "30m",
      // expiresIn: "25", darf nicht eingesezt weil ist schon in sign in fuction vorgegeben
    });
    return res.status(200).json({ accessToken: newAccessToken });
  } catch (err) {
    console.log("create new access token Error is :", err.message);
  }
};

module.exports = {
  Verify_Access_Token,
  Create_New_Access_Token,
};
