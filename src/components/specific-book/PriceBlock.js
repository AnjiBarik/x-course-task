import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';

export default function PriceBlock({ title, price, cartItems, theme }) {
  // Отримання списку книжок з кошика з контексту BooksContext
  const booksInCart = cartItems || [];
  
  // Знаходження індексу обраної книжки в кошику
  const specificBookIndex = booksInCart.findIndex(el => el.title === title);

  // Визначення кількості обраної книжки в кошику
  let specificCount = specificBookIndex !== -1 ? booksInCart[specificBookIndex].count : 0;

  // Функція для додавання обраної книжки до кошика та збереження у localStorage
  function addedBooks() {
    const total = { count, totalBooklPrice: totalBookPrice, title, price };
    if (specificBookIndex !== -1) {
      // Оновлюємо кількість та загальну вартість, якщо книга вже є в кошику
      booksInCart[specificBookIndex].count = count;
      booksInCart[specificBookIndex].totalBooklPrice = totalBookPrice;
    } else {
      // Додаємо нову позицію, якщо книга відсутня в кошику
      booksInCart.push(total);
    }

    localStorage.bookToCart = JSON.stringify(booksInCart);
  }

  // Використано хук `useState` для збереження стану кількості книг у компоненті
  const [count, setCount] = useState(specificCount || 1);

  // Використано хук `useMemo` для обчислення загальної ціни книги
  const totalBookPrice = useMemo(() => {
   const calculatedPrice = (price || 0) * count;
   return calculatedPrice >= 0 ? calculatedPrice.toFixed(2) : 0;
  }, [count, price]);
  // Визначення тексту кнопки в залежності від наявності книги в кошику
  const buttonTitle = specificCount > 0 ? `Reselect🛒${count} ` : 'Add to cart🛒';

  return (
    <section className={theme}>
      <section className="price-block custom-element">
        <div className="price-block-row">
          <span>Price, $ </span>
          <span id="price">{price}</span>
        </div>
        <div className="price-block-row">
          <label htmlFor="count" data-testid="count-label">Count:{specificCount}</label>
          <div>
            <button
              className='decrement'
              data-testid="decrement"
              type="button"
              disabled={count === 1 }
              onClick={() => setCount(prevCount => Math.max(1, prevCount - 1))}
            >-</button>
            <button
              className='increment'
              data-testid='increment'
              type="button"
              disabled={count === 42 }
              onClick={() => setCount(prevCount => Math.min(42, prevCount + 1))}
            >+</button>
            <input
              onChange={(e) => setCount(Math.min(42, Math.max(1, parseInt(Number(e.target.value)))))}
              type="number"
              data-testid="count-input"
              id="count"
              min="1"
              max="42"
              value={count}
            />
          </div>
        </div>
        <div className="price-block-row">
          <span>Total price, $ </span>
          <span id="totalPrice" data-testid="totalPrice">{totalBookPrice}</span>
        </div>
        <Link to="/cart">
          <button onClick={addedBooks} className="price-block-btn button" type="submit">
            {buttonTitle}
          </button>
        </Link>
      </section>
    </section>
  );
}