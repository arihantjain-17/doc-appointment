const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

require('dotenv').config();
const PORT = process.env.PORT;

const doctorRoute = require('./rotues/doctor');
const appointmentRoute = require('./rotues/appointment'); // Add this line

app.use("/api/v1", doctorRoute);
app.use("/api/v1", appointmentRoute); // Add this line

app.listen(PORT, () => {
    console.log(`server is running on ${PORT}`);
});

require("./config/database").connect();
