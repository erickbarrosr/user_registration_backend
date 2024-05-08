const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  name: String,
  lastName: String,
  userName: String,
  email: String,
  password: String,
  confirmPassword: String,
  dateOfBirth: String,
  gender: String,
  maritalStatus: String,
  phoneNumber: Number,
  academicEducation: String,
  profession: String,
  companie: String,
  salary: Number,
  trafficLicense: Boolean,
  address: [
    {
      street: String,
      apartmentNumber: Number,
      neighborhood: String,
      city: String,
      state: String,
      zipCode: Number,
      country: String,
    },
  ],
});

const User = mongoose.model("User", schema);

module.exports = User;
