import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import notFound from './img/imageNotFound.png';
import { BooksContext } from '../../BooksContext';
import PriceBlock from '../specific-book/PriceBlock';
import cartIcon from '../cart/img/cart.svg';

export default function Shelf(props) {
  const { cartItems, theme } = useContext(BooksContext); // Доступ до контексту
  const [priceBlockVisible, setPriceBlockVisible] = useState({});

  // Функція для показу блоку з ціною при наведенні на книжку
  const handleMouseEnter = (id) => {
    setPriceBlockVisible((prevState) => ({ ...prevState, [id]: true }));
  };

  // Функція для приховання блоку з ціною при відведенні миші від книжки
  const handleMouseLeave = (id) => {
    setPriceBlockVisible((prevState) => ({ ...prevState, [id]: false }));
  };

  // Використано метод `map` для створення масиву елементів компонента `div.book`
  const shelf = props.book.map((el) => (
    <div
      id={el.id}
      className="book custom-element"
      key={el.id}
      onMouseEnter={() => handleMouseEnter(el.id)}
      onMouseLeave={() => handleMouseLeave(el.id)}
    >
      {/* Використовуємо `<Link>` для навігації на сторінку `specificbook` */}
      <Link className="book-img " to="/specificbook" onClick={(e) => bookInfo(e)}>
        <img src={el.image === '' ? notFound : el.image} alt="myFace" />
      </Link>
      <p className="book-text">
        <b>Book name: </b>
        {el.title.length >= 24 ? el.title.slice(0, 24) + '...' : el.title}
      </p>
      <p className="book-text">
        <b>Book author: </b>
        {el.author}
      </p>
      <div className="book-price">
        <p className="book-text">
          <b>Price, $</b> {el.price}
        </p>
        {/* Використовуємо `<Link>` для навігації на сторінку `specificbook` */}
        <Link to="/specificbook">
          <button onClick={(e) => bookInfo(e)} className="view-btn button">
            View
          </button>
        </Link>
      </div>

      {/* Відображення іконки кошика, якщо книжка є у кошику */}
      <Link to="/cart">
        {cartItems.some((item) => item.title === el.title) && (
          <img src={cartIcon} alt="Cart" className="cart-icon" />
        )} 
      </Link>

      {/* Показ блоку з ціною */}
      <section className="price-block-container">
        {priceBlockVisible[el.id] && (
          <PriceBlock title={el.title} price={el.price} cartItems={cartItems} theme={theme}/>
        )}
      </section>
    </div>
  ));

  // Функція, що зберігає об'єкт `data` в `localStorage`
  function bookInfo(e) {
    // Знаходимо відповідний об'єкт `data` в масиві `props.book` за допомогою id
    let data = props.book.find((el) => el.id === Number(e.target.closest('.book').id));
    // Зберігаємо об'єкт `data` в `localStorage`
    localStorage.setItem('specificBook', JSON.stringify(data));
  }

  return (
    <section className="book-list">
      {/* Відображаємо елементи книжок */}
      {shelf}
    </section>
  );
}