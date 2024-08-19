const express = require('express');
const { signup, login } = require('../controller/doctorController');
// const authMiddleware = require('../middleware/authMiddleware');
const upload = require('../config/multer');

const router = express.Router();

router.post('/signup', upload.single('imageLink'), signup);
router.post('/login', login);
// router.get('/profile/:id', authMiddleware, getDoctorProfile);

module.exports = router;
  