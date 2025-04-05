import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import db from "./utils/db.connect.js";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: process.env.BASE_URL,
    methods: ["GET", "POST", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json()); // send json data
app.use(express.urlencoded({ extended: true })); // that %20 in a url, extended version/latest version do vai
const port = process.env.PORT || 8000;

console.log("PROCESS.ENV: ", process.env.PORT);

app.get("/", (req, res) => {
  res.send("Cohort cohort");
});

app.get("/hitesh", (req, res) => {
  res.send("Hitesh");
});

app.get("/piyush", (req, res) => {
  res.send("Piyush");
});

// connect to db

db();

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
  console.log(`http://localhost:${port}`);
});

// MONGODB_URI = mongodb+srv://shouvik_2:<db_password>@cluster1.aepynnz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1
