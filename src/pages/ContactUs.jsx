import React, { lazy, Suspense } from 'react';
import { motion } from 'framer-motion';
import { Icon } from '@iconify/react';
import MobileGradient from '../components/MobileGradient';
import { useOptimizedSettings } from '../hooks/useDeviceDetection';

// Lazy load heavy WebGL component
const FaultyTerminal = lazy(() => import('../components/FaultyTerminal'));

const ContactUs = () => {
    const { showWebGLEffects, faultyTerminalSettings, animationSettings, isMobile } = useOptimizedSettings();

    return (
        <div className="pt-20 relative min-h-screen bg-black">
            {/* Background - Conditional rendering */}
            <div className="absolute inset-0 z-0">
                {showWebGLEffects ? (
                    <Suspense fallback={<MobileGradient variant="terminal" />}>
                        <FaultyTerminal
                            scale={faultyTerminalSettings.scale}
                            gridMul={[2, 1]}
                            digitSize={1.5}
                            timeScale={0.3}
                            scanlineIntensity={faultyTerminalSettings.scanlineIntensity}
                            glitchAmount={faultyTerminalSettings.glitchAmount}
                            flickerAmount={faultyTerminalSettings.flickerAmount}
                            noiseAmp={0.8}
                            chromaticAberration={faultyTerminalSettings.chromaticAberration}
                            curvature={0.1}
                            tint="#22d3ee"
                            mouseReact={faultyTerminalSettings.mouseReact}
                            mouseStrength={0.3}
                            brightness={faultyTerminalSettings.brightness}
                            pageLoadAnimation={faultyTerminalSettings.pageLoadAnimation}
                        />
                    </Suspense>
                ) : (
                    <MobileGradient variant="terminal" animate={true} />
                )}
            </div>

            {/* Dark overlay for readability */}
            <div className="absolute inset-0 z-[1] bg-black/40" />

            {/* Content */}
            <div className="relative z-10 container mx-auto px-4 sm:px-6 py-12 sm:py-20">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: animationSettings.duration * 2 }}
                    className="text-center mb-12 sm:mb-16"
                >
                    <p className="text-nebula-cyan text-base sm:text-lg mb-3 sm:mb-4">Let's Connect</p>
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight max-w-4xl mx-auto px-2">
                        Let's discuss how we can transform your{' '}
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-nebula-cyan via-nebula-purple to-nebula-gold">
                            digital presence
                        </span>
                    </h1>
                </motion.div>

                {/* Main Content Grid */}
                <div className="grid md:grid-cols-2 gap-8 sm:gap-12 max-w-6xl mx-auto">
                    {/* Left Column - Get in Touch */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: animationSettings.duration * 2, delay: 0.2 }}
                        className="space-y-6 sm:space-y-8"
                    >
                        <div>
                            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3 sm:mb-4">Get in Touch</h2>
                            <p className="text-gray-400 text-base sm:text-lg leading-relaxed">
                                Have a project in mind or want to learn more about our services? We're here to answer any questions and discuss how we can help your business thrive in the digital landscape.
                            </p>
                        </div>

                        {/* Contact Info Cards */}
                        <div className="space-y-4">
                            {/* Email */}
                            <motion.a
                                href="mailto:aadidev@ahumai.co.in"
                                whileHover={isMobile ? {} : { scale: 1.02, x: 5 }}
                                whileTap={{ scale: 0.98 }}
                                className="flex items-center gap-4 p-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl hover:border-nebula-cyan/50 transition-colors group"
                            >
                                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-nebula-cyan/20 flex items-center justify-center flex-shrink-0">
                                    <Icon icon="solar:letter-linear" className="text-xl sm:text-2xl text-nebula-cyan" />
                                </div>
                                <div className="min-w-0">
                                    <p className="text-gray-400 text-sm">Email</p>
                                    <p className="text-white font-medium group-hover:text-nebula-cyan transition-colors text-sm sm:text-base truncate">
                                        aadidev@ahumai.co.in
                                    </p>
                                </div>
                            </motion.a>

                            {/* Phone */}
                            <motion.a
                                href="tel:+919004200798"
                                whileHover={isMobile ? {} : { scale: 1.02, x: 5 }}
                                whileTap={{ scale: 0.98 }}
                                className="flex items-center gap-4 p-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl hover:border-nebula-purple/50 transition-colors group"
                            >
                                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-nebula-purple/20 flex items-center justify-center flex-shrink-0">
                                    <Icon icon="solar:phone-linear" className="text-xl sm:text-2xl text-nebula-purple" />
                                </div>
                                <div>
                                    <p className="text-gray-400 text-sm">Phone</p>
                                    <p className="text-white font-medium group-hover:text-nebula-purple transition-colors text-sm sm:text-base">
                                        +91 9004200798
                                    </p>
                                </div>
                            </motion.a>
                        </div>
                    </motion.div>

                    {/* Right Column - Hours & Support */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: animationSettings.duration * 2, delay: 0.4 }}
                        className="space-y-6 sm:space-y-8"
                    >
                        {/* Hours Card */}
                        <div className="relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-br from-nebula-purple/20 to-nebula-cyan/20 rounded-2xl blur-xl" />
                            <div className="relative bg-black/60 backdrop-blur-sm border border-white/10 rounded-2xl p-6 sm:p-8">
                                <div className="flex items-center gap-3 mb-4 sm:mb-6">
                                    <Icon icon="solar:clock-circle-linear" className="text-2xl sm:text-3xl text-nebula-gold" />
                                    <h3 className="text-xl sm:text-2xl font-bold text-white">Hours of Operation</h3>
                                </div>

                                <div className="space-y-3 sm:space-y-4">
                                    <div className="flex justify-between items-center py-2 sm:py-3 border-b border-white/10">
                                        <span className="text-gray-400 text-sm sm:text-base">Monday - Friday</span>
                                        <span className="text-white font-medium text-sm sm:text-base">9:00 AM - 6:00 PM IST</span>
                                    </div>
                                    <div className="flex justify-between items-center py-2 sm:py-3 border-b border-white/10">
                                        <span className="text-gray-400 text-sm sm:text-base">Saturday</span>
                                        <span className="text-gray-500 text-sm sm:text-base">Closed</span>
                                    </div>
                                    <div className="flex justify-between items-center py-2 sm:py-3">
                                        <span className="text-gray-400 text-sm sm:text-base">Sunday</span>
                                        <span className="text-gray-500 text-sm sm:text-base">Closed</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Enterprise Support Card */}
                        <motion.div
                            whileHover={isMobile ? {} : { scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="relative overflow-hidden"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-nebula-cyan/30 to-nebula-green/30 rounded-2xl" />
                            <div className="relative bg-black/40 backdrop-blur-sm border border-nebula-cyan/30 rounded-2xl p-5 sm:p-6">
                                <div className="flex items-center gap-3 sm:gap-4">
                                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-nebula-cyan/20 flex items-center justify-center flex-shrink-0">
                                        <Icon icon="solar:shield-check-linear" className="text-2xl sm:text-3xl text-nebula-cyan" />
                                    </div>
                                    <div>
                                        <h4 className="text-lg sm:text-xl font-bold text-white">24/7 Support</h4>
                                        <p className="text-nebula-cyan text-sm sm:text-base">For Enterprise Clients</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Social Links */}
                        <div className="flex gap-3 sm:gap-4">
                            <motion.a
                                href="https://www.linkedin.com/in/aadidev-raizada-68a339304/"
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={isMobile ? {} : { scale: 1.1, y: -2 }}
                                whileTap={{ scale: 0.95 }}
                                className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:border-[#0A66C2] hover:bg-[#0A66C2]/10 transition-colors"
                            >
                                <Icon icon="mdi:linkedin" className="text-xl sm:text-2xl text-white hover:text-[#0A66C2]" />
                            </motion.a>
                            <motion.a
                                href="mailto:aadidev@ahumai.co.in"
                                whileHover={isMobile ? {} : { scale: 1.1, y: -2 }}
                                whileTap={{ scale: 0.95 }}
                                className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:border-nebula-cyan hover:bg-nebula-cyan/10 transition-colors"
                            >
                                <Icon icon="solar:letter-linear" className="text-xl sm:text-2xl text-white" />
                            </motion.a>
                        </div>
                    </motion.div>
                </div>

                {/* Bottom CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: animationSettings.duration * 2, delay: 0.6 }}
                    className="mt-16 sm:mt-20 text-center"
                >
                    <p className="text-gray-400 text-base sm:text-lg mb-4 sm:mb-6">
                        Ready to start your project?
                    </p>
                    <motion.a
                        href="mailto:aadidev@ahumai.co.in?subject=Project%20Inquiry"
                        whileHover={isMobile ? {} : { scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-nebula-cyan to-nebula-purple text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-nebula-cyan/25 transition-shadow text-sm sm:text-base"
                    >
                        <Icon icon="solar:send-linear" className="text-lg sm:text-xl" />
                        Send us a message
                    </motion.a>
                </motion.div>
            </div>
        </div>
    );
};

export default ContactUs;
