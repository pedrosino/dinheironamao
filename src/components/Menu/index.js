import React from 'react';
import { Link } from 'react-router-dom';
import './menu.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

function toggleMenu() {
  const menu = document.querySelector('.menu');
  if (menu.classList.contains("menu_open")) {
    menu.classList.remove("menu_open");
  } else {
    menu.classList.add("menu_open");
  }
}

function Menu() {
  return(
    <div className="header">
      <Link to="/">
        PedroMoney
      </Link>
      <div className="menu-wrapper">
        <li className="menu-icon" onClick={toggleMenu}><FontAwesomeIcon icon={faBars} /></li>
        <ul id="menu" className="menu">
          <li className="menu-item"><Link to="/">Buscar</Link></li>
          <li className="menu-item"><Link to="/about">Sobre</Link></li>
          <li className="menu-item"><Link to="/">Contato</Link></li>
        </ul>
      </div>
    </div>
  );
}

export default Menu;
