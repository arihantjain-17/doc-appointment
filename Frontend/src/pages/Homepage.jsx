import { Link } from 'react-router-dom';
import './Homepage.css';

const Homepage = () => {
  return (
    <div className="homepage-container">
      <h1 className="homepage-title">Welcome to Doc Appointment</h1>
      <div className="homepage-options">
        <div className="homepage-section">
          <h2 className="homepage-section-title">As a User</h2>
          <div className="homepage-buttons">
            <Link to="/signup" className="homepage-button Signup-button">Sign Up</Link>
            <Link to="/login" className="homepage-button Login-button">Login</Link>
          </div>
        </div>

        <div className="homepage-section">
          <h2 className="homepage-section-title">As a Doctor</h2>
          <div className="homepage-buttons">
            <Link to="/doctor/signup" className="homepage-button Signup-button">Sign Up</Link>
            <Link to="/doctor/login" className="homepage-button Login-button">Login</Link>
          </div> 
        </div>
      </div>
    </div>
  );
};

export default Homepage;
