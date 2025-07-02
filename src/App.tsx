import React, { useEffect, useState, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation/Navigation';
import HomePage from './components/Home/HomePage';
import ClientOnboarding from './components/ClientOnboarding';
import ClientDashboard from './components/ClientDashboard';
import AdminDashboard from './components/AdminDashboard';
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
          <div className="loader-circle">
            <div className="triangle"></div>
            <div className="triangle"></div>
            <div className="triangle"></div>
            <div className="triangle"></div>
          </div>
          <div className="loader-text">AHUMAI</div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="app">
      <AnimatedBackground />
      <CursorEffect />
      
      <Routes>
        {/* Client Onboarding Route - Standalone page */}
        <Route path="/client-onboarding" element={<ClientOnboarding />} />
        
        {/* Client Dashboard Route - Standalone page */}
        <Route path="/client-dashboard" element={<ClientDashboard />} />
        
        {/* Admin Dashboard Route - Standalone page */}
        <Route path="/admin" element={<AdminDashboard />} />
        
        {/* Main Website Routes */}
        <Route path="/*" element={
          <>
            <Navigation />
            <Routes>
              <Route path="/" element={
                <main className="main-content">
                  <HomePage />
                  {/* The routes below are no longer needed */}
                  {/* <Route path="/about" element={<AboutPage />} /> */}
                  {/* <Route path="/projects" element={<ProjectsPage />} /> */}
                  {/* <Route path="/contact" element={<ContactPage />} /> */}
                </main>
              } />
            </Routes>
            <Footer />
          </>
        } />
      </Routes>
    </div>
  );
}

export default App;