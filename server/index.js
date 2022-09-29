import express from "express";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import cloudinary from "cloudinary";
import cors from "cors";
import "dotenv/config";
import connectDB from "./database.js";
import userRoute from "./routes/userRoute.js";

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());
app.use(
  fileUpload({
    limits: { fileSize: 1024 * 1024 * 5 },
    useTempFiles: true,
  })
);

app.use("/api/v1", userRoute);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});