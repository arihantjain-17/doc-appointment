const express = require('express');
const router = express.Router();
const { bookAppointment, getAppointments, updateAppointmentStatus } = require('../controller/appointment');

router.post('/appointment', bookAppointment);
router.get('/appointments/:doctorId', getAppointments);
router.put('/appointment/:appointmentId', updateAppointmentStatus);

module.exports = router;
