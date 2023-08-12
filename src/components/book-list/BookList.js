import React, { useEffect, useState, useContext, useCallback } from 'react';
import { Navigate } from 'react-router-dom';
import Footer from "../footer/Footer";
import Header from '../header/Header';
import Shelf from './Shelf';
import './bookList.css';
import { BooksContext } from '../../BooksContext';
import  ScrollToTopButton  from './ScrollToTopButton';

export default function BookList() {
  // Отримуємо доступ до контексту
  const { books, theme, setTheme } = useContext(BooksContext);

  // Змінюємо тему
  const toggleTheme = () => {
    setTheme(theme => (theme === 'light' ? 'dark' : 'light'));
  };

  // Зчитуємо значення з `localStorage`, якщо вони там є
  const initialInput = localStorage.getItem('bookListInput') || '';
  const initialSelect = localStorage.getItem('bookListSelect') || 'default';

  // Використовуємо хук `useState` для збереження стану введення та сортування
  const [input, setInput] = useState(initialInput);
  const [select, setSelect] = useState(initialSelect);
  const [sortedBooks, setSortedBooks] = useState([...books]);

 // Зберігаємо значення в `localStorage` при зміні
  useEffect(() => {
   localStorage.setItem('bookListInput', input);
   localStorage.setItem('bookListSelect', select);
  }, [input, select]);

  const findBook=useCallback(() => {
  let sortedBooksCopy = [...books];

    // Фільтруємо книжки за введеним рядком пошуку
    sortedBooksCopy = sortedBooksCopy.filter(el =>
      el.title.toLowerCase().includes(input.trim().toLowerCase())
    );

    // Сортуємо книжки залежно від обраного значення сортування
    if (select === 'lowPrice') {
      setSortedBooks(
        sortedBooksCopy.filter(el => el.price <= 15).sort((a, b) => a.price - b.price)
      );
    } else if (select === 'midPrice') {
      setSortedBooks(
        sortedBooksCopy.filter(el => el.price > 15 && el.price <= 30).sort((a, b) => a.price - b.price)
      );
    } else if (select === 'highPrice') {
      setSortedBooks(sortedBooksCopy.filter(el => el.price > 30).sort((a, b) => a.price - b.price));
    } else {
      setSortedBooks(sortedBooksCopy); // Залишаємо сортування за замовчуванням
    }
  },[input, select, books]);
 
  useEffect(() => {
    findBook();
  }, [findBook]);

  // Перевіряємо, чи є ім'я користувача у localStorage. Якщо його немає, перенаправляємо на головну сторінку
  if (!localStorage.username) {
    return <Navigate to="/" redirect={true} />;
  }

  // Функція для скидання значень інпута та селекта в дефолт
  const handleReset = () => {
    setInput('');
    setSelect('default');
  };


  return (
    <>
      <section className={theme}>
        <section className="header">
         <Header />
        </section>
        <section className="filters">
          {/* Відображаємо кнопку для зміни теми */}
          <button className={`${theme === 'light' ? 'light-theme' : 'dark-theme'}`} 
            onClick={toggleTheme}>
            {theme === 'light' ? '🔅' : '🔆'}
          </button>
          {/* Пошук за ім'ям */}
          <input
            onChange={e => setInput(e.target.value)}
            type="search"
            id="searchName"
            title="Search by book name"
            placeholder="🔎Search by book name"
            value={input}
          />
          {/* Вибір сортування за ціною */}
          <select onChange={e => setSelect(e.target.value)} 
          id="sortPrice" title="sortPrice" 
          autoComplete="off"
          value={select}
          >
            <option value="default">default</option>
            <option value="lowPrice">from 0 to 15</option>
            <option value="midPrice">from 15 to 30</option>
            <option value="highPrice">more than 30</option>
          </select>
          {/* Кнопка для скидання значень інпута та селекта в дефолт */}
          <button onClick={handleReset} className="reset-button">
          ❌
          </button>
        </section>
        <ScrollToTopButton />
        {/* Передаємо відсортований масив книжок у компонент `Shelf` */}
        <Shelf book={sortedBooks} />
        <Footer />
      </section>
    </>
  );
}