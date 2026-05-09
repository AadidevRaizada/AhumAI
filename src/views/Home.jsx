import React from 'react';
import Hero from '../components/Hero';
import { ArrowRight } from 'lucide-react';
import { Icon } from '@iconify/react';

// ---------------------------------------------------------------------------
// Section divider — 1px rust-line rule
// ---------------------------------------------------------------------------
const Divider = () => <hr className="border-rust-line my-0" />;

// ---------------------------------------------------------------------------
// Trusted By
// ---------------------------------------------------------------------------
const trustedBrands = [
    { name: 'Adonia', file: 'adonia.png' },
    { name: 'Full Ahead', file: 'fullahead.png' },
    { name: 'ASEAN', file: 'asean.png' },
    { name: 'Qualesce', file: 'qualesce.png' },
    { name: 'Memoria', file: 'memoria.png' },
];

function TrustedBy() {
    return (
        <section className="py-16 sm:py-20 px-4 sm:px-6 bg-deep-hull">
            <div className="mx-auto max-w-4xl text-center">
                <p className="text-fog-gray text-xs uppercase tracking-[0.15em] mb-8">Trusted by</p>
                <div className="flex flex-wrap items-center justify-center gap-5 sm:gap-8">
                    {trustedBrands.map((brand) => (
                        <div
                            key={brand.name}
                            className="w-[72px] h-[72px] sm:w-20 sm:h-20 p-3 rounded-sm border border-rust-line bg-white hover:border-fog-gray transition-colors duration-[0.15s] ease-out flex items-center justify-center grayscale hover:grayscale-0"
                        >
                            <img
                                src={`/logos/${brand.file}`}
                                alt={brand.name}
                                className="max-w-full max-h-full object-contain"
                                loading="lazy"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

// ---------------------------------------------------------------------------
// Origin
// ---------------------------------------------------------------------------
function Origin() {
    return (
        <section id="origin" className="py-20 sm:py-28 px-4 sm:px-6 bg-deep-hull">
            <div className="mx-auto max-w-3xl">
                <p className="text-fog-gray text-xs uppercase tracking-[0.15em] mb-8">Who we are</p>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-warm-chalk leading-tight">
                    We started with one broken workflow.
                </h2>
                <div className="mt-8 space-y-5 text-sm sm:text-base text-fog-gray leading-relaxed">
                    <p>
                        Nobody asked us to fix it. There was no brief, no client, no money on the table.
                        There was just a workflow inside a maritime company that was wasting hours every
                        single day — and everyone around it had decided that was just how things were.
                    </p>
                    <p>
                        We didn't accept that. We sat down, understood the problem from the root, and
                        built something that fixed it. Three months later, we had a working system.
                        Not a prototype. Not a proof of concept. Something real, running, doing the job.
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
                        shipped over ten products. We ship two more every month.
                    </p>
                </div>
                <p className="mt-10 text-base sm:text-lg text-warm-chalk font-medium leading-relaxed border-l-2 border-signal-amber pl-4">
                    The gap between &ldquo;this is painful&rdquo; and &ldquo;someone fixed this&rdquo; is
                    almost always just one team willing to sit with the problem long enough. We became that team.
                </p>
            </div>
        </section>
    );
}

// ---------------------------------------------------------------------------
// Three Beliefs
// ---------------------------------------------------------------------------
const beliefs = [
    {
        number: '01',
        title: 'Software should remove work. Not manage it.',
        body: 'When most teams look at a broken workflow, they ask: how do we make this faster? We ask a different question: why does this workflow exist at all? Every system we build is designed to make a workflow disappear — not to dress it up with a better interface.',
    },
    {
        number: '02',
        title: 'If something repeats, it should not require a human.',
        body: 'Certificates get manually checked every week. The same data gets entered into three different systems. Someone sends the same update email every Friday morning. Each one is a system waiting to be built. Each one is a human being spending their time on something a machine should be doing.',
    },
    {
        number: '03',
        title: 'The best proof is a running system.',
        body: 'We don\'t do demos. We don\'t show you a slide deck with mockups and tell you to imagine what it could look like. We build the thing. We put it in front of real users. We measure what actually happens. Then we improve it from truth, not from assumptions.',
    },
];

function Beliefs() {
    return (
        <section className="py-20 sm:py-28 px-4 sm:px-6 bg-deep-hull">
            <div className="mx-auto max-w-3xl">
                <p className="text-fog-gray text-xs uppercase tracking-[0.15em] mb-8">How we think</p>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-warm-chalk leading-tight">
                    Three beliefs we build everything on.
                </h2>
                <div className="mt-12 space-y-16">
                    {beliefs.map((b) => (
                        <div key={b.number}>
                            <span className="text-xs text-fog-gray font-medium">{b.number}</span>
                            <h3 className="mt-2 text-lg sm:text-xl font-semibold text-warm-chalk leading-snug">
                                {b.title}
                            </h3>
                            <p className="mt-3 text-sm sm:text-base text-fog-gray leading-relaxed max-w-2xl">
                                {b.body}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

// ---------------------------------------------------------------------------
// How We Work — four stages
// ---------------------------------------------------------------------------
const stages = [
    {
        stage: 'Stage 1',
        title: 'One 30-minute call.',
        body: 'We come in already knowing the maritime context. You will not spend half the time explaining what a PSC inspection is or why certificate management matters. We are trying to understand one thing: what is the workflow that is costing you the most — in time, in people, or in risk?',
    },
    {
        stage: 'Stage 2',
        title: 'We map the problem.',
        body: 'Before we write a single line of code, we map the workflow end to end. Where does the time actually disappear? Where is a human doing something a machine should do? Where does risk live quietly — unnoticed until it becomes a crisis?',
    },
    {
        stage: 'Stage 3',
        title: 'We build it.',
        body: 'We do not build generic tools and ask you to configure them. We build a system shaped around your specific operation. We ship a working version fast — weeks, not months. We put it in front of your team. We watch what happens. We fix what needs fixing. We iterate until it runs the way it should.',
    },
    {
        stage: 'Stage 4',
        title: 'We hand it over running.',
        body: 'We do not call a project done when the code is written. We call it done when the system is live, tested, and operating the way it was designed to. You get documentation. You get a system that manages itself — because if it requires a team to operate it, we have not done our job.',
    },
];

function HowWeWork() {
    return (
        <section className="py-20 sm:py-28 px-4 sm:px-6 bg-deep-hull">
            <div className="mx-auto max-w-3xl">
                <p className="text-fog-gray text-xs uppercase tracking-[0.15em] mb-8">How we work</p>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-warm-chalk leading-tight">
                    No six-month roadmaps.
                    <br />
                    Just working systems.
                </h2>
                <div className="mt-12 space-y-14">
                    {stages.map((s) => (
                        <div key={s.stage}>
                            <span className="text-xs text-signal-amber font-medium">{s.stage}</span>
                            <h3 className="mt-1 text-lg sm:text-xl font-semibold text-warm-chalk">
                                {s.title}
                            </h3>
                            <p className="mt-2 text-sm sm:text-base text-fog-gray leading-relaxed max-w-2xl">
                                {s.body}
                            </p>
                        </div>
                    ))}
                </div>
                <p className="mt-14 text-sm text-fog-gray italic leading-relaxed border border-rust-line rounded-sm px-5 py-4">
                    We are not the right fit if you want a vendor who manages expectations carefully.
                    We build things that work, or we tell you early that we cannot. There is no middle option.
                </p>
            </div>
        </section>
    );
}

// ---------------------------------------------------------------------------
// Stats — Why We Move Faster
// ---------------------------------------------------------------------------
function Stats() {
    return (
        <section className="py-20 sm:py-28 px-4 sm:px-6 bg-deep-hull">
            <div className="mx-auto max-w-3xl">
                <p className="text-fog-gray text-xs uppercase tracking-[0.15em] mb-8">Why we move faster</p>

                <div className="grid grid-cols-3 gap-4 sm:gap-8 mb-16">
                    <div className="border border-rust-line rounded-sm px-4 sm:px-6 py-6 sm:py-8 text-center">
                        <span className="block text-3xl sm:text-4xl md:text-5xl font-bold text-warm-chalk">10+</span>
                        <span className="block mt-2 text-xs sm:text-sm text-fog-gray">Products shipped in maritime. Not counting prototypes.</span>
                    </div>
                    <div className="border border-rust-line rounded-sm px-4 sm:px-6 py-6 sm:py-8 text-center">
                        <span className="block text-3xl sm:text-4xl md:text-5xl font-bold text-warm-chalk">2/mo</span>
                        <span className="block mt-2 text-xs sm:text-sm text-fog-gray">New production-ready products. Every single month.</span>
                    </div>
                    <div className="border border-rust-line rounded-sm px-4 sm:px-6 py-6 sm:py-8 text-center">
                        <span className="block text-3xl sm:text-4xl md:text-5xl font-bold text-warm-chalk">0</span>
                        <span className="block mt-2 text-xs sm:text-sm text-fog-gray">Hires for marketing or ops. Our own systems handle both.</span>
                    </div>
                </div>

                <h3 className="text-lg sm:text-xl font-semibold text-warm-chalk mb-8">
                    Three internal systems make this possible.
                </h3>

                <div className="space-y-8">
                    <div>
                        <h4 className="text-base font-semibold text-warm-chalk">
                            1. The Agentic Engineering Harness
                        </h4>
                        <p className="mt-2 text-sm sm:text-base text-fog-gray leading-relaxed">
                            We have built an internal AI setup that eliminates the repetitive parts of
                            engineering entirely. Our engineers do not repeat themselves. Ever. Every pattern
                            we discover building one product gets encoded into the harness. The next product
                            starts from a higher floor. The one after that starts even higher.
                        </p>
                    </div>
                    <div>
                        <h4 className="text-base font-semibold text-warm-chalk">
                            2. Autonomous Marketing and Operations
                        </h4>
                        <p className="mt-2 text-sm sm:text-base text-fog-gray leading-relaxed">
                            We do not have a marketing team. We do not have an operations manager. Both
                            functions run on AI systems we built ourselves. The same philosophy that powers
                            our internal systems is the same philosophy we bring to yours — we are not
                            consulting on automation from the outside. We are living inside it.
                        </p>
                    </div>
                    <div>
                        <h4 className="text-base font-semibold text-warm-chalk">
                            3. The Pattern Library
                        </h4>
                        <p className="mt-2 text-sm sm:text-base text-fog-gray leading-relaxed">
                            We have built over ten products in maritime. Each one taught us something.
                            We know which integrations break. We know which compliance requirements have
                            edge cases nobody documents. When we start on your problem, we are not starting
                            from zero. We are starting from everything we have already learned.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}

// ---------------------------------------------------------------------------
// Case Study component
// ---------------------------------------------------------------------------
function CaseStudy({ product, status, statusLabel, subtitle, problem, built, numbers, honestPart, beforeAfter, slug }) {
    return (
        <div id={slug} className="py-16 sm:py-24 px-4 sm:px-6 bg-deep-hull">
            <div className="mx-auto max-w-3xl">
                <div className="flex items-center gap-3 mb-3">
                    <span className="text-xs text-signal-amber font-medium uppercase tracking-[0.12em]">Case Study</span>
                    <span className="text-fog-gray/40">·</span>
                    <span className="inline-flex items-center gap-1.5 text-xs text-fog-gray">
                        <span className={`h-1.5 w-1.5 rounded-full ${status === 'live' ? 'bg-signal-amber' : 'bg-fog-gray'}`} />
                        {statusLabel}
                    </span>
                </div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-warm-chalk leading-tight">
                    {product}
                </h2>
                <p className="mt-2 text-base sm:text-lg text-fog-gray">
                    {subtitle}
                </p>

                <div className="mt-10 space-y-10">
                    <div>
                        <h3 className="text-sm font-semibold text-warm-chalk uppercase tracking-[0.12em]">The problem, in plain language</h3>
                        <p className="mt-3 text-sm sm:text-base text-fog-gray leading-relaxed">{problem}</p>
                    </div>

                    <div>
                        <h3 className="text-sm font-semibold text-warm-chalk uppercase tracking-[0.12em]">What we built</h3>
                        <p className="mt-3 text-sm sm:text-base text-fog-gray leading-relaxed">{built}</p>
                    </div>

                    {numbers && (
                        <div className="grid grid-cols-2 gap-4">
                            {numbers.map((n, i) => (
                                <div key={i} className="border border-rust-line rounded-sm px-5 py-6 text-center">
                                    <span className="block text-2xl sm:text-3xl font-bold text-warm-chalk">{n.value}</span>
                                    <span className="block mt-1 text-xs text-fog-gray">{n.label}</span>
                                </div>
                            ))}
                        </div>
                    )}

                    <div className="border border-rust-line rounded-sm px-5 py-5">
                        <h3 className="text-sm font-semibold text-signal-amber uppercase tracking-[0.12em] mb-3">The honest part</h3>
                        <p className="text-sm sm:text-base text-fog-gray leading-relaxed">{honestPart}</p>
                    </div>

                    {beforeAfter && (
                        <p className="text-sm text-warm-chalk font-medium leading-relaxed italic">
                            {beforeAfter}
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}

// ---------------------------------------------------------------------------
// Client Work
// ---------------------------------------------------------------------------
const clientProjects = [
    {
        client: 'Adonia',
        industry: 'Marine & Offshore',
        heading: 'A digital presence that opens doors before the conversation starts.',
        before: 'A generic web presence that could have been any company.',
        after: 'A digital presence that opens doors before the conversation starts.',
    },
    {
        client: 'Full Ahead',
        industry: 'Shipping Operations',
        heading: 'Hours of manual billing every week — gone.',
        before: 'Hours lost every week to manual billing and scattered client data.',
        after: 'One connected system. Invoices done in seconds. Client data always current.',
    },
    {
        client: 'NLG Podcast',
        industry: 'Supply Chain',
        heading: 'Turning passive listeners into an engaged community.',
        before: 'Passive listeners with no way to measure their own standing.',
        after: 'An engaged community that understands itself better because of the platform.',
    },
];

function ClientWork() {
    return (
        <section className="py-20 sm:py-28 px-4 sm:px-6 bg-deep-hull">
            <div className="mx-auto max-w-5xl">
                <p className="text-fog-gray text-xs uppercase tracking-[0.15em] mb-8">Client work</p>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-warm-chalk leading-tight max-w-2xl">
                    Real businesses. Real systems. Not experiments.
                </h2>
                <div className="mt-12 grid md:grid-cols-3 gap-6">
                    {clientProjects.map((p) => (
                        <div key={p.client} className="border border-rust-line rounded-sm p-6 flex flex-col">
                            <span className="text-xs text-signal-amber font-medium uppercase tracking-[0.12em]">{p.industry}</span>
                            <span className="text-xs text-fog-gray mt-1">{p.client}</span>
                            <h3 className="mt-4 text-base font-semibold text-warm-chalk leading-snug">{p.heading}</h3>
                            <div className="mt-auto pt-6 space-y-2">
                                <div className="text-xs text-fog-gray">
                                    <span className="text-fog-gray/60">Before: </span>
                                    {p.before}
                                </div>
                                <div className="text-xs text-warm-chalk">
                                    <span className="text-signal-amber">After: </span>
                                    {p.after}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

// ---------------------------------------------------------------------------
// Team
// ---------------------------------------------------------------------------
const teamMembers = [
    {
        name: 'Aadidev Raizada',
        image: '/About/Aadidev_Robot.jpg',
        linkedin: 'https://www.linkedin.com/in/aadidev-raizada-68a339304/',
    },
    {
        name: 'Aryan Mishra',
        image: '/About/Aryan.jpg',
        linkedin: 'https://www.linkedin.com/in/aryan-mishra-5a8686343/',
    },
    {
        name: 'Manish Saw',
        image: '/About/Manish.jpg',
        linkedin: 'https://www.linkedin.com/in/manishindiyaar/',
    },
];

function Team() {
    return (
        <section className="py-20 sm:py-28 px-4 sm:px-6 bg-deep-hull">
            <div className="mx-auto max-w-3xl text-center">
                <p className="text-fog-gray text-xs uppercase tracking-[0.15em] mb-8">The team</p>
                <h2 className="text-2xl sm:text-3xl font-semibold text-warm-chalk">
                    Small team. Fast shipping. No excuses.
                </h2>
                <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-8">
                    {teamMembers.map((m) => (
                        <a
                            key={m.name}
                            href={m.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex flex-col items-center gap-3 group"
                        >
                            <div className="w-24 h-24 rounded-full border border-rust-line overflow-hidden bg-hull-plate group-hover:border-signal-amber transition-colors duration-[0.15s]">
                                <img src={m.image} alt={m.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-300" />
                            </div>
                            <span className="text-sm font-medium text-warm-chalk group-hover:text-signal-amber transition-colors duration-[0.15s]">{m.name}</span>
                            <Icon icon="mdi:linkedin" className="text-lg text-fog-gray group-hover:text-[#0A66C2] transition-colors" />
                        </a>
                    ))}
                </div>
            </div>
        </section>
    );
}

// ---------------------------------------------------------------------------
// Bigger Picture — Software 3.0
// ---------------------------------------------------------------------------
function BiggerPicture() {
    return (
        <section className="py-20 sm:py-28 px-4 sm:px-6 bg-deep-hull">
            <div className="mx-auto max-w-3xl">
                <p className="text-fog-gray text-xs uppercase tracking-[0.15em] mb-8">The bigger picture</p>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-warm-chalk leading-tight">
                    We are living through a shift most people haven't noticed yet.
                </h2>
                <div className="mt-10 space-y-5 text-sm sm:text-base text-fog-gray leading-relaxed">
                    <p>
                        There have been two eras of software. In the first, you learned the software — every tool came with a manual. In the second, software got friendlier — but you still managed the software. The machine needed you to babysit it.
                    </p>
                    <p className="text-warm-chalk font-medium">
                        We are entering the third era. Software 3.0 means the software works for you. You speak. It understands context. It acts. It reports back. No babysitting. No dashboards to monitor. Just outcomes.
                    </p>
                    <p>
                        Maritime is still mostly running on first-era thinking with second-era tools. Compliance spreadsheets. Manual crewing workflows. Certificates tracked in email folders. We are building the third-era layer for this industry.
                    </p>
                </div>
                <p className="mt-10 text-sm text-warm-chalk font-medium border border-rust-line rounded-sm px-5 py-4">
                    The companies that work with us now are not just buying a tool. They are getting in early on an operating system that will run their entire operation one day.
                </p>
            </div>
        </section>
    );
}

// ---------------------------------------------------------------------------
// Are We the Right Fit
// ---------------------------------------------------------------------------
function RightFit() {
    return (
        <section className="py-20 sm:py-28 px-4 sm:px-6 bg-deep-hull">
            <div className="mx-auto max-w-3xl">
                <p className="text-fog-gray text-xs uppercase tracking-[0.15em] mb-8">Are we the right fit</p>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-warm-chalk leading-tight">
                    Honest about who we are for.
                </h2>

                <div className="mt-10 grid sm:grid-cols-2 gap-8">
                    <div>
                        <h3 className="text-sm font-semibold text-warm-chalk mb-4">We are the right fit if —</h3>
                        <ul className="space-y-3 text-sm text-fog-gray leading-relaxed">
                            <li>You have a workflow that is costing you real time, real people, or real risk.</li>
                            <li>You want something built and running, not consulted on and documented.</li>
                            <li>You are open to working with a small team that moves at a pace larger teams cannot match.</li>
                            <li>You want to be inside the maritime software ecosystem early, not playing catch-up later.</li>
                            <li>You believe that software should work for you — not the other way around.</li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-sm font-semibold text-fog-gray mb-4">We are not the right fit if —</h3>
                        <ul className="space-y-3 text-sm text-fog-gray leading-relaxed">
                            <li>You need a vendor with hundreds of staff and decades of corporate credentials.</li>
                            <li>You want a six-month discovery process before any building begins.</li>
                            <li>You need everything agreed and documented before a line of code is written.</li>
                            <li>You are looking for the cheapest option, not the best outcome.</li>
                        </ul>
                    </div>
                </div>

                <p className="mt-10 text-sm text-fog-gray italic leading-relaxed border border-rust-line rounded-sm px-5 py-4">
                    This honesty is intentional. The wrong engagement costs both sides more than a lost deal.
                    We would rather spend thirty minutes finding out we are not the right fit than three months
                    building something for the wrong client.
                </p>
            </div>
        </section>
    );
}

// ---------------------------------------------------------------------------
// CTA
// ---------------------------------------------------------------------------
function CTA() {
    return (
        <section className="py-20 sm:py-28 px-4 sm:px-6 bg-deep-hull">
            <div className="mx-auto max-w-2xl text-center">
                <p className="text-fog-gray text-xs uppercase tracking-[0.15em] mb-8">The next step</p>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-warm-chalk leading-tight">
                    If something in here resonated — that's enough to start a conversation.
                </h2>
                <p className="mt-6 text-sm sm:text-base text-fog-gray leading-relaxed max-w-xl mx-auto">
                    We are not asking you to commit to anything. We are asking for thirty minutes.
                    Bring your operation. Bring the workflow that is costing you the most. Tell us
                    the problem in plain language. We will tell you honestly whether we can fix it,
                    how long it would take, and what it would look like when it is done.
                </p>
                <p className="mt-4 text-sm text-fog-gray">
                    No pitch from our side. No deck.
                </p>
                <a
                    href="https://calendly.com/aadidev-ahumai/30min?month=2026-05"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 mt-8 rounded-sm bg-signal-amber px-6 py-3 text-sm font-semibold text-deep-hull hover:bg-signal-amber-deep transition-colors duration-[0.15s] ease-out"
                >
                    Book a 30-minute call
                    <ArrowRight className="h-4 w-4" />
                </a>
            </div>
        </section>
    );
}

// ---------------------------------------------------------------------------
// Home — page assembly
// ---------------------------------------------------------------------------
const Home = () => {
    return (
        <>
            <Hero />

            <Divider />
            <Origin />

            <Divider />
            <TrustedBy />

            <Divider />
            <Beliefs />

            <Divider />
            <HowWeWork />

            <Divider />
            <Stats />

            <Divider />
            <CaseStudy
                product="NavCert AI"
                status="live"
                statusLabel="Live in production"
                subtitle="Compliance that runs itself."
                problem="Every commercial vessel runs on certificates. STCW certificates for crew. Safety Management certificates. Statutory certificates. Port State Control certificates. The list is long, the renewal cycles are different for every document, and the consequences of missing one are severe — a vessel detained at port because of one expired certificate loses tens of thousands of dollars a day. So how were maritime companies managing this? A person — sometimes a whole team — was manually checking spreadsheets. Cross-referencing PDFs. Sending reminder emails. Using WhatsApp to chase updates. Storing certificates in email folders. Relying on memory and goodwill to catch something before it became a crisis."
                built="NavCert AI extracts certificate data automatically. It tracks every document across every vessel. It knows when something is due for renewal before the team knows — and it alerts them with enough time to act. It generates audit trails automatically. When a Port State Control inspector asks for documentation, the answer is ready. Not in a folder. Not in someone's inbox. Ready, organised, complete. The entire system runs without a human managing it. No one has to check it every morning. No one has to chase an update. The system knows what it needs to do and it does it."
                numbers={[
                    { value: '500+', label: 'Certificates processed every single day.' },
                    { value: '0', label: 'Manual tracking required from the operations team.' },
                ]}
                honestPart="The hardest part of building NavCert was not the technology. It was understanding the edge cases that nobody documents anywhere. Every certificate type has quirks. Some have grace periods that vary by flag state. Some have renewals that depend on the vessel's trading area. Some require original documents, not scanned copies. We got some of this wrong in the first version. We found out because we were watching real usage on a real fleet, not testing in a sandbox. We fixed it fast. That is what shipping early and iterating from truth actually looks like."
                beforeAfter="Before NavCert, we had one person whose entire job was chasing certificates. That role no longer exists in the same form."
                slug="navcert"
            />

            <Divider />
            <CaseStudy
                product="Sorch"
                status="development"
                statusLabel="In active development"
                subtitle="Autonomous hiring. Without the recruiter."
                problem="Maritime hiring is slow, expensive, and deeply manual. A company posts a role. CVs arrive — sometimes hundreds of them. Someone has to read every one. Screen for the right certifications. Check the experience. Cross-reference against the vessel's requirements. Then comes the calling. Someone has to phone each shortlisted candidate, run through the same set of questions, assess availability, and log the result. For a busy crewing manager, this process can consume days. Most of that time is not skilled work. It is repetitive work. Read the CV. Ask the questions. Log the answer. Repeat."
                built="Sorch removes the repetitive layer entirely. You upload the CVs. You set the criteria. You walk away. Sorch reads every CV, scores candidates against your requirements, calls the shortlisted ones, asks the screening questions, handles the conversation, and updates your pipeline with the results. By the time you open the dashboard, the work is done. You see ranked candidates, screening notes, and availability status. You spend your time on the final decision — the part that actually requires human judgement."
                numbers={null}
                honestPart="Sorch is in active development. The CV screening and ranking system is built. The autonomous calling pipeline is being tested. We are being honest about the status because we believe that is what earns trust. Sorch is not live yet. But it is built on the same foundation as NavCert — the same philosophy, the same engineering approach, the same commitment to shipping something that actually works before we call it done."
                beforeAfter="If you are managing maritime hiring today and the problem described above sounds familiar, we would like to talk to you."
                slug="sorch"
            />

            <Divider />
            <CaseStudy
                product="Opax"
                status="development"
                statusLabel="Built & demonstrable"
                subtitle="One interface. Every system. Zero switching."
                problem="This case study is outside maritime. We include it because it demonstrates something important about how we think — the same pattern appears in every industry we look at, and the same approach fixes it. A doctor's day is already hard. What makes it harder is the software. Most clinics run on five or six different systems — patient records, appointment management, billing, lab results, prescriptions. The doctor switches between them constantly. Studies estimate that doctors spend close to two hours every day just navigating between systems. That is two hours taken away from patients. Two hours of cognitive overhead that compounds into burnout over a career."
                built="Opax is a unified AI interface that sits on top of all the existing systems. The doctor does not switch applications. The doctor asks a question — in plain language — and Opax finds the answer, executes the action, or surfaces the data from whichever system holds it. We connected Opax to real Electronic Health Record systems using MCP — a protocol that lets our AI layer communicate with existing software without replacing it. The clinic keeps what they have. They just stop having to operate it manually."
                numbers={null}
                honestPart="The pattern here is identical to maritime. Critical operations. Multiple disconnected tools. Skilled professionals spending their time navigating systems instead of doing the work only they can do. This is what we mean when we say we have seen the pattern. It shows up in every industry. We have learned how to fix it."
                beforeAfter={null}
                slug="opax"
            />

            <Divider />
            <ClientWork />

            <Divider />
            <Team />

            <Divider />
            <BiggerPicture />

            <Divider />
            <RightFit />

            <Divider />
            <CTA />
        </>
    );
};

export default Home;
