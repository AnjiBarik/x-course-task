import React, { createContext, useState, useEffect } from 'react';
import booksJson from '../src/components/book-list/books.json';

const BooksContext = createContext();

const BooksProvider = ({ children }) => {
  // Використовуємо хук useState для збереження стану завантаження
  const [loading, setLoading] = useState(true);
  const [books, setBooks] = useState([]);

  useEffect(() => {
    // Функція для отримання даних про книжки зі зовнішнього JSON-файлу 
    const fetchDataWithDelay = async () => {
      await new Promise(resolve => setTimeout(resolve, 100));
      // Отримуємо дані про книжки зі зовнішнього JSON-файлу
      setBooks(booksJson.books);
      setLoading(false);
    };

    fetchDataWithDelay();
  }, []);

  // Ініціалізація кошика для зберігання книжок, які були додані користувачем
  if (!localStorage.bookToCart) {
    localStorage.bookToCart = JSON.stringify([]);
  }

  // Використання хука `useState` для збереження стану кошика книжок користувача
  const [cartItems, setCartItems] = useState([]);

  // Використання хука `useEffect` для завантаження збереженого кошика при першому рендерингу компонента
  useEffect(() => {
    setCartItems(JSON.parse(localStorage.bookToCart));
  }, []);

  // Використання хука `useState` для збереження стану теми (light або dark)
  const [theme, setTheme] = useState('light');

  // Створення об'єкту `contextValue`, який містить дані про книжки, кошик, тему та функції для їх зміни
  const contextValue = {
    books,
    cartItems,
    setCartItems,
    theme,
    setTheme
  };

  // Показуємо спінер або індікатор завантаження поки дані не будуть готові
  if (loading) {
    return <div>Loading...</div>;
  }

  // Передача значень контексту дочірнім компонентам через провайдер `BooksContext.Provider`
  return (
    <BooksContext.Provider value={contextValue}>
      {children}
    </BooksContext.Provider>
  );
};

export { BooksContext, BooksProvider };