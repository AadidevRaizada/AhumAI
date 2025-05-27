import React, { useState, useEffect, useRef } from 'react';
import GlitchText from '../GlitchText/GlitchText';
import { Mail, Phone } from 'lucide-react';
import './ContactPage.css';

const ContactPage: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => {
      observer.disconnect();
    };
  }, []);
  
  return (
    <section id="contact" className="contact-container" ref={sectionRef}>
      <div className={`section-header ${isVisible ? 'visible' : ''}`}>
        <h2 className="section-title">
          <span className="title-line"></span>
          <GlitchText text="CONTACT US" delay={300} className="title-text" />
          <span className="title-line"></span>
        </h2>
        <p className="section-subtitle">
          <GlitchText 
            text="Let's discuss how we can transform your digital presence" 
            delay={800}
            glitchIntensity="low"
          />
        </p>
      </div>
      
      <div className={`contact-content ${isVisible ? 'visible' : ''}`}>
        <div className="contact-info">
          <h3 className="info-title">Get in Touch</h3>
          <p className="info-text">
            Have a project in mind or want to learn more about our services? 
            We're here to answer any questions and discuss how we can help 
            your business thrive in the digital landscape.
          </p>
          
          <div className="contact-details">
            <div className="detail-item">
              <Mail className="detail-icon" />
              <span>aadidev@ahumai.co.in</span>
            </div>
            <div className="detail-item">
              <Phone className="detail-icon" />
              <span>+91 9004200798</span>
            </div>
          </div>
          
          <div className="office-hours">
            <h4>Hours of Operation</h4>
            <p>Monday - Friday: 9:00 AM - 6:00 PM IST</p>
            <p>24/7 Support for Enterprise Clients</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactPage;