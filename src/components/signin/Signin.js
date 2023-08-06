import React, { useState, useEffect } from 'react'; 
import './signin.css';
import ava from './img/avatar.png';
import Footer from "../footer/Footer";
import { Link } from "react-router-dom";

export default function SignIn() {
    const [input, setInput] = useState('');

   // Використання useEffect для впровадження перевірки після зміни стану input
    useEffect(() => {
        const sumbit = document.getElementById('submit');
        if (input.length >= 4 && input.length <= 16) {
            sumbit.disabled = false;
            localStorage.setItem('username', input);
        } else {
            sumbit.disabled = true;
        }
    }, [input]); 

    return (
        <> 
            <section className="header">
                <h1>JS BAND STORE/Barik&nbsp;Andrei </h1>
            </section>
            <div className="mainBlock">
                <section className="autorization-block dark">
                    <img src={ava} alt="avatar"/>
                        <div className="input-block">
                            <label htmlFor="username">Username</label>
                            <input value={input} onChange={e => setInput(e.target.value)} type="text" id="username" title="Please enter a name with at least 4 characters" placeholder="type Username"/>
                            <Link to="/booklist"><button id='submit' type="submit" disabled>Sign In</button></Link>
                        </div>
                </section>
            </div>
            <Footer />
        </>
    );
}