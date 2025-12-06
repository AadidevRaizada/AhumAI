import React, { useRef, useState, lazy, Suspense } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Play } from 'lucide-react';
import { useOptimizedSettings } from '../hooks/useDeviceDetection';
import MobileGradient from './MobileGradient';

// Lazy load heavy components
const Threads = lazy(() => import('./Threads'));
const RotatingText = lazy(() => import('./RotatingText'));

const VideoWindow = () => {
    const containerRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const { showWebGLEffects, isMobile, shouldReduceEffects, animationSettings } = useOptimizedSettings();

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    // Reduce 3D transforms on mobile for better performance
    const rotateX = useTransform(
        scrollYProgress,
        [0, 0.5],
        shouldReduceEffects ? [5, 0] : [15, 0]
    );
    const scale = useTransform(
        scrollYProgress,
        [0, 0.5],
        shouldReduceEffects ? [0.95, 1] : [0.9, 1]
    );
    const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

    const youtubeVideoId = "8qI-4j3XLy4";

    // Mobile-friendly title without heavy animations
    const renderTitle = () => {
        if (shouldReduceEffects) {
            return (
                <div className="flex items-center justify-center gap-2 flex-wrap text-2xl sm:text-3xl md:text-4xl font-bold text-white">
                    <span>Team</span>
                    <span className="px-3 py-1 bg-gradient-to-r from-nebula-cyan to-nebula-purple text-white rounded-xl">
                        Highlights
                    </span>
                </div>
            );
        }

        return (
            <div className="flex items-center justify-center gap-3 text-3xl sm:text-4xl md:text-5xl font-bold text-white">
                <span>Team</span>
                <Suspense fallback={
                    <span className="px-3 py-1 bg-gradient-to-r from-nebula-cyan to-nebula-purple rounded-xl">Highlights</span>
                }>
                    <RotatingText
                        texts={['Highlights', 'Moments', 'Memories', 'Journey']}
                        mainClassName="px-3 md:px-4 bg-gradient-to-r from-nebula-cyan to-nebula-purple text-white overflow-hidden py-1 md:py-2 justify-center rounded-xl"
                        staggerFrom="last"
                        initial={{ y: "100%" }}
                        animate={{ y: 0 }}
                        exit={{ y: "-120%" }}
                        staggerDuration={0.025}
                        splitLevelClassName="overflow-hidden pb-1"
                        transition={{ type: "spring", damping: 30, stiffness: 400 }}
                        rotationInterval={2500}
                    />
                </Suspense>
            </div>
        );
    };

    return (
        <section ref={containerRef} className="py-12 sm:py-20 px-4 perspective-1000 relative">
            {/* Background - Conditional rendering */}
            <div className="absolute inset-0 z-0">
                {showWebGLEffects ? (
                    <Suspense fallback={<MobileGradient variant="cosmic" />}>
                        <Threads
                            amplitude={0.8}
                            distance={0}
                            enableMouseInteraction={false}
                            color={[0.6, 0.2, 0.8]}
                        />
                    </Suspense>
                ) : (
                    <MobileGradient variant="cosmic" animate={true} />
                )}
            </div>

            {/* Ambient Glow - Hidden on mobile */}
            {!isMobile && (
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-nebula-purple/20 rounded-full blur-[120px] pointer-events-none z-0" />
            )}

            {/* Title Section */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: animationSettings.duration * 2 }}
                className="relative z-10 text-center mb-8 sm:mb-12"
            >
                {renderTitle()}
                <p className="text-gray-400 mt-3 sm:mt-4 max-w-xl mx-auto text-sm sm:text-base px-4">
                    A glimpse into our journey, achievements, and the moments that define AhumAI.
                </p>
            </motion.div>

            <motion.div
                style={shouldReduceEffects ? { opacity } : {
                    rotateX,
                    scale,
                    opacity,
                    transformStyle: "preserve-3d",
                }}
                className="relative max-w-5xl mx-auto aspect-video bg-bg-main rounded-xl border border-white/10 overflow-hidden shadow-2xl shadow-nebula-purple/20 group cursor-pointer"
                onClick={() => setIsPlaying(true)}
            >
                {/* Glass Reflection Effect - Hidden on mobile */}
                {!isMobile && (
                    <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent opacity-50 pointer-events-none z-20" />
                )}

                {/* Browser Chrome */}
                <div className="absolute top-0 left-0 right-0 h-8 sm:h-10 bg-white/5 border-b border-white/5 flex items-center px-3 sm:px-4 gap-1.5 sm:gap-2 z-10 backdrop-blur-md">
                    <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-red-500/50" />
                    <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-yellow-500/50" />
                    <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-green-500/50" />
                    <div className="flex-1 flex justify-center">
                        <div className="bg-white/5 rounded-md px-2 sm:px-4 py-0.5 sm:py-1 text-[10px] sm:text-xs text-gray-400 truncate max-w-[150px] sm:max-w-none">
                            youtube.com/watch?v={youtubeVideoId}
                        </div>
                    </div>
                </div>

                {/* Video Content */}
                <div className="absolute inset-0 pt-8 sm:pt-10">
                    {isPlaying ? (
                        <iframe
                            src={`https://www.youtube.com/embed/${youtubeVideoId}?autoplay=1&rel=0`}
                            title="Team Highlights"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            className="w-full h-full"
                        />
                    ) : (
                        <>
                            {/* Black Background */}
                            <div className="absolute inset-0 bg-black" />

                            {/* Play Button and Text */}
                            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 sm:gap-4">
                                <div className="w-14 h-14 sm:w-20 sm:h-20 rounded-full bg-white/10 border border-white/20 flex items-center justify-center backdrop-blur-sm group-hover:scale-110 group-hover:bg-nebula-cyan/30 group-hover:border-nebula-cyan/50 transition-all duration-300 shadow-[0_0_30px_rgba(34,211,238,0.3)]">
                                    <Play className="w-6 h-6 sm:w-8 sm:h-8 text-white fill-white ml-0.5 sm:ml-1" />
                                </div>
                                <p className="text-white/60 text-sm sm:text-lg group-hover:text-nebula-cyan transition-colors duration-300">
                                    Tap to play
                                </p>
                            </div>
                        </>
                    )}
                </div>

                {/* Gradient Mask (only when not playing) */}
                {!isPlaying && (
                    <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-bg-main via-transparent to-transparent opacity-80" />
                )}

                {/* Grid Pattern Overlay - Hidden on mobile */}
                {!isMobile && (
                    <div className="absolute inset-0 pointer-events-none opacity-20 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
                )}
            </motion.div>
        </section>
    );
};

export default VideoWindow;
