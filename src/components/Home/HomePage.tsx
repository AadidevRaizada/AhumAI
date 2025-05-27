import React, { useState, useEffect, useRef } from 'react';
import GlitchText from '../GlitchText/GlitchText';
import { Terminal, Cpu, Shield, Zap } from 'lucide-react';
import './HomePage.css';

const HomePage: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);
  const featuresRef = useRef<HTMLDivElement>(null);
  
  const features = [
    {
      icon: <Terminal className="feature-icon" />,
      title: "AI Solutions",
      description: "Custom AI implementations for business intelligence and automation."
    },
    {
      icon: <Cpu className="feature-icon" />,
      title: "Cloud Infrastructure",
      description: "Scalable cloud architecture designed for performance and reliability."
    },
    {
      icon: <Shield className="feature-icon" />,
      title: "Cybersecurity",
      description: "Advanced protection systems with real-time threat monitoring."
    },
    {
      icon: <Zap className="feature-icon" />,
      title: "SaaS Development",
      description: "Enterprise-grade software solutions tailored to your business needs."
    }
  ];
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 500);
    
    const featureInterval = setInterval(() => {
      setActiveFeature(prev => (prev + 1) % features.length);
    }, 4000);
    
    return () => {
      clearTimeout(timer);
      clearInterval(featureInterval);
    };
  }, []);
  
  const handleScroll = () => {
    const scrollPos = window.scrollY + window.innerHeight;
    if (featuresRef.current) {
      const featurePos = featuresRef.current.offsetTop;
      if (scrollPos > featurePos) {
        featuresRef.current.classList.add('visible');
      }
    }
  };
  
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  return (
    <section id="home" className="home-container">
      <div className={`hero-section ${isVisible ? 'visible' : ''}`}>
        <div className="logo-container">
          <div className="logo-glitch">
            <div className="logo-inner">
              <Cpu className="logo-icon" />
            </div>
          </div>
        </div>
        
        <h1 className="company-name">
          <GlitchText 
            text="AhumAI" 
            delay={1000}
            glitchIntensity="high"
            className="company-title"
          />
        </h1>
        
        <div className="tagline-container">
          <GlitchText 
            text="Crafting Digital Futures" 
            delay={2000}
            className="company-tagline"
          />
        </div>
        
        <div className="hero-description">
          <GlitchText 
            text="We build next-generation solutions that transform businesses in the digital age." 
            delay={3000}
            glitchIntensity="low"
          />
        </div>
        
        <button 
          className="cta-button"
          onClick={() => {
            const projectsElement = document.getElementById('projects');
            if (projectsElement) {
              projectsElement.scrollIntoView({ behavior: 'smooth' });
            }
          }}
        >
          <span className="cta-text">EXPLORE</span>
          <span className="cta-hover"></span>
        </button>
      </div>
      
      <div ref={featuresRef} className="features-section">
        <h2 className="section-title">
          <span className="title-line"></span>
          <span className="title-text">CORE SERVICES</span>
          <span className="title-line"></span>
        </h2>
        
        <div className="features-grid">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className={`feature-card ${index === activeFeature ? 'active' : ''}`}
            >
              <div className="feature-icon-container">
                {feature.icon}
                <div className="icon-glow"></div>
              </div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-description">{feature.description}</p>
              <div className="feature-card-border"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomePage;