'use client'

import React, { useRef, useState, lazy, Suspense } from 'react';
import { Play } from 'lucide-react';
import MobileGradient from './MobileGradient';

const Threads = lazy(() => import('./Threads'));

const VideoWindow = () => {
    const containerRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const showWebGLEffects = true;
    const isMobile = false;

    const youtubeVideoId = "8qI-4j3XLy4";

    return (
        <section ref={containerRef} className="py-12 sm:py-20 px-4 relative">
            <div className="absolute inset-0 z-0">
                {showWebGLEffects ? (
                    <Suspense fallback={<MobileGradient variant="cosmic" />}>
                        <Threads
                            amplitude={0.8}
                            distance={0}
                            enableMouseInteraction={false}
                            color={[0.6, 0.2, 0.8]}
                        />
                    </Suspense>
                ) : (
                    <MobileGradient variant="cosmic" animate={true} />
                )}
            </div>

            <div className="relative z-10 text-center mb-8 sm:mb-12">
                <div className="flex items-center justify-center gap-2 flex-wrap text-2xl sm:text-3xl md:text-4xl font-bold text-warm-chalk">
                    <span>Team Highlights</span>
                </div>
                <p className="text-fog-gray mt-3 sm:mt-4 max-w-xl mx-auto text-sm sm:text-base px-4">
                    A glimpse into our journey, achievements, and the moments that define AhumAI.
                </p>
            </div>

            <div
                className="relative max-w-5xl mx-auto aspect-video bg-deep-hull rounded-sm border border-rust-line overflow-hidden group cursor-pointer"
                onClick={() => setIsPlaying(true)}
            >
                <div className="absolute top-0 left-0 right-0 h-8 sm:h-10 bg-hull-plate border-b border-rust-line flex items-center px-3 sm:px-4 gap-1.5 sm:gap-2 z-10">
                    <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-red-500/50" />
                    <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-yellow-500/50" />
                    <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-green-500/50" />
                    <div className="flex-1 flex justify-center">
                        <div className="bg-hull-plate rounded-sm px-2 sm:px-4 py-0.5 sm:py-1 text-[10px] sm:text-xs text-fog-gray truncate max-w-[150px] sm:max-w-none">
                            youtube.com/watch?v={youtubeVideoId}
                        </div>
                    </div>
                </div>

                <div className="absolute inset-0 pt-8 sm:pt-10">
                    {isPlaying ? (
                        <iframe
                            src={`https://www.youtube.com/embed/${youtubeVideoId}?autoplay=1&rel=0`}
                            title="Team Highlights"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            className="w-full h-full"
                        />
                    ) : (
                        <>
                            <div className="absolute inset-0 bg-black" />
                            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 sm:gap-4">
                                <div className="w-14 h-14 sm:w-20 sm:h-20 rounded-full bg-hull-plate border border-rust-line flex items-center justify-center group-hover:border-signal-amber transition-colors duration-[0.15s] ease-out">
                                    <Play className="w-6 h-6 sm:w-8 sm:h-8 text-warm-chalk fill-warm-chalk ml-0.5 sm:ml-1" />
                                </div>
                                <p className="text-fog-gray text-sm sm:text-lg group-hover:text-warm-chalk transition-colors duration-[0.15s]">
                                    Tap to play
                                </p>
                            </div>
                        </>
                    )}
                </div>

                {!isPlaying && (
                    <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-deep-hull via-transparent to-transparent opacity-80" />
                )}
            </div>
        </section>
    );
};

export default VideoWindow;
