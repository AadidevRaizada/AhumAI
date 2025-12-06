import React, { lazy, Suspense } from 'react';
import Hero from '../components/Hero';
import { useOptimizedSettings } from '../hooks/useDeviceDetection';
import { motion } from 'framer-motion';

// Lazy load all heavy components for faster initial load
const VideoWindow = lazy(() => import('../components/VideoWindow'));
const FeatureGrid = lazy(() => import('../components/FeatureGrid'));
const ScrollReveal = lazy(() => import('../components/ScrollReveal'));
const SeamlessIntegration = lazy(() => import('../components/SeamlessIntegration'));

// Simple loading placeholder
const LoadingPlaceholder = ({ height = "400px" }) => (
    <div
        className="flex items-center justify-center bg-bg-main"
        style={{ minHeight: height }}
    >
        <div className="w-8 h-8 border-2 border-nebula-cyan border-t-transparent rounded-full animate-spin" />
    </div>
);

// Simple text component for mobile (no GSAP)
const SimpleRevealText = ({ children }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-[95vw] sm:max-w-[80vw] text-center"
        >
            <p className="text-xl sm:text-2xl md:text-3xl font-medium text-gray-300 leading-relaxed">
                {children}
            </p>
        </motion.div>
    );
};

const Home = () => {
    const { shouldReduceEffects, isMobile, animationSettings } = useOptimizedSettings();

    return (
        <>
            {/* Hero is always loaded (above the fold) */}
            <Hero />

            {/* Reveal text section */}
            <div className="py-12 sm:py-20 flex justify-center bg-bg-main relative z-30 px-4">
                {shouldReduceEffects ? (
                    <SimpleRevealText>
                        Thought of a solution but have no idea how to implement it?
                        That's alright, we have you covered.
                    </SimpleRevealText>
                ) : (
                    <Suspense fallback={<LoadingPlaceholder height="100px" />}>
                        <ScrollReveal
                            baseOpacity={0}
                            enableBlur={!isMobile}
                            baseRotation={isMobile ? 2 : 5}
                            blurStrength={isMobile ? 2 : 5}
                            containerClassName="max-w-[95vw] sm:max-w-[80vw]"
                        >
                            Thought of a solution but have no idea how to implement it?
                            That's alright, we have you covered
                        </ScrollReveal>
                    </Suspense>
                )}
            </div>

            {/* Seamless Integration - lazy loaded */}
            <Suspense fallback={<LoadingPlaceholder height="50vh" />}>
                <SeamlessIntegration />
            </Suspense>

            {/* Video Window - lazy loaded */}
            <Suspense fallback={<LoadingPlaceholder height="60vh" />}>
                <VideoWindow />
            </Suspense>

            {/* Feature Grid - lazy loaded */}
            <Suspense fallback={<LoadingPlaceholder height="400px" />}>
                <FeatureGrid />
            </Suspense>
        </>
    );
};

export default Home;
