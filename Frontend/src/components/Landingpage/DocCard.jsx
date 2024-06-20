
import './DocCard.css';


const DocCard = ({name,specialty,image}) => {
  return (
    <div className="doctor-card">
      <img src={image} alt={name} />
      <h3>{name}</h3>
      <p>{specialty}</p>
    </div>
  );
};


export default DocCard;
