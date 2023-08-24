import React, { useState } from 'react';
import './Header.css';
import { useTasks } from './TasksContext';

function Header() {
  const [clipboardData, setClipboardData] = useState('');
  const { selectDate } = useTasks();

const handleExportClick = () => {
    const dataFromLocalStorage = localStorage.getItem('tasks');
    setClipboardData(dataFromLocalStorage);

    const dummy = document.createElement('textarea');
    document.body.appendChild(dummy);
    dummy.value = dataFromLocalStorage;
    dummy.select();
    document.execCommand('copy');
    document.body.removeChild(dummy);
  };

  const handleImportClick = async () => {
    try {
      const clipboardText = await navigator.clipboard.readText();
      const importedTasks = JSON.parse(clipboardText);
  
      if (importedTasks && Array.isArray(importedTasks)) {
        const existingTasks = JSON.parse(localStorage.getItem('tasks')) || [];
        const updatedTasks = [...existingTasks];
  
        importedTasks.forEach(importedTask => {
          const existingTask = existingTasks.find(task => task.id === importedTask.id);
          if (!existingTask) {
            updatedTasks.push(importedTask);
          }
        });
  
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
      }
    } catch (error) {
      // Handle clipboard read error
      console.error('Error reading from clipboard:', error);
    }
  };
  
  const handleClearCompletedClick = () => {
    const currentDate = new Date().toLocaleDateString('uk-UA').split('/')[0];
    selectDate(currentDate);

    const existingTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const updatedTasks = existingTasks.filter(task => task.status !== 'completed');
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };
 

  return (
    <header className="Header">
      <nav className="Nav">
        <button className="Menu" onClick={handleExportClick}>Export to Clipboard</button>
        <button className="Menu" onClick={handleImportClick}>Import from Clipboard</button>
        <br></br>
        {/* Button to clear completed tasks */}
        <button className="Menu" onClick={handleClearCompletedClick}>Clear Completed</button>
      </nav>
    </header>
  );
}

export default Header;

