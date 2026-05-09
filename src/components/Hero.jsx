'use client'

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowDown } from 'lucide-react';

const slides = [
    {
        id: 'navcert',
        badge: 'Live in production',
        title: 'NavCert AI',
        subtitle: 'Compliance that runs itself.',
        description:
            'Before NavCert, one person\'s entire job was chasing certificates. That role no longer exists. 500+ certificates processed every single day with zero manual tracking.',
        cta: 'Visit navcert.com',
        href: 'https://navcert.com',
        image: '/navcert_mobo.png',
    },
    {
        id: 'sorch',
        badge: 'In active development',
        title: 'Sorch',
        subtitle: 'Autonomous hiring. Without the recruiter.',
        description:
            'CVs arrive, Sorch reads them, scores candidates, calls the shortlisted ones, and updates your pipeline. You walk away and come back to ranked results.',
        cta: 'Visit sorch.co',
        href: 'https://sorch.co',
        image: '/sorch_mobo.png',
    },
    {
        id: 'opax',
        badge: 'Built & demonstrable',
        title: 'Opax',
        subtitle: 'One interface. Every system. Zero switching.',
        description:
            'A doctor asks a question in plain language. Opax finds the answer across five disconnected systems. The clinic keeps what they have — they just stop operating it manually.',
        cta: 'View on GitHub',
        href: 'https://github.com/manishindiyaar/Opax.git',
        image: '/opax_mobo.png',
    },
];

const SLIDE_INTERVAL = 3000;

const slideVariants = {
    enter: (dir) => ({
        x: dir > 0 ? 200 : -200,
        opacity: 0,
    }),
    center: {
        x: 0,
        opacity: 1,
    },
    exit: (dir) => ({
        x: dir > 0 ? -200 : 200,
        opacity: 0,
    }),
};

const Hero = () => {
    const [active, setActive] = useState(0);
    const [direction, setDirection] = useState(1);
    const [isPaused, setIsPaused] = useState(false);

    const goTo = useCallback(
        (next) => {
            setDirection(next > active ? 1 : -1);
            setActive(next);
        },
        [active]
    );

    useEffect(() => {
        if (isPaused) return;
        const timer = setInterval(() => {
            setDirection(1);
            setActive((prev) => (prev + 1) % slides.length);
        }, SLIDE_INTERVAL);
        return () => clearInterval(timer);
    }, [isPaused]);

    const slide = slides[active];

    return (
        <section
            className="relative w-full min-h-[100vh] flex items-center bg-deep-hull overflow-hidden"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
        >
            {/* Sparkles */}
            <div className="absolute inset-0 pointer-events-none z-0" aria-hidden>
                {[...Array(15)].map((_, i) => (
                    <span
                        key={i}
                        className="absolute w-0.5 h-0.5 rounded-full bg-white"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            opacity: 0,
                            animation: `sparkle ${2 + Math.random() * 3}s ease-in-out ${Math.random() * 3}s infinite`,
                            animationDelay: `${Math.random() * 3}s`,
                        }}
                    />
                ))}
            </div>

            {/* Inline sparkle keyframes */}
            <style jsx>{`
                @keyframes sparkle {
                    0%, 100% { opacity: 0; transform: scale(1); }
                    50% { opacity: 0.6; transform: scale(1.8); }
                }
            `}</style>

            <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 py-24 md:py-32">
                {/* Floating badge above the border */}
                <div className="relative">
                    <span className="absolute -top-4 left-1/2 -translate-x-1/2 z-10 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] backdrop-blur-md px-4 py-1.5 text-[11px] text-fog-gray whitespace-nowrap">
                        <span className="h-1.5 w-1.5 rounded-full bg-signal-amber animate-pulse" />
                        products we have cooking so far
                        <ArrowDown className="h-3 w-3" />
                    </span>
                </div>

                {/* Gradient border wrapper — light at top, shadow at bottom */}
                <div
                    className="rounded-sm p-[1px]"
                    style={{
                        background:
                            'linear-gradient(180deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.04) 40%, rgba(255,255,255,0.01) 70%, rgba(255,255,255,0.06) 100%)',
                        boxShadow:
                            '0 1px 3px rgba(0,0,0,0.4), 0 8px 24px rgba(0,0,0,0.2)',
                    }}
                >
                    <div className="bg-deep-hull rounded-[2px] p-6 sm:p-8 md:p-10">
                <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
                    {/* Left — tilted geometric card with phone mockup */}
                    <div className="flex justify-center md:justify-end perspective-[1200px]">
                        <AnimatePresence mode="wait" custom={direction}>
                            <motion.div
                                key={slide.id}
                                custom={direction}
                                variants={slideVariants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                                className="relative w-[260px] sm:w-[300px] md:w-[340px]"
                            >
                                {/* Outer geometric card — bent/angled */}
                                <div
                                    className="relative rounded-2xl bg-hull-plate border border-rust-line overflow-hidden"
                                    style={{
                                        transform: 'rotateY(-6deg) rotateX(3deg)',
                                        boxShadow:
                                            '0 20px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.03) inset',
                                    }}
                                >
                                    {/* Phone mockup — fixed identical size */}
                                    <div className="p-4 sm:p-5">
                                        <div className="w-[220px] sm:w-[260px] md:w-[300px] aspect-[3/4] mx-auto">
                                            <img
                                                src={slide.image}
                                                alt={slide.title}
                                                className="w-full h-full object-cover rounded-lg"
                                                loading="eager"
                                            />
                                        </div>
                                    </div>

                                    {/* Specular highlight glint — top-left corner */}
                                    <div
                                        className="absolute top-0 left-0 w-2/5 h-2/5 pointer-events-none rounded-br-3xl"
                                        style={{
                                            background:
                                                'linear-gradient(135deg, rgba(255,255,255,0.22) 0%, rgba(255,255,255,0.08) 30%, transparent 60%)',
                                        }}
                                    />

                                    {/* Subtle glass reflection on top edge */}
                                    <div
                                        className="absolute top-0 inset-x-0 h-1/3 pointer-events-none"
                                        style={{
                                            background:
                                                'linear-gradient(to bottom, rgba(255,255,255,0.04), transparent)',
                                        }}
                                    />
                                </div>

                                {/* Shadow on surface */}
                                <div
                                    className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-3/4 h-8 rounded-full pointer-events-none"
                                    style={{
                                        background:
                                            'radial-gradient(ellipse at center, rgba(0,0,0,0.5), transparent)',
                                        filter: 'blur(8px)',
                                    }}
                                />
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Right — product content */}
                    <div className="text-center md:text-left">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={slide.id + '-content'}
                                initial={{ opacity: 0, y: 16 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -16 }}
                                transition={{ duration: 0.35, ease: 'easeOut' }}
                            >
                                <span className="inline-flex items-center gap-1.5 rounded-sm border border-rust-line bg-hull-plate px-3 py-1 text-[11px] text-fog-gray">
                                    <span
                                        className={`h-1.5 w-1.5 rounded-full ${slide.id === 'navcert' ? 'bg-signal-amber' : 'bg-fog-gray'}`}
                                    />
                                    {slide.badge}
                                </span>

                                <h1 className="mt-5 text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight text-warm-chalk leading-[1.05]">
                                    {slide.title}
                                </h1>

                                <p className="mt-3 text-lg sm:text-xl text-fog-gray font-medium">
                                    {slide.subtitle}
                                </p>

                                <p className="mt-4 text-sm sm:text-base text-fog-gray leading-relaxed max-w-md mx-auto md:mx-0">
                                    {slide.description}
                                </p>

                                <a
                                    href={slide.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 mt-6 rounded-sm bg-signal-amber px-5 py-2.5 text-[13px] font-semibold text-deep-hull hover:bg-signal-amber-deep transition-colors duration-[0.15s] ease-out"
                                >
                                    {slide.cta}
                                    <ArrowRight className="h-4 w-4" />
                                </a>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
                </div>
                </div>

                {/* Slide dots */}
                <div className="flex justify-center gap-2 mt-12 md:mt-16">
                    {slides.map((s, i) => (
                        <button
                            key={s.id}
                            onClick={() => goTo(i)}
                            className={`h-2 rounded-full transition-all duration-300 ${
                                i === active
                                    ? 'w-6 bg-signal-amber'
                                    : 'w-2 bg-rust-line hover:bg-fog-gray'
                            }`}
                            aria-label={`Go to ${s.title}`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Hero;
