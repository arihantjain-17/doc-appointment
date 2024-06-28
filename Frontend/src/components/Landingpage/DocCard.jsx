
import { Link } from 'react-router-dom';
import './DocCard.css';

const DocCard = ({ id, name, specialty, fees, image, availability, hospital }) => {
  return (
    <Link to={`/doctor/${id}`} className="doctor-card-link">
      <div className="doctor-card">
        <img src={image} alt={name} className="doctor-image" />
        <h3 className="doctor-name">{name}</h3>
        <p className="doctor-specialty">{specialty}</p>
        <p className="doctor-fees">Fees: ${fees}</p>
        <p className="doctor-availability">Availability: {availability ? 'Available' : 'Not Available'}</p>
        <p className="doctor-hospital">Hospital: {hospital}</p>
      </div>
    </Link>
  );
};

export default DocCard;
