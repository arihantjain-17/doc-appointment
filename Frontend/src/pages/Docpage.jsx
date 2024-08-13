import './Docpage.css'
import { useParams } from 'react-router-dom';
import Calendar from '../components/DoctorPage/Calendar';
import Navbar from '../components/Landingpage/Navbar'
import { useEffect, useState } from 'react';
import axios from 'axios';

const Docpage = () => {
  const [docArray, setDocArray] = useState([]);
  const { id } = useParams();
  const patientName = "John Doe"; // Example patient name, you can get this from user context or props

  const getDoc = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/v1/doctor", {});
      setDocArray(response.data.doctor);
    } catch (error) {
      console.error("Error fetching doctors:", error);
    }
  };

  useEffect(() => {
    getDoc();
  }, []);

  let doctor ;
  if(docArray.length > 0){
    doctor = docArray.find(doc => doc._id === id);
  }else{
    return (
      <div><p>doctor array is empty</p></div>
    )
  }

  if (!doctor) {
    return <div>Doctor not found</div>;
  }

  return (
    <div className="doc-page-container">
      <Navbar />
      <div className="doctor-detail-container">
        <div className="doctor-image-container">
          <img src={doctor.imageLink} alt={doctor.Name} className="doctor-detail-image" />
        </div>
        <div className="doctor-info-container">
          <h1 className="doctor-detail-name">{doctor.Name}</h1>
          <p className="doctor-detail-description">{doctor.Description}</p>
          <p className="doctor-detail-specialty">Speciality: {doctor.Speciality}</p>
          <p className="doctor-detail-fees">Consultation Fees: ${doctor.Fees}</p>
          <p className="doctor-detail-availability">Availability: {doctor.Availability ? 'Available' : 'Not Available'}</p>
          <p className="doctor-detail-hospital">Hospital: {doctor.Hospital}</p>
        </div>
        <div className="doctor-appointment-container">
          <Calendar doctorId={doctor._id} patientName={patientName} />
        </div>
      </div>
    </div>
  );
};

export default Docpage;
