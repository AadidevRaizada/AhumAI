'use client'

import React, { useEffect, useRef, useMemo } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './ScrollReveal.css';

gsap.registerPlugin(ScrollTrigger);

const ScrollReveal = ({
    children,
    scrollContainerRef,
    enableBlur = true,
    baseOpacity = 0.1,
    baseRotation = 3,
    blurStrength = 4,
    containerClassName = '',
    textClassName = '',
    rotationEnd = 'bottom bottom',
    wordAnimationEnd = 'bottom bottom'
}) => {
    const containerRef = useRef(null);
    const splitText = useMemo(() => {
        const text = typeof children === 'string' ? children : '';
        return text.split(/(\s+)/).map((word, index) => {
            if (word.match(/^\s+$/)) return word;
            return (
                <span className="word" key={index}>
                    {word}
                </span>
            );
        });
    }, [children]);

    useEffect(() => {
        const el = containerRef.current;
        if (!el) return;

        const stTriggers = [];

        // Simple fade-in for all devices — no scrubbing
        stTriggers.push(
            ScrollTrigger.create({
                trigger: el,
                start: 'top bottom-=5%',
                onEnter: () => {
                    gsap.to(el, {
                        opacity: 1,
                        y: 0,
                        rotate: 0,
                        duration: 0.7,
                        ease: 'power2.out',
                    });
                },
                once: true,
            })
        );

        // Word-level opacity — play once on enter
        const wordElements = el.querySelectorAll('.word');
        if (wordElements.length > 0) {
            stTriggers.push(
                ScrollTrigger.create({
                    trigger: el,
                    start: 'top bottom-=5%',
                    onEnter: () => {
                        gsap.fromTo(
                            wordElements,
                            { opacity: baseOpacity },
                            {
                                opacity: 1,
                                stagger: 0.03,
                                duration: 0.5,
                                ease: 'power2.out',
                            }
                        );
                    },
                    once: true,
                })
            );
        }

        return () => {
            stTriggers.forEach(st => st.kill());
        };
    }, []);

    return (
        <h2 ref={containerRef} className={`scroll-reveal ${containerClassName}`}>
            <p className={`scroll-reveal-text text-xl sm:text-2xl md:text-3xl lg:text-4xl ${textClassName}`}>{splitText}</p>
        </h2>
    );
};

export default ScrollReveal;
