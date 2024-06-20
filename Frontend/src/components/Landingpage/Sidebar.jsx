import  { useState } from 'react';
import './Sidebar.css';
import { RxHamburgerMenu } from "react-icons/rx";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className="sidebarcontainer">

              <button className="toggle-btn" onClick={toggleSidebar}>
                  {isOpen ? <RxHamburgerMenu />: <RxHamburgerMenu />}
              </button>


              <div  className={`sidebar ${isOpen ? 'open' : 'close'}`}>
                  <div>
                    <h2>Menu</h2>
                  </div>
                  <div >
                      <ul >
                      <li><a href="/">Home</a></li>
                      <li><a href="/doctors">Doctors</a></li>
                      <li><a href="/appointments">Appointments</a></li>
                      <li><a href="/contact">Contact</a></li>
                      </ul>
                  </div>
              </div>

      </div>
    </>
  );
};

export default Sidebar;
