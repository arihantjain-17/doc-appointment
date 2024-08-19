const { Appointment } = require('../models/appointment');
const User = require('../models/User');





exports.getAppointmentsByUserId = async (req, res) => {
    try {
        const userId = req.params.userId;

        // Fetch the user by ID to get their appointments
        const user = await User.findById(userId).populate('appointments');

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Send the appointments as a response
        res.json(user.appointments);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching appointments', error });
    }
};




exports.bookAppointment = async (req, res) => {
    const { doctorId, patientName, date, time } = req.body;
    try {
        const appointment = new Appointment({ doctorId, patientName, date, time });
        await appointment.save();
        const user = await User.findOne({ username: patientName });  // Adjust as needed
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.appointments.push(appointment._id);  // Add the appointment ID to the user's appointments array
        await user.save();
        

        res.status(201).json({ message: 'Appointment booked successfully', appointment });
    } catch (error) {
        res.status(500).json({ message: 'Error booking appointment', error });
    }
};

exports.getAppointments = async (req, res) => {
    const { doctorId } = req.params;
    try { 
        const appointments = await Appointment.find({ doctorId });
        res.status(200).json({ appointments });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching appointments', error });
    }
};

exports.updateAppointmentStatus = async (req, res) => {
    const { appointmentId } = req.params;
    const { status } = req.body;
    try {
        const appointment = await Appointment.findByIdAndUpdate(appointmentId, { status }, { new: true });
        if (!appointment) {
            return res.status(404).json({ message: 'Appointment not found' });
        }
        res.status(200).json({ message: 'Appointment status updated', appointment });
    } catch (error) {
        res.status(500).json({ message: 'Error updating appointment status', error });
    } 
};
