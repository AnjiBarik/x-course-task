import React from "react";
import { Route, Routes } from "react-router-dom";
import BookList from "./components/book-list/BookList";
import Cart from "./components/cart/Cart";
import SignIn from "./components/signin/Signin";
import SpecificBook from "./components/specific-book/SpecificBook";
import Page404 from "./components/Page404";

function App() {
  return (
    <>
      <Routes>
        {/* Головна сторінка з авторизацією */}
        <Route path="/" element={<SignIn />} />

        {/* Сторінка зі списком книг */}
        <Route path="/booklist" element={<BookList />} />

        {/* Сторінка кошика */}
        <Route path="/cart" element={<Cart />} />

        {/* Сторінка окремої книги */}
        <Route path="/specificbook" element={<SpecificBook />} />

        {/* Сторінка 404 - сторінка, яка відображатиметься при невірному шляху */}
        <Route path="*" element={<Page404 />} />
      </Routes>
    </>
  );
}

export default App;