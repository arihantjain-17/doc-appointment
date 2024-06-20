import Slidebar from "../components/Landingpage/Sidebar.jsx";

import Doctor from "../components/Landingpage/Doctor.jsx";

import "./Landingpage.css"
const doctors = [
  { name: 'Dr. John Doe', specialty: 'Cardiologist', image: '' },
  { name: 'Dr. Jane Smith', specialty: 'Dermatologist', image: '' },
  { name: 'Dr. Sarah Johnson', specialty: 'Pediatrician', image: '' },
];

const Landingpage = () => {
  return (
    <div className="home">
        <div className="home-container">

        
              <div className="sidebar-container">
                <Slidebar></Slidebar>
              </div>
              
              
              <div className="main-container">

                    <div className="heading">
                      <h2>Doc appoinment</h2>
                      {/* searchabar */}
                    </div>



                    <div className="doctor">
                      <Doctor doctors={doctors}></Doctor>
                    </div>
              </div>
        </div>

         
          
    </div>
  )
}

export default Landingpage;
