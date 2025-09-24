import React from 'react';

const ThemeToggle = ({ theme, toggleTheme }) => (
  <button onClick={toggleTheme} className="theme-toggle-btn">
    Cambiar a tema {theme === "light" ? "oscuro" : "claro"}
  </button>
);

export default ThemeToggle;
