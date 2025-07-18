import jwt from "jsonwebtoken";
import User from "../model/User.model.js";

const jwt_data = async (req, res, next) => {
  const token = req.cookies?.token;
  console.log("TOKEN MIDDLEWARE: ", token);
  // get user by token
  const user = await User.findOne({ accessTokens: token });
  console.log("USER: ", user);
  if (!user) {
    return res.status(400).json({
      message: "User not Created",
      success: false,
    });
  }

  const decoded_data = jwt.verify(token, "shhhhh");

  console.log("DECODED DATA: ", decoded_data);

  req.user = decoded_data;

  next();
};

export default jwt_data;

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4N2EzMDc4OGZjODViNDVkZjg2YWIwMCIsImlhdCI6MTc1MjgzODMwNCwiZXhwIjoxNzUyOTI0NzA0fQ.K1AOKKg0NmqFXvGSstE5CC7h_WRU4q1Anv0X99lSSrA
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4N2EzMDc4OGZjODViNDVkZjg2YWIwMCIsImlhdCI6MTc1MjgzODMwNCwiZXhwIjoxNzUyOTI0NzA0fQ.K1AOKKg0NmqFXvGSstE5CC7h_WRU4q1Anv0X99lSSrA
