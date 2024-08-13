const express=require("express");
const router=express.Router();

const {doctordata,updateavailability}=require('../controller/doctordata');



router.get("/doctor",doctordata );

router.put("/doctor/:id",updateavailability);




module.exports=router;