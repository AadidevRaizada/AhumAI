import React, { lazy, Suspense } from 'react';
import TiltedCard from '../components/TiltedCard';
import MobileGradient from '../components/MobileGradient';
import { motion } from 'framer-motion';
import { Icon } from '@iconify/react';
import { useOptimizedSettings } from '../hooks/useDeviceDetection';

// Lazy load heavy WebGL component
const DarkVeil = lazy(() => import('../components/DarkVeil'));

// Import images properly
import aadidevImg from '../assets/images/About/Aadidev_Robot.jpg';
import manishImg from '../assets/images/About/Manish.jpg';
import aryanIMG from '../assets/images/About/Aryan.jpg';

const AboutUs = () => {
    const { showWebGLEffects, darkVeilSettings, animationSettings, isMobile } = useOptimizedSettings();

    const teamMembers = [
        {
            name: "Aryan Mishra",
            role: "Developer",
            image: aryanIMG,
            linkedin: "https://www.linkedin.com/in/aryan-mishra-5a8686343/",
            isCenter: false
        },
        {
            name: "Aadidev Raizada",
            role: "Founder & Lead Developer",
            image: aadidevImg,
            linkedin: "https://www.linkedin.com/in/aadidev-raizada-68a339304/",
            isCenter: true
        },
        {
            name: "Manish Saw",
            role: "Developer",
            image: manishImg,
            linkedin: "https://www.linkedin.com/in/manishindiyaar/",
            isCenter: false
        }
    ];

    // Responsive card sizes
    const getCardSize = (isCenter) => {
        if (isMobile) {
            return {
                containerHeight: isCenter ? "280px" : "260px",
                containerWidth: isCenter ? "260px" : "240px",
                imageHeight: isCenter ? "260px" : "240px",
                imageWidth: isCenter ? "260px" : "240px",
            };
        }
        return {
            containerHeight: isCenter ? "360px" : "320px",
            containerWidth: isCenter ? "320px" : "280px",
            imageHeight: isCenter ? "320px" : "280px",
            imageWidth: isCenter ? "320px" : "280px",
        };
    };

    return (
        <div className="pt-20 relative min-h-screen bg-black">
            {/* Background - Conditional rendering */}
            <div className="absolute inset-0 z-0">
                {showWebGLEffects ? (
                    <Suspense fallback={<MobileGradient variant="cosmic" />}>
                        <DarkVeil
                            speed={darkVeilSettings.speed}
                            resolutionScale={darkVeilSettings.resolutionScale}
                        />
                    </Suspense>
                ) : (
                    <MobileGradient variant="cosmic" animate={true} />
                )}
            </div>

            {/* Content */}
            <div className="relative z-10">
                {/* Team Section */}
                <div className="container mx-auto px-4 sm:px-6 py-12 sm:py-20">
                    <div className="text-center mb-12 sm:mb-16">
                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: animationSettings.duration * 2 }}
                            className="text-3xl sm:text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-nebula-cyan via-nebula-purple to-nebula-gold"
                        >
                            Meet Our Team
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: animationSettings.duration * 2, delay: 0.2 }}
                            className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto mt-4 sm:mt-6 px-4"
                        >
                            The creative minds behind AhumAI, bringing innovation and excellence to every project.
                        </motion.p>
                    </div>

                    {/* Team Members Layout - Responsive */}
                    <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-4 max-w-5xl mx-auto">
                        {teamMembers.map((member, index) => {
                            const cardSize = getCardSize(member.isCenter);
                            return (
                                <a
                                    key={member.name}
                                    href={member.linkedin}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`flex flex-col items-center cursor-pointer group ${member.isCenter ? 'md:-mt-8' : 'md:mt-24'
                                        }`}
                                >
                                    <TiltedCard
                                        imageSrc={member.image}
                                        altText={member.name}
                                        captionText={member.name}
                                        containerHeight={cardSize.containerHeight}
                                        containerWidth={cardSize.containerWidth}
                                        imageHeight={cardSize.imageHeight}
                                        imageWidth={cardSize.imageWidth}
                                        scaleOnHover={isMobile ? 1.02 : 1.08}
                                        rotateAmplitude={isMobile ? 5 : 12}
                                        showMobileWarning={false}
                                        showTooltip={!isMobile}
                                    />
                                    <h3 className={`mt-4 font-bold text-white group-hover:text-nebula-cyan transition-colors ${member.isCenter ? 'text-xl sm:text-2xl' : 'text-lg sm:text-xl'
                                        }`}>
                                        {member.name}
                                    </h3>
                                    <p className="text-gray-400 text-sm">{member.role}</p>
                                    <div className="mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <Icon icon="mdi:linkedin" className="text-2xl text-[#0A66C2]" />
                                    </div>
                                </a>
                            );
                        })}
                    </div>
                </div>

                {/* Our Vision Section */}
                <div className="relative py-16 sm:py-32 overflow-hidden">
                    {/* Gradient Orbs Background - Hidden on mobile for performance */}
                    {!isMobile && (
                        <div className="absolute inset-0 overflow-hidden pointer-events-none">
                            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-nebula-purple/20 rounded-full blur-3xl animate-pulse-slow" />
                            <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-nebula-cyan/20 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }} />
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-nebula-gold/10 rounded-full blur-3xl" />
                        </div>
                    )}

                    <div className="container mx-auto px-4 sm:px-6 relative z-10">
                        <div className="max-w-4xl mx-auto text-center">
                            {/* Vision Title */}
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: animationSettings.duration * 2 }}
                                viewport={{ once: true }}
                                className="mb-8 sm:mb-12"
                            >
                                <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-nebula-purple to-nebula-cyan">
                                    Our Vision
                                </h2>
                            </motion.div>

                            {/* Vision Content */}
                            <div className="space-y-6 sm:space-y-8">
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: animationSettings.duration * 2, delay: 0.2 }}
                                    viewport={{ once: true }}
                                    className="relative"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-r from-nebula-cyan/10 via-nebula-purple/10 to-nebula-gold/10 rounded-2xl blur-xl" />
                                    <div className="relative bg-black/40 backdrop-blur-sm border border-white/10 rounded-2xl p-6 sm:p-8">
                                        <p className="text-lg sm:text-xl text-gray-300 leading-relaxed">
                                            At <span className="text-nebula-cyan font-semibold">AhumAI</span>, we envision a future where technology seamlessly integrates with human potential, creating solutions that not only solve today's problems but anticipate tomorrow's challenges.
                                        </p>
                                    </div>
                                </motion.div>

                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: animationSettings.duration * 2, delay: 0.4 }}
                                    viewport={{ once: true }}
                                    className="relative"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-r from-nebula-purple/10 via-nebula-gold/10 to-nebula-cyan/10 rounded-2xl blur-xl" />
                                    <div className="relative bg-black/40 backdrop-blur-sm border border-white/10 rounded-2xl p-6 sm:p-8">
                                        <p className="text-lg sm:text-xl text-gray-300 leading-relaxed">
                                            We believe in harnessing the power of <span className="text-nebula-purple font-semibold">artificial intelligence</span>, <span className="text-nebula-gold font-semibold">cloud computing</span>, and <span className="text-nebula-green font-semibold">cybersecurity</span> to build digital ecosystems that empower businesses to thrive in an increasingly complex world.
                                        </p>
                                    </div>
                                </motion.div>

                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: animationSettings.duration * 2, delay: 0.6 }}
                                    viewport={{ once: true }}
                                    className="relative"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-r from-nebula-gold/10 via-nebula-cyan/10 to-nebula-purple/10 rounded-2xl blur-xl" />
                                    <div className="relative bg-black/40 backdrop-blur-sm border border-white/10 rounded-2xl p-6 sm:p-8">
                                        <p className="text-lg sm:text-xl text-gray-300 leading-relaxed">
                                            Our mission is to be at the forefront of <span className="text-nebula-gold font-semibold">technological innovation</span>, continuously pushing boundaries and reimagining what's possible in the digital landscape.
                                        </p>
                                    </div>
                                </motion.div>
                            </div>

                            {/* Decorative Line */}
                            <motion.div
                                initial={{ scaleX: 0 }}
                                whileInView={{ scaleX: 1 }}
                                transition={{ duration: animationSettings.duration * 3, delay: 0.8 }}
                                viewport={{ once: true }}
                                className="mt-12 sm:mt-16 h-px bg-gradient-to-r from-transparent via-nebula-cyan to-transparent"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutUs;
