import React from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useTasks } from './TasksContext';

function CalendarComponent() {
  const { selectDate } = useTasks();

  const handleDateChange = (date) => {
    // Преобразуем дату в строку, чтобы она могла быть передана в контекст
    const formattedDate = date.toISOString().split('T')[0];
    selectDate(formattedDate);
  };

  return <Calendar onChange={handleDateChange} />;
}

export default CalendarComponent;
