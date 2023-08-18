import React, { useState } from 'react';
import './Header.css';

function Header() {
  const [clipboardData, setClipboardData] = useState('');

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

 
 
  return (
    <header className="Header">
       <nav className="Nav">
        
            <button className="Menu" onClick={handleExportClick}>Export</button>
            <button className="Menu" onClick={handleImportClick}>Import</button>
          
      </nav>
    </header>
  );
}

export default Header;


