import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './DocCard.css';

const DocCard = ({ doctor, userId }) => {
  const [isAvailable, setIsAvailable] = useState(false);

  useEffect(() => {
    const checkAvailability = () => {
      const currentDay = new Date().toLocaleString('en-US', { weekday: 'long' }); // Get the current day
      const currentTime = new Date().toLocaleTimeString('en-US', { hour12: false }); // Get the current time in 24-hour format

      // Check if the current time is within any of the availability time slots
      return doctor.AvailabilityTimes.some(time => {
        return time.day === currentDay &&
          currentTime >= time.startTime &&
          currentTime <= time.endTime;
      });
    };

    setIsAvailable(checkAvailability());
  }, [doctor.AvailabilityTimes]);

  return (
    <Link to={`/doctor/${doctor._id}?userId=${userId}`} className="doctor-card-link">
      <div className="doctor-card">
        <img src={`https://doc-appointment-backend.vercel.app/${doctor.imageLink}`} alt={doctor.Name} className="doctor-image" />
        <h3 className="doctor-name">{doctor.Name}</h3>
        <div className="doctor-basic-info">
          <p className="doctor-speciality">{doctor.Speciality}</p>
          <p className="doctor-fees">Fees: ${doctor.Fees}</p>
          <p className="doctor-availability">Availability: {isAvailable ? 'Available' : 'Not Available'}</p>
          <p className="doctor-hospital">Hospital: {doctor.Hospital}</p>
        </div>
      </div>
    </Link>
  );
};

export default DocCard;
