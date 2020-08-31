import React from 'react';
import { Link } from 'react-router-dom';
import './menu.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

function Menu() {
  return(
    <div className="header">
      <Link to="/">
        PedroMoney
      </Link>
      <div className="menu-wrapper">
        <div class="menu-icon">
          <FontAwesomeIcon icon={faBars} />
        </div>
        <ul className="menu">
          <li><Link to="/">Buscar</Link></li>
          <li><Link to="/about">Sobre</Link></li>
          <li><Link to="/">Contato</Link></li>
        </ul>
      </div>
    </div>
  );
}

export default Menu;
