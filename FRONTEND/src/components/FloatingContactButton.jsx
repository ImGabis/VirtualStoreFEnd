import React from 'react';
import { Link } from 'react-router-dom';

const FloatingContactButton = () => {
  return (
    <Link to="/contacto" className="floating-contact-btn">
      📩 Contáctanos
    </Link>
  );
};

export default FloatingContactButton;
