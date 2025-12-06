import React from 'react';
import { FeatureShowcase } from '../components/FeatureShowcase';
import DarkVeil from '../components/DarkVeil';
import fullAhead1 from '../assets/images/Fullahead/FullAhead1.png';
import fullAhead2 from '../assets/images/Fullahead/FullAhead2.png';
import fullAhead3 from '../assets/images/Fullahead/FullAhead3.png';
import insights1 from '../assets/images/Scm-insights/insights1.png';
import insights2 from '../assets/images/Scm-insights/insights2.png';
import insights3 from '../assets/images/Scm-insights/insights3.png';

const OurProjects = () => {
    const fullAheadTabs = [
        {
            value: "home",
            label: "Home",
            src: fullAhead1,
            alt: "Full Ahead Home Page",
        },
        {
            value: "services",
            label: "Services",
            src: fullAhead2,
            alt: "Full Ahead Services",
        },
        {
            value: "contact",
            label: "Contact",
            src: fullAhead3,
            alt: "Full Ahead Contact",
        },
    ];

    const supplyChainTabs = [
        {
            value: "quiz",
            label: "Quiz",
            src: insights1,
            alt: "Supply Chain Quiz Interface",
        },
        {
            value: "results",
            label: "Results",
            src: insights2,
            alt: "Assessment Results Dashboard",
        },
        {
            value: "insights",
            label: "Insights",
            src: insights3,
            alt: "Industry Insights",
        },
    ];


    return (
        <div className="pt-20 relative min-h-screen bg-black">
            {/* Shared DarkVeil Background */}
            <div className="absolute inset-0 z-0">
                <DarkVeil />
            </div>

            {/* Content */}
            <div className="relative z-10">
                {/* Full Ahead Marine Project */}
                <FeatureShowcase
                    eyebrow="Maritime Services"
                    title="Full Ahead Marine"
                    description="A comprehensive digital presence for Full Ahead Marine and Offshore Services Pvt. Ltd. This platform showcases their expertise in marine engineering, offshore services, and technical consultancy."
                    stats={["React", "Tailwind CSS", "Node.js", "Express"]}
                    steps={[
                        {
                            id: "step-1",
                            title: "Modern Tech Stack",
                            text:
                                "Built with a robust stack including React for the frontend and Node.js/Express for the backend, ensuring high performance and scalability.",
                        },
                        {
                            id: "step-2",
                            title: "Responsive Design",
                            text:
                                "Fully responsive interface designed with Tailwind CSS, providing an optimal viewing experience across all devices.",
                        },
                        {
                            id: "step-3",
                            title: "Technical Excellence",
                            text:
                                "Showcasing technical proficiency in delivering complex web solutions for the marine and offshore industry.",
                        },
                    ]}
                    tabs={fullAheadTabs}
                    defaultTab="home"
                    panelMinHeight={500}
                    showBackground={false}
                    websiteUrl="https://www.fullahead.in"
                    useTrueFocus={true}
                />

                {/* Supply Chain Assessment Platform */}
                <FeatureShowcase
                    eyebrow="NLG Podcast"
                    title="Supply Chain Assessment"
                    description="An interactive quiz platform designed to help users understand their standing within the supply chain industry. Built for NLG Podcast to engage their audience with meaningful insights."
                    stats={["React", "Tailwind CSS", "Node.js", "Express"]}
                    steps={[
                        {
                            id: "step-1",
                            title: "Interactive Quiz System",
                            text:
                                "Engaging quiz interface that guides users through comprehensive supply chain assessment questions tailored to their industry.",
                        },
                        {
                            id: "step-2",
                            title: "Personalized Results",
                            text:
                                "Dynamic result generation that provides users with detailed insights about their supply chain maturity and areas for improvement.",
                        },
                        {
                            id: "step-3",
                            title: "Industry Benchmarking",
                            text:
                                "Compare your assessment results against industry standards to understand where you stand among your peers.",
                        },
                    ]}
                    tabs={supplyChainTabs}
                    defaultTab="quiz"
                    panelMinHeight={500}
                    showBackground={false}
                    websiteUrl="https://scm-insights.vercel.app/"
                    useTrueFocus={true}
                />
            </div>
        </div>
    );
};

export default OurProjects;

