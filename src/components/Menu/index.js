import React from 'react';
import { Link } from 'react-router-dom';

function Menu() {
  return(
    <div className="header">
      <Link to="/">
        PedroMoney
      </Link>
      <ul className="menu">
        <li><Link to="/">Buscar</Link></li>
        <li><Link to="/about">Sobre</Link></li>
        <li><Link to="/">Contato</Link></li>
      </ul>
    </div>
  );
}

export default Menu;
