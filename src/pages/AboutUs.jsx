import React from 'react';
import TiltedCard from '../components/TiltedCard';
import { Icon } from '@iconify/react';

const teamMembers = [
    {
        name: "Aadidev Raizada",
        image: "/About/Aadidev_Robot.jpg",
        linkedin: "https://www.linkedin.com/in/aadidev-raizada-68a339304/",
        isCenter: true,
    },
    {
        name: "Aryan Mishra",
        image: "/About/Aryan.jpg",
        linkedin: "https://www.linkedin.com/in/aryan-mishra-5a8686343/",
        isCenter: false,
    },
    {
        name: "Manish Saw",
        image: "/About/Manish.jpg",
        linkedin: "https://www.linkedin.com/in/manishindiyaar/",
        isCenter: false,
    },
];

const Divider = () => <hr className="border-rust-line my-0" />;

function Origin() {
    return (
        <section className="py-20 sm:py-28 px-4 sm:px-6 bg-deep-hull">
            <div className="mx-auto max-w-3xl">
                <p className="text-fog-gray text-xs uppercase tracking-[0.15em] mb-8">Who we are</p>
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-warm-chalk leading-tight">
                    We started with one broken workflow.
                </h1>
                <div className="mt-8 space-y-5 text-sm sm:text-base text-fog-gray leading-relaxed">
                    <p>
                        Nobody asked us to fix it. There was no brief, no client, no money on the table.
                        There was just a workflow inside a maritime company that was wasting hours every
                        single day — and everyone around it had decided that was just how things were.
                    </p>
                    <p>
                        We didn't accept that. We sat down, understood the problem from the root, and
                        built something that fixed it. Three months later, we had a working system.
                        Not a prototype. Something real, running, doing the job.
                    </p>
                    <p>
                        We went deep into maritime because that's where we kept finding the same story.
                        Critical operations — compliance, crewing, vessel management — being held together
                        by spreadsheets, WhatsApp threads, and people who had memorised workarounds
                        because the tools were never good enough. So we kept building. Product after product.
                        Problem after problem.
                    </p>
                    <p>
                        Today we are a small team of engineers. Every one of us builds with AI natively —
                        not as a feature we add at the end, but as the foundation we design from. We have
                        shipped over ten products. We ship two more every month. Our own marketing and
                        operations run autonomously — we built the systems ourselves and we don't hire
                        for those roles.
                    </p>
                </div>
                <p className="mt-10 text-base sm:text-lg text-warm-chalk font-medium leading-relaxed">
                    We are not a large company. We will not pretend to be. But we have learned that in
                    this moment, in this industry, small and fast beats large and slow every single time.
                </p>
            </div>
        </section>
    );
}

function Team() {
    return (
        <section className="py-20 sm:py-28 px-4 sm:px-6 bg-deep-hull">
            <div className="mx-auto max-w-5xl">
                <p className="text-fog-gray text-xs uppercase tracking-[0.15em] mb-8 text-center">Meet our team</p>
                <h2 className="text-2xl sm:text-3xl font-semibold text-warm-chalk text-center">
                    The engineers behind AhumAI.
                </h2>

                <div className="mt-12 flex flex-col md:flex-row items-center justify-center gap-8 md:gap-4">
                    {teamMembers.map((member) => {
                        const size = member.isCenter
                            ? { ch: '360px', cw: '320px', ih: '320px', iw: '320px' }
                            : { ch: '320px', cw: '280px', ih: '280px', iw: '280px' };

                        return (
                            <a
                                key={member.name}
                                href={member.linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`flex flex-col items-center cursor-pointer group ${member.isCenter ? 'md:-mt-8' : 'md:mt-24'}`}
                            >
                                <TiltedCard
                                    imageSrc={member.image}
                                    altText={member.name}
                                    captionText={member.name}
                                    containerHeight={size.ch}
                                    containerWidth={size.cw}
                                    imageHeight={size.ih}
                                    imageWidth={size.iw}
                                    scaleOnHover={1.08}
                                    rotateAmplitude={12}
                                    showMobileWarning={false}
                                    showTooltip={true}
                                />
                                <h3 className={`mt-4 font-bold text-warm-chalk group-hover:text-signal-amber transition-colors duration-[0.15s] ease-out ${member.isCenter ? 'text-xl sm:text-2xl' : 'text-lg sm:text-xl'}`}>
                                    {member.name}
                                </h3>
                                <div className="mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <Icon icon="mdi:linkedin" className="text-2xl text-[#0A66C2]" />
                                </div>
                            </a>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

function BiggerPicture() {
    return (
        <section className="py-20 sm:py-28 px-4 sm:px-6 bg-deep-hull">
            <div className="mx-auto max-w-3xl">
                <p className="text-fog-gray text-xs uppercase tracking-[0.15em] mb-8">The bigger picture</p>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-warm-chalk leading-tight">
                    We are living through a shift most people haven't noticed yet.
                </h2>

                <div className="mt-10 space-y-6 text-sm sm:text-base text-fog-gray leading-relaxed">
                    <p>
                        There have been two eras of software. In the first era, you learned the software.
                        Every tool came with a manual, a training session. The human had to adapt to the machine.
                    </p>
                    <p>
                        In the second era, software got friendlier. Better interfaces. SaaS dashboards.
                        Drag-and-drop. But you still managed the software. You still needed people just to
                        operate the tools. The machine needed you to babysit it.
                    </p>
                    <p className="text-warm-chalk font-medium">
                        We are entering the third era now. Software 3.0 means the software works for you.
                        You speak. It understands context. It acts. It reports back. No babysitting.
                        No dashboards to monitor. Just outcomes.
                    </p>
                    <p>
                        Maritime is still mostly running on first-era thinking with second-era tools.
                        Compliance spreadsheets. Manual crewing workflows. Certificates tracked in email
                        folders. People hired specifically to operate the software.
                    </p>
                    <p>
                        We are building the third-era layer for this industry. One unified interface.
                        Your entire maritime operation — compliance, crewing, maintenance, logistics —
                        running autonomously in the background. You say what you need. The system
                        understands the context, coordinates across every tool, and gets it done.
                    </p>
                    <p>
                        We are not there yet. We want to be honest about that. But we are building toward
                        it with every product we ship. NavCert is a node in this ecosystem. Sorch is a node.
                        Every product we build from here adds to the layer.
                    </p>
                </div>

                <p className="mt-10 text-sm text-warm-chalk font-medium leading-relaxed border border-rust-line rounded-sm px-5 py-4">
                    The companies that work with us now are not just buying a tool. They are getting in
                    early on an operating system that will run their entire operation one day. The window
                    for first-mover advantage is open right now. Not for long.
                </p>
            </div>
        </section>
    );
}

const AboutUs = () => {
    return (
        <div className="pt-20 bg-deep-hull min-h-screen">
            <Origin />

            <Divider />
            <Team />

            <Divider />
            <BiggerPicture />
        </div>
    );
};

export default AboutUs;
