import mongoose from "mongoose";

const MONGO_URL =
  "mongodb://root:example@localhost:27017/mydb?authSource=admin";

export const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URL);
    console.log("✅ MongoDB connected!");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
  }
};
