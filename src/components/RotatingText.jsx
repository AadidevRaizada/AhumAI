import React, { useState, useEffect, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import './RotatingText.css';

export default function RotatingText({
    texts = [],
    mainClassName = '',
    staggerFrom = 'last',
    initial = { y: '100%' },
    animate = { y: 0 },
    exit = { y: '-120%' },
    staggerDuration = 0.025,
    splitLevelClassName = '',
    transition = { type: 'spring', damping: 30, stiffness: 400 },
    rotationInterval = 2000,
}) {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % texts.length);
        }, rotationInterval);
        return () => clearInterval(interval);
    }, [texts.length, rotationInterval]);

    const currentText = texts[index] || '';
    const chars = currentText.split('');

    const getStaggerDelay = useCallback(
        (i) => {
            if (staggerFrom === 'last') {
                return (chars.length - 1 - i) * staggerDuration;
            } else if (staggerFrom === 'first') {
                return i * staggerDuration;
            } else if (staggerFrom === 'center') {
                const center = (chars.length - 1) / 2;
                return Math.abs(center - i) * staggerDuration;
            }
            return i * staggerDuration;
        },
        [chars.length, staggerDuration, staggerFrom]
    );

    return (
        <span className={`text-rotate ${mainClassName}`}>
            <span className="text-rotate-sr-only">{currentText}</span>
            <AnimatePresence mode="wait">
                <motion.span
                    key={index}
                    className="text-rotate-word"
                    aria-hidden="true"
                >
                    {chars.map((char, i) => (
                        <span key={i} className={`text-rotate-element ${splitLevelClassName}`}>
                            <motion.span
                                initial={initial}
                                animate={animate}
                                exit={exit}
                                transition={{
                                    ...transition,
                                    delay: getStaggerDelay(i),
                                }}
                                style={{ display: 'inline-block' }}
                            >
                                {char === ' ' ? '\u00A0' : char}
                            </motion.span>
                        </span>
                    ))}
                </motion.span>
            </AnimatePresence>
        </span>
    );
}
