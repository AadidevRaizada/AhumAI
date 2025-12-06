import { useState, useEffect } from 'react';

/**
 * Hook to detect device capabilities and determine if we should use reduced motion/effects
 * for mobile optimization
 */
export function useDeviceDetection() {
    const [deviceInfo, setDeviceInfo] = useState({
        isMobile: false,
        isTablet: false,
        isLowPowerMode: false,
        prefersReducedMotion: false,
        isTouchDevice: false,
        devicePixelRatio: 1,
        isLowEndDevice: false,
        shouldReduceEffects: false,
    });

    useEffect(() => {
        const checkDevice = () => {
            // Check screen width
            const width = window.innerWidth;
            const isMobile = width < 768;
            const isTablet = width >= 768 && width < 1024;

            // Check for touch capability
            const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

            // Check for reduced motion preference
            const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

            // Get device pixel ratio (lower on some budget devices)
            const devicePixelRatio = window.devicePixelRatio || 1;

            // Estimate if it's a low-end device based on various heuristics
            const hardwareConcurrency = navigator.hardwareConcurrency || 2;
            const deviceMemory = navigator.deviceMemory || 4; // GB, defaults to 4 if not available
            const isLowEndDevice = hardwareConcurrency <= 4 || deviceMemory <= 4;

            // Check for battery saver / low power mode (if API available)
            let isLowPowerMode = false;
            if ('getBattery' in navigator) {
                navigator.getBattery().then(battery => {
                    // Consider low power if battery is below 20% and discharging
                    if (!battery.charging && battery.level < 0.2) {
                        setDeviceInfo(prev => ({
                            ...prev,
                            isLowPowerMode: true,
                            shouldReduceEffects: true,
                        }));
                    }
                }).catch(() => { });
            }

            // Determine if we should reduce effects
            const shouldReduceEffects = isMobile || isTablet || prefersReducedMotion || isLowEndDevice || isLowPowerMode;

            setDeviceInfo({
                isMobile,
                isTablet,
                isLowPowerMode,
                prefersReducedMotion,
                isTouchDevice,
                devicePixelRatio,
                isLowEndDevice,
                shouldReduceEffects,
            });
        };

        checkDevice();

        // Re-check on resize
        window.addEventListener('resize', checkDevice);

        // Listen for reduced motion preference changes
        const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
        mediaQuery.addEventListener('change', checkDevice);

        return () => {
            window.removeEventListener('resize', checkDevice);
            mediaQuery.removeEventListener('change', checkDevice);
        };
    }, []);

    return deviceInfo;
}

/**
 * Hook to get optimized settings for WebGL/shader components based on device
 */
export function useOptimizedSettings() {
    const { shouldReduceEffects, isMobile, devicePixelRatio } = useDeviceDetection();

    return {
        // Reduce pixel ratio for better performance on mobile
        optimizedDpr: shouldReduceEffects ? Math.min(devicePixelRatio, 1.5) : Math.min(devicePixelRatio, 2),

        // Whether to show WebGL effects at all
        showWebGLEffects: !shouldReduceEffects,

        // For ColorBends - reduce speed and complexity
        colorBendsSettings: shouldReduceEffects ? {
            speed: 0.1,
            frequency: 0.5,
            warpStrength: 0.5,
            mouseInfluence: 0,
            parallax: 0,
            noise: 0.05,
        } : {
            speed: 0.2,
            frequency: 1,
            warpStrength: 1,
            mouseInfluence: 1,
            parallax: 0.5,
            noise: 0.1,
        },

        // For FaultyTerminal
        faultyTerminalSettings: shouldReduceEffects ? {
            scale: 1,
            scanlineIntensity: 0.1,
            glitchAmount: 0.5,
            flickerAmount: 0,
            chromaticAberration: 0,
            mouseReact: false,
            pageLoadAnimation: false,
            brightness: 0.3,
        } : {
            scale: 1.5,
            scanlineIntensity: 0.2,
            glitchAmount: 1.2,
            flickerAmount: 0.5,
            chromaticAberration: 2,
            mouseReact: true,
            pageLoadAnimation: true,
            brightness: 0.4,
        },

        // For DarkVeil
        darkVeilSettings: shouldReduceEffects ? {
            speed: 0.2,
            resolutionScale: 0.5,
        } : {
            speed: 0.5,
            resolutionScale: 1,
        },

        // Animation settings
        animationSettings: shouldReduceEffects ? {
            duration: 0.2,
            stagger: 0.05,
        } : {
            duration: 0.3,
            stagger: 0.1,
        },

        isMobile,
        shouldReduceEffects,
    };
}

export default useDeviceDetection;
