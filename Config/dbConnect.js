import mongoose from "mongoose";
import { config } from "dotenv";
config();
const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017";

const dbConnect = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("connected successfully");
  } catch (error) {
    console.log("MongoDb Error : ", error);
  }
};

export default dbConnect;
