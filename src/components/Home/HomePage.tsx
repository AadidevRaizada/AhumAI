import React from 'react';
import './HomePage.css';
import { FaPlay } from 'react-icons/fa';
import { Link as ScrollLink } from 'react-scroll';
import AboutPage from '../About/AboutPage';
import ProjectsPage from '../Projects/ProjectsPage';
import ContactPage from '../Contact/ContactPage';

const HomePage: React.FC = () => {
  return (
    <div className="home-page-wrapper">
      <section id="home" className="home-container">
        <div className="hero-section">
          <div className="hero-background">
            <img src="/AhumAI Card.png" alt="AhumAI Card" className="hero-image" />
            <div className="hero-vignette"></div>
          </div>
          <div className="hero-content">
            <ScrollLink to="projects" spy={true} smooth={true} offset={-70} duration={500} className="cta-button">
              <FaPlay className="cta-icon" />
              <span>Enter the Future</span>
            </ScrollLink>
          </div>
        </div>
      </section>

      <section id="about">
        <AboutPage />
      </section>

      <section id="projects">
        <ProjectsPage />
      </section>

      <section id="contact">
        <ContactPage />
      </section>
    </div>
  );
};

export default HomePage;