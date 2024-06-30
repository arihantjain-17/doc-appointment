import  { useState } from 'react';
import './Sidebar.css';
import { IoMdHome } from "react-icons/io";
import { FaUserDoctor } from "react-icons/fa6";
import { CiCalendarDate } from "react-icons/ci";
import { MdPhone } from "react-icons/md";



const Sidebar = ({ isOpen }) => {
  // const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className="sidebarcontainer">


              <div  className={`sidebar ${isOpen ? 'open' : 'close'}`}>
                  
              
                  <div>
                    <h2>Menu</h2>
                  </div>
                  <div className='Menu'>
                      <ul >
                      <li><a href="/">Home</a></li>
                      <li><a href="/doctors">Doctors</a></li>
                      <li><a href="/appointments">Appointments</a></li>
                      <li><a href="/contact">Contact</a></li>
                      </ul>
                  </div>
                   <div className="icons">
                   <ul>
                    <li className="icon-home"><a href="/"><IoMdHome size={30}/></a></li>
                    <li className="icon-doctors"><a href="/doctors"><FaUserDoctor size={30}/></a></li>
                    <li className="icon-services"><a href="/appointments"><CiCalendarDate size={30}/></a></li>
                    <li className="icon-contact"><a href="/contact"><MdPhone size={30}/></a></li>
                    </ul>
                  </div>
              </div>

      </div>
    </>
  );
};

export default Sidebar;
