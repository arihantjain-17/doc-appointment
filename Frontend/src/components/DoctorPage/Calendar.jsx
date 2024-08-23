import React, { useState } from 'react';
import { addMonths, subMonths, format } from 'date-fns';
import CalendarBody from './CalendarBody';
import TimePickerPopup from './TimePickerPopup';
import axios from 'axios';
import './Calendar.css';

const Calendar = ({ doctorId, patientName, isAvailable }) => {
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
    if (!isAvailable) {
      alert("This doctor is not available for appointments.");
      return;
    }

    try {
      const response = await axios.post("https://doc-appointment-backend.vercel.app/api/v1/appointment", {
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
      <button 
        className="book-appointment-btn" 
        onClick={handleBookAppointment}
        disabled={!isAvailable} // Disable the button if the doctor is not available
      >
        {isAvailable ? 'Book Appointment' : 'Doctor Unavailable'}
      </button>
    </div>
  );
};

export default Calendar;
