import Sidebar from "../components/Landingpage/Sidebar.jsx";
import SearchBar from "../components/Landingpage/SearchBar.jsx";
import Doctor from "../components/Landingpage/Doctor.jsx";

import "./Landingpage.css"
import doctors from '../data/Doctordata'


const Landingpage = () => {
  return (
    <div className="home">
        <div className="home-container">

        
              <div className="sidebar-container">
                <Sidebar></Sidebar>
              </div>
              
              
              <div className="main-container">

                    <div className="heading">
                      <h2>Doc appoinment</h2>
                      
                    </div>



                    <div className="doctor">
                      <Doctor doctors={doctors}></Doctor>
                    </div>
              </div>

              <div className="searchBar"><SearchBar></SearchBar></div>
        </div>

         
          
    </div>
  )
}

export default Landingpage;
