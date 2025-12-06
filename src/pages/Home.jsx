import React from 'react';
import Hero from '../components/Hero';
import VideoWindow from '../components/VideoWindow';
import FeatureGrid from '../components/FeatureGrid';
import ScrollReveal from '../components/ScrollReveal';
import SeamlessIntegration from '../components/SeamlessIntegration';
import { useOptimizedSettings } from '../hooks/useDeviceDetection';

const Home = () => {
    const { shouldReduceEffects, isMobile } = useOptimizedSettings();

    return (
        <>
            <Hero />

            <div className="py-12 sm:py-20 flex justify-center bg-bg-main relative z-30 px-4">
                <ScrollReveal
                    baseOpacity={0}
                    enableBlur={!shouldReduceEffects}
                    baseRotation={isMobile ? 2 : 5}
                    blurStrength={isMobile ? 2 : 5}
                    containerClassName="max-w-[95vw] sm:max-w-[80vw]"
                >
                    Thought of a solution but have no idea how to implement it?
                    That's alright, we have you covered
                </ScrollReveal>
            </div>

            <SeamlessIntegration />

            <VideoWindow />
            <FeatureGrid />
        </>
    );
};

export default Home;
