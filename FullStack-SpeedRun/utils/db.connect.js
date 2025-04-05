import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

// Export a function that connects to the db

const db = () => {
  mongoose
    .connect(process.env.MONGO_URL)
    .then(() => {
      console.log("Conneted to db");
    })
    .catch((err) => {
      console.log(
        "Error-1: Error connecting to the database {utils/db.connect.js}: ",
        err
      );
    });
};
export default db;
