import mongoose from "mongoose";
const MONGO_URL = process.env.MONGO_URL;

const connectDB = async () => {
  try {
    const { connection } = await mongoose.connect(MONGO_URL);
    console.log(`MongoDB Connected: ${connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;