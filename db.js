const mongoose = require("mongoose");
require("dotenv").config();

async function connectToDatabase() {
  try {
    await mongoose.connect(
      `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.suvv6rd.mongodb.net/userRegistrationDatabase`
    );

    console.log("Database connected successfully!");
  } catch (error) {
    console.log(error);
  }
}

module.exports = connectToDatabase;
