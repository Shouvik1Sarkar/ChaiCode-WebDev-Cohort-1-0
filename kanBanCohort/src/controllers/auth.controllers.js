import { asyncHandler } from "../utils/async-handler.js";
import { User } from "../models/user.models.js";
import { ApiError } from "../utils/api-error.js";
import { ApiResponse } from "../utils/api-response.js";
import { sendEmail, emailVerificationMailgenContent } from "../utils/mail.js";
const registerUser = asyncHandler(async (req, res) => {
  const { email, username, password } = req.body;

  //validation

  const existedUser = await User.findOne({ email });
  if (existedUser) {
    throw new ApiError(500, "User already exists.");
  }
  const existedUserName = await User.findOne({ username });

  if (existedUserName) {
    throw new ApiError(500, "User Name already exists.");
  }

  const user = await User.create({
    username,
    email,
    password,
  });
  if (!user) {
    throw new ApiError(500, "User not created");
  }

  const validationToken = user.generateTemporaryToken();
  console.log(validationToken.hashedToken);

  sendEmail({
    email,
    subject: "Verify your registration",
    mailgenContent: emailVerificationMailgenContent(
      username,
      validationToken.hashedToken
    ),
  });

  user.emailVerificationToken = validationToken.hashedToken;
  user.emailVerificationExpiry = validationToken.tokenExpiry;
  await user.save();

  return res
    .status(200)
    .json(new ApiResponse(201, "User registration Successful"));
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, username, password, role } = req.body;

  //validation
});

const logoutUser = asyncHandler(async (req, res) => {
  const { email, username, password, role } = req.body;

  //validation
});

const verifyEmail = asyncHandler(async (req, res) => {
  const { email, username, password, role } = req.body;

  //validation
});

const resendEmailVerification = asyncHandler(async (req, res) => {
  const { email, username, password, role } = req.body;

  //validation
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
};
