
import { Link } from 'react-router-dom';
import './DocCard.css';

const DocCard = (doctor) => {
  return (
    <Link to={`/doctor/${doctor.doctor._id}`} className="doctor-card-link">
      <div className="doctor-card">
        <img src={doctor.doctor.ImageLink} alt={doctor.doctor.Name} className="doctor-image" />
        <h3 className="doctor-name">{doctor.doctor.Name}</h3>
        <p className="doctor-specialty">{doctor.doctor.Specialty}</p>
        <p className="doctor-fees">Fees: ${doctor.doctor.Fees}</p>
        <p className="doctor-availability">Availability: {doctor.doctor.Availability ? 'Available' : 'Not Available'}</p>
        <p className="doctor-hospital">Hospital: {doctor.doctor.Hospital}</p>
      </div>
      
    </Link>
  );
};

export default DocCard;
