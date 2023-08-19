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

  const handleImportClick = () => {
    const dataFromClipboard = clipboardData;
    if (dataFromClipboard) {
      const existingTasks = JSON.parse(localStorage.getItem('tasks')) || [];
      const importedTasks = JSON.parse(dataFromClipboard);

      const updatedTasks = [...existingTasks];

      importedTasks.forEach(importedTask => {
        const existingIndex = existingTasks.findIndex(task => task.id === importedTask.id);
        if (existingIndex === -1) {
          updatedTasks.push({ ...importedTask, status: 'imported' });
        }
      });

      localStorage.setItem('tasks', JSON.stringify(updatedTasks));
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
        {/* Date picker for selecting date */}
        <input
          type="date"
          defaultValue={new Date().toISOString().split('T')[0]}
          onChange={(e) => selectDate(e.target.value)}
        />
        {/* Button to clear completed tasks */}
        <button className="Menu" onClick={handleClearCompletedClick}>Clear Completed</button>
      </nav>
    </header>
  );
}

export default Header;

