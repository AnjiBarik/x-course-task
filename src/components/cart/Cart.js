import React from 'react'; 
import { Navigate } from 'react-router-dom';
import "./cart.css";
import Header from '../header/Header';
import Footer from "../footer/Footer";
import cart from './img/cart.svg';
import CartBook from "./CartBook";
import { BooksContext } from '../../BooksContext';
import  ScrollToTopButton  from '../book-list/ScrollToTopButton';

export default function Cart() {
    // Доступ до контексту
    const { cartItems, theme } = React.useContext(BooksContext); 

    // Перевірка, чи є ім'я користувача у localStorage
    if (!localStorage.username) {
        // Якщо ім'я користувача не знайдено, перенаправте на головну сторінку
        return <Navigate to="/" redirect={true} />
    }

    let cartContent;

    // Перевірка, чи є книжки в корзині
    if (!cartItems || cartItems.length === 0) {
        // Якщо корзина порожня
        cartContent = (
            <div className="main">
                <img src={cart} alt="cart empty" />
                <span>Cart empty..</span>
            </div>
        );
    } else {
        // Якщо є книжки в корзині, передаємо їх у компонент `CartBook`
        cartContent = <CartBook sold={cartItems} />;
    }

    return (
        <>
           <section className={theme}>
            <section className="header">
            <Header />
            </section>
            {/* Відображаємо контент корзини */}
            {cartContent}
            <ScrollToTopButton />
            <Footer />
            </section>
        </>
    );
}