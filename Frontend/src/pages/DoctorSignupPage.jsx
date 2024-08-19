import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const DoctorSignupPage = () => {
  const [formData, setFormData] = useState({
    Name: '',
    Speciality: '',
    Fees: '',
    Hospital: '',
    password: '',
    imageLink: null,
    AvailabilityTimes: [{ day: '', startTime: '', endTime: '' }]
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    if (e.target.name === 'imageLink') {
      setFormData({ ...formData, imageLink: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  }; 

  const handleAvailabilityChange = (index, e) => {
    const updatedTimes = formData.AvailabilityTimes.map((time, i) =>
      i === index ? { ...time, [e.target.name]: e.target.value } : time
    );
    setFormData({ ...formData, AvailabilityTimes: updatedTimes });
  };

  const addAvailabilityTime = () => {
    setFormData({
      ...formData,
      AvailabilityTimes: [...formData.AvailabilityTimes, { day: '', startTime: '', endTime: '' }]
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.keys(formData).forEach(key => {
      if (key === 'AvailabilityTimes') {
        data.append(key, JSON.stringify(formData[key])); // Handle array of objects
      } else {
        data.append(key, formData[key]);
      }
    });

    try {
      await axios.post('http://localhost:3000/api/v1/doctors/signup', data);
      navigate('/doctor/login');
    } catch (error) {
      console.error('Error signing up doctor:', error);
    }
  };

  return (
    <div className="signup-container">
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <h2>Doctor Signup</h2>
        <input type="text" name="Name" placeholder="Name" onChange={handleChange} />
        <input type="text" name="Speciality" placeholder="Speciality" onChange={handleChange} />
        <input type="number" name="Fees" placeholder="Fees" onChange={handleChange} />
        <input type="text" name="Hospital" placeholder="Hospital" onChange={handleChange} />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} />
        <input type="file" name="imageLink" onChange={handleChange} />

        <h3>Availability Times</h3>
        {formData.AvailabilityTimes.map((time, index) => (
          <div key={index}>
            <select name="day" onChange={(e) => handleAvailabilityChange(index, e)}>
              <option value="">Select Day</option>
              <option value="Monday">Monday</option>
              <option value="Tuesday">Tuesday</option>
              <option value="Saturday">Saturday</option>
              
            </select>
            <input type="time" name="startTime" onChange={(e) => handleAvailabilityChange(index, e)} />
            <input type="time" name="endTime" onChange={(e) => handleAvailabilityChange(index, e)} />
          </div>
        ))}
        <button type="button" onClick={addAvailabilityTime}>Add Another Time Slot</button>
        <button type="submit">Signup</button>
      </form>
    </div>
  );
};

export default DoctorSignupPage;
