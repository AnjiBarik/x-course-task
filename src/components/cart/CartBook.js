import React, { useContext, useState } from 'react';
import { Navigate } from 'react-router-dom';
import cart from './img/cart.svg';
import { BooksContext } from '../../BooksContext';
import PriceBlock from '../specific-book/PriceBlock';

export default function CartBook(props) {
  // Змінна для збереження загальної вартості книжок у кошику
  let totalPrice = 0;

  // Отримуємо дані про книжки з контексту
  const { cartItems, setCartItems, theme } = useContext(BooksContext);

  const [showPriceBlock, setShowPriceBlock] = useState({});

  // Функція для показу блоку з ціною при кліку на книжку
  const handleBookClick = (id) => {
    setShowPriceBlock((prevState) => ({ ...prevState, [id]: true }));
  };

  // Перевіряємо, чи є книжки у кошику. Якщо кошик порожній, виводимо повідомлення
  if (!cartItems || cartItems.length === 0) {
    return (
      <div className="main">
        <img src={cart} alt="cart" />
        <span>Cart empty..</span>
      </div>
    );
  }

  // Використовуємо метод `map` для створення масиву компонентів `<div>` зі списком книжок
  const singleBook = props.sold.map((el) => (
    <div
      onClick={() => handleBookClick(el.id)}
      className="cartBook custom-element"
      key={Number(el.totalBooklPrice)}
      tabIndex="0" 
    >
      {/* Кнопка для видалення книжки з кошика */}
      <button
        className="cart-remove"
        onClick={() => removeBookFromCart(el.title)}
        tabIndex="-1" // Додаємо `-1`, щоб кнопка не була фокусованою при кліку на книжку
      >
        ❌
      </button>
      <p className="cart-text">
        <b>Book name: </b>
        {el.title}
      </p>
      <p className="cart-price">
        <b>Book price: </b>
        {el.price}
      </p>
      <p className="cart-price">
        <b>Book count: </b>
        {el.count}
      </p>
      <p className="cart-price">
        <b>Price,$</b> {Number(el.totalBooklPrice)}
      </p>
      <section className="price-block-container cart-block">
        {/* Показ блоку з ціною при кліку на книжку */}
        {showPriceBlock[el.id] && (
          <PriceBlock title={el.title} price={el.price} cartItems={cartItems} theme={theme} />
        )}
      </section>
    </div>
  ));

  // Функція для видалення книжки з кошика
  function removeBookFromCart(bookId) {
    // Фільтруємо книжки за ідентифікатором, щоб видалити обрану книжку
    const updatedCartItems = cartItems.filter((item) => item.title !== bookId);
    // Оновлюємо стан `cartItems` за допомогою функції `setCartItems`
    setCartItems(updatedCartItems);
    // Зберігаємо оновлений список книжок у localStorage
    localStorage.bookToCart = JSON.stringify(updatedCartItems);
  }

  // Використовуємо метод `reduce` для обчислення загальної вартості книжок
  if (cartItems) {
    totalPrice = cartItems.reduce((accumulator, el) => accumulator + Number(el.totalBooklPrice), 0);
  }

  // Функція для очищення кошика та localStorage
  function cleanStorage() {
    setCartItems([]);
    localStorage.bookToCart = JSON.stringify([]);
  }

  // Перевіряємо, чи є ім'я користувача у localStorage. Якщо його немає, перенаправляємо на головну сторінку
  if (!localStorage.username) {
    return <Navigate to="/" redirect={true} />;
  }

  return (
    <div className="main-cart-book main">
      {/* Кнопка для очищення кошика */}
      <button onClick={cleanStorage} className="purchase button custom-element">
        Purchase
      </button>
      {singleBook}
      <p id="total">{'Total price, $ '} {totalPrice.toFixed(2)}</p>
    </div>
  );
}