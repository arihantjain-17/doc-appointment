import './Docpage.css'
import { useParams } from 'react-router-dom';
import doctors from '../data/Docdetail'; 
import Calendar from '../components/DoctorPage/Calendar';
import Navbar from '../components/Landingpage/Navbar'

import './Docpage.css'; 
import { useEffect, useState } from 'react';
import axios from 'axios';

const Docpage = () => {
  const [docArray, setDocArray] = useState([]);

  const getDoc = async () => {
    try {
      const response = await axios.get("http://localhost:3000/doctor", {});
      // console.log(response, " is the response")
      setDocArray(response.data.doctor);
    } catch (error) {
      console.error("Error fetching doctors:", error);
    }
  };

  useEffect(() => {
    getDoc();
  }, []);
  const { id } = useParams();

  let doctor ;
  if(docArray.length > 0){
    for (let i = 0; i < docArray.length; i++) {
      const doc = docArray[i];
      if (doc._id === id) {
        doctor = doc;
        break;  // Exit the loop
      } else {
        console.log("doctor id not match");
      }
    }
  }else{
    return (
      <div><p>doctor array is empty</p></div>
    )
  }
  console.log(doctor, " is the current doctor")
  
  if (!doctor) {
    return <div>Doctor not found</div>;
  }


  return (
    <div className="doc-page-container">
      <Navbar></Navbar>
      <div className="doctor-detail-container">
        <div className="doctor-image-container">
          <img src={doctor.ImageLink} alt={doctor.Name} className="doctor-detail-image" />
        </div>
        <div className="doctor-info-container">
          <h1 className="doctor-detail-name">{doctor.Name}</h1>
          <p className="doctor-detail-description">{doctor.Description}</p>
          <p className="doctor-detail-specialty">Specialty: {doctor.Specialty}</p>
          <p className="doctor-detail-fees">Consultation Fees: ${doctor.Fees}</p>
          <p className="doctor-detail-availability">Availability: {doctor.Availability ? 'Available' : 'Not Available'}</p>
          <p className="doctor-detail-hospital">Hospital: {doctor.Hospital}</p>
          {/* <p className="doctor-detail-qualifications">Qualifications: {doctor.doctor.qualifications}</p>
          <p className="doctor-detail-awards">Awards: {doctor.doctor.awards}</p> */}
          
        </div>
        <div className="doctor-appointment-container">
          <Calendar></Calendar>
        </div>
      </div>
    </div>
  );
};

export default Docpage;
