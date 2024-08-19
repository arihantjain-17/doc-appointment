const express = require('express');
const { signup, login, getUserProfile,getUserAppointments } = require('../controller/authController');
const authMiddleware = require('../middleware/authMiddleware'); 
const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.get('/profile/:id', authMiddleware,getUserProfile);



module.exports = router;
