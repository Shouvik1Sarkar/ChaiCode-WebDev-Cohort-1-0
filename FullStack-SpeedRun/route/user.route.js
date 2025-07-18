import express from "express";
import {
  forgotPassword,
  getMeUser,
  loginUser,
  loginWithoutPassword,
  logOout,
  registerUser,
  verifyUser,
} from "../controller/user.controller.js";
import jwt_data from "../middleware/user.middleware.js";
const router = express.Router();
router.post("/register", registerUser);
router.get("/verify/:token", verifyUser);
router.post("/login", loginUser);
router.get("/me", jwt_data, getMeUser);
router.get("/logout", jwt_data, logOout);
router.get("/forgot", forgotPassword);
router.post("/loginWithoutPassword", loginWithoutPassword);

export default router;
