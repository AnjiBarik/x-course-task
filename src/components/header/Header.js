import React from 'react';
import './header.css';
import ava from './img/avatar.png';
import cart from './img/cart.svg';
import { Link } from "react-router-dom";
import { BooksContext } from '../../BooksContext';
import { SHA256 } from 'crypto-js';

export default function Header() {
 
  const username = localStorage.getItem('username');
  // Отримання даних про книжки з контексту BooksContext
  const { cartItems } = React.useContext(BooksContext);
  // Кількість заказів у кошику 
  const cartItemsCount = cartItems.length;
   
  function clearUser() {
  
    const username = localStorage.getItem('username');
    const hashedUsername = SHA256(username).toString();
    const storedPurchases = JSON.parse(localStorage.getItem('purchases')) || {};
    // Зберігаємо список покупок для даного хешу імені користувача
    storedPurchases[hashedUsername] = cartItems;
    localStorage.setItem('purchases', JSON.stringify(storedPurchases));
    // Очищаємо різні дані користувача
    localStorage.removeItem('bookListInput');
    localStorage.removeItem('bookListSelect');
    localStorage.removeItem('username');
    localStorage.removeItem('bookToCart');
  }

  return (
    <>
      {/* Ліва частина хедера */}
      <section className="header-left">
        {/* Посилання на сторінку зі списком книжок */}
        <Link to="/booklist">
          <h1 className='a custom-element'>JS-BAND STORE </h1>
        </Link>
        {/* Виведення імені користувача */}
        <h1>/Barik Andrei</h1>
      </section>

      {/* Права частина хедера */}
      <section className="header-right">
        {/* Посилання на сторінку з корзиною */}
        <Link to="/cart">
          <img className="head-img custom-element" src={cart} alt="cart" />
        </Link>

        {/* Виведення кількості книжок у кошику та загальної вартості, якщо вони є */}
        {cartItemsCount > 0 && (
          <span className="cart-count">📦{cartItemsCount}</span>
        )}

        {/* Посилання на вихід з акаунта */}
        <Link to="/">
          <button onClick={clearUser}>Sign-Out</button>
        </Link>

        {/* Секція із зображенням користувача та його іменем */}
        <div className="user">
          <img className="head-img" src={ava} alt="avatar" />
          {/* Виведення імені користувача, яке було отримане з localStorage */}
          <span>{username}</span>
        </div>
      </section>
    </>
  );
}