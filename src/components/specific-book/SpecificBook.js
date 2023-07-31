import React, { useState, useMemo } from 'react';
import './specificBook.css';
import Footer from "../footer/Footer";
import Header from '../header/Header';
import { Link, Navigate } from "react-router-dom";
import { BooksContext } from '../../BooksContext';

export default function SpecificBook() {
    const { cartItems, theme } = React.useContext(BooksContext);
    // Деструктуризуємо дані з `localStorage.specificBook`
    const { author, price, image, title, description } = JSON.parse(localStorage.specificBook);

    // Перевіряємо, чи є вже дані про книгу в кошику, та отримуємо кількість книг у кошику
    const booksInCart = cartItems || [];
    const specificCount = booksInCart.find(el => el.title === title)?.count;

    // Функція для додавання книги у кошик
    function addedBooks() {
        const total = { count, totalBooklPrice: totalBookPrice, title, price };
        booksInCart.push(total);
        localStorage.bookToCart = JSON.stringify(booksInCart);
    }

    // Використовуємо хук `useState` для збереження стану кількості книг у компоненті
    const [count, setCount] = useState(specificCount || 1);

    // Використовуємо хук `useMemo` для обчислення загальної ціни книги
    const totalBookPrice = useMemo(() => ('$' + price * count).slice(1), [count, price]);

    // Перевіряємо, чи є ім'я користувача у localStorage. Якщо його немає, перенаправляємо на головну сторінку
    if (!localStorage.username) {
        return <Navigate to="/" redirect={true} />;
    }

    const buttonTitle = specificCount > 0 ? `in Cart ${specificCount} book` : 'Add to cart🛒';

    let book = (
        <section className="book-page">
            <figure>
                <img src={image} alt={title} />
                <figcaption>
                    <p>
                        <b>Description: </b>
                        {description}
                    </p>
                </figcaption>
            </figure>
            <section className="about">
                <p><b>Book name: </b>{title}</p>
                <p><b>Book author:</b> {author}</p>
                <p><b>Book level:</b> Beginner</p>
                <p><b>Book tags:</b> Core</p>
            </section>
            <section className="price-block custom-element">
                <div className="price-block-row">
                    <span>Price, $ </span>
                    <span id="price">{price}</span>
                </div>
                <div className="price-block-row">
                    <label htmlFor="count">Count:</label>
                    <div>
                        <button
                            type="button"
                            disabled={count === 1 || specificCount}
                            onClick={() => setCount(prevCount => Math.max(1, prevCount - 1))}
                        >-</button>
                        <button
                            type="button"
                            disabled={count === 42 || specificCount}
                            onClick={() => setCount(prevCount => Math.min(42, prevCount + 1))}
                        >+</button>
                        <input
                            onChange={(e) => setCount(Math.min(42, Math.max(1, parseInt(Number(e.target.value)))))}
                            type="number"
                            id="count"
                            min="1"
                            max="42"
                            value={count}
                        />
                    </div>
                </div>
                <div className="price-block-row">
                    <span>Total price, $ </span>
                    <span id="totalPrice">{totalBookPrice}</span>
                </div>
                <Link to="/cart">
                    <button onClick={addedBooks} className="price-block-btn" type="submit" disabled={specificCount}>
                        {buttonTitle}
                    </button>
                </Link>
            </section>
        </section>
    );

    return (
        <>
            <section className={theme}>
                <section className="header">
                    <Header />
                </section>
                {book}
                <Footer />
            </section>
        </>
    );
}