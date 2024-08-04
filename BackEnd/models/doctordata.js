const mongoose = require('mongoose')
// Define mongoose schemas

const doctorSchema = new mongoose.Schema({
    Name: String,
    Speciality: String,
    Fees: Number,
    imageLink: String,
    Availablity: Boolean,
    Hospital : String,
  });

const Doctor = mongoose.model('Doctor', doctorSchema);
  
  module.exports = {
    Doctor
  } 