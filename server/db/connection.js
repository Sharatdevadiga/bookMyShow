import mongoose from "mongoose";

const mongoURI = process.env.MONGO_URI;

export const ConnectDb = async () => {
  try {
    mongoose.connect(mongoURI);
    console.log("connected to database ✅");
  } catch (err) {
    console.log("Error connecting to MongoDB: 💥", err);
  }
};
