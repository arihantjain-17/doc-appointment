
import DocCard from './DocCard';
import './Doctor.css';


const Doctor = ({doctors, userId}) => {
  

  return (
    <div className="cards">
      {doctors.length > 0 ? (
              doctors.map((doctor, index) => (
                <DocCard key={index} doctor={doctor} userId={userId}/>
              ))
            ) : (
              <p>Loading doctors...</p>
            )}

    </div>
  ); 
}; 

export default Doctor;
