import Sidebar from "../components/Landingpage/Sidebar.jsx";

import Doctor from "../components/Landingpage/Doctor.jsx";
import Navbar from "../components/Landingpage/Navbar.jsx"
import { useParams } from 'react-router-dom';
import "./Landingpage.css"





import { useState, useEffect } from "react";
import axios from 'axios';

const Landingpage = () => {
  const [docArray, setDocArray] = useState([]);
  const { id: userId } = useParams();

  const getDoc = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/v1/doctor", {});

      setDocArray(response.data.doctor);
      
      
    } catch (error) {
      console.error("Error fetching doctors:", error);
    }
  }; 

  useEffect(() => {
    getDoc();
    
  }, []);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  

  return (
    <div className="home">
        <div className="landing-page-NavBar ">
          <Navbar toggleSidebar={toggleSidebar} userId={userId} ></Navbar>
        </div>
        
        <div className="home-container">
              <div className="sidebar-container">
                <Sidebar isOpen={isSidebarOpen}></Sidebar>
              </div>
              
              <div className="main-container">
                    <div className="heading">
                      <h2>Doc appoinment</h2>
                    </div>

                    <div className="doctor">
                      
                        {docArray.map((doctor) => (
                          <div key={doctor._id} className="doctor-card-wrapper">
                            <Doctor doctors={[doctor]} userId={userId} />
                          </div>
                        ))}
                      
                    </div>
 
              </div>

              
        </div> 
    </div>
  )
}

export default Landingpage;
 