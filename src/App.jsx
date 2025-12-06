import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Layout from './components/Layout';
import Home from './pages/Home';
import OurProjects from './pages/OurProjects';
import AboutUs from './pages/AboutUs';
import ContactUs from './pages/ContactUs';
import { useOptimizedSettings } from './hooks/useDeviceDetection';

// Lazy load heavy component
const GradualBlur = lazy(() => import('./components/GradualBlur'));

const PageWrapper = ({ children }) => {
  const { animationSettings } = useOptimizedSettings();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: animationSettings.duration }}
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

// Footer blur wrapper for mobile optimization
const FooterBlur = () => {
  const { shouldReduceEffects, isMobile } = useOptimizedSettings();

  // Skip blur effect on mobile for better performance
  if (shouldReduceEffects || isMobile) {
    return null;
  }

  return (
    <Suspense fallback={null}>
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
    </Suspense>
  );
};

function App() {
  return (
    <Router>
      <Layout>
        <AnimatedRoutes />

        {/* Footer */}
        <footer className="py-8 sm:py-10 text-center text-gray-600 text-xs sm:text-sm border-t border-white/5 mt-16 sm:mt-20 relative z-[500] px-4">
          <p>© 2025 AhumAI. All rights reserved.</p>
        </footer>

        <FooterBlur />
      </Layout>
    </Router>
  );
}

export default App;
