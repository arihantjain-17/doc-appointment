import './Docpage.css'
import { useParams } from 'react-router-dom';
import doctors from '../data/Docdetail'; 

import './Docpage.css'; 

const Docpage = () => {
  const { id } = useParams();
  const doctor = doctors.find(doc => doc.id === parseInt(id));

  if (!doctor) {
    return <div>Doctor not found</div>;
  }


  return (
    <div className="doctor-detail-container">
      <div className="doctor-image-container">
        <img src={doctor.image} alt={doctor.name} className="doctor-detail-image" />
      </div>
      <div className="doctor-info-container">
        <h1 className="doctor-detail-name">{doctor.name}</h1>
        <p className="doctor-detail-description">{doctor.description}</p>
        <p className="doctor-detail-specialty">Specialty: {doctor.specialty}</p>
        <p className="doctor-detail-fees">Consultation Fees: ${doctor.fees}</p>
        <p className="doctor-detail-availability">Availability: {doctor.availability ? 'Available' : 'Not Available'}</p>
        <p className="doctor-detail-hospital">Hospital: {doctor.hospital}</p>
        <p className="doctor-detail-qualifications">Qualifications: {doctor.qualifications}</p>
        <p className="doctor-detail-awards">Awards: {doctor.awards}</p>
        
      </div>
      <div className="doctor-appointment-container">
        <label htmlFor="">Appointment</label>
        <input type="date" />
        <input type="button" value="book appointment"/>
        
      </div>
    </div>
  );
};

export default Docpage;
