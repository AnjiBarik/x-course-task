import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useTasks } from './TasksContext';

function CalendarComponent() {
  const { selectDate } = useTasks();
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = (date) => {
    const formattedDate = date.toLocaleDateString('uk-UA').split('/')[0];
    localStorage.setItem('selectedDate', formattedDate);
    setSelectedDate(date);
    selectDate(formattedDate);
  };

  return <Calendar onChange={handleDateChange} value={selectedDate} />;
}

export default CalendarComponent;

