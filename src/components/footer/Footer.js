import React from 'react';
import "./footer.css";
import qcode from './img/qrcode_anjibarik.github.io.png';

export default function Footer() {
  return (
    <div className="wrapper">
      {/* Використано атрибут `rel="noreferrer"`, щоб запобігти витоку інформації про посилання */}
      <p className="footer">Виконано в <a target="_blank" rel="noreferrer" href="https://prometheus.org.ua/">Prometheus</a> © 2023</p>
      
      {/* Відображення QR-коду */}
      <img className="image-overlay" src={qcode} alt="qcode" />
    </div>
  );
}