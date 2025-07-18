import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
// import nodemailer from "nodemailer";
import cookieParser from "cookie-parser";
import db from "./utils/db.utils.js";

// routes

import router from "./route/user.route.js";

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
    methods: ["GET", "POST", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = process.env.PORT || 3000;
console.log(port);

app.get("/", (req, res) => {
  res.send("Cohort");
});
app.get("/shouvik", (req, res) => {
  res.send("Shouvik!");
});
app.get("/piyush", (req, res) => {
  res.send("Piyush!");
});
db();
// user routes
app.use("/api/v1/users", router);
app.listen(port, () => {
  console.log(`Example app listening on port ${port} \n ${Date.now()}`);
});
