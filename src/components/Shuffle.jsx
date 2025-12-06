import React, { useRef, useEffect, useState, useMemo } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import './Shuffle.css';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const Shuffle = ({
    text,
    className = '',
    style = {},
    shuffleDirection = 'right',
    duration = 0.35,
    maxDelay = 0,
    ease = 'power3.out',
    threshold = 0.1,
    rootMargin = '-100px',
    tag = 'p',
    textAlign = 'center',
    onShuffleComplete,
    shuffleTimes = 1,
    animationMode = 'evenodd',
    loop = false,
    loopDelay = 0,
    stagger = 0.03,
    scrambleCharset = '',
    colorFrom,
    colorTo,
    triggerOnce = true,
    respectReducedMotion = true,
    triggerOnHover = true
}) => {
    const ref = useRef(null);
    const [fontsLoaded, setFontsLoaded] = useState(false);
    const [ready, setReady] = useState(false);

    const wrappersRef = useRef([]);
    const tlRef = useRef(null);
    const playingRef = useRef(false);
    const hoverHandlerRef = useRef(null);

    useEffect(() => {
        if ('fonts' in document) {
            if (document.fonts.status === 'loaded') setFontsLoaded(true);
            else document.fonts.ready.then(() => setFontsLoaded(true));
        } else setFontsLoaded(true);
    }, []);

    const scrollTriggerStart = useMemo(() => {
        const startPct = (1 - threshold) * 100;
        const mm = /^(-?\d+(?:\.\d+)?)(px|em|rem|%)?$/.exec(rootMargin || '');
        const mv = mm ? parseFloat(mm[1]) : 0;
        const mu = mm ? mm[2] || 'px' : 'px';
        const sign = mv === 0 ? '' : mv < 0 ? `-=${Math.abs(mv)}${mu}` : `+=${mv}${mu}`;
        return `top ${startPct}%${sign}`;
    }, [threshold, rootMargin]);

    useGSAP(
        () => {
            if (!ref.current || !text || !fontsLoaded) return;
            if (respectReducedMotion && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
                onShuffleComplete?.();
                return;
            }

            const el = ref.current;
            const start = scrollTriggerStart;

            const removeHover = () => {
                if (hoverHandlerRef.current && ref.current) {
                    ref.current.removeEventListener('mouseenter', hoverHandlerRef.current);
                    hoverHandlerRef.current = null;
                }
            };

            const teardown = () => {
                if (tlRef.current) {
                    tlRef.current.kill();
                    tlRef.current = null;
                }
                wrappersRef.current = [];
                playingRef.current = false;
            };

            // Simple character splitting without GSAP SplitText plugin
            const build = () => {
                teardown();

                // Clear and split text into characters
                const originalText = text;
                el.innerHTML = '';

                const chars = originalText.split('');
                wrappersRef.current = [];

                const rolls = Math.max(1, Math.floor(shuffleTimes));
                const rand = (set) => set.charAt(Math.floor(Math.random() * set.length)) || '';

                chars.forEach((char, index) => {
                    if (char === ' ') {
                        el.appendChild(document.createTextNode(' '));
                        return;
                    }

                    const wrap = document.createElement('span');
                    wrap.className = 'shuffle-char-wrapper';
                    wrap.style.display = 'inline-block';
                    wrap.style.overflow = 'hidden';
                    wrap.style.verticalAlign = 'baseline';

                    const inner = document.createElement('span');
                    inner.style.display = 'inline-block';
                    inner.style.whiteSpace = 'nowrap';
                    inner.style.willChange = 'transform';

                    wrap.appendChild(inner);

                    // Create character elements
                    const firstOrig = document.createElement('span');
                    firstOrig.className = 'shuffle-char';
                    firstOrig.textContent = char;
                    firstOrig.style.display = 'inline-block';
                    firstOrig.style.textAlign = 'center';

                    const realChar = document.createElement('span');
                    realChar.className = 'shuffle-char';
                    realChar.textContent = char;
                    realChar.setAttribute('data-orig', '1');
                    realChar.style.display = 'inline-block';
                    realChar.style.textAlign = 'center';

                    inner.appendChild(firstOrig);

                    for (let k = 0; k < rolls; k++) {
                        const c = document.createElement('span');
                        c.className = 'shuffle-char';
                        c.textContent = scrambleCharset ? rand(scrambleCharset) : char;
                        c.style.display = 'inline-block';
                        c.style.textAlign = 'center';
                        inner.appendChild(c);
                    }

                    inner.appendChild(realChar);

                    el.appendChild(wrap);

                    // Get width after appending
                    const w = wrap.getBoundingClientRect().width || 20;
                    wrap.style.width = w + 'px';

                    Array.from(inner.children).forEach(child => {
                        child.style.width = w + 'px';
                    });

                    const steps = rolls + 1;
                    let startX = 0;
                    let finalX = -steps * w;

                    if (shuffleDirection === 'right') {
                        const firstCopy = inner.firstElementChild;
                        const real = inner.lastElementChild;
                        if (real) inner.insertBefore(real, inner.firstChild);
                        if (firstCopy) inner.appendChild(firstCopy);
                        startX = -steps * w;
                        finalX = 0;
                    }

                    gsap.set(inner, { x: startX, force3D: true });
                    if (colorFrom) inner.style.color = colorFrom;

                    inner.setAttribute('data-final-x', String(finalX));
                    inner.setAttribute('data-start-x', String(startX));

                    wrappersRef.current.push(wrap);
                });
            };

            const inners = () => wrappersRef.current.map(w => w.firstElementChild);

            const randomizeScrambles = () => {
                if (!scrambleCharset) return;
                wrappersRef.current.forEach(w => {
                    const strip = w.firstElementChild;
                    if (!strip) return;
                    const kids = Array.from(strip.children);
                    for (let i = 1; i < kids.length - 1; i++) {
                        kids[i].textContent = scrambleCharset.charAt(Math.floor(Math.random() * scrambleCharset.length));
                    }
                });
            };

            const cleanupToStill = () => {
                wrappersRef.current.forEach(w => {
                    const strip = w.firstElementChild;
                    if (!strip) return;
                    const real = strip.querySelector('[data-orig="1"]');
                    if (!real) return;
                    strip.replaceChildren(real);
                    strip.style.transform = 'none';
                    strip.style.willChange = 'auto';
                });
            };

            const play = () => {
                const strips = inners();
                if (!strips.length) return;

                playingRef.current = true;

                const tl = gsap.timeline({
                    smoothChildTiming: true,
                    repeat: loop ? -1 : 0,
                    repeatDelay: loop ? loopDelay : 0,
                    onRepeat: () => {
                        if (scrambleCharset) randomizeScrambles();
                        gsap.set(strips, { x: (i, t) => parseFloat(t.getAttribute('data-start-x') || '0') });
                        onShuffleComplete?.();
                    },
                    onComplete: () => {
                        playingRef.current = false;
                        if (!loop) {
                            cleanupToStill();
                            if (colorTo) gsap.set(strips, { color: colorTo });
                            onShuffleComplete?.();
                            armHover();
                        }
                    }
                });

                const addTween = (targets, at) => {
                    tl.to(
                        targets,
                        {
                            x: (i, t) => parseFloat(t.getAttribute('data-final-x') || '0'),
                            duration,
                            ease,
                            force3D: true,
                            stagger: animationMode === 'evenodd' ? stagger : 0
                        },
                        at
                    );
                    if (colorFrom && colorTo) {
                        tl.to(targets, { color: colorTo, duration, ease }, at);
                    }
                };

                if (animationMode === 'evenodd') {
                    const odd = strips.filter((_, i) => i % 2 === 1);
                    const even = strips.filter((_, i) => i % 2 === 0);
                    const oddTotal = duration + Math.max(0, odd.length - 1) * stagger;
                    const evenStart = odd.length ? oddTotal * 0.7 : 0;
                    if (odd.length) addTween(odd, 0);
                    if (even.length) addTween(even, evenStart);
                } else {
                    strips.forEach(strip => {
                        const d = Math.random() * maxDelay;
                        tl.to(
                            strip,
                            {
                                x: parseFloat(strip.getAttribute('data-final-x') || '0'),
                                duration,
                                ease,
                                force3D: true
                            },
                            d
                        );
                        if (colorFrom && colorTo) tl.fromTo(strip, { color: colorFrom }, { color: colorTo, duration, ease }, d);
                    });
                }

                tlRef.current = tl;
            };

            const armHover = () => {
                if (!triggerOnHover || !ref.current) return;
                removeHover();
                const handler = () => {
                    if (playingRef.current) return;
                    build();
                    if (scrambleCharset) randomizeScrambles();
                    play();
                };
                hoverHandlerRef.current = handler;
                ref.current.addEventListener('mouseenter', handler);
            };

            const create = () => {
                build();
                if (scrambleCharset) randomizeScrambles();
                play();
                armHover();
                setReady(true);
            };

            const st = ScrollTrigger.create({
                trigger: el,
                start,
                once: triggerOnce,
                onEnter: create
            });

            return () => {
                st.kill();
                removeHover();
                teardown();
                setReady(false);
            };
        },
        {
            dependencies: [
                text,
                duration,
                maxDelay,
                ease,
                scrollTriggerStart,
                fontsLoaded,
                shuffleDirection,
                shuffleTimes,
                animationMode,
                loop,
                loopDelay,
                stagger,
                scrambleCharset,
                colorFrom,
                colorTo,
                triggerOnce,
                respectReducedMotion,
                triggerOnHover,
                onShuffleComplete
            ],
            scope: ref
        }
    );

    const commonStyle = useMemo(() => ({ textAlign, ...style }), [textAlign, style]);
    const classes = useMemo(() => `shuffle-parent ${ready ? 'is-ready' : ''} ${className}`, [ready, className]);
    const Tag = tag || 'p';

    return React.createElement(Tag, { ref, className: classes, style: commonStyle }, text);
};

export default Shuffle;
