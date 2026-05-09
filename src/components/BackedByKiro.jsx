'use client'

import React from 'react';

const BackedByKiro = () => {
    return (
        <section className="py-16 sm:py-20">
            <div className="max-w-4xl mx-auto px-4">
                <div className="flex flex-col items-center text-center">
                    <span className="text-xs sm:text-sm font-medium text-fog-gray uppercase tracking-widest mb-6">
                        Proudly Backed By
                    </span>

                    <div className="relative flex flex-col items-center gap-5 px-10 sm:px-16 py-8 sm:py-10 rounded-sm bg-hull-plate border border-rust-line">
                        <img
                            src="/Kiro.png"
                            alt="Kiro"
                            className="h-12 sm:h-16 w-auto object-contain"
                        />

                        <p className="text-sm sm:text-base text-fog-gray max-w-sm">
                            Accelerating from idea to production with AI-powered development
                        </p>

                        <div className="flex items-center gap-2 px-4 py-2 rounded-sm bg-hull-plate border border-rust-line">
                            <span className="w-2 h-2 rounded-full bg-signal-amber" />
                            <span className="text-xs sm:text-sm font-medium text-fog-gray">
                                Startup Program Member
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default BackedByKiro;
