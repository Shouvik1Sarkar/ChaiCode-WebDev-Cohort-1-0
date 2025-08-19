import { Router } from "express";
import {
  getMe,
  loginUser,
  logoutUser,
  registerUser,
  verifyEmail,
} from "../controllers/auth.controllers.js";
import { validate } from "../middlewares/validator.middleware.js";
import {
  userLoginValidator,
  userRegisterValidator,
} from "../validators/index.js";
import validateToken from "../middlewares/tokenValidators.middlewares.js";

const router = Router();

router.route("/register").post(userRegisterValidator(), validate, registerUser);
router.route("/verify/:token").get(verifyEmail);
router.route("/login").post(userLoginValidator(), validate, loginUser);
router.route("/getme").get(validateToken, getMe);
router.route("/logout").get(validateToken, logoutUser);

export default router;
