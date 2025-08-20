import crypto from "crypto";
import { asyncHandler } from "../utils/async-handler.js";
import { User } from "../models/user.models.js";
import { ApiError } from "../utils/api-error.js";
import { ApiResponse } from "../utils/api-response.js";
import { sendEmail, emailVerificationMailgenContent } from "../utils/mail.js";
import { cookie } from "express-validator";

const registerUser = asyncHandler(async (req, res) => {
  const { email, username, password } = req.body;

  //validation

  const existedUser = await User.findOne({ email });
  if (existedUser) {
    throw new ApiError(500, "❌User already exists.❌");
  }
  const existedUserName = await User.findOne({ username });

  if (existedUserName) {
    throw new ApiError(500, "❌User Name already exists.❌");
  }

  const user = await User.create({
    username,
    email,
    password,
  });
  if (!user) {
    throw new ApiError(500, "❌User not created❌");
  }
  const jwtToken = await user.generateAccessToken();
  console.log("CONST JWT TOKEN: ", jwtToken);

  const accessTokenData = {
    httpOnly: true,
    sameSite: "strict",
    maxAge: 24 * 60 * 60 * 1000,
  };

  res.cookie("reg_access_token", jwtToken, accessTokenData);

  const validationToken = user.generateTemporaryToken();
  console.log(validationToken.hashedToken);

  const url_sent = `http://localhost:3000/api/v1/users/auth/verify/${validationToken.unHashedToken}`;

  sendEmail({
    email,
    subject: "Verify your registration",
    mailgenContent: emailVerificationMailgenContent(username, url_sent),
  });

  user.emailVerificationToken = validationToken.hashedToken;
  user.emailVerificationExpiry = validationToken.tokenExpiry;
  await user.save();

  return res
    .status(200)
    .json(new ApiResponse(201, "✅User registration Successful.✅"));
});

const verifyEmail = asyncHandler(async (req, res) => {
  const { token } = req.params;

  if (!token) {
    throw new ApiError(500, "❌Token not found❌");
  }

  const updated_token = crypto.createHash("sha256").update(token).digest("hex");

  const user = await User.findOne({
    emailVerificationToken: updated_token,
    emailVerificationExpiry: { $gt: Date.now() },
  });

  if (!user) {
    throw new ApiError(500, "❌Token expired.❌");
  }

  user.isEmailVerified = true;
  user.emailVerificationExpiry = undefined;
  user.emailVerificationToken = undefined;

  await user.save();

  return res.status(200).json(new ApiResponse(201, "✅User email verified.✅"));
  //validation
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, username, password } = req.body;

  const user = await User.findOne({ $or: [{ email }, { username }] });

  if (!user) {
    throw new ApiError(500, "❌User not found.❌");
  }

  const isMatch = await user.isPasswordCorrect(password);
  console.log("PASS: ", isMatch);

  if (!isMatch) {
    throw new ApiError(500, "❌Password did not match❌");
  }

  const accessToken = await user.generateAccessToken();

  console.log("AccessToken: ", accessToken);
  const accessTokenData = {
    httpOnly: true,
    sameSite: "strict",
    maxAge: 24 * 60 * 60 * 1000,
  };

  res.cookie("accessToken", accessToken, accessTokenData);

  user.isLoggedIn = true;
  await user.save();

  return res
    .status(200)
    .json(new ApiResponse(201, "✅User Login Successful.✅"));
  //validation
});

const getMe = asyncHandler(async (req, res) => {
  const accessTokenData = req.user;
  //validation
  if (!accessTokenData) {
    throw new ApiError(500, "Access token data not found");
  }
  const user = await User.findById({
    _id: accessTokenData._id,
  });

  if (!user) {
    throw new ApiError(500, "User not found");
  }

  return res.status(200).json(new ApiResponse(201, "✅Get Me✅"));
});

const logoutUser = asyncHandler(async (req, res) => {
  //validation
  const accessTokenData = req.user;
  //validation
  if (!accessTokenData) {
    throw new ApiError(500, "Access token data not found");
  }
  const user = await User.findById({
    _id: accessTokenData._id,
  });

  if (!user) {
    throw new ApiError(500, "User not found");
  }

  user.isLoggedIn = false;
  res.clearCookie("accessToken", {
    httpOnly: true,

    sameSite: "strict",
  });

  await user.save();

  return res.status(200).json(new ApiResponse(201, "✅LoggedOut✅"));
});

const resendEmailVerification = asyncHandler(async (req, res) => {
  const jwt_token = req.user;
  if (!jwt_token) {
    throw new ApiError(500, "JWT TOKEN not found");
  }

  const user = await User.findById({ _id: jwt_token._id });
  if (!user) {
    throw new ApiError(500, "User not found");
  }
  const validationToken = user.generateTemporaryToken();
  console.log(validationToken.hashedToken);
  const url_sent = `http://localhost:3000/api/v1/users/auth/verify/${validationToken.unHashedToken}`;
  const email = user.email;
  sendEmail({
    email,
    subject: "resend email verification",
    mailgenContent: emailVerificationMailgenContent(user.username, url_sent),
  });
  //validation
  user.emailVerificationToken = validationToken.hashedToken;
  user.emailVerificationExpiry = validationToken.tokenExpiry;
  await user.save();
  return res.status(200).json(new ApiResponse(200, "resend successful"));
});
const resetForgottenPassword = asyncHandler(async (req, res) => {
  const { email, username, password, role } = req.body;

  //validation
});

const refreshAccessToken = asyncHandler(async (req, res) => {
  const { email, username, password, role } = req.body;

  //validation
});

const forgotPasswordRequest = asyncHandler(async (req, res) => {
  const { email, username, password, role } = req.body;

  //validation
});

const changeCurrentPassword = asyncHandler(async (req, res) => {
  const { email, username, password, role } = req.body;

  //validation
});

const getCurrentUser = asyncHandler(async (req, res) => {
  const { email, username, password, role } = req.body;

  //validation
});

export {
  changeCurrentPassword,
  forgotPasswordRequest,
  getCurrentUser,
  loginUser,
  logoutUser,
  refreshAccessToken,
  registerUser,
  resendEmailVerification,
  resetForgottenPassword,
  verifyEmail,
  getMe,
};
