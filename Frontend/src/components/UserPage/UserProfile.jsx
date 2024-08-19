import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

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

    if (!user) return <div>Loading...</div>;

    return (
        <div className="profile-container">
            <h2>User Profile</h2>
            <p><strong>Username:</strong> {user.username}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Address:</strong> {user.address}</p>

            <h2>Your Appointments</h2>
            {appointments.length > 0 ? (
                <ul>
                    {appointments.map((appointment) => (
                        <li key={appointment._id}>
                            <p><strong>Doctor:</strong> {appointment.doctorId}</p>
                            <p><strong>Date:</strong> {new Date(appointment.date).toLocaleDateString()}</p>
                            <p><strong>Time:</strong> {appointment.time}</p>
                            <p><strong>Status:</strong> {appointment.status}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No appointments found.</p>
            )}
        </div>
    );
};

export default Userprofile;
