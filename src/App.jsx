import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Layout from './components/Layout';
import Home from './pages/Home';
import OurProjects from './pages/OurProjects';
import AboutUs from './pages/AboutUs';
import ContactUs from './pages/ContactUs';

import GradualBlur from './components/GradualBlur';

const PageWrapper = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  );
};

// Scroll to top on route change
const ScrollToTop = () => {
  const location = useLocation();

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return null;
};

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <>
      <ScrollToTop />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />
          <Route path="/projects" element={<PageWrapper><OurProjects /></PageWrapper>} />
          <Route path="/about" element={<PageWrapper><AboutUs /></PageWrapper>} />
          <Route path="/contact" element={<PageWrapper><ContactUs /></PageWrapper>} />
        </Routes>
      </AnimatePresence>
    </>
  );
};

function App() {
  return (
    <Router>
      <Layout>
        <AnimatedRoutes />

        {/* Footer */}
        <footer className="py-10 text-center text-gray-600 text-sm border-t border-white/5 mt-20 relative z-[500]">
          <p>© 2025 AhumAI. All rights reserved.</p>
        </footer>

        <GradualBlur
          target="page"
          position="bottom"
          height="5rem"
          strength={4}
          divCount={8}
          curve="bezier"
          exponential={true}
          opacity={1}
          zIndex={100}
        />
      </Layout>
    </Router>
  );
}

export default App;
