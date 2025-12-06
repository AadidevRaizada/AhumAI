import React, { lazy, Suspense } from 'react';
import { motion } from 'framer-motion';
import { Icon } from '@iconify/react';
import MobileGradient from './MobileGradient';
import { useOptimizedSettings } from '../hooks/useDeviceDetection';

// Lazy load heavy components
const LightPillar = lazy(() => import('./LightPillar'));
const TrueFocus = lazy(() => import('./TrueFocus'));

const SeamlessIntegration = () => {
    const { showWebGLEffects, isMobile, shouldReduceEffects, animationSettings } = useOptimizedSettings();

    // Logos requested: google meet, github, openAI, whatsapp
    const logos = [
        { icon: "logos:google-meet", name: "Google Meet" },
        { icon: "simple-icons:github", name: "GitHub" },
        { icon: "simple-icons:openai", name: "OpenAI" },
        { icon: "logos:whatsapp-icon", name: "WhatsApp" },
        { icon: "logos:stripe", name: "Stripe" },
        { icon: "logos:supabase-icon", name: "Supabase" },
    ];

    // Reduce logos on mobile for faster loading
    const displayLogos = isMobile ? logos.slice(0, 4) : logos;

    // Mobile-friendly title
    const renderTitle = () => {
        if (shouldReduceEffects) {
            return (
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-nebula-purple to-nebula-cyan">
                    Seamless Integration
                </h2>
            );
        }

        return (
            <Suspense fallback={
                <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-nebula-purple to-nebula-cyan">
                    Seamless Integration
                </h2>
            }>
                <TrueFocus
                    sentence="Seamless Integration"
                    manualMode={false}
                    blurAmount={5}
                    borderColor="#9333ea"
                    animationDuration={1}
                    pauseBetweenAnimations={1}
                />
            </Suspense>
        );
    };

    return (
        <section className="relative w-full min-h-[50vh] sm:h-[60vh] flex flex-col items-center justify-center overflow-hidden bg-bg-main py-12 sm:py-0">
            {/* Background - Conditional rendering */}
            <div className="absolute inset-0 z-0">
                {showWebGLEffects ? (
                    <Suspense fallback={<MobileGradient variant="aurora" />}>
                        <LightPillar
                            topColor="#FF9FFC"
                            bottomColor="#5227FF"
                            intensity={0.3}
                            pillarWidth={4.0}
                            rotationSpeed={0.15}
                        />
                    </Suspense>
                ) : (
                    <MobileGradient variant="aurora" animate={true} />
                )}
            </div>

            {/* Content Overlay */}
            <div className="relative z-10 w-full flex flex-col items-center gap-8 sm:gap-12 px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: animationSettings.duration * 2 }}
                    className="text-center"
                >
                    <div className="mb-3 sm:mb-4 flex flex-col items-center">
                        {renderTitle()}
                    </div>
                    <p className="text-gray-400 text-sm sm:text-lg max-w-2xl mx-auto">
                        Connect with your favorite tools seamlessly.
                    </p>
                </motion.div>

                {/* Logo Grid for Mobile / Scrolling for Desktop */}
                {isMobile ? (
                    // Static grid for mobile - no animation, faster rendering
                    <div className="grid grid-cols-4 gap-4 w-full max-w-sm">
                        {displayLogos.map((logo, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.05, duration: 0.3 }}
                                className="flex flex-col items-center gap-2"
                            >
                                <div className="w-14 h-14 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm flex items-center justify-center">
                                    <Icon
                                        icon={logo.icon}
                                        width="28"
                                        height="28"
                                        className={logo.icon.includes('simple-icons') ? "text-white" : ""}
                                    />
                                </div>
                                <span className="text-[10px] font-medium text-gray-500 text-center">
                                    {logo.name}
                                </span>
                            </motion.div>
                        ))}
                    </div>
                ) : (
                    // Scrolling logos for desktop
                    <div className="w-full relative overflow-hidden flex py-8 sm:py-12 mask-linear">
                        <div className="flex gap-12 sm:gap-20 items-center animate-infinite-scroll whitespace-nowrap px-10">
                            {[...displayLogos, ...displayLogos].map((logo, index) => (
                                <div
                                    key={index}
                                    className="flex flex-col items-center gap-3 sm:gap-4 group cursor-pointer transition-transform hover:scale-110"
                                >
                                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md flex items-center justify-center shadow-lg group-hover:border-brand-purple/50 transition-colors">
                                        <Icon
                                            icon={logo.icon}
                                            width="40"
                                            height="40"
                                            className={logo.icon.includes('simple-icons') ? "text-white" : ""}
                                        />
                                    </div>
                                    <span className="text-xs sm:text-sm font-medium text-gray-500 group-hover:text-white transition-colors">
                                        {logo.name}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Fade masks for scrolling - Desktop only */}
            {!isMobile && (
                <>
                    <div className="absolute left-0 top-0 bottom-0 w-20 sm:w-32 bg-gradient-to-r from-bg-main to-transparent z-20 pointer-events-none" />
                    <div className="absolute right-0 top-0 bottom-0 w-20 sm:w-32 bg-gradient-to-l from-bg-main to-transparent z-20 pointer-events-none" />
                </>
            )}
        </section>
    );
};

export default SeamlessIntegration;
