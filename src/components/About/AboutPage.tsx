import React, { useState, useEffect, useRef } from 'react';
import GlitchText from '../GlitchText/GlitchText';
import { Code, Server, Network, LineChart } from 'lucide-react';
import './AboutPage.css';

interface TeamMember {
  name: string;
  role: string;
  image: string;
  bio: string;
}

const AboutPage: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState('vision');
  const sectionRef = useRef<HTMLElement>(null);
  
  const teamMembers: TeamMember[] = [
    {
      name: "Aadidev Raizada",
      role: "Founder & CEO",
      image: "/Aadidev.jpg",
      bio: "Aadidev is a serial entrepreneur with a goal to digitize and digitalize businesses, while helping the world grow."
    }
  ];
  
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
    <section id="about" className="about-container" ref={sectionRef}>
      <div className={`section-header ${isVisible ? 'visible' : ''}`}>
        <h2 className="section-title">
          <span className="title-line"></span>
          <GlitchText text="ABOUT US" delay={300} className="title-text" />
          <span className="title-line"></span>
        </h2>
        <p className="section-subtitle">
          <GlitchText 
            text="Pioneers at the intersection of technology and innovation" 
            delay={800}
            glitchIntensity="low"
          />
        </p>
      </div>
      
      <div className={`about-tabs ${isVisible ? 'visible' : ''}`}>
        <button 
          className={`tab-button ${activeTab === 'vision' ? 'active' : ''}`}
          onClick={() => setActiveTab('vision')}
        >
          <span>Vision</span>
        </button>
        <button 
          className={`tab-button ${activeTab === 'approach' ? 'active' : ''}`}
          onClick={() => setActiveTab('approach')}
        >
          <span>Approach</span>
        </button>
        <button 
          className={`tab-button ${activeTab === 'team' ? 'active' : ''}`}
          onClick={() => setActiveTab('team')}
        >
          <span>Team</span>
        </button>
      </div>
      
      <div className={`tab-content ${isVisible ? 'visible' : ''}`}>
        {activeTab === 'vision' && (
          <div className="vision-content">
            <div className="content-grid">
              <div className="content-text">
                <h3 className="content-title">Our Vision</h3>
                <p className="content-paragraph">
                  At AhumAI, we envision a future where technology seamlessly integrates with human potential, 
                  creating solutions that not only solve today's problems but anticipate tomorrow's challenges.
                </p>
                <p className="content-paragraph">
                  We believe in harnessing the power of artificial intelligence, cloud computing, and cybersecurity 
                  to build digital ecosystems that empower businesses to thrive in an increasingly complex world.
                </p>
                <p className="content-paragraph">
                  Our mission is to be at the forefront of technological innovation, continuously pushing boundaries 
                  and reimagining what's possible in the digital landscape.
                </p>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'approach' && (
          <div className="approach-content">
            <div className="approach-grid">
              <div className="approach-card">
                <div className="approach-icon">
                  <Code className="icon" />
                </div>
                <h4 className="approach-title">Innovative Development</h4>
                <p className="approach-description">
                  We leverage cutting-edge technologies and methodologies to build solutions that are not just 
                  effective today but adaptable for tomorrow's needs.
                </p>
              </div>
              
              <div className="approach-card">
                <div className="approach-icon">
                  <Server className="icon" />
                </div>
                <h4 className="approach-title">Scalable Architecture</h4>
                <p className="approach-description">
                  Our solutions are built on robust, scalable architectures that grow with your business, 
                  ensuring performance and reliability at any scale.
                </p>
              </div>
              
              <div className="approach-card">
                <div className="approach-icon">
                  <Network className="icon" />
                </div>
                <h4 className="approach-title">Integrated Security</h4>
                <p className="approach-description">
                  Security is woven into every aspect of our development process, protecting your data 
                  and systems from evolving threats.
                </p>
              </div>
              
              <div className="approach-card">
                <div className="approach-icon">
                  <LineChart className="icon" />
                </div>
                <h4 className="approach-title">Data-Driven Insights</h4>
                <p className="approach-description">
                  We transform raw data into actionable intelligence, giving you the insights needed to 
                  make informed decisions and drive business growth.
                </p>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'team' && (
          <div className="team-content">
            <div className="team-grid">
              {teamMembers.map((member, index) => (
                <div key={index} className="team-card">
                  <div className="team-image-container">
                    <div 
                      className="team-image" 
                      style={{ backgroundImage: `url(${member.image})` }}
                    >
                      <div className="image-overlay"></div>
                    </div>
                  </div>
                  <div className="team-info">
                    <h4 className="team-name">{member.name}</h4>
                    <div className="team-role">{member.role}</div>
                    <p className="team-bio">{member.bio}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default AboutPage;