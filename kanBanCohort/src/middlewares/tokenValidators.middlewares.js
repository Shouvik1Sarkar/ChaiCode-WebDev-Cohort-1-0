import jwt from "jsonwebtoken";
import { asyncHandler } from "../utils/async-handler.js";
import { ApiError } from "../utils/api-error.js";

const validateToken = asyncHandler(async (req, res, next) => {
  const accessToken = req.cookies?.accessToken;

  if (!accessToken) {
    throw new ApiError(500, "AccessToken not found.");
  }

  console.log("A: ", accessToken);
  try {
    const decodedData = jwt.verify(
      accessToken,
      process.env.ACCESS_TOKEN_SECRET
    );

    console.log("User from Acess Data: ", decodedData);
    if (!decodedData) {
      throw new ApiError(500, "Decoded data not found.");
    }
    req.user = decodedData;
    next();
  } catch (error) {
    console.log("TOKEN VERIFICATION ERROR:", error);
    throw new ApiError(401, "Invalid or expired token");
  }
});

const validateRefreshToken = asyncHandler(async (req, res, next) => {
  const refreshToken = req.cookies?.refreshToken;

  if (!refreshToken) {
    throw new ApiError(500, "Refresh Token not found.");
  }

  console.log("A: ", refreshToken);
  try {
    const decodedData = jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );

    console.log("User from Acess Data: ", decodedData);
    if (!decodedData) {
      throw new ApiError(500, "Decoded data not found.");
    }
    req.userRefresh = decodedData;
    next();
  } catch (error) {
    console.log("TOKEN VERIFICATION ERROR refresh:", error);
    throw new ApiError(401, "Invalid or expired token");
  }
});

const resendValidateToken = asyncHandler(async (req, res, next) => {
  const regaccessToken = req.cookies?.reg_access_token;

  if (!regaccessToken) {
    throw new ApiError(500, "AccessToken not found.");
  }

  console.log("A: ", regaccessToken);
  try {
    const decodedData = jwt.verify(
      regaccessToken,
      process.env.ACCESS_TOKEN_SECRET
    );
    console.log("User from Acess Data: ", decodedData);
    if (!decodedData) {
      throw new ApiError(500, "Decoded data not found.");
    }
    req.user = decodedData;
    next();
  } catch (error) {
    console.log("TOKEN VERIFICATION ERROR:", error);
    throw new ApiError(401, "Invalid or expired token");
  }
});
export { validateToken, resendValidateToken, validateRefreshToken };

/**
 *  eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OGE1ZjAwYjNiMzBjMjM0MmM3ZjUwYjciLCJlbWFpbCI6InNob3V2aWtAZXhhbXBsZTMuY29tIiwidXNlcm5hbWUiOiJzaG91dmlrYXV0aDMiLCJpYXQiOjE3NTU3MDUzNTUsImV4cCI6MTc1NTc5MTc1NX0.no8-RJwrbUQ7OMh9oq2SlRJzqre46ms4esYWBr4cGMg
00e8f8783c3953caf9dd93ee1587902277fe2a3319d0662d2e9fee99bcf83495
 */
// 60989e4cb9679401d63b8a7e54abec9176d961779c1286e73eaa521af48cd43c
