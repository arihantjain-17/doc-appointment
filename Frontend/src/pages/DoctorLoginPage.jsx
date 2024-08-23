import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './DoctorLoginPage.css'; // Ensure you have a corresponding CSS file

const DoctorLoginPage = () => {
  const [Name, setName] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://doc-appointment-backend.vercel.app/api/v1/doctors/login', {
        Name,
        password,
      });
      localStorage.setItem('token', response.data.token);
      navigate(`/doctor-profile/${response.data.doctorId}`);
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  return (
    <div className="doctor-login-page-container">
      <form className="doctor-login-form" onSubmit={handleLogin}>
        <h2 className="doctor-login-form-title">Doctor Login</h2>
        <input
          type="text"
          className="doctor-login-input"
          placeholder="Name"
          value={Name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="password"
          className="doctor-login-input"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className="doctor-login-button">Login</button>
      </form>
    </div>
  );
};

export default DoctorLoginPage;
