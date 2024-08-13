const { Appointment } = require('../models/appointment');

exports.bookAppointment = async (req, res) => {
    const { doctorId, patientName, date, time } = req.body;
    try {
        const appointment = new Appointment({ doctorId, patientName, date, time });
        await appointment.save();
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
