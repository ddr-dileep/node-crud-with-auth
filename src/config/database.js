import mongoose from "mongoose";

export const databaseConnection = async () => {
  try {
    const _STRING = process.env.DB_URL.replace('<password>', process.env.DB_PASSWORD);
    await mongoose.connect(_STRING);
    console.log("Connected to database");
  } catch (e) {
    console.log("Error connecting to database");
  }
};