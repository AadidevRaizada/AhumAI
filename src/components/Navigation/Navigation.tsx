import React, { useState, useEffect } from 'react';
import { Link as ScrollLink } from 'react-scroll';
import { NavLink } from 'react-router-dom';
import './Navigation.css';

const SquidLogo = () => (
  <div className="squid-logo">
    <div className="shape circle"></div>
    <div className="shape triangle"></div>
    <div className="shape square"></div>
  </div>
);

const Navigation: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const closeMenu = () => setIsOpen(false);

  return (
    <header className={`main-header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="logo-container">
        <NavLink to="/" aria-label="AhumAI Home" onClick={closeMenu}>
          <SquidLogo />
        </NavLink>
      </div>
      <button 
        className={`hamburger-menu ${isOpen ? 'open' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle navigation"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>
      <nav className={`main-nav ${isOpen ? 'open' : ''}`}>
        <ul>
          <li><ScrollLink to="home" spy={true} smooth={true} offset={-70} duration={500} onClick={closeMenu}>Home</ScrollLink></li>
          <li><ScrollLink to="about" spy={true} smooth={true} offset={-70} duration={500} onClick={closeMenu}>About</ScrollLink></li>
          <li><ScrollLink to="projects" spy={true} smooth={true} offset={-70} duration={500} onClick={closeMenu}>Projects</ScrollLink></li>
          <li><ScrollLink to="contact" spy={true} smooth={true} offset={-70} duration={500} onClick={closeMenu}>Contact</ScrollLink></li>
        </ul>
      </nav>
    </header>
  );
};

export default Navigation;