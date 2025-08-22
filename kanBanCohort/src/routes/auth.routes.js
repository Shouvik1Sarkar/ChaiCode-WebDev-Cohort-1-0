import { Router } from "express";
import {
  changeCurrentPassword,
  forgotPasswordRequest,
  getMe,
  loginUser,
  logoutUser,
  registerUser,
  resendEmailVerification,
  resetForgottenPassword,
  verifyEmail,
} from "../controllers/auth.controllers.js";
import { validate } from "../middlewares/validator.middleware.js";
import {
  userForgotPasswordValidator,
  userLoginValidator,
  userRegisterValidator,
} from "../validators/index.js";
import {
  validateToken,
  resendValidateToken,
} from "../middlewares/tokenValidators.middlewares.js";

const router = Router();

router.route("/register").post(userRegisterValidator(), validate, registerUser);
router.route("/verify/:token").get(verifyEmail);
router.route("/login").post(userLoginValidator(), validate, loginUser);
router.route("/getme").get(validateToken, getMe);
router.route("/logout").get(validateToken, logoutUser);
router
  .route("/resendvalidaton")
  .get(resendValidateToken, resendEmailVerification);

router
  .route("/forgotpassreq")
  .post(userForgotPasswordValidator(), validate, forgotPasswordRequest);
router.route("/changepass/:token").post(resetForgottenPassword);
router.post("/reset", validateToken, changeCurrentPassword);
export default router;
