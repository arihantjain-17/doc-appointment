
import { useParams } from 'react-router-dom';
import doctors from '../data/Doctordata'; 

const DocPage = () => {
  const { id } = useParams();
  const doctor = doctors.find(doc => doc.id === parseInt(id));

  if (!doctor) {
    return <div>Doctor not found</div>;
  }

  return (
    <div>
      <h1>{doctor.name}</h1>
      <img src={doctor.image} alt={doctor.name} />
      <p>Specialty: {doctor.specialty}</p>
      <p>Fees: ${doctor.fees}</p>
      <p>Availability: {doctor.availability ? 'Available' : 'Not Available'}</p>
      <p>Hospital: {doctor.hospital}</p>
    </div>
  );
};

export default DocPage;
