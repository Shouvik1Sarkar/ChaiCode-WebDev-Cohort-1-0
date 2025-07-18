import User from "../model/User.model.js";
import crypto from "crypto";
import transporter from "../utils/sendmail.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// import jwt_data from "../middleware/user.middleware.js";

const registerUser = async (req, res) => {
  /**
   * Get Data.
   * Validate
   * check if user already exists (if yes- error)
   * if not create one
   * pasword hashing
   * create token (using crypto)
   * send token via mail
   * save to db
   * save db
   * success message
   *
   */

  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({
      message: "All the credentials are needed",
      success: false,
    });
  }
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "User already exists <a> Login </a>",
        success: false,
      });
    }
    const user = await User.create({
      name,
      email,
      password,
    });

    console.log("USER: ", user);

    if (!user) {
      return res.status(400).json({
        message: "User not created",
        success: false,
      });
    }
    const token = await crypto.randomBytes(32).toString("hex");
    console.log("TOKEN: ", token);
    if (!token) {
      return res.status(400).json({
        message: "Token not created",
        success: false,
      });
    }
    // send via mail now

    // await transporter.sendMail({
    //   from: process.env.MAILTRAP_SENDERMAIL,
    //   to: user.email,
    //   subject: "Hello ✔",
    //   text: token, // plain‑text body
    //   html: "<b>Hello world?</b>", // HTML body
    // });

    user.verificationToken = token;
    user.verificationTokenExpiry = Date.now() + 1000 * 60 * 20;
    await user.save();
    return res.status(200).json({
      message: "Successfully registered",
      success: true,
    });
  } catch (error) {
    return res.status(400).json({
      message: "Failed to register",
      success: false,
      error: error.message,
    });
  }
};

const verifyUser = async (req, res) => {
  const { token } = req.params;
  console.log("TOKEN: ", token);
  if (!token) {
    return res.status(400).json({
      message: "Token not found",
      success: false,
    });
  }

  try {
    const user = await User.findOne({
      verificationToken: token,
      verificationTokenExpiry: { $gt: Date.now() },
    });
    if (!user) {
      return res.status(400).json({
        message: "User not found",
        success: false,
      });
    }
    user.isVerified = true;
    user.verificationToken = undefined;

    user.verificationTokenExpiry = undefined;
    await user.save();
    return res.status(200).json({
      message: "User verified",
      success: true,
    });
  } catch (error) {
    return res.status(400).json({
      message: "User not verified",
      success: false,
      error: error.message,
    });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      message: "All the credentials are needed",
      success: false,
    });
  }

  try {
    const user = await User.findOne({ email });
    console.log("USER: ", user);
    if (!user) {
      return res.status(400).json({
        message: "User not created",
        success: false,
      });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    console.log("isMatch", isMatch);

    if (!isMatch) {
      return res.status(400).json({
        message: "password not matched",
        success: false,
      });
    }
    const cookieOptions = {
      httpOnly: true,
      secure: true, // set to true if using HTTPS
      sameSite: "Strict",
      maxAge: 24 * 60 * 60 * 1000,
    };

    // create a jwt token
    const accesToken = jwt.sign({ id: user._id }, "shhhhh", {
      expiresIn: "24h",
    });
    console.log("AccessToken: ", accesToken);
    res.cookie("token", accesToken, cookieOptions);
    res.cookie("random1", "-----------", cookieOptions);

    user.isLoggedIn = true;
    user.accessTokens = accesToken;
    await user.save();
    // res.cook
    return res.status(200).json({
      message: "login",
      success: true,
    });
  } catch (error) {
    return res.status(400).json({
      message: "no login",
      success: false,
      error: error.message,
    });
  }
};

const getMeUser = async (req, res) => {
  console.log("-------------------------------");
  try {
    console.log("req.user.id", req.user);
    console.log("req.user.id", req.user.id);
    const user = await User.findById(req.user.id);
    console.log("User: ", user);
    if (!user) {
      return res.status(400).json({
        message: "User not found",
        success: false,
      });
    }

    return res.status(200).json({
      message: "get me successful",
      success: true,
    });
  } catch (error) {
    return res.status(400).json({
      message: "Get me failed",
      success: false,
      error: error.message,
    });
  }
};
const logOout = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    console.log("User: ", user);
    if (!user) {
      return res.status(400).json({
        message: "User not found",
        success: false,
      });
    }
    user.isLoggedIn = false;
    user.accessTokens = undefined;
    await user.save();
    res.cookie("token", "");
    return res.status(200).json({
      message: "Logged Out",
      success: true,
    });
  } catch (error) {
    return res.status(400).json({
      message: "Log Out Failed",
      success: false,
      error: error.message,
    });
  }
};

const forgotPassword = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res
      .status(400)
      .json({ message: "email is required", success: false });
  }
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ message: "User not Created", success: false });
    }
    const otp = String(Math.floor(Math.random() * 1000000 + 100000));
    if (!otp) {
      return res
        .status(400)
        .json({ message: "otp not Created", success: false });
    }
    user.forgotPasswordOtp = otp;

    await user.save();
    console.log("USER: ", user);
    console.log("OTP: ", otp);
    if (!otp) {
      return res
        .status(400)
        .json({ message: "OTP not created", success: false });
    }

    await transporter.sendMail({
      from: process.env.MAILTRAP_SENDERMAIL,
      to: user.email,
      subject: "OTP FORGOT PASSWORD ✔",
      text: otp, // plain‑text body
      html: "<b>Hello world?</b>", // HTML body
    });

    return res
      .status(200)
      .json({ message: "OTP SENT to the mail", success: true });
  } catch (error) {
    return res.status(400).json({
      message: "OTP not sent forgot failed",
      success: false,
      error: error.message,
    });
  }
};
const loginWithoutPassword = async (req, res) => {
  const { otp } = req.body;
  if (!otp) {
    return res.status(400).json({ message: "OTP not created", success: false });
  }
  try {
    const user = await User.findOne({ forgotPasswordOtp: otp });
    console.log("USER: ", user);
    if (!user) {
      return res
        .status(400)
        .json({ message: "User not created", success: false });
    }

    const cookieOptions = {
      httpOnly: true,
      secure: true, // set to true if using HTTPS
      sameSite: "Strict",
      maxAge: 24 * 60 * 60 * 1000,
    };

    // create a jwt token
    const accesToken = jwt.sign({ id: user._id }, "shhhhh", {
      expiresIn: "24h",
    });
    console.log("AccessToken: ", accesToken);
    res.cookie("token", accesToken, cookieOptions);
    user.accessTokens = accesToken;
    user.isLoggedIn = true;
    user.forgotPasswordOtp = undefined;
    await user.save();

    return res
      .status(200)
      .json({ message: "login success without pass", success: true });
  } catch (error) {
    return res
      .status(400)
      .json({ message: "login failed", success: false, error: error.message });
  }
};
export {
  registerUser,
  verifyUser,
  loginUser,
  getMeUser,
  logOout,
  forgotPassword,
  loginWithoutPassword,
};
