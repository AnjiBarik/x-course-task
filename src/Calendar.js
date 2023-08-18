import React from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useTasks } from './TasksContext';

function CalendarComponent() {
  const { selectDate } = useTasks();

  const handleDateChange = (date) => {
    const formattedDate = 
    date.toLocaleDateString('uk-UA').split('/')[0] 
   
    selectDate(formattedDate);
    console.log(formattedDate)
  };

  return <Calendar onChange={handleDateChange} />;
}

export default CalendarComponent;
