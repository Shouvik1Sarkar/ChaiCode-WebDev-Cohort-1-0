import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const db = async () => {
  await mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => {
      console.log("MongoDb connected properly");
    })
    .catch((err) => {
      console.log(`"error connecting", ${err}`);
      console.log(Date.now());
    });
};
export default db;
