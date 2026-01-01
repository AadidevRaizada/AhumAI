import React from 'react';
import { motion } from 'framer-motion';

const BackedByKiro = () => {
    return (
        <section className="py-16 sm:py-20 relative overflow-hidden">
            {/* Subtle background glow */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-purple-500/5 rounded-full blur-[100px]" />
            </div>

            <div className="max-w-4xl mx-auto px-4 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="flex flex-col items-center text-center"
                >
                    {/* Label */}
                    <motion.span
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: 0.1 }}
                        className="text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-widest mb-6"
                    >
                        Proudly Backed By
                    </motion.span>

                    {/* Kiro Logo + Badge Container */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="relative group"
                    >
                        {/* Glow effect on hover */}
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 via-violet-500/20 to-purple-600/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                        {/* Main card */}
                        <div className="relative flex flex-col items-center gap-5 px-10 sm:px-16 py-8 sm:py-10 rounded-2xl bg-white/[0.02] border border-white/10 group-hover:border-purple-500/30 transition-all duration-500">
                            {/* Kiro Logo - sized for horizontal format */}
                            <div className="relative">
                                <div className="absolute inset-0 bg-purple-500/20 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                <img
                                    src="/Kiro.png"
                                    alt="Kiro"
                                    className="relative h-12 sm:h-16 w-auto object-contain"
                                />
                            </div>

                            {/* Subtext */}
                            <p className="text-sm sm:text-base text-gray-400 max-w-sm">
                                Accelerating from idea to production with AI-powered development
                            </p>

                            {/* Badge pill */}
                            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/10 to-violet-500/10 border border-purple-500/20">
                                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                                <span className="text-xs sm:text-sm font-medium text-purple-300">
                                    Startup Program Member
                                </span>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};

export default BackedByKiro;
