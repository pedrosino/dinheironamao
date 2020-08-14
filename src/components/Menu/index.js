import React from 'react';
import { Link } from 'react-router-dom';

function Menu() {
  return(
    <div className="header">
      <Link to="/">
        PedroMoney
      </Link>
      <ul className="menu">
        <li><a href="/">Buscar</a></li>
        <li><a href="/about">Sobre</a></li>
        <li><a href="/">Contato</a></li>
      </ul>
    </div>
  );
}

export default Menu;
