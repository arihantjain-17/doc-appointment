import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './DoctorProfile.css';

const DoctorProfile = () => {
  const { id: doctorId } = useParams(); // Extracting the doctorId from the URL parameters
  const [doctor, setDoctor] = useState(null); // State to store doctor data
  const [appointments, setAppointments] = useState([]); // State to store appointments
  const [activeTab, setActiveTab] = useState('today'); // State to track the active tab for appointments
  const [editMode, setEditMode] = useState(false); // State to toggle edit mode for availability
  const [availability, setAvailability] = useState(false); // State to track the availability status
  const [availabilityTimes, setAvailabilityTimes] = useState([]); // State to store the availability times

  // Function to check if the doctor is currently available based on availability times
  const checkAvailability = (availabilityTimes) => {
    const currentDay = new Date().toLocaleString('en-US', { weekday: 'long' }); // Get the current day
    const currentTime = new Date().toLocaleTimeString('en-US', { hour12: false }); // Get the current time in 24-hour format

    // Check if the current time is within any of the availability time slots
    return availabilityTimes.some(time => {
      return time.day === currentDay &&
        currentTime >= time.startTime &&
        currentTime <= time.endTime;
    });
  };

  // Function to fetch the doctor's data from the backend
  const fetchDoctorData = async () => {
    try {
      const response = await axios.get(`https://doc-appointment-backend.vercel.app/api/v1/doctor/${doctorId}`); // Fetch all doctors
      const foundDoctor = response.data.doctor; // Find the doctor with the matching ID
      
      setDoctor(foundDoctor); // Set the doctor data in state
      

      const isAvailable = checkAvailability(foundDoctor.AvailabilityTimes); // Check if the doctor is available
      setAvailability(isAvailable); // Set the availability state
      setAvailabilityTimes(foundDoctor.AvailabilityTimes); // Set the availability times state
    } catch (error) {
      console.error("Error fetching doctor data:", error); // Log any errors
    }
  };

  // Function to fetch the appointments for the doctor
  const fetchAppointments = async () => {
    try {
      const response = await axios.get(`https://doc-appointment-backend.vercel.app/api/v1/appointments/${doctorId}`); // Fetch appointments for the doctor
      setAppointments(response.data.appointments); // Set the appointments state
    } catch (error) {
      console.error("Error fetching appointments:", error); // Log any errors
    }
  };

  // Function to update the status of an appointment (Accept/Decline)
  const handleUpdateStatus = async (appointmentId, status) => {
    try {
      await axios.put(`https://doc-appointment-backend.vercel.app/api/v1/appointment/${appointmentId}`, { status }); // Update the appointment status
      fetchAppointments(); // Refresh the appointments after update
    } catch (error) {
      console.error("Error updating appointment status:", error); // Log any errors
    }
  };
 


  
  // Function to handle the availability change when the doctor edits their availability
  const handleAvailabilityChange = async () => {
    
    try {
      await axios.put(`https://doc-appointment-backend.vercel.app/api/v1/doctoravailability/${doctorId}`, {
        Availablity: availability, // Send the updated availability status
        AvailabilityTimes: availabilityTimes, // Send the updated availability times
      });
      setEditMode(false); // Exit edit mode after saving changes
      fetchDoctorData(); // Refresh doctor data after update
    } catch (error) {
      console.error("Error updating availability:", error); // Log any errors
    }
  };

  // useEffect to fetch the doctor data and appointments when the component mounts
  useEffect(() => {
    fetchDoctorData(); // Fetch doctor data on component mount
    fetchAppointments(); // Fetch appointments on component mount
  }, []);

  // If the doctor data is not yet loaded, display a loading message
  if (!doctor) return <div>Loading...</div>;





  // Filter appointments based on the active tab (today's, pending, or history)
  const filteredAppointments = appointments.filter(appointment => {
    if (activeTab === 'today') {
      return appointment.status === 'Accepted';
    } else if (activeTab === 'pending') {
      return appointment.status === 'Pending';
    } else if (activeTab === 'history') {
      return appointment.status === 'Completed';
    }
    return [];
  });

  return (
    <div className="doctor-profile-container">
      <div className="doctor-profile-info">
        <div className="doctor-profile-image-container">
          <img src={ `https://doc-appointment-backend.vercel.app/${doctor.imageLink}` } alt={doctor.Name} className="doctor-profile-image" /> {/* Display doctor's image */}
        </div>
        <div className="doctor-profile-details">
          <h1 className="doctor-profile-name">{doctor.Name}</h1> {/* Display doctor's name */}
          <p className="doctor-profile-speciality">{doctor.Speciality}</p> {/* Display doctor's speciality */}
          <p className="doctor-profile-description">Description: {doctor.Description}</p> {/* Display doctor's description */}
          <p className="doctor-profile-fees">Consultation Fees: ${doctor.Fees}</p> {/* Display doctor's consultation fees */}
          <p className="doctor-profile-availability">Availability: {availability ? 'Available' : 'Not Available'}</p> {/* Display doctor's availability */}
          <p className="doctor-profile-hospital">Hospital: {doctor.Hospital}</p> {/* Display doctor's associated hospital */}

          {editMode && (
            <div className="availability-edit">
              <label>
                <input 
                  type="checkbox" 
                  checked={availability} 
                  onChange={(e) => setAvailability(e.target.checked)} 
                />
                Available {/* Checkbox to toggle availability */}
              </label>
              <h3>Set Availability Times:</h3>
              {availabilityTimes.map((time, index) => ( 
                <div key={index} className="availability-time">
                  <input 
                    type="text" 
                    placeholder="Day" 
                    value={time.day} 
                    onChange={(e) => {
                      const newTimes = [...availabilityTimes];
                      newTimes[index].day = e.target.value;
                      setAvailabilityTimes(newTimes);
                    }} 
                  />
                  <input 
                    type="time" 
                    value={time.startTime} 
                    onChange={(e) => {
                      const newTimes = [...availabilityTimes];
                      newTimes[index].startTime = e.target.value;
                      setAvailabilityTimes(newTimes);
                    }} 
                  />
                  <input 
                    type="time" 
                    value={time.endTime} 
                    onChange={(e) => {
                      const newTimes = [...availabilityTimes];
                      newTimes[index].endTime = e.target.value;
                      setAvailabilityTimes(newTimes);
                    }} 
                  />
                  <button onClick={() => {
                    const newTimes = [...availabilityTimes];
                    newTimes.splice(index, 1);
                    setAvailabilityTimes(newTimes);
                  }}>Remove</button> {/* Button to remove a time slot */}
                </div>
              ))}
              <button onClick={() => setAvailabilityTimes([...availabilityTimes, { day: '', startTime: '', endTime: '' }])}>Add Time Slot</button> {/* Button to add a new time slot */}
              <button onClick={handleAvailabilityChange}>Save</button> {/* Button to save availability changes */}
            </div>
          )}
          <button onClick={() => setEditMode(!editMode)}>
            {editMode ? 'Cancel' : 'Edit Availability'}
          </button> {/* Button to toggle edit mode */}
        </div>
      </div>

      <div className="doctor-appointments-tabs">
        <button className={activeTab === 'today' ? 'active-tab' : ''} onClick={() => setActiveTab('today')}> Today's Appointments</button> {/* Tab for today's appointments */}
        <button className={activeTab === 'pending' ? 'active-tab' : ''} onClick={() => setActiveTab('pending')}>Pending Appointments</button> {/* Tab for pending appointments */}
        <button className={activeTab === 'history' ? 'active-tab' : ''} onClick={() => setActiveTab('history')}>Appointment History</button> {/* Tab for appointment history */}
      </div>

      <div className="doctor-appointments-section">
        <h2>{activeTab === 'today' ? "Today's Appointments" : activeTab === 'pending' ? "Pending Appointments" : "Appointment History"}</h2> {/* Section header based on active tab */}
        <ul>
          {filteredAppointments.map(appointment => (
            <li key={appointment._id} className="doctor-appointment-item">
              <p>Patient: {appointment.patientName}</p> {/* Display patient name */}
              <p>Date: {new Date(appointment.date).toDateString()}</p> {/* Display appointment date */}
              <p>Time: {appointment.time}</p> {/* Display appointment time */}
              <p>Status: {appointment.status}</p> {/* Display appointment status */}
              {activeTab === 'pending' && (
                <>
                  <button onClick={() => handleUpdateStatus(appointment._id, 'Accepted')}>Accept</button> {/* Button to accept pending appointment */}
                  <button onClick={() => handleUpdateStatus(appointment._id, 'Declined')}>Decline</button> {/* Button to decline pending appointment */}
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DoctorProfile;
 