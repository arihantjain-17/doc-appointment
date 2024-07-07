
import './UserProfile.css';

const UserProfile = ({ user }) => {
  return (
    <div className="user-profile">
      <div className="profile-header">
        <img src={user.profilePicture} alt={user.name} className="profile-picture" />
        <h1>{user.name}</h1>
        <p>{user.email}</p>
        <p>{user.phone}</p>
      </div>

      <div className="profile-details">
        <h2>Personal Information</h2>
        <p><strong>Address:</strong> {user.address}</p>

        <h2>Upcoming Appointments</h2>
        <ul>
          {user.upcomingAppointments.map(appointment => (
            <li key={appointment.id}>
              {appointment.date} with {appointment.doctor} ({appointment.specialty}) at {appointment.hospital}
            </li>
          ))}
        </ul>

        <h2>Past Appointments</h2>
        <ul>
          {user.pastAppointments.map(appointment => (
            <li key={appointment.id}>
              {appointment.date} with {appointment.doctor} ({appointment.specialty}) at {appointment.hospital}
            </li>
          ))}
        </ul>

        <h2>Medical History</h2>
        <ul>
          {user.medicalHistory.map((record, index) => (
            <li key={index}>{record}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default UserProfile;
