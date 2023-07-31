import React, { createContext, useState, useEffect } from 'react';
import booksJson from '../src/components/book-list/books.json';

const BooksContext = createContext();

const BooksProvider = ({ children }) => {
  const books = booksJson.books;

  if (!localStorage.bookToCart) {
    localStorage.bookToCart = JSON.stringify([]);
  }

  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    setCartItems(JSON.parse(localStorage.bookToCart));
  }, []);

  const [theme, setTheme] = useState('light');

  const contextValue = {
    books,
    cartItems,
    setCartItems,
    theme,
    setTheme
  };

  return (
    <BooksContext.Provider value={contextValue}>
      {children}
    </BooksContext.Provider>
  );
};

export { BooksContext, BooksProvider };