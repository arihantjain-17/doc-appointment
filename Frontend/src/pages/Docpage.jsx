import './Docpage.css'
import { useParams } from 'react-router-dom';
import doctors from '../data/Doctordata'; 

const DocPage = () => {
  const { id } = useParams();
  const doctor = doctors.find(doc => doc.id === parseInt(id));

  if (!doctor) {
    return <div>Doctor not found</div>;
  }

  document.addEventListener('mousemove', (e) => {
    const pointerCircle = document.getElementById('pointer-circle');
    const circleDiameter = pointerCircle.clientWidth;
    const offsetX = circleDiameter / 2;
    const offsetY = circleDiameter / 2;
    // Update the position of the circle based on mouse coordinates, adjusting for its size
    pointerCircle.style.transform = `translate(${e.pageX -600}px, ${e.pageY -350}px)`;
  });

  return (
    <div className="docpage">
    <div id="pointer-circle" className="pointer-circle "></div>
      <div className='doc-card'>
        <h1 >{doctor.name}</h1>
        <img src={doctor.image} alt={doctor.name} />
        <p>Specialty: {doctor.specialty}</p>
        <p>Fees: ${doctor.fees}</p>
        <p>Availability: {doctor.availability ? 'Available' : 'Not Available'}</p>
        <p>Hospital: {doctor.hospital}</p>
      </div>
    </div>
  );
};

export default DocPage;
