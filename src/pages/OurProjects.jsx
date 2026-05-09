import React from 'react';

const Divider = () => <hr className="border-rust-line my-0" />;

const projects = [
    {
        client: 'Adonia',
        industry: 'Marine & Offshore',
        heading: 'A digital presence that opens doors before the conversation starts.',
        problem: 'The brief was simple on the surface: build a website for a marine and offshore company. But the real brief — the one underneath — was harder. Adonia needed to walk into a meeting with a potential client and have that client feel trust before a word was spoken.',
        built: 'We built it to do one job in the first thirty seconds: make anyone in the marine industry feel that these people know their world. Clean, precise, industry-specific language. A design that signals credibility without shouting for attention.',
        before: 'A generic web presence that could have been any company.',
        after: 'A digital presence that opens doors before the conversation starts.',
        images: [
            { src: '/Adonia/adonia_home.png', alt: 'Adonia Home Page' },
            { src: '/Adonia/adonia2.png', alt: 'Adonia Services' },
            { src: '/Adonia/adonia3.png', alt: 'Adonia About' },
        ],
    },
    {
        client: 'Full Ahead',
        industry: 'Shipping Operations',
        heading: 'Hours of manual billing every week — gone.',
        problem: 'Full Ahead is a shipping operations company. Their billing process was costing them hours every week. Invoices were being created manually, cross-checked manually, and sent manually. The client relationship data lived in a spreadsheet that was always one accidental deletion away from disaster.',
        built: 'We built two connected systems. An invoice generator that takes the core data and produces a correctly formatted, professionally presented invoice in seconds. And a Maritime CRM that tracks client relationships, vessel details, and commercial history in one place — designed for how a shipping operations company actually thinks, not for how a generic CRM vendor imagines they think.',
        before: 'Hours lost every week to manual billing and scattered client data.',
        after: 'One connected system. Invoices done in seconds. Client data always current.',
        images: [
            { src: '/Fullahead/FullAhead1.png', alt: 'Full Ahead Home' },
            { src: '/Fullahead/FullAhead2.png', alt: 'Full Ahead Services' },
            { src: '/Fullahead/FullAhead3.png', alt: 'Full Ahead Contact' },
        ],
    },
    {
        client: 'NLG Podcast',
        industry: 'Supply Chain',
        heading: 'Turning passive listeners into an engaged community.',
        problem: 'NLG Podcast reaches a large audience across the supply chain industry. The challenge they brought to us was a real one: how do you turn passive listeners into engaged participants who understand where they stand within the industry?',
        built: 'We built an interactive quiz platform. Not a generic quiz builder — a platform designed specifically around the supply chain knowledge landscape, with questions calibrated to surface genuine insights about where a professional sits in the industry hierarchy. The experience gives each user a personalised result.',
        before: 'Passive listeners with no way to measure their own standing.',
        after: 'An engaged community that understands itself better because of the platform.',
        images: [
            { src: '/Scm-insights/insights1.png', alt: 'SCM Insights Quiz' },
            { src: '/Scm-insights/insights2.png', alt: 'SCM Insights Results' },
            { src: '/Scm-insights/insights3.png', alt: 'SCM Insights Data' },
        ],
    },
];

function ProjectCard({ project, index }) {
    const isEven = index % 2 === 0;

    return (
        <section className="py-16 sm:py-24 px-4 sm:px-6 bg-deep-hull">
            <div className="mx-auto max-w-5xl">
                <div className="flex items-center gap-3 mb-3">
                    <span className="text-xs text-signal-amber font-medium uppercase tracking-[0.12em]">{project.industry}</span>
                    <span className="text-fog-gray/40">·</span>
                    <span className="text-xs text-fog-gray font-medium">{project.client}</span>
                </div>

                <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-warm-chalk leading-tight max-w-3xl">
                    {project.heading}
                </h2>

                <div className="mt-10 grid md:grid-cols-2 gap-10">
                    <div className="space-y-6">
                        <div>
                            <h3 className="text-sm font-semibold text-warm-chalk uppercase tracking-[0.12em] mb-2">The problem</h3>
                            <p className="text-sm sm:text-base text-fog-gray leading-relaxed">{project.problem}</p>
                        </div>
                        <div>
                            <h3 className="text-sm font-semibold text-warm-chalk uppercase tracking-[0.12em] mb-2">What we built</h3>
                            <p className="text-sm sm:text-base text-fog-gray leading-relaxed">{project.built}</p>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <div className="border border-rust-line rounded-sm px-4 py-3">
                                <span className="block text-xs text-fog-gray mb-1">Before</span>
                                <span className="text-sm text-warm-chalk leading-snug">{project.before}</span>
                            </div>
                            <div className="border border-rust-line rounded-sm px-4 py-3">
                                <span className="block text-xs text-fog-gray mb-1">After</span>
                                <span className="text-sm text-warm-chalk leading-snug">{project.after}</span>
                            </div>
                        </div>
                    </div>

                    <div className={`space-y-3 ${isEven ? 'md:order-first' : ''}`}>
                        {project.images.map((img, i) => (
                            <div key={i} className="border border-rust-line rounded-sm overflow-hidden bg-hull-plate">
                                <img
                                    src={img.src}
                                    alt={img.alt}
                                    className="w-full h-auto object-cover"
                                    loading="lazy"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

const OurProjects = () => {
    return (
        <div className="pt-20 bg-deep-hull min-h-screen">
            <div className="py-20 sm:py-28 px-4 sm:px-6 bg-deep-hull">
                <div className="mx-auto max-w-3xl text-center">
                    <p className="text-fog-gray text-xs uppercase tracking-[0.15em] mb-8">Client work</p>
                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-warm-chalk leading-tight">
                        Real businesses.
                        <br />
                        Real systems.
                        <br />
                        Not experiments.
                    </h1>
                    <p className="mt-6 text-sm sm:text-base text-fog-gray leading-relaxed max-w-xl mx-auto">
                        Alongside our own products, we work directly with companies to build the systems
                        they need. Here are three of those engagements.
                    </p>
                </div>
            </div>

            {projects.map((project, index) => (
                <React.Fragment key={project.client}>
                    <Divider />
                    <ProjectCard project={project} index={index} />
                </React.Fragment>
            ))}
        </div>
    );
};

export default OurProjects;
