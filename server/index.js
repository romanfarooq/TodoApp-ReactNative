import express from "express";
import "dotenv/config";
import connectDB from "./daatabase.js";

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});