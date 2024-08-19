const mongoose = require('mongoose');

// Define mongoose schema
const doctorSchema = new mongoose.Schema({
  Name: { type: String, required: true },
  Speciality: { type: String, required: true },
  Fees: { type: Number, required: true },
  imageLink: { type: String, required: true },
  Availablity: { type: Boolean, default: false }, // default to false
  Hospital: { type: String, required: true },
  AvailabilityTimes: [{ day: String, startTime: String, endTime: String }],
  password: { type: String, required: true }
});

const Doctor = mongoose.model('Doctor', doctorSchema);

module.exports = Doctor;
  