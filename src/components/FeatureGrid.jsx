import React from 'react';
import { Icon } from '@iconify/react';
import { FlippingCard } from './FlippingCard';

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

function GenericCardFront({ data }) {
    return (
        <div className="flex flex-col h-full w-full p-4">
            <div className="relative flex-grow rounded-md overflow-hidden">
                <img
                    src={data.imageSrc}
                    alt={data.imageAlt}
                    className="w-full h-full object-cover"
                />
                <div className="absolute top-2 right-2 bg-black/50 backdrop-blur-md p-2 rounded-lg border border-white/10">
                    <Icon icon={data.icon} className={`w-6 h-6 ${data.color}`} />
                </div>
            </div>
            <div className="p-2">
                <h3 className="text-lg font-bold mt-2 text-neutral-950 dark:text-neutral-50">{data.title}</h3>
            </div>
        </div>
    );
}

function GenericCardBack({ data }) {
    return (
        <div className="flex flex-col items-center justify-center h-full w-full p-6 text-center">
            <p className="text-sm mt-2 text-neutral-600 dark:text-neutral-400">
                {data.description}
            </p>
        </div>
    );
}

const FeatureGrid = () => {
    return (
        <section className="py-20 px-6 max-w-7xl mx-auto flex flex-col items-center">
            <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-400 to-gray-600 mb-12 text-center">
                Powerful Features
            </h2>

            <div className="flex gap-8 flex-wrap justify-center w-full">
                {features.map((feature, index) => (
                    <FlippingCard
                        key={feature.id}
                        width={300}
                        height={350}
                        className="bg-black/80 dark:bg-black/80 dark:border-white/10"
                        frontContent={<GenericCardFront data={feature.front} />}
                        backContent={<GenericCardBack data={feature.back} />}
                    />
                ))}
            </div>
        </section>
    );
};

export default FeatureGrid;
