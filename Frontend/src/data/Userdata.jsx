
import docimage from '../assets/docimage.jpg';


const user = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '123-456-7890',
    profilePicture: docimage,
    address: '123 Main St, Anytown, USA',
    upcomingAppointments: [
      { id: 1, date: '2024-07-01', doctor: 'Dr. Smith', specialty: 'Cardiology', hospital: 'City Hospital' },
      // Add more appointments here
    ],
    pastAppointments: [
      { id: 2, date: '2024-06-01', doctor: 'Dr. Brown', specialty: 'Dermatology', hospital: 'Health Clinic' },
      // Add more appointments here
    ],
    medicalHistory: [
      'Diagnosed with hypertension in 2020',
      'Allergic to penicillin',
      // Add more records here
    ],
  };
  
  export default user;
  