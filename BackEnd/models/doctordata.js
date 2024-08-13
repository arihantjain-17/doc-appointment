const mongoose = require('mongoose')
// Define mongoose schemas

const doctorSchema = new mongoose.Schema({
  Name: String,
  Speciality: String,
  Fees: Number,
  imageLink: String,
  Availablity: Boolean,
  Hospital: String,
  AvailabilityTimes: [{ day: String, startTime: String, endTime: String }], // e.g., { day: 'Monday', startTime: '09:00', endTime: '17:00' }
});


const Doctor = mongoose.model('Doctor', doctorSchema);
  
  module.exports = {
    Doctor
  } 