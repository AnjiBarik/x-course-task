import React, { useEffect, useState, useContext } from 'react';
import { Navigate } from 'react-router-dom';
import Footer from "../footer/Footer";
import Header from '../header/Header';
import Shelf from './Shelf';
import './bookList.css';
import { BooksContext } from '../../BooksContext';

export default function BookList() {
  // Отримуємо доступ до контексту
  const { books, theme, setTheme } = useContext(BooksContext);

  // Змінюємо тему
  const toggleTheme = () => {
    setTheme(theme => (theme === 'light' ? 'dark' : 'light'));
  };

  // Використовуємо хук `useState` для збереження стану введення та сортування
  const [input, setInput] = useState('');
  const [select, setSelect] = useState('default');
  const [sortedBooks, setSortedBooks] = useState([...books]);

  // Використовуємо хук `useEffect` для виклику `findBook` при зміні `input` та `select`
  useEffect(() => {
    findBook();
  }, [input, select]);

  // Перевіряємо, чи є ім'я користувача у localStorage. Якщо його немає, перенаправляємо на головну сторінку
  if (!localStorage.username) {
    return <Navigate to="/" redirect={true} />;
  }

  // Функція для пошуку та сортування книжок
  function findBook() {
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
  }

  return (
    <>
      <section className={theme}>
        <section className="header">
         <Header />
        </section>
        <section className="filters">
          {/* Відображаємо кнопку для зміни теми */}
          <button className="thembutton button" onClick={toggleTheme}>
            {theme === 'light' ? '🔅' : '🔆'}
          </button>
          {/* Пошук за ім'ям */}
          <input
            onChange={e => setInput(e.target.value)}
            type="search"
            id="searchName"
            title="Search by book name"
            placeholder="🔎Search by book name"
          />
          {/* Вибір сортування за ціною */}
          <select onChange={e => setSelect(e.target.value)} id="sortPrice" title="sortPrice" autoComplete="off">
            <option value="default">default</option>
            <option value="lowPrice">from 0 to 15</option>
            <option value="midPrice">from 15 to 30</option>
            <option value="highPrice">more than 30</option>
          </select>
        </section>
        {/* Передаємо відсортований масив книжок у компонент `Shelf` */}
        <Shelf book={sortedBooks} />
        <Footer />
      </section>
    </>
  );
}