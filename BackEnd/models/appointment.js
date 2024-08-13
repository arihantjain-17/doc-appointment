const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
    doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor', required: true },//the doctorId field is a reference to the _id field in the Doctor collection
    patientName: { type: String, required: true },
    date: { type: Date, required: true },
    time: { type: String, required: true },
    status: { type: String, enum: ['Pending', 'Accepted', 'Declined'], default: 'Pending' }
});

const Appointment = mongoose.model('Appointment', appointmentSchema);

module.exports = { Appointment };
