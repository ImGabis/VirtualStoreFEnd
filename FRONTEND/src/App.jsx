import React, { useState, useCallback } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Payment from './pages/Payment';
import PurchaseHistory from './pages/PurchaseHistory';
import ContactPage from './pages/ContactPage';
import FloatingContactButton from './components/FloatingContactButton';
import Datos from './pages/Datos';
import FooterCorp from './components/FooterCorp';
import Navbar, { ThemeContext } from './components/Navbar';

const App = () => {
  const [theme, setTheme] = useState('light');
  const toggleTheme = useCallback(() => {
    setTheme(t => (t === 'light' ? 'dark' : 'light'));
    document.body.classList.toggle('dark');
    document.querySelector('.app')?.classList.toggle('dark');
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <Router>
        <div className={`app${theme === 'dark' ? ' dark' : ''}`}>
          <Navbar />
          <FloatingContactButton />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/pago" element={<Payment />} />
            <Route path="/compras" element={<PurchaseHistory />} />
            <Route path="/contacto" element={<ContactPage />} />
            <Route path="/datos" element={<Datos />} />
          </Routes>
          <FooterCorp />
        </div>
      </Router>
    </ThemeContext.Provider>
  );
};

export default App;