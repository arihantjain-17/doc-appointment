import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './DoctorSignupPage.css'; // Ensure you have a corresponding CSS file

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
      await axios.post('https://doc-appointment-backend.vercel.app/api/v1/doctors/signup', data);
      navigate('/doctor/login');
    } catch (error) {
      console.error('Error signing up doctor:', error);
    }
  };

  return (
    <div className="doctor-signup-page-container">
      <form className="doctor-signup-form" onSubmit={handleSubmit} encType="multipart/form-data">
        <h2 className="doctor-signup-form-title">Doctor Signup</h2>
        <input
          type="text"
          name="Name"
          placeholder="Name"
          className="doctor-signup-input"
          onChange={handleChange}
        />
        <input
          type="text"
          name="Speciality"
          placeholder="Speciality"
          className="doctor-signup-input"
          onChange={handleChange}
        />
        <input
          type="number"
          name="Fees"
          placeholder="Fees"
          className="doctor-signup-input"
          onChange={handleChange}
        />
        <input
          type="text"
          name="Hospital"
          placeholder="Hospital"
          className="doctor-signup-input"
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="doctor-signup-input"
          onChange={handleChange}
        />
        <input
          type="file"
          name="imageLink"
          className="doctor-signup-input"
          onChange={handleChange}
        />

        <h3 className="doctor-signup-availability-title">Availability Times</h3>
        {formData.AvailabilityTimes.map((time, index) => (
          <div key={index} className="doctor-signup-availability-slot">
            <select
              name="day"
              className="doctor-signup-select"
              onChange={(e) => handleAvailabilityChange(index, e)}
            >
              <option value="">Select Day</option>
              <option value="Monday">Monday</option>
              <option value="Tuesday">Tuesday</option>
              <option value="Wednesday">Wednesday</option>
              <option value="Thursday">Thursday</option>
              <option value="Friday">Friday</option>
              <option value="Saturday">Saturday</option>
              <option value="Sunday">Sunday</option>
            </select>
            <input
              type="time"
              name="startTime"
              className="doctor-signup-time-input"
              onChange={(e) => handleAvailabilityChange(index, e)}
            />
            <input
              type="time"
              name="endTime"
              className="doctor-signup-time-input"
              onChange={(e) => handleAvailabilityChange(index, e)}
            />
          </div>
        ))}
        <button
          type="button"
          className="doctor-signup-add-time-button"
          onClick={addAvailabilityTime}
        >
          Add Another Time Slot
        </button>
        <button type="submit" className="doctor-signup-submit-button">Signup</button>
      </form>
    </div>
  );
};

export default DoctorSignupPage;
