import docimage from '../assets/docimage.jpg'; 

const doctors = [//card k data hai
    {
      id: 1,
      name: 'Dr. John Doe',
      specialty: 'Cardiologist',
      fees: 200,
      image:docimage,      
      availability: true,
      hospital: 'City Hospital'
    },
    {
      id: 2,
      name: 'Dr. Jane Smith',
      specialty: 'Dermatologist',
      fees: 150,
      image: docimage,
      availability: false,
      hospital: 'Health Clinic'
    },
    {
      id: 3,
      name: 'Dr. Sarah Johnson',
      specialty: 'Pediatrician',
      fees: 180,
      image: docimage,
      availability: true,
      hospital: 'Children\'s Hospital'
    },
    
  ];
  
  export default doctors;
  