import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './UserProfile.css'; // Ensure you have a corresponding CSS file

const Userprofile = () => {
    const [user, setUser] = useState(null); 
    const [appointments, setAppointments] = useState([]);
    const { id: userId } = useParams();

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    console.error('No token found');
                    return;
                }

                const userResponse = await axios.get(`http://localhost:3000/api/v1/user/profile/${userId}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setUser(userResponse.data);

                const appointmentsResponse = await axios.get(`http://localhost:3000/api/v1/user/${userId}/appointments`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setAppointments(appointmentsResponse.data);
                
            } catch (error) { 
                console.error('Error fetching user profile or appointments:', error);
            }
        };

        fetchUserProfile();
        
    }, [userId]);

    if (!user) return <div className="userprofile-loading">Loading...</div>;

    return (
        <div className="userprofile-container">
            <h2 className="userprofile-title">User Profile</h2>
            <p className="userprofile-detail"><strong>Username:</strong> {user.username}</p>
            <p className="userprofile-detail"><strong>Email:</strong> {user.email}</p>
            <p className="userprofile-detail"><strong>Address:</strong> {user.address}</p>

            <h2 className="userprofile-appointments-title">Your Appointments</h2>
            {appointments.length > 0 ? (
                <ul className="userprofile-appointments-list">
                    {appointments.map((appointment) => (
                        <li key={appointment._id} className="userprofile-appointment-item">
                            <p><strong>Doctor:</strong> {appointment.doctorId}</p>
                            <p><strong>Date:</strong> {new Date(appointment.date).toLocaleDateString()}</p>
                            <p><strong>Time:</strong> {appointment.time}</p>
                            <p><strong>Status:</strong> {appointment.status}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="userprofile-no-appointments">No appointments found.</p>
            )}
        </div>
    );
};

export default Userprofile;
