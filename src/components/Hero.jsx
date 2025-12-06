import React, { useRef, useState, useEffect, lazy, Suspense } from 'react';
import { motion } from 'framer-motion';
import logo from '../assets/images/AhumAINoBg.png';
import { useOptimizedSettings } from '../hooks/useDeviceDetection';
import MobileGradient from './MobileGradient';

// Lazy load heavy WebGL component
const ColorBends = lazy(() => import('./ColorBends'));

const Hero = () => {
    const ref = useRef(null);
    const { showWebGLEffects, colorBendsSettings, animationSettings } = useOptimizedSettings();

    return (
        <section
            ref={ref}
            className="relative w-full h-[100vh] -mt-20 overflow-hidden flex items-center justify-center bg-black"
        >
            {/* Background: Conditionally render WebGL or lightweight fallback */}
            <div className="absolute inset-0 z-0 w-full h-full">
                {showWebGLEffects ? (
                    <Suspense fallback={<MobileGradient variant="nebula" />}>
                        <ColorBends
                            colors={['#D32F2F', '#9C27B0', '#2196F3', '#fbbf24', '#ec4899']}
                            alpha={false}
                            speed={colorBendsSettings.speed}
                            frequency={colorBendsSettings.frequency}
                            warpStrength={colorBendsSettings.warpStrength}
                            mouseInfluence={colorBendsSettings.mouseInfluence}
                            parallax={colorBendsSettings.parallax}
                            noise={colorBendsSettings.noise}
                        />
                    </Suspense>
                ) : (
                    <MobileGradient variant="nebula" animate={true} />
                )}
            </div>

            {/* Overlay - subtle dark overlay to ensure logo pops against the colorful background */}
            <div className="absolute inset-0 z-10 bg-black/30 pointer-events-none" />

            {/* Foreground Content (Logo) */}
            <div className="relative z-20 w-full max-w-7xl mx-auto px-4 flex flex-col items-center justify-center h-full pointer-events-none">
                <motion.img
                    src={logo}
                    alt="AhumAI"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: animationSettings.duration * 3, ease: "easeOut" }}
                    className="w-auto h-auto max-w-[80vw] max-h-[40vh] object-contain drop-shadow-2xl"
                />
            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: animationSettings.duration * 3 }}
                className="absolute bottom-10 z-20 pointer-events-auto"
            >
                <div className="w-[30px] h-[50px] rounded-full border-2 border-white/30 flex justify-center p-2">
                    <motion.div
                        animate={{
                            y: [0, 12, 0],
                        }}
                        transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                        className="w-1.5 h-1.5 rounded-full bg-white"
                    />
                </div>
            </motion.div>
        </section>
    );
};

export default Hero;
