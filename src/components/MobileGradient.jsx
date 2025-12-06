import React from 'react';
import './MobileGradient.css';

/**
 * A lightweight CSS-only gradient background as a fallback for heavy WebGL effects.
 * Uses CSS animations instead of JavaScript/WebGL for better mobile performance.
 */
export default function MobileGradient({
    variant = 'nebula', // 'nebula', 'cosmic', 'aurora', 'terminal'
    className = '',
    animate = true,
    overlay = true,
}) {
    return (
        <div className={`mobile-gradient mobile-gradient--${variant} ${animate ? 'mobile-gradient--animated' : ''} ${className}`}>
            {/* Gradient layers for depth */}
            <div className="mobile-gradient__layer mobile-gradient__layer--1" />
            <div className="mobile-gradient__layer mobile-gradient__layer--2" />
            <div className="mobile-gradient__layer mobile-gradient__layer--3" />

            {/* Subtle noise overlay for texture */}
            {overlay && <div className="mobile-gradient__noise" />}
        </div>
    );
}
