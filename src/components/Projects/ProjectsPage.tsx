import React, { useState, useEffect, useRef } from 'react';
import GlitchText from '../GlitchText/GlitchText';
import { ArrowRight } from 'lucide-react';
import './ProjectsPage.css';

interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  image: string;
  technologies: string[];
}

const ProjectsPage: React.FC = () => {
  const [activeProject, setActiveProject] = useState<number | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  
  const projects: Project[] = [
    {
      id: 1,
      title: "Full Ahead Marine and Offshore Services pvt. ltd. Website",
      category: "Website",
      description: "A website for a marine and offshore services company.",
      image: "images/FullAhead.png",
      technologies: ["React", "Tailwind CSS", "Node.js", "Express"]
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
    <section id="projects" className="projects-container" ref={sectionRef}>
      <div className={`section-header ${isVisible ? 'visible' : ''}`}>
        <h2 className="section-title">
          <span className="title-line"></span>
          <GlitchText text="PROJECTS" delay={300} className="title-text" />
          <span className="title-line"></span>
        </h2>
        <p className="section-subtitle">
          <GlitchText 
            text="Innovative solutions for tomorrow's challenges" 
            delay={800}
            glitchIntensity="low"
          />
        </p>
      </div>
      
      <div className={`projects-grid ${isVisible ? 'visible' : ''}`}>
        {projects.map((project, index) => (
          <div 
            key={project.id}
            className={`project-card ${activeProject === project.id ? 'active' : ''}`}
            onMouseEnter={() => setActiveProject(project.id)}
            onMouseLeave={() => setActiveProject(null)}
            style={{ 
              transitionDelay: `${index * 0.1}s`,
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.85)), url(${project.image})`
            }}
          >
            <div className="project-content">
              <div className="project-category">{project.category}</div>
              <h3 className="project-title">{project.title}</h3>
              
              <p className="project-description">{project.description}</p>
              
              <div className="project-tech">
                {project.technologies.map((tech, i) => (
                  <span key={i} className="tech-tag">{tech}</span>
                ))}
              </div>
              
              <a 
                href="https://www.fullahead.in" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="project-button"
              >
                <span>View Website</span>
                <ArrowRight className="button-icon" />
              </a>
            </div>
            
            <div className="project-overlay"></div>
            <div className="card-border top"></div>
            <div className="card-border right"></div>
            <div className="card-border bottom"></div>
            <div className="card-border left"></div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProjectsPage;