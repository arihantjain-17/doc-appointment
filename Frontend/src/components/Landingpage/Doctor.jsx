
import DocCard from './DocCard';
import './Doctor.css';


const Doctor = ({doctors}) => {
  

  return (
    <div className="cards">
      {doctors.length > 0 ? (
              doctors.map((doctor, index) => (
                <DocCard key={index} doctor={doctor} />
              ))
            ) : (
              <p>Loading doctors...</p>
            )}

    </div>
  ); 
};

export default Doctor;
