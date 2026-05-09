'use client'

import React from 'react';
import { ChevronRight } from 'lucide-react';

const AnnouncementBanner = ({
    message = 'NavCert is live — compliance that runs itself',
    linkText = 'Visit navcert.com',
    href = 'https://navcert.com',
}) => {
    return (
        <div className="fixed top-0 left-0 right-0 z-[60] w-full bg-deep-hull border-b border-rust-line">
            <div className="relative mx-auto flex h-9 max-w-6xl items-center justify-center px-4 text-[12px] text-fog-gray">
                <span className="truncate">
                    <span className="font-medium text-warm-chalk">{message}</span>
                    <span className="mx-3 text-rust-line">|</span>
                    <a
                        href={href}
                        className="inline-flex items-center gap-0.5 text-signal-amber hover:text-signal-amber-deep transition-colors duration-[0.15s] ease-out"
                    >
                        {linkText}
                        <ChevronRight className="h-3.5 w-3.5" />
                    </a>
                </span>
            </div>
        </div>
    );
};

export default AnnouncementBanner;
