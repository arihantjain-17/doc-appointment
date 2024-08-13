// import React, { useState } from 'react';
// import { addMonths, subMonths, format } from 'date-fns';
// import CalendarBody from './CalendarBody';
// import TimePickerPopup from './TimePickerPopup';
// import './Calendar.css';

// const Calendar = () => {
//   const today = new Date();
//   const [currentDate, setCurrentDate] = useState(today);
//   const [selectedDate, setSelectedDate] = useState(null);
//   const [selectedTime, setSelectedTime] = useState('');
//   const [showTimePicker, setShowTimePicker] = useState(false); 

//   const handlePrevMonth = () => {
//     setCurrentDate(subMonths(currentDate, 1));
//   };

//   const handleNextMonth = () => {
//     setCurrentDate(addMonths(currentDate, 1));
//   };

//   const handleDateClick = (date) => {
//     console.log("Date clicked:", date);  // Debug log
//     setSelectedDate(date);
//     setShowTimePicker(true);
//   };

//   const closeTimePicker = (time) => {
//     setShowTimePicker(false);
//     if (time) {
//       setSelectedTime(time);
//     }
//   };

//   return (
//     <div className="calendar">
//       <div className="header">
//         <button onClick={handlePrevMonth}>Prev</button>
//         <h2>{format(currentDate, 'MMMM yyyy')}</h2>
//         <button onClick={handleNextMonth}>Next</button>
//       </div>
//       <CalendarBody currentDate={currentDate} onDateClick={handleDateClick} selectedDate={selectedDate} />
//       {selectedDate && selectedTime && (
//         <div className="selected-date-time">
//           <p>Selected Appointment:</p>
//           <p>{format(selectedDate, 'PP')} at {selectedTime}</p>
//         </div>
//       )}
//       {showTimePicker && (
//         <TimePickerPopup selectedDate={selectedDate} onClose={closeTimePicker} />
//       )}
//       <button className="book-appointment-btn">Book Appointment</button>
//     </div>
//   );
// };

// export default Calendar;


import React, { useState } from 'react';
import { addMonths, subMonths, format } from 'date-fns';
import CalendarBody from './CalendarBody';
import TimePickerPopup from './TimePickerPopup';
import axios from 'axios';
import './Calendar.css';

const Calendar = ({ doctorId, patientName }) => {
  const today = new Date();
  const [currentDate, setCurrentDate] = useState(today);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState('');
  const [showTimePicker, setShowTimePicker] = useState(false); 

  const handlePrevMonth = () => {
    setCurrentDate(subMonths(currentDate, 1));
  };
  

  const handleNextMonth = () => {
    setCurrentDate(addMonths(currentDate, 1));
  };

  const handleDateClick = (date) => {
    setSelectedDate(date);
    setShowTimePicker(true);
  };

  const closeTimePicker = (time) => {
    setShowTimePicker(false);
    if (time) {
      setSelectedTime(time);
    }
  };
  

  const handleBookAppointment = async () => {
    try {
      const response = await axios.post("http://localhost:3000/api/v1/appointment", {
        doctorId,
        patientName,
        date: selectedDate,
        time: selectedTime
      });
      console.log(response.data.message);
    } catch (error) {
      console.error("Error booking appointment:", error);
    }
  };

  return (
    <div className="calendar">
      <div className="header">
        <button onClick={handlePrevMonth}>Prev</button>
        <h2>{format(currentDate, 'MMMM yyyy')}</h2>
        <button onClick={handleNextMonth}>Next</button>
      </div>
      <CalendarBody currentDate={currentDate} onDateClick={handleDateClick} selectedDate={selectedDate} />
      {selectedDate && selectedTime && (
        <div className="selected-date-time">
          <p>Selected Appointment:</p>
          <p>{format(selectedDate, 'PP')} at {selectedTime}</p>
        </div>
      )}
      {showTimePicker && (
        <TimePickerPopup selectedDate={selectedDate} onClose={closeTimePicker} />
      )}
      <button className="book-appointment-btn" onClick={handleBookAppointment}>Book Appointment</button>
    </div>
  );
};

export default Calendar;
