
import DocCard from './DocCard';
import './Doctor.css';


const Doctor = ({ doctors }) => {
  return (
    <div className="cards">
      {doctors.map((doctor) => (
        <DocCard key={doctor.id} {...doctor} />
      ))}
    </div>
  );
};

export default Doctor;
