import "dotenv/config";
import mongoose from "mongoose";

const dbConnection = process.env.DB_CONNECTION;

async function connectToDatabase() {
  try {
    await mongoose.connect(dbConnection);

    console.log("> Database connected successfully!");
    console.log();
  } catch (error) {
    console.log(error);
  }
}

module.exports = connectToDatabase;
