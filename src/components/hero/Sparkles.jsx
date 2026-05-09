'use client'

import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

/**
 * Sparkles
 * ---------
 * Dense ambient starfield. Particles are distributed uniformly across the
 * container and twinkle in place with a tiny upward drift — like dust
 * suspended in space.
 *
 * Props:
 *  - count     : total particle count (high = dense)
 *  - className : absolute positioned container classes
 */
const Sparkles = ({ count = 260, className = '', bottomBias = 0.55 }) => {
    const particles = useMemo(() => {
        return Array.from({ length: count }).map((_, i) => {
            const s1 = ((i * 9301 + 49297) % 233280) / 233280;
            const s2 = ((i * 2137 + 7919) % 233280) / 233280;
            const s3 = ((i * 61 + 137) % 233280) / 233280;
            const s4 = ((i * 433 + 221) % 233280) / 233280;
            const s5 = ((i * 1103 + 12345) % 233280) / 233280;

            // Horizontal — uniform across width
            const left = s1 * 100;

            // Vertical — biased toward the bottom (near the image top)
            // Higher exponent = more clustered at bottom.
            const exponent = 1 + bottomBias * 3; // 1 – 4
            const top = 100 - Math.pow(s2, exponent) * 100;

            // Mostly tiny dust, a sprinkle of brighter stars
            const isStar = s3 > 0.94;
            const size = isStar ? 1.6 + s4 * 1.3 : 0.4 + s3 * 1;

            // Twinkle rhythm — wide range so nothing syncs
            const duration = 1.8 + s4 * 4.2;
            const delay = -duration * s5;
            const peakOpacity = 0.3 + s4 * 0.55;

            // Micro drift
            const driftX = (s5 * 2 - 1) * 6;
            const driftY = -(2 + s3 * 10);

            const palette = [
                '#ffffff',
                '#ffffff',
                '#ffffff',
                '#ffffff',
                '#ffffff',
                '#ffffff',
                '#bae6fd',
                '#e0f2fe',
                '#a5f3fc',
            ];
            const color = palette[i % palette.length];

            return {
                id: i,
                left,
                top,
                size,
                duration,
                delay,
                peakOpacity,
                driftX,
                driftY,
                color,
            };
        });
    }, [count, bottomBias]);

    return (
        <div className={`pointer-events-none ${className}`}>
            {particles.map(p => (
                <motion.span
                    key={p.id}
                    className="absolute rounded-full"
                    style={{
                        left: `${p.left}%`,
                        top: `${p.top}%`,
                        width: `${p.size}px`,
                        height: `${p.size}px`,
                        background: p.color,
                        boxShadow: `0 0 ${p.size * 2.5}px ${p.size * 0.4}px ${p.color}`,
                        willChange: 'transform, opacity',
                    }}
                    initial={{ opacity: 0, x: 0, y: 0 }}
                    animate={{
                        opacity: [0, p.peakOpacity, p.peakOpacity * 0.6, 0],
                        x: [0, p.driftX, 0],
                        y: [0, p.driftY, p.driftY * 1.4],
                    }}
                    transition={{
                        duration: p.duration,
                        delay: p.delay,
                        repeat: Infinity,
                        ease: 'easeInOut',
                        times: [0, 0.4, 0.7, 1],
                    }}
                />
            ))}
        </div>
    );
};

export default Sparkles;
