import React, { useContext } from 'react';
import './specificBook.css';
import Footer from "../footer/Footer";
import Header from '../header/Header';
import { Link, Navigate } from "react-router-dom";
import { BooksContext } from '../../BooksContext';
import PriceBlock from './PriceBlock'; 

export default function SpecificBook() {
  // Отримання даних про книжки з контексту BooksContext
  const { cartItems, theme } = useContext(BooksContext);
  
  // Отримання даних про обрану книжку з localStorage
  const { author, price, image, title, description } = JSON.parse(localStorage.specificBook);

  // Перевірка, чи є ім'я користувача в localStorage. Якщо його немає, перенаправляємо на головну сторінку
  if (!localStorage.username) {
    return <Navigate to="/" redirect={true} />;
  }

  return (
    <section className={theme}>
      <section className="header">
        <Header />
      </section>
      <section className="book-page">
        <figure>
          <img src={image} alt={title} />
          <figcaption>
            <p><b>Description: </b>{description}</p>
          </figcaption>
        </figure>
        <section className="about">
          <p><b>Book name: </b>{title}</p>
          <p><b>Book author:</b> {author}</p>
          <p><b>Book level:</b> Beginner</p>
          <p><b>Book tags:</b> Core</p>
        </section>
        <PriceBlock title={title} price={price} cartItems={cartItems} theme={theme} /> {/* Використовуємо компонент PriceBlock */}
      </section>
      <Footer />
    </section>
  );
}