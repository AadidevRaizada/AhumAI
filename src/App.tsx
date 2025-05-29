import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
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
  
  if (isLoading) {
    return (
      <div className="loading-screen">
        <div className="loader">
          <div className="loader-circle"></div>
          <div className="loader-text">LOADING</div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="app">
      <AnimatedBackground />
      <CursorEffect />
      <Navigation />
      
      <Routes>
        <Route path="/" element={
          <main className="main-content">
            <HomePage />
            <ProjectsPage />
            <AboutPage />
            <ContactPage />
          </main>
        } />
      </Routes>
      
      <Footer />
    </div>
  );
}

export default App;