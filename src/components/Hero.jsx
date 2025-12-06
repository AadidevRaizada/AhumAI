import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import logo from '../assets/images/AhumAINoBg.png';
import ColorBends from './ColorBends';

const Hero = () => {
    const ref = useRef(null);
    const [isMobile, setIsMobile] = useState(false);

    // Check for mobile/tablet preference
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.matchMedia('(max-width: 768px)').matches);
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // We no longer need useScroll/useTransform for background parallax 
    // because ColorBends is a self-contained effect.

    return (
        <section
            ref={ref}
            className="relative w-full h-[100vh] -mt-20 overflow-hidden flex items-center justify-center bg-black"
        >
            {/* Background: Color Bends Effect */}
            <div className="absolute inset-0 z-0 w-full h-full">
                {/* Fallback for performance if needed, but modern devices handle this shader fine. 
                    If strict mobile fallback is needed:
                    {!isMobile ? <ColorBends /> : <div className="w-full h-full bg-bg-main" />}
                */}
                <ColorBends
                    colors={['#D32F2F', '#9C27B0', '#2196F3', '#fbbf24', '#ec4899']}
                    alpha={false} // previous implementation might have had this, keeping it safe
                />
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
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="w-auto h-auto max-w-[80vw] max-h-[40vh] object-contain drop-shadow-2xl"
                />
            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 1 }}
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
