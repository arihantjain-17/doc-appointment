import  { useState } from 'react';
import './Slidebar.css';
import { RxHamburgerMenu } from "react-icons/rx";

const Slidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className='container'>


        <button className="toggle-btn" onClick={toggleSidebar}>
            {isOpen ? <RxHamburgerMenu />: <RxHamburgerMenu />}
        </button>


        <div className={`sidebar ${isOpen ? 'open' : ''}`}>
            <h2>Menu</h2>
            <ul >
            <li><a href="/">Home</a></li>
            <li><a href="/doctors">Doctors</a></li>
            <li><a href="/appointments">Appointments</a></li>
            <li><a href="/contact">Contact</a></li>
            </ul>
        </div>

      </div>
    </>
  );
};

export default Slidebar;
