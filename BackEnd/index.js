const express = require('express')
const cors = require('cors')
const app = express()


app.use(cors());
app.use(express.json());
 


require('dotenv').config();
const PORT=process.env.PORT;



const doctorRoute=require('./rotues/doctor');
app.use("/api/v1",doctorRoute);




app.listen(PORT, () => {
    console.log("server is running on 3000");
});

require("./config/database").connect();
