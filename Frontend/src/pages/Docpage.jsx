import './Docpage.css';
import { useParams, useLocation } from 'react-router-dom';
import Calendar from '../components/DoctorPage/Calendar';
import Navbar from '../components/Landingpage/Navbar';
import { useEffect, useState } from 'react';
import axios from 'axios';

const Docpage = () => {
  const [docArray, setDocArray] = useState([]);
  const [userData, setUserData] = useState(null);
  const [doctor, setDoctor] = useState(null);

  const { id } = useParams();
  const location = useLocation();
  const userId = new URLSearchParams(location.search).get('userId');

  useEffect(() => {
    const getDoc = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/v1/doctor");
        setDocArray(response.data.doctor);
      } catch (error) {
        console.error("Error fetching doctors:", error);
      }
    };

    const getUser = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          console.error('No token found');
          return;
        }

        const response = await axios.get(`http://localhost:3000/api/v1/user/profile/${userId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUserData(response.data); // Assuming the user data is in `response.data.user`
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    getDoc();
    getUser();
  }, [id, userId]);

  useEffect(() => {
    if (docArray.length > 0) {
      const selectedDoctor = docArray.find(doc => doc._id === id);
      if (selectedDoctor) {
        const isAvailable = checkAvailability(selectedDoctor.AvailabilityTimes);
        setDoctor({ ...selectedDoctor, Availablity: isAvailable });
      }
    }
  }, [docArray, id]);

  // Function to check if the doctor is currently available based on availability times
  const checkAvailability = (availabilityTimes) => {
    const currentDay = new Date().toLocaleString('en-US', { weekday: 'long' }); // Get the current day
    const currentTime = new Date().toLocaleTimeString('en-US', { hour12: false }); // Get the current time in 24-hour format

    // Check if the current time is within any of the availability time slots
    return availabilityTimes.some(time => {
      return time.day === currentDay &&
        currentTime >= time.startTime &&
        currentTime <= time.endTime;
    });
  };

  // Ensure that doctor and userData are loaded before rendering
  if (!doctor || !userData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="doc-page-container">
      <Navbar />
      <div className="doctor-detail-container">
        <div className="doctor-image-container">
          <img src={`http://localhost:3000/${doctor.imageLink}`} alt={doctor.Name} className="doctor-detail-image" />
        </div>
        <div className="doctor-info-container">
          <h1 className="doctor-detail-name">{doctor.Name}</h1>
          <p className="doctor-detail-description">{doctor.Description}</p>
          <p className="doctor-detail-specialty">Speciality: {doctor.Speciality}</p>
          <p className="doctor-detail-fees">Consultation Fees: ${doctor.Fees}</p>
          <p className="doctor-detail-availability">Availability: {doctor.Availablity ? 'Available' : 'Not Available'}</p>
          <p className="doctor-detail-hospital">Hospital: {doctor.Hospital}</p>
        </div>
        <div className="doctor-appointment-container">
          <Calendar doctorId={doctor._id} patientName={userData.username} isAvailable={doctor.Availablity}/>
        </div>
      </div>
    </div>
  );
};

export default Docpage;
