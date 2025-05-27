import React, { useEffect, useState } from 'react';
import Navigation from './components/Navigation/Navigation';
import HomePage from './components/Home/HomePage';
import ProjectsPage from './components/Projects/ProjectsPage';
import AboutPage from './components/About/AboutPage';
import ContactPage from './components/Contact/ContactPage';
import AnimatedBackground from './components/AnimatedBackground/AnimatedBackground';
import CursorEffect from './components/CursorEffect/CursorEffect';
import Footer from './components/Footer/Footer';
import './App.css';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <div className="app">
      {isLoading ? (
        <div className="loading-screen">
          <div className="loader">
            <div className="loader-circle"></div>
            <div className="loader-text">LOADING</div>
          </div>
        </div>
      ) : (
        <>
          <AnimatedBackground />
          <CursorEffect />
          <Navigation />
          
          <main className="main-content">
            <HomePage />
            <ProjectsPage />
            <AboutPage />
            <ContactPage />
          </main>
          
          <Footer />
        </>
      )}
    </div>
  );
}

export default App;