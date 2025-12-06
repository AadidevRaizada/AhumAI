import React from 'react';
import { motion } from 'framer-motion';
import { Icon } from '@iconify/react';
import LightPillar from './LightPillar';
import TrueFocus from './TrueFocus';

const SeamlessIntegration = () => {
    // Logos requested: google meet, github, openAI, whatsapp
    const logos = [
        { icon: "logos:google-meet", name: "Google Meet" },
        { icon: "simple-icons:github", name: "GitHub" },
        { icon: "simple-icons:openai", name: "OpenAI" },
        { icon: "logos:whatsapp-icon", name: "WhatsApp" },
        // Duplicates for seamless scrolling
        { icon: "logos:stripe", name: "Stripe" },
        { icon: "simple-icons:github", name: "GitHub" },
        { icon: "simple-icons:openai", name: "OpenAI" },
        { icon: "logos:supabase-icon", name: "Supabase" },
    ];

    return (
        <section className="relative w-full h-[60vh] flex flex-col items-center justify-center overflow-hidden bg-bg-main">
            {/* LightPillar Background */}
            <div className="absolute inset-0 z-0">
                <LightPillar
                    topColor="#FF9FFC"
                    bottomColor="#5227FF"
                    intensity={0.4}
                    pillarWidth={5.0}
                    rotationSpeed={0.2}
                />
            </div>

            {/* Content Overlay */}
            <div className="relative z-10 w-full flex flex-col items-center gap-12">
                <div className="text-center px-4">
                    <div className="mb-4 flex flex-col items-center">
                        <TrueFocus
                            sentence="Seamless Integration"
                            manualMode={false}
                            blurAmount={5}
                            borderColor="#9333ea"
                            animationDuration={1}
                            pauseBetweenAnimations={1}
                        />
                    </div>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                        Connect with your favorite tools seamlessly.
                    </p>
                </div>

                {/* Scrolling Logos */}
                <div className="w-full relative overflow-hidden flex py-12 mask-linear">
                    <div className="flex gap-20 items-center animate-infinite-scroll whitespace-nowrap px-10">
                        {logos.map((logo, index) => (
                            <div
                                key={index}
                                className="flex flex-col items-center gap-4 group cursor-pointer transition-transform hover:scale-110"
                            >
                                <div className="w-20 h-20 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md flex items-center justify-center shadow-lg group-hover:border-brand-purple/50 transition-colors">
                                    <Icon
                                        icon={logo.icon}
                                        width="48"
                                        height="48"
                                        className={logo.icon.includes('simple-icons') ? "text-white" : ""}
                                    />
                                </div>
                                <span className="text-sm font-medium text-gray-500 group-hover:text-white transition-colors">
                                    {logo.name}
                                </span>
                            </div>
                        ))}
                        {/* Duplicate set for smoother infinite scroll if needed, though pure CSS animation handles it usually with enough items. Map twice. */}
                        {logos.map((logo, index) => (
                            <div
                                key={`dup-${index}`}
                                className="flex flex-col items-center gap-4 group cursor-pointer transition-transform hover:scale-110"
                            >
                                <div className="w-20 h-20 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md flex items-center justify-center shadow-lg group-hover:border-brand-purple/50 transition-colors">
                                    <Icon
                                        icon={logo.icon}
                                        width="48"
                                        height="48"
                                        className={logo.icon.includes('simple-icons') ? "text-white" : ""}
                                    />
                                </div>
                                <span className="text-sm font-medium text-gray-500 group-hover:text-white transition-colors">
                                    {logo.name}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Fade masks for scrolling */}
            <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-bg-main to-transparent z-20 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-bg-main to-transparent z-20 pointer-events-none" />
        </section>
    );
};

export default SeamlessIntegration;
