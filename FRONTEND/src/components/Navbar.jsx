import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import '../NavbarCorp.css';

// Contexto para el tema
const ThemeContext = React.createContext();

const ThemeToggleIcon = ({ theme, toggleTheme }) => (
  <button
    onClick={toggleTheme}
    style={{
  border: 'none',
      background: theme === 'dark' ? '#fffde7' : '#222b3a',
      color: theme === 'dark' ? '#222b3a' : '#fffde7',
      marginLeft: '8px',
      cursor: 'pointer',
      borderRadius: '50%',
      width: '22px',
      height: '22px',
      minWidth: '22px',
      minHeight: '22px',
      aspectRatio: '1/1',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: theme === 'dark'
        ? '0 0 0 2px #fffde7, 0 0 10px 2px #222b3a, 0 2px 8px rgba(34,43,58,0.18)'
        : '0 0 0 2px #222b3a, 0 0 10px 2px #fffde7, 0 2px 8px rgba(255,253,231,0.18)',
      transition: 'border 0.3s, background 0.5s, color 0.5s, box-shadow 0.5s',
      outline: 'none',
      position: 'relative',
      overflow: 'hidden',
      backdropFilter: 'blur(2px)',
    }}
    aria-label="Alternar tema"
    title={theme === 'dark' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
  >
  <svg width="13" height="13" viewBox="0 0 32 32" style={{ transition: 'transform 0.7s cubic-bezier(.4,2,.6,1)', transform: theme === 'dark' ? 'rotate(320deg) scale(1.08)' : 'rotate(0deg) scale(1)' }}>
      <defs>
        <linearGradient id="halfColor" x1="0" y1="0" x2="1" y2="0">
          <stop offset="50%" stopColor="#fffde7" />
          <stop offset="50%" stopColor="#64b5f6" />
        </linearGradient>
      </defs>
      <circle cx="16" cy="16" r="15" fill="url(#halfColor)" stroke="#64b5f6" strokeWidth="2" />
      {/* Sol animado */}
      <g style={{
        opacity: theme === 'light' ? 1 : 0,
        transition: 'opacity 0.5s, transform 0.7s cubic-bezier(.4,2,.6,1)',
        transform: theme === 'light' ? 'scale(1)' : 'scale(0.5)',
        transformOrigin: '10px 16px',
      }}>
        <circle cx="10" cy="16" r="5" fill="#fffde7" stroke="#ffe082" strokeWidth="1.5" />
        <g stroke="#ffe082" strokeWidth="1.2">
          <line x1="10" y1="6" x2="10" y2="2" />
          <line x1="10" y1="26" x2="10" y2="30" />
          <line x1="2" y1="16" x2="6" y2="16" />
          <line x1="14" y1="10" x2="18" y2="6" />
          <line x1="14" y1="22" x2="18" y2="26" />
        </g>
      </g>
      {/* Luna animada */}
      <g style={{
        opacity: theme === 'dark' ? 1 : 0,
        transition: 'opacity 0.5s, transform 0.7s cubic-bezier(.4,2,.6,1)',
        transform: theme === 'dark' ? 'scale(1)' : 'scale(0.5)',
        transformOrigin: '22px 16px',
      }}>
        <path d="M22 11a6 6 0 1 0 0 10a5 5 0 1 1 0-10z" fill="#fffde7" stroke="#1976d2" strokeWidth="1.5" />
      </g>
    </svg>
  </button>
);

const Navbar = () => {
  // Obtener el contexto del tema si existe
  const themeCtx = useContext(ThemeContext);
  return (
    <nav className="navbar-corp" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <div className="navbar-logo" style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', flex: '0 0 auto', padding: '4px 16px' }}>
        <img src="https://i.postimg.cc/tJjJrdcH/descarga-1.png" alt="ArteDiverso Logo" style={{ height: '48px', objectFit: 'contain', marginLeft: '0', marginRight: '16px' }} />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1.2rem' }}>
        <a
          href="https://tunein.com/radio/TechnoFM-s111622/"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-block',
            background: '#222b3a',
            color: '#fff',
            padding: '8px 18px',
            borderRadius: '8px',
            fontWeight: 600,
            fontSize: '1em',
            textDecoration: 'none',
            boxShadow: '0 2px 8px rgba(25, 118, 210, 0.10)',
            transition: 'background 0.3s, color 0.3s, transform 0.2s',
            marginRight: '18px',
          }}
          onMouseOver={e => { e.currentTarget.style.background = '#1976d2'; e.currentTarget.style.color = '#fffde7'; e.currentTarget.style.transform = 'scale(1.06)'; }}
          onMouseOut={e => { e.currentTarget.style.background = '#222b3a'; e.currentTarget.style.color = '#fff'; e.currentTarget.style.transform = 'scale(1)'; }}
        >
          ▶️ Escuchar TechnoFM
        </a>
        <ul className="navbar-links" style={{ margin: 0 }}>
          <li><Link to="/" className="navbar-link">Inicio</Link></li>
          <li><Link to="/compras" className="navbar-link">Mis Compras</Link></li>
          <li><Link to="/contacto"><button className="contact-button">Contáctanos</button></Link></li>
          <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Link to="/datos"><button className="data-button">Datos</button></Link>
            {themeCtx && <ThemeToggleIcon theme={themeCtx.theme} toggleTheme={themeCtx.toggleTheme} />}
          </li>
        </ul>
      </div>
    </nav>
  );
};

export { ThemeContext };
export default Navbar;
