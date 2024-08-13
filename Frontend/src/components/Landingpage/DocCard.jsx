
import { Link } from 'react-router-dom';
import './DocCard.css';

const DocCard = ({doctor}) => {
  return (
    <Link to={`/doctor/${doctor._id}`} className="doctor-card-link">
      <div className="doctor-card">
        <img src={doctor.imageLink} alt={doctor.Name} className="doctor-image" />
        <h3 className="doctor-name">{doctor.Name}</h3>
        <div className="doctor-basic-info">
          <p className="doctor-speciality">{doctor.Speciality}</p>
          <p className="doctor-fees">Fees: ${doctor.Fees}</p>
          <p className="doctor-availability">Availability: {doctor.Availibility ? 'Available' : 'Not Available'}</p>
          <p className="doctor-hospital">Hospital: {doctor.Hospital}</p>
        </div>
      </div>
      
    </Link>
  ); 
};
 
export default DocCard;
