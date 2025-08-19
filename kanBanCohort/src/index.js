import app from "./app.js";
import dotenv from "dotenv";
import connectDB from "./db/index.js";

dotenv.config({
  path: "./.env",
});

const PORT = process.env.PORT || 3000;
// app.get("/cookie", function (req, res) {
//   // Cookies that have not been signed
//   console.log("Cookies: ", req.cookies);

//   // Cookies that have been signed
//   console.log("Signed Cookies: ", req.signedCookies);
// });
connectDB();
// .then(() => {
//   app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));
// })
// .catch((err) => {
//   console.error("Mongodb connection error", err);
//   process.exit(1);
// });

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
