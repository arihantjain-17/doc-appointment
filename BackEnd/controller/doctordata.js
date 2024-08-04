const {Doctor} = require('../models/doctordata');

exports.doctordata=async (req, res) => {
    console.log("hello from the doctor's project");
    const doc = await Doctor.find();
    if(!doc){
        res.send(403).json({ message : 'this doctor does not exit'})
    }
    res.status(200).json({
        message: 'Doctor found successfully',
        doctor: doc
    });
    
}