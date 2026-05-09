'use client'

import React from 'react';
import Navbar from './Navbar';
import AnnouncementBanner from './AnnouncementBanner';

const Layout = ({ children }) => {
    return (
        <div className="min-h-screen bg-bg-main text-warm-chalk selection:bg-signal-amber/20 selection:text-signal-amber">
            {/* Thin top announcement strip (Novu-style) */}
            <AnnouncementBanner />
            <Navbar />
            <main className="pt-20">
                {children}
            </main>
        </div>
    );
};

export default Layout;
