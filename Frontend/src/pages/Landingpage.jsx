import Sidebar from "../components/Landingpage/Sidebar.jsx";
import SearchBar from "../components/Landingpage/SearchBar.jsx";
import Doctor from "../components/Landingpage/Doctor.jsx";
import Navbar from "../components/Landingpage/Navbar.jsx"

import "./Landingpage.css"
import doctors from '../data/Doctordata'

import * as React from 'react';
import * as ReactDOM from 'react-dom/client';


import { useState, useEffect } from "react";
import axios from 'axios';

const Landingpage = () => {
  const [docArray, setDocArray] = useState([]);

  const getDoc = async () => {
    try {
      const response = await axios.get("http://localhost:3000/doctor", {});
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
                      <Doctor doctors={docArray}></Doctor>
                    </div>
              </div>

              {/* <div className="searchBar"><SearchBar></SearchBar></div> */}
        </div>
    </div>
  )
}

export default Landingpage;
