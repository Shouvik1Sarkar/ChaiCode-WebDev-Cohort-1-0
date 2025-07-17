import User from "../model/User.model.js";
import crypto from "crypto";
import transporter from "../utils/sendmail.js";
import bcrypt from "bcryptjs";

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

    return res.status(200).json({
      message: "login",
      success: true,
    });
  } catch (error) {
    return res.status(400).json({
      message: "no login",
      success: false,
    });
  }
};

export { registerUser, verifyUser, loginUser };
