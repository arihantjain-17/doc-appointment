import express from "express"
import mongoose from "mongoose"
import cors from "cors"
const app = express()


app.use(cors());
app.use(express.json());

app.listen(3000, ()=>{
    console.log("server is running on 3000")
})


mongoose.connect('mongodb://localhost:27017/your-database-name', {
  name: { type: String, required: true },
  specialty: { type: String, required: true },
  availability: { type: [Date], required: true },
  })
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));