const express=require("express");
const router=express.Router();

const {doctordata}=require('../controller/doctordata');



router.get("/doctor",doctordata );




module.exports=router;