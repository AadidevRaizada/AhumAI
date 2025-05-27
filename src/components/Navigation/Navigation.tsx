import React, { useState, useEffect } from 'react';
import { Terminal } from 'lucide-react';
import './Navigation.css';

interface FAQ {
  id: number;
  question: string;
  answer: string;
}

const Navigation: React.FC = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [isVisible, setIsVisible] = useState(false);
  const [terminalActive, setTerminalActive] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState<number | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  
  const faqs: FAQ[] = [
    {
      id: 1,
      question: "Do you create websites?",
      answer: "Yes, we specialize in creating modern, responsive websites tailored to your business needs, from simple landing pages to complex web applications."
    },
    {
      id: 2,
      question: "Do you offer custom plans for enterprises?",
      answer: "Absolutely! We offer customized enterprise solutions that scale with your business. Our team works closely with you to understand your specific requirements and design a tailored plan."
    },
    {
      id: 3,
      question: "What technologies do you work with?",
      answer: "We work with a wide range of technologies including React, Angular, Vue.js, Node.js, Python, AWS, Azure, and more. Our technology stack is always evolving to keep up with industry standards."
    },
    {
      id: 4,
      question: "How long does a typical project take?",
      answer: "Project timelines vary based on complexity and scope. A simple website might take 2-4 weeks, while more complex applications can take several months. We provide detailed timelines during our initial consultation."
    },
    {
      id: 5,
      question: "Do you provide maintenance after launch?",
      answer: "Yes, we offer ongoing maintenance and support packages to ensure your digital products remain secure, up-to-date, and performing optimally after launch."
    }
  ];
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  
  const handleNavigation = (section: string) => {
    setActiveSection(section);
    setMenuOpen(false);
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  const toggleTerminal = () => {
    setTerminalActive(!terminalActive);
    setSelectedQuestion(null);
  };

  const handleQuestionSelect = (id: number) => {
    setSelectedQuestion(id);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  
  return (
    <div className={`navigation-container ${isVisible ? 'visible' : ''}`}>
      <div className="nav-indicator">
        <div className={`indicator-line ${activeSection === 'home' ? 'active' : ''}`} />
        <div className={`indicator-line ${activeSection === 'projects' ? 'active' : ''}`} />
        <div className={`indicator-line ${activeSection === 'about' ? 'active' : ''}`} />
        <div className={`indicator-line ${activeSection === 'contact' ? 'active' : ''}`} />
      </div>
      
      <div className={`hamburger-menu ${menuOpen ? 'open' : ''}`} onClick={toggleMenu}>
        <span></span>
        <span></span>
        <span></span>
      </div>
      
      <div className={`nav-button-container ${menuOpen ? 'open' : ''}`}>
        <button 
          className={`nav-button ${activeSection === 'home' ? 'active' : ''}`}
          onClick={() => handleNavigation('home')}
        >
          <span className="nav-text">HOME</span>
          <span className="nav-dot"></span>
        </button>
        
        <button 
          className={`nav-button ${activeSection === 'projects' ? 'active' : ''}`}
          onClick={() => handleNavigation('projects')}
        >
          <span className="nav-text">PROJECTS</span>
          <span className="nav-dot"></span>
        </button>
        
        <button 
          className={`nav-button ${activeSection === 'about' ? 'active' : ''}`}
          onClick={() => handleNavigation('about')}
        >
          <span className="nav-text">ABOUT</span>
          <span className="nav-dot"></span>
        </button>
        
        <button 
          className={`nav-button ${activeSection === 'contact' ? 'active' : ''}`}
          onClick={() => handleNavigation('contact')}
        >
          <span className="nav-text">CONTACT</span>
          <span className="nav-dot"></span>
        </button>
      </div>
      
      <button 
        className={`terminal-button ${terminalActive ? 'active' : ''}`}
        onClick={toggleTerminal}
      >
        <Terminal className="terminal-icon" />
        <span className="terminal-text">ACCESS TERMINAL</span>
      </button>
      
      {terminalActive && (
        <div className="terminal-container">
          <div className="terminal-header">
            <span>AhumAI Terminal v1.0</span>
            <button onClick={toggleTerminal}>×</button>
          </div>
          <div className="terminal-content">
            <div className="command-line">
              <span className="prompt">AhumAI:~$</span>
              <span className="typing-text">accessing system...</span>
            </div>
            
            {!selectedQuestion ? (
              <div className="faq-container">
                <div className="command-response">
                  Welcome to AhumAI Terminal. Select a question below:
                </div>
                <div className="faq-questions">
                  {faqs.map((faq) => (
                    <button 
                      key={faq.id}
                      className="faq-question-btn"
                      onClick={() => handleQuestionSelect(faq.id)}
                    >
                      &gt; {faq.question}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="faq-answer-container">
                <div className="command-line">
                  <span className="prompt">AhumAI:~$</span>
                  <span className="typing-text">{faqs.find(faq => faq.id === selectedQuestion)?.question}</span>
                </div>
                <div className="command-response answer">
                  {faqs.find(faq => faq.id === selectedQuestion)?.answer}
                </div>
                <button 
                  className="back-button"
                  onClick={() => setSelectedQuestion(null)}
                >
                  &lt; Back to questions
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Navigation;