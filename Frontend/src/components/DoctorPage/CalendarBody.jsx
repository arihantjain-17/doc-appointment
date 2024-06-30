import React from 'react';
import { format, startOfWeek, addDays, isSameMonth, isSameDay, endOfMonth, startOfMonth } from 'date-fns';
import './CalendarBody.css';

const CalendarBody = ({ currentDate, onDateClick, selectedDate }) => {
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const startDate = startOfWeek(monthStart, { weekStartsOn: 0 });
  const endDate = addDays(startOfWeek(addDays(monthEnd, 1), { weekStartsOn: 0 }), 6);

  const rows = [];
  let days = [];
  let day = startDate;

  const dayLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  while (day <= endDate) {
    for (let i = 0; i < 7; i++) {
      const formattedDate = format(day, 'd');
      const cloneDay = new Date(day); // Ensure each day is a new Date object
      days.push(
        <div
          className={`col cell ${!isSameMonth(day, currentDate) ? 'disabled' : ''} ${isSameDay(day, selectedDate) ? 'selected' : ''} ${isSameDay(day, new Date()) ? 'today' : ''}`}
          key={day}
          onClick={() => {
            console.log("Cell clicked:", cloneDay);  // Debug log with cloneDay
            
              onDateClick(cloneDay);
            
          }}
        >
          <span className="number">{formattedDate}</span>
        </div>
      );
      day = addDays(day, 1);
    }
    rows.push(
      <div className="row" key={day}>
        {days}
      </div>
    );
    days = [];
  }

  return (
    <div className="body">
      <div className="day-labels">
        {dayLabels.map((label) => (
          <div className="day-label" key={label}>{label}</div>
        ))}
      </div>
      {rows}
    </div>
  );
};

export default CalendarBody;
