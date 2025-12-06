import React from 'react';
import Hero from '../components/Hero';
import VideoWindow from '../components/VideoWindow';
import FeatureGrid from '../components/FeatureGrid';
import ScrollReveal from '../components/ScrollReveal';
import SeamlessIntegration from '../components/SeamlessIntegration';

const Home = () => {
    return (
        <>
            <Hero />

            <div className="py-20 flex justify-center bg-bg-main relative z-30">
                <ScrollReveal
                    baseOpacity={0}
                    enableBlur={true}
                    baseRotation={5}
                    blurStrength={5}
                    containerClassName="max-w-[80vw]"
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
