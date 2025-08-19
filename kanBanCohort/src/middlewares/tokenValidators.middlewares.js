import jwt from "jsonwebtoken";
import { asyncHandler } from "../utils/async-handler.js";
import { ApiError } from "../utils/api-error.js";

const validateToken = asyncHandler(async (req, res, next) => {
  const accessToken = req.cookies?.accessToken;

  if (!accessToken) {
    throw new ApiError(500, "AccessToken not found.");
  }

  console.log("A: ", accessToken);
  const decodedData = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);

  console.log("User from Acess Data: ", decodedData);
  if (!decodedData) {
    throw new ApiError(500, "Decoded data not found.");
  }
  req.user = decodedData;
  next();
});
export default validateToken;
