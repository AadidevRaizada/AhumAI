import React from 'react';
import { motion } from 'framer-motion';
import { Icon } from '@iconify/react';
import FaultyTerminal from '../components/FaultyTerminal';

const ContactUs = () => {
    return (
        <div className="pt-20 relative min-h-screen bg-black">
            {/* FaultyTerminal Background */}
            <div className="absolute inset-0 z-0">
                <FaultyTerminal
                    scale={1.5}
                    gridMul={[2, 1]}
                    digitSize={1.5}
                    timeScale={0.3}
                    scanlineIntensity={0.2}
                    glitchAmount={1.2}
                    flickerAmount={0.5}
                    noiseAmp={0.8}
                    chromaticAberration={2}
                    curvature={0.1}
                    tint="#22d3ee"
                    mouseReact={true}
                    mouseStrength={0.3}
                    brightness={0.4}
                    pageLoadAnimation={true}
                />
            </div>

            {/* Dark overlay for readability */}
            <div className="absolute inset-0 z-[1] bg-black/40" />

            {/* Content */}
            <div className="relative z-10 container mx-auto px-6 py-20">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <p className="text-nebula-cyan text-lg mb-4">Let's Connect</p>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight max-w-4xl mx-auto">
                        Let's discuss how we can transform your{' '}
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-nebula-cyan via-nebula-purple to-nebula-gold">
                            digital presence
                        </span>
                    </h1>
                </motion.div>

                {/* Main Content Grid */}
                <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
                    {/* Left Column - Get in Touch */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="space-y-8"
                    >
                        <div>
                            <h2 className="text-3xl font-bold text-white mb-4">Get in Touch</h2>
                            <p className="text-gray-400 text-lg leading-relaxed">
                                Have a project in mind or want to learn more about our services? We're here to answer any questions and discuss how we can help your business thrive in the digital landscape.
                            </p>
                        </div>

                        {/* Contact Info Cards */}
                        <div className="space-y-4">
                            {/* Email */}
                            <motion.a
                                href="mailto:aadidev@ahumai.co.in"
                                whileHover={{ scale: 1.02, x: 5 }}
                                className="flex items-center gap-4 p-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl hover:border-nebula-cyan/50 transition-colors group"
                            >
                                <div className="w-12 h-12 rounded-lg bg-nebula-cyan/20 flex items-center justify-center">
                                    <Icon icon="solar:letter-linear" className="text-2xl text-nebula-cyan" />
                                </div>
                                <div>
                                    <p className="text-gray-400 text-sm">Email</p>
                                    <p className="text-white font-medium group-hover:text-nebula-cyan transition-colors">
                                        aadidev@ahumai.co.in
                                    </p>
                                </div>
                            </motion.a>

                            {/* Phone */}
                            <motion.a
                                href="tel:+919004200798"
                                whileHover={{ scale: 1.02, x: 5 }}
                                className="flex items-center gap-4 p-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl hover:border-nebula-purple/50 transition-colors group"
                            >
                                <div className="w-12 h-12 rounded-lg bg-nebula-purple/20 flex items-center justify-center">
                                    <Icon icon="solar:phone-linear" className="text-2xl text-nebula-purple" />
                                </div>
                                <div>
                                    <p className="text-gray-400 text-sm">Phone</p>
                                    <p className="text-white font-medium group-hover:text-nebula-purple transition-colors">
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
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="space-y-8"
                    >
                        {/* Hours Card */}
                        <div className="relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-br from-nebula-purple/20 to-nebula-cyan/20 rounded-2xl blur-xl" />
                            <div className="relative bg-black/60 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
                                <div className="flex items-center gap-3 mb-6">
                                    <Icon icon="solar:clock-circle-linear" className="text-3xl text-nebula-gold" />
                                    <h3 className="text-2xl font-bold text-white">Hours of Operation</h3>
                                </div>

                                <div className="space-y-4">
                                    <div className="flex justify-between items-center py-3 border-b border-white/10">
                                        <span className="text-gray-400">Monday - Friday</span>
                                        <span className="text-white font-medium">9:00 AM - 6:00 PM IST</span>
                                    </div>
                                    <div className="flex justify-between items-center py-3 border-b border-white/10">
                                        <span className="text-gray-400">Saturday</span>
                                        <span className="text-gray-500">Closed</span>
                                    </div>
                                    <div className="flex justify-between items-center py-3">
                                        <span className="text-gray-400">Sunday</span>
                                        <span className="text-gray-500">Closed</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Enterprise Support Card */}
                        <motion.div
                            whileHover={{ scale: 1.02 }}
                            className="relative overflow-hidden"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-nebula-cyan/30 to-nebula-green/30 rounded-2xl" />
                            <div className="relative bg-black/40 backdrop-blur-sm border border-nebula-cyan/30 rounded-2xl p-6">
                                <div className="flex items-center gap-4">
                                    <div className="w-14 h-14 rounded-xl bg-nebula-cyan/20 flex items-center justify-center">
                                        <Icon icon="solar:shield-check-linear" className="text-3xl text-nebula-cyan" />
                                    </div>
                                    <div>
                                        <h4 className="text-xl font-bold text-white">24/7 Support</h4>
                                        <p className="text-nebula-cyan">For Enterprise Clients</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Social Links */}
                        <div className="flex gap-4">
                            <motion.a
                                href="https://www.linkedin.com/in/aadidev-raizada-68a339304/"
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{ scale: 1.1, y: -2 }}
                                className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:border-[#0A66C2] hover:bg-[#0A66C2]/10 transition-colors"
                            >
                                <Icon icon="mdi:linkedin" className="text-2xl text-white hover:text-[#0A66C2]" />
                            </motion.a>
                            <motion.a
                                href="mailto:aadidev@ahumai.co.in"
                                whileHover={{ scale: 1.1, y: -2 }}
                                className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:border-nebula-cyan hover:bg-nebula-cyan/10 transition-colors"
                            >
                                <Icon icon="solar:letter-linear" className="text-2xl text-white" />
                            </motion.a>
                        </div>
                    </motion.div>
                </div>

                {/* Bottom CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="mt-20 text-center"
                >
                    <p className="text-gray-400 text-lg mb-6">
                        Ready to start your project?
                    </p>
                    <motion.a
                        href="mailto:aadidev@ahumai.co.in?subject=Project%20Inquiry"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-nebula-cyan to-nebula-purple text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-nebula-cyan/25 transition-shadow"
                    >
                        <Icon icon="solar:send-linear" className="text-xl" />
                        Send us a message
                    </motion.a>
                </motion.div>
            </div>
        </div>
    );
};

export default ContactUs;
