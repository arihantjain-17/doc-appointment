import React, { useState } from 'react';
import './TimePickerPopup.css';
import { format, isSameDay } from 'date-fns';

const TimePickerPopup = ({ selectedDate, onClose }) => {
  const [selectedTime, setSelectedTime] = useState('');
  const now = new Date();

  const handleTimeChange = (event) => {
    setSelectedTime(event.target.value);
  };

  const handleSave = () => {
    // Save the selected time and pass it back to the Calendar component
    onClose(selectedTime);
  };

  const getTimeOptions = () => {
    const times = [];
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();
    for (let hour = 0; hour < 24; hour++) {
      for (let minutes = 0; minutes < 60; minutes += 15) {
        const time = `${String(hour).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
        if (!isSameDay(selectedDate, now) || (hour > currentHour || (hour === currentHour && minutes >= currentMinute))) {
          times.push(
            <option key={time} value={time}>
              {time}
            </option>
          );
        }
      }
    }
    return times;
  };

  return (
    <div className="time-picker-popup">
      <h3>Select Time for {format(selectedDate, 'PP')}</h3>
      <select value={selectedTime} onChange={handleTimeChange}>
        <option value="" disabled>
          Select a time
        </option>
        {getTimeOptions()}
      </select>
      <button onClick={handleSave}>Save</button>
      <button onClick={() => onClose(null)}>Close</button>
    </div>
  );
};

export default TimePickerPopup;
