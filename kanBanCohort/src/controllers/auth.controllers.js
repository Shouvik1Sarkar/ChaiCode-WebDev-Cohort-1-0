import crypto from "crypto";
import { asyncHandler } from "../utils/async-handler.js";
import { User } from "../models/user.models.js";
import { ApiError } from "../utils/api-error.js";
import { ApiResponse } from "../utils/api-response.js";
import {
  sendEmail,
  emailVerificationMailgenContent,
  forgotPasswordMailgenContent,
} from "../utils/mail.js";
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
  const refreshToken = await user.generateRefreshToken();
  console.log("CONST JWT TOKEN: ", jwtToken);
  console.log("CONST REFRESH TOKEN: ", refreshToken);

  const accessTokenData = {
    httpOnly: true,
    sameSite: "strict",
    maxAge: 24 * 60 * 60 * 1000,
  };

  res.cookie("reg_access_token", jwtToken, accessTokenData);

  const refreshTokenData = {
    httpOnly: true,
    sameSite: "strict",
    maxAge: 10 * 24 * 60 * 60 * 1000,
  };

  res.cookie("refreshToken", refreshToken, refreshTokenData);

  const validationToken = user.generateTemporaryToken();
  console.log(validationToken.hashedToken);

  const url_sent = `http://localhost:3000/api/v1/users/auth/verify/${validationToken.unHashedToken}`;

  // sendEmail({
  //   email,
  //   subject: "Verify your registration",
  //   mailgenContent: emailVerificationMailgenContent(username, url_sent),
  // });
  console.log("Verify your registration (url_sent): ", url_sent);

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
    .json(new ApiResponse(201, user, "✅User Login Successful.✅"));
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
  // sendEmail({
  //   email,
  //   subject: "resend email verification",
  //   mailgenContent: emailVerificationMailgenContent(user.username, url_sent),
  // });
  console.log("resend email verification (url_sent): ", url_sent);
  //validation
  user.emailVerificationToken = validationToken.hashedToken;
  user.emailVerificationExpiry = validationToken.tokenExpiry;
  await user.save();
  return res.status(200).json(new ApiResponse(200, "resend successful"));
});

const resetForgottenPassword = asyncHandler(async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;
  if (!token) {
    throw new ApiError(500, "No token found.");
  }
  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
  const user = await User.findOne({
    forgotPasswordToken: hashedToken,
    forgotPasswordExpiry: { $gt: Date.now() },
  });
  console.log(" hashedToken: ", hashedToken);
  console.log("USER: ", user);
  if (!user) {
    throw new ApiError(500, "User token not found.");
  }
  user.password = password;
  user.forgotPasswordExpiry = undefined;
  user.forgotPasswordToken = undefined;
  await user.save();

  return res.status(200).json(new ApiResponse(201, "✅password changed✅"));
  //validation
});

const refreshAccessToken = asyncHandler(async (req, res) => {
  const refreshTokenData = req.userRefresh;
  //validation
  if (!refreshTokenData) {
    throw new ApiError(401, "❌Access token data not found❌");
  }
  const user = await User.findById({
    _id: refreshTokenData._id,
  });

  if (!user) {
    throw new ApiError(404, "❌User not found❌");
  }
  const newAccessToken = await user.generateAccessToken();
  const newAccessTokenData = {
    httpOnly: true,
    sameSite: "strict",
    maxAge: 30 * 60 * 1000,
  };
  // res.cookie("accessToken", newAccessToken, newAccessTokenData);

  return res
    .cookie("accessToken", newAccessToken, newAccessTokenData)
    .status(200)
    .json(new ApiResponse(200, "✅`Access token refreshed successfully✅`"));
});

const forgotPasswordRequest = asyncHandler(async (req, res) => {
  let { email, username } = req.body;
  if (!email && !username) {
    throw new ApiError("Email and username both can not be empty.");
  }

  //validation

  const user = await User.findOne({ $or: [{ email }, { username }] });

  if (!user) {
    throw new ApiError("User not found");
  }
  const forgotPassToken = user.generateTemporaryToken();
  console.log("Forgotten Password: ", forgotPassToken);
  const token = forgotPassToken.unHashedToken;
  const sentUrl = `http://localhost:3000/api/v1/users/auth/verify/${token}`;

  const userEmail = user.email;
  const myName = user.username;
  console.log("userEmail: ", userEmail);

  email = user.email;
  console.log("Email: ", email);
  sendEmail({
    email,
    subject: "forgot Password request url",
    mailgenContent: forgotPasswordMailgenContent(user.username, sentUrl),
  });

  user.forgotPasswordToken = forgotPassToken.hashedToken;
  user.forgotPasswordExpiry = forgotPassToken.tokenExpiry;
  await user.save();
  return res
    .status(200)
    .json(new ApiResponse(200, "Forgot pass request token"));
});

const changeCurrentPassword = asyncHandler(async (req, res) => {
  const { password, newPassword, newPassword_again } = req.body;
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
  console.log("new pass", newPassword);
  console.log("new pass again", newPassword_again);
  if (newPassword_again != newPassword) {
    throw new ApiError(400, "New password and confirmation do not match.");
  }
  const isMatch = await user.isPasswordCorrect(password);
  if (!isMatch) {
    throw new ApiError(400, "Wrong Password.");
  }

  const isNewPassSame = await user.isPasswordCorrect(newPassword);

  if (isNewPassSame) {
    throw new ApiError(400, "New Password can not be same as old password.");
  }
  user.password = newPassword;
  await user.save();
  return res
    .status(200)
    .json(new ApiResponse(200, "password updated successfully."));
});

const getCurrentUser = asyncHandler(async (req, res) => {
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
//

/* eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
  .eyJfaWQiOiI2OGE4MjEwYTRlOWIwY2VlNjMyYzJmODciLCJlbWFpbCI6InNob3V2aWtAZXhhbXBsZTEuY29tIiwidXNlcm5hbWUiOiJzaG91dmlrYXV0aDEiLCJpYXQiOjE3NTU4NDkwMzUsImV4cCI6MTc1NTkzNTQzNX0
  .fz994DJbHgEiFWC9HlV3QueZEbi7r22668JeAkc2r - I; */

/**
   

eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OGE5NTZlZTRiODE3ZThhZWMzNjQ3OTMiLCJlbWFpbCI6InNo
b3V2aWtAZXhhbXBsZS5jb20iLCJ1c2VybmFtZSI6InNob3V2aWthdXRoIiwiaWF0IjoxNzU1OTMwNDI4LCJleHAiOjE3NTU5MzIyMjh9.Qmq3Iaip62bewdDQaFjvuBRenkkM267RZLcjs4q4Y6A
   */
