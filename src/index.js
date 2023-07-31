import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { HashRouter } from 'react-router-dom';

import { BooksProvider } from './BooksContext';
 // використовуємо створений постачальник контексту для обернення  додатку
ReactDOM.render(
  <HashRouter>
   <BooksProvider>  
    <App />
    </BooksProvider>  
  </HashRouter>,
  document.getElementById('root')
);