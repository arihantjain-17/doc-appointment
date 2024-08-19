const express=require("express");
const router=express.Router();

const {doctordata,updateavailability,data}=require('../controller/doctordata');

router.get("/doctor",data );

router.get("/doctor/:id",doctordata );

router.put("/doctoravailability/:id",updateavailability);




module.exports=router; 