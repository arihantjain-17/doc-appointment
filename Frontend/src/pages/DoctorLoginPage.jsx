import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const DoctorLoginPage = () => {
  const [Name, setName] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/v1/doctors/login', {
        Name,
        password,
      });
      localStorage.setItem('token', response.data.token);
      navigate(`/doctor-profile/${response.data.doctorId}`);
    }     catch (error) {
        console.error('Error logging in:', error);
      }
    };
  
    return (
      <div className="login-container">
        <form onSubmit={handleLogin}>
          <h2>Doctor Login</h2>
          <input 
            type="text" 
            placeholder="Name" 
            value={Name} 
            onChange={(e) => setName(e.target.value)} 
          />
          <input 
            type="password" 
            placeholder="Password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
          />
          <button type="submit">Login</button>
        </form>
      </div>
    );
  };
  
  export default DoctorLoginPage;
  
