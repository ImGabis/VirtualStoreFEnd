import React from 'react';
import '../FooterCorp.css';
const FooterCorp = () => (
  <footer className="footer-corp">
    <div className="footer-content">
      <div className="footer-logo">ArteDiverso Group</div>
      <div className="footer-contact">
        Contacto: contacto@artediverso.com | Tel: +57 123 456 7890
      </div>
      <div className="footer-social">
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a>
      </div>
      <div className="footer-copyright">
        &copy; {new Date().getFullYear()} ArteDiverso Group. Todos los derechos reservados.
      </div>
    </div>
  </footer>
);

export default FooterCorp;
