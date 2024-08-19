const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Doctor = require('../models/doctordata'); // Adjusted the model import

// Doctor Signup
exports.signup = async (req, res) => {
  
  const { Name, Speciality, Fees, Hospital, AvailabilityTimes, password } = req.body;
  const image = req.file ? req.file.path : ''; // Assuming you are using Multer to handle file uploads

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Calculate availability based on current time and AvailabilityTimes
    const currentDay = new Date().toLocaleString('en-US', { weekday: 'long' });
    const currentTime = new Date().toTimeString().slice(0, 5);

    let isAvailable = false;
    const parsedAvailabilityTimes = JSON.parse(AvailabilityTimes); // Parse the JSON string

    parsedAvailabilityTimes.forEach(time => {
      if (time.day === currentDay && time.startTime <= currentTime && time.endTime >= currentTime) {
        isAvailable = true;
      }
    });

    const newDoctor = new Doctor({
      Name, 
      Speciality,
      Fees,
      Hospital,
      AvailabilityTimes: parsedAvailabilityTimes,
      password: hashedPassword,
      imageLink:image, // Add image link here
      Availablity: isAvailable,
    });

    await newDoctor.save();
    res.status(201).json({ message: 'Doctor registered successfully' });
  } catch (error) {
    res.status(400).json({ error: 'Error registering doctor' });
  }
};

// Doctor Login
exports.login = async (req, res) => {
  const { Name, password } = req.body;
  try {
    const doctor = await Doctor.findOne({ Name });
    if (!doctor) return res.status(404).json({ error: 'Doctor not found' });

    const isMatch = await bcrypt.compare(password, doctor.password);
    if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });

    const token = jwt.sign({ id: doctor._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token, doctorId: doctor._id });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Get Doctor Profile (Uncomment if needed in future)
// exports.getDoctorProfile = async (req, res) => {
//   try {
//     const doctor = await Doctor.findById(req.params.id).select('-password');
//     if (!doctor) return res.status(404).json({ error: 'Doctor not found' });

//     res.json(doctor);
//   } catch (error) {
//     res.status(500).json({ error: 'Server error' });
//   }
// };
