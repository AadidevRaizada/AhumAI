import React, { useEffect, useState } from 'react';
import './Footer.css';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const [logoLoaded, setLogoLoaded] = useState(false);
  const [logoError, setLogoError] = useState(false);
  
  useEffect(() => {
    // Pre-load the image to check if it exists
    const img = new Image();
    img.onload = () => setLogoLoaded(true);
    img.onerror = () => setLogoError(true);
    img.src = "/AhumAI_logo_resized.png";
  }, []);
  
  return (
    <footer className="footer-container">
      <div className="footer-content">
        <div className="footer-logo">
          {logoError ? (
            <div className="logo-placeholder">
              <p>AhumAI</p>
              <small>Logo not found</small>
            </div>
          ) : (
            <img 
              src="/AhumAI_logo_resized.png" 
              alt="AhumAI Logo" 
              className="footer-logo-image"
              onLoad={() => console.log("Footer logo loaded")}
              onError={() => console.error("Footer logo failed to load")}
            />
          )}
        </div>
        
        <div className="footer-links">
          <div className="footer-column">
            <h4>Services</h4>
            <ul>
              <li>AI Solutions</li>
              <li>Cloud Infrastructure</li>
              <li>Cybersecurity</li>
              <li>SaaS Development</li>
            </ul>
          </div>
          
          <div className="footer-column">
            <h4>Company</h4>
            <ul>
              <li>About Us</li>
              <li>Projects</li>
              <li>Contact</li>
              <li>Careers</li>
            </ul>
          </div>
          
          <div className="footer-column">
            <h4>Connect</h4>
            <ul>
              <li>LinkedIn</li>
              <li>Twitter</li>
              <li>GitHub</li>
              <li>Email</li>
            </ul>
          </div>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; {currentYear} AhumAI. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer; 