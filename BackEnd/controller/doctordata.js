const Doctor = require('../models/doctordata');


//extracting all doctor data
exports.data = async (req, res) => {
try {
    
    const doctors = await Doctor.find().select('-password'); // Exclude the password field
    
    res.status(200).json({
      message: 'Doctors fetched successfully',
      doctor: doctors
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching doctor data', error });
  }
};
 


exports.doctordata = async (req, res) => { 
  
  const { id } = req.params; // Get the doctor ID from the request parameters
  
  try {
       
      const doc = await Doctor.findById(id); // Find the doctor by ID
      
      if (!doc) {
          return res.status(404).json({ message: 'Doctor not found' });
      }
      res.status(200).json({
          message: 'Doctor found successfully',
          doctor: doc
      });
  } catch (error) {
      res.status(500).json({ message: 'Error fetching doctor data', error });
  }
};

exports.updateavailability=async (req, res) => {
    try {
      const { id } = req.params;
      const { Availablity, AvailabilityTimes } = req.body;
      // console.log("Received data on server:", { Availablity, AvailabilityTimes });
      
      const updatedDoctor = await Doctor.findByIdAndUpdate(
        id,
        { Availablity, AvailabilityTimes },
        { new: true }
      );
  
      if (!updatedDoctor) {
        return res.status(404).json({ message: 'Doctor not found' });
      }
  
      res.status(200).json({ doctor: updatedDoctor });
    } catch (error) {
      res.status(500).json({ message: 'Error updating doctor availability', error });
    }
  }
