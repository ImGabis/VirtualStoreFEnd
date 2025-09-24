import { Link } from "react-router-dom";
import React from 'react';

const Header = ({ totalItems, onCartClick }) => (
  <header className="header">
    <h1 className="virtual-store-title hover-effect-title" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
      <span role="img" aria-label="carrito" style={{ fontSize: '1.5em' }}>🛒</span>
      <span>Virtual Store</span>
    </h1>
    <nav>
      <button className="cart-button" onClick={onCartClick}>
        <span role="img" aria-label="carrito">🛒</span> Carrito ({totalItems})
      </button>
    </nav>
  </header>
);

export default Header;