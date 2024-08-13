const {Doctor} = require('../models/doctordata');

exports.doctordata=async (req, res) => {
    // console.log("hello from the doctor's project");
    const doc = await Doctor.find();
    // console.log(doc);
    if(!doc){
        res.send(403).json({ message : 'this doctor does not exit'})
    }
    res.status(200).json({
        message: 'Doctor found successfully',
        doctor: doc
    });
    
}

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
