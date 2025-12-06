import React from 'react';
import { Icon } from '@iconify/react';
import { motion } from 'framer-motion';
import { FlippingCard } from './FlippingCard';
import { useOptimizedSettings } from '../hooks/useDeviceDetection';

const features = [
    {
        id: "innovative-development",
        front: {
            imageSrc: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=300&fit=crop",
            imageAlt: "Innovative Development",
            title: "Innovative Development",
            icon: "carbon:idea",
            color: 'text-nebula-gold'
        },
        back: {
            description: "We leverage cutting-edge technologies and methodologies to build solutions that are not just effective today but adaptable for tomorrow's needs."
        }
    },
    {
        id: "scalable-architecture",
        front: {
            imageSrc: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=300&fit=crop",
            imageAlt: "Scalable Architecture",
            title: "Scalable Architecture",
            icon: "carbon:scalability",
            color: 'text-nebula-green'
        },
        back: {
            description: "Our solutions are built on robust, scalable architectures that grow with your business, ensuring performance and reliability at any scale."
        }
    },
    {
        id: "integrated-security",
        front: {
            imageSrc: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400&h=300&fit=crop",
            imageAlt: "Integrated Security",
            title: "Integrated Security",
            icon: "carbon:security",
            color: 'text-nebula-cyan'
        },
        back: {
            description: "Security is woven into every aspect of our development process, protecting your data and systems from evolving threats."
        }
    },
    {
        id: "data-driven-insights",
        front: {
            imageSrc: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop",
            imageAlt: "Data-Driven Insights",
            title: "Data-Driven Insights",
            icon: "carbon:data-analytics",
            color: 'text-nebula-purple'
        },
        back: {
            description: "We transform raw data into actionable intelligence, giving you the insights needed to make informed decisions and drive business growth."
        }
    }
];

// Simple mobile card without 3D flip (much lighter)
function MobileFeatureCard({ feature, index }) {
    const [isExpanded, setIsExpanded] = React.useState(false);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.3 }}
            className="bg-black/60 border border-white/10 rounded-xl overflow-hidden"
            onClick={() => setIsExpanded(!isExpanded)}
        >
            {/* Image */}
            <div className="relative h-32 overflow-hidden">
                <img
                    src={feature.front.imageSrc}
                    alt={feature.front.imageAlt}
                    className="w-full h-full object-cover"
                    loading="lazy"
                />
                <div className="absolute top-2 right-2 bg-black/50 backdrop-blur-sm p-1.5 rounded-lg border border-white/10">
                    <Icon icon={feature.front.icon} className={`w-5 h-5 ${feature.front.color}`} />
                </div>
            </div>

            {/* Content */}
            <div className="p-4">
                <h3 className="text-base font-bold text-white mb-2">{feature.front.title}</h3>
                <p className={`text-xs text-gray-400 transition-all duration-300 ${isExpanded ? '' : 'line-clamp-2'}`}>
                    {feature.back.description}
                </p>
                <button className="text-nebula-cyan text-xs mt-2 flex items-center gap-1">
                    {isExpanded ? 'Show less' : 'Read more'}
                    <Icon icon={isExpanded ? "solar:alt-arrow-up-linear" : "solar:alt-arrow-down-linear"} />
                </button>
            </div>
        </motion.div>
    );
}

// Card with flip animation - responsive
function GenericCardFront({ data, isMobile }) {
    return (
        <div className={`flex flex-col h-full w-full ${isMobile ? 'p-2' : 'p-4'}`}>
            <div className="relative flex-grow rounded-md overflow-hidden">
                <img
                    src={data.imageSrc}
                    alt={data.imageAlt}
                    className="w-full h-full object-cover"
                    loading="lazy"
                />
                <div className={`absolute top-1 right-1 sm:top-2 sm:right-2 bg-black/50 backdrop-blur-md ${isMobile ? 'p-1' : 'p-2'} rounded-lg border border-white/10`}>
                    <Icon icon={data.icon} className={`${isMobile ? 'w-4 h-4' : 'w-6 h-6'} ${data.color}`} />
                </div>
            </div>
            <div className={isMobile ? 'p-1' : 'p-2'}>
                <h3 className={`${isMobile ? 'text-xs' : 'text-lg'} font-bold mt-1 sm:mt-2 text-neutral-950 dark:text-neutral-50`}>{data.title}</h3>
            </div>
        </div>
    );
}

function GenericCardBack({ data, isMobile }) {
    return (
        <div className={`flex flex-col items-center justify-center h-full w-full ${isMobile ? 'p-3' : 'p-6'} text-center`}>
            <p className={`${isMobile ? 'text-[10px] leading-tight' : 'text-sm'} mt-1 sm:mt-2 text-neutral-600 dark:text-neutral-400`}>
                {data.description}
            </p>
        </div>
    );
}

const FeatureGrid = () => {
    const { isMobile, animationSettings } = useOptimizedSettings();

    // Responsive card sizes
    const cardWidth = isMobile ? 160 : 280;
    const cardHeight = isMobile ? 200 : 320;

    return (
        <section className="py-12 sm:py-20 px-4 sm:px-6 max-w-7xl mx-auto flex flex-col items-center">
            <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: animationSettings.duration * 2 }}
                className="text-2xl sm:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-400 to-gray-600 mb-8 sm:mb-12 text-center"
            >
                Powerful Features
            </motion.h2>

            {/* Flipping cards for all devices */}
            <div className="grid grid-cols-2 md:flex gap-4 sm:gap-6 md:gap-8 md:flex-wrap justify-center w-full max-w-[360px] md:max-w-none">
                {features.map((feature) => (
                    <FlippingCard
                        key={feature.id}
                        width={cardWidth}
                        height={cardHeight}
                        className="bg-black/80 dark:bg-black/80 dark:border-white/10"
                        frontContent={<GenericCardFront data={feature.front} isMobile={isMobile} />}
                        backContent={<GenericCardBack data={feature.back} isMobile={isMobile} />}
                    />
                ))}
            </div>
        </section>
    );
};

export default FeatureGrid;
