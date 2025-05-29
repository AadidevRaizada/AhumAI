import React, { useEffect, useState } from 'react';
import { Route, Routes, useNavigate, useLocation } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import Navigation from './components/Navigation/Navigation';
import HomePage from './components/Home/HomePage';
import ProjectsPage from './components/Projects/ProjectsPage';
import AboutPage from './components/About/AboutPage';
import ContactPage from './components/Contact/ContactPage';
import AnimatedBackground from './components/AnimatedBackground/AnimatedBackground';
import CursorEffect from './components/CursorEffect/CursorEffect';
import Footer from './components/Footer/Footer';
import { Profile } from './components/Auth';
import './App.css';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const { isAuthenticated, isLoading: authLoading } = useAuth0();
  const navigate = useNavigate();
  const location = useLocation();
  
  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Handle auth callback
  useEffect(() => {
    if (!authLoading && location.pathname === '/callback') {
      navigate('/');
    }
  }, [authLoading, location.pathname, navigate]);
  
  if (isLoading || authLoading) {
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
        <Route path="/callback" element={<div>Completing authentication...</div>} />
        {isAuthenticated && (
          <Route path="/profile" element={<Profile />} />
        )}
      </Routes>
      
      <Footer />
    </div>
  );
}

export default App;