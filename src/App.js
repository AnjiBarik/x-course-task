import React, { useState } from 'react';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import Calendar from './Calendar';
import Tasks from './Tasks';
import AddTaskForm from './AddTaskForm';
import { TasksProvider } from './TasksContext';
import Header from './Header'

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);



  };

  return (
    <TasksProvider>
    <div className="app">
    
      <header className="header">
        <div className="menu-icon" onClick={toggleMenu}>
          <FontAwesomeIcon icon={faBars} />
        </div>
        
        <h1>Task Calendar App</h1>
      </header>
     
      <div className={`main-content ${menuOpen ? 'menu-open' : ''}`}>
      {menuOpen ? <Header /> :
       
      <Calendar selectedDate={selectedDate} onDateChange={setSelectedDate} />}
      <Tasks  selectedDate={selectedDate} />
      </div>
    </div>
    </TasksProvider>
  );
}

export default App;
