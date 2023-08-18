import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

function Header() {
  const [clipboardData, setClipboardData] = useState('');

  const handleExportClick = () => {
    // Здесь вы можете получить данные из локального хранилища и сохранить их в clipboardData
    const dataFromLocalStorage = localStorage.getItem('tasks');
    setClipboardData(dataFromLocalStorage);
  };

  const handleImportClick = () => {
    // Здесь вы можете вставить данные из буфера обмена в локальное хранилище
    if (clipboardData) {
      localStorage.setItem('tasks', clipboardData);
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


{/* <div className="BurgerMenu">&#9776;</div>
        <ul className="Menu">
          <li className="Menu"><Link to="/">Calendar</Link></li>
          <li className="Menu"><Link to="/tasks">Tasks</Link></li>
          <li className="Menu">  */}

// import React from 'react';
// import { Link } from 'react-router-dom';
// import './Header.css';

// function Header() {
//   return (
//     <header className="Header">
//       <nav className="Nav">
//         <div className="BurgerMenu">&#9776;</div>
//         <ul className="Menu"><div>gfdgdgdgd</div>
//           <li><Link to="/">Calendar</Link></li>
//           <li><Link to="/tasks">Tasks</Link></li>
//         </ul>
//       </nav>
//     </header>
//   );
// }

// export default Header;