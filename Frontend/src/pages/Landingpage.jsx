import Sidebar from "../components/Landingpage/Sidebar.jsx";
import SearchBar from "../components/Landingpage/SearchBar.jsx";
import Doctor from "../components/Landingpage/Doctor.jsx";
import Navbar from "../components/Landingpage/Navbar.jsx"

import "./Landingpage.css"



import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import { useState, useEffect } from "react";
import axios from 'axios';

const Landingpage = () => {
  const [docArray, setDocArray] = useState([]);

  const getDoc = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/v1/doctor", {});

      setDocArray(response.data.doctor);
      console.log(response.data);
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

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };

  return (
    <div className="home">
        <div className="landing-page-NavBar ">
          <Navbar toggleSidebar={toggleSidebar}></Navbar>
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
                      <Carousel responsive={responsive} >
                        {docArray.map((doctor) => (
                          <div key={doctor._id} className="doctor-card-wrapper">
                            <Doctor doctors={[doctor]} />
                          </div>
                        ))}
                      </Carousel>
                    </div>

                    <div className="hospital"> 

                    </div>
              </div>

              {/* <div className="searchBar"><SearchBar></SearchBar></div> */}
        </div>
    </div>
  )
}

export default Landingpage;
 