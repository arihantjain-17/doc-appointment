const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const {Doctor} = require('./db/index')
const doctorRoute = require('./rotues/doctor')
const app = express()
// import doctorRoute from '../routes/doctor.js';  // Correct path and file extension

app.use(cors());
app.use(express.json());
app.use("/doctor", doctorRoute);

mongoose.connect('mongodb://localhost:27017/doctor-appointment', { useNewUrlParser: true, useUnifiedTopology: true, dbName: "doctor-appointment" })
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));

app.get("/doctor", async (req, res) => {
    console.log("hello from the doctor's project");
    const doc = await Doctor.find();
    if(!doc){
        res.send(403).json({ message : 'this doctor does not exit'})
    }
    res.status(200).json({
        message: 'Doctor found successfully',
        doctor: doc
    });
    console.log(doc);
});

app.listen(3000, () => {
    console.log("server is running on 3000");
});
