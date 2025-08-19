import express from "express";
import cookieParser from "cookie-parser";

const app = express();

app.use(express.json());
app.use(cookieParser());

// app.get("", (req, res)=>{
//     req.cookies()
// })
// app.get("/cook", (req, res) => {
//   const a = req.cookies.accessToken;
//   console.log("A: ", a);
// });

//router imports
import healthCheckRouter from "./routes/healthcheck.routes.js";
import authRouter from "./routes/auth.routes.js";
import globalErrorHandle from "./middlewares/globalError.middlewares.js";

app.use("/api/v1/healthcheck", healthCheckRouter);
app.use("/api/v1/users/auth", authRouter);
app.use(globalErrorHandle);

export default app;
