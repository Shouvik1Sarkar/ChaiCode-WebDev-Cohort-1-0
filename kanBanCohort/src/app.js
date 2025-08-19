import express from "express";

const app = express();

app.use(express.json());

//router imports
import healthCheckRouter from "./routes/healthcheck.routes.js";
import authRouter from "./routes/auth.routes.js";
import globalErrorHandle from "./middlewares/globalError.middlewares.js";

app.use("/api/v1/healthcheck", healthCheckRouter);
app.use("/api/v1/users/auth", authRouter);
app.use(globalErrorHandle);

export default app;
