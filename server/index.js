import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import "dotenv/config";
import connectDB from "./database.js";
import userRoute from "./routes/userRoute.js";

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

app.use("/api/v1", userRoute);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});