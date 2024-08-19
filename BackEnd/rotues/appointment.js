const express = require('express');
const router = express.Router();
const { bookAppointment, getAppointments, updateAppointmentStatus } = require('../controller/appointment');
const { getAppointmentsByUserId } = require('../controller/appointment');

router.get('/user/:userId/appointments', getAppointmentsByUserId);

router.post('/appointment', bookAppointment);
router.get('/appointments/:doctorId', getAppointments);
router.put('/appointment/:appointmentId', updateAppointmentStatus);

module.exports = router;
 