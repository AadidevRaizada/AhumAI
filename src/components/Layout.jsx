import React from 'react';
import Navbar from './Navbar';

const Layout = ({ children }) => {
    return (
        <div className="min-h-screen bg-bg-main text-white selection:bg-brand-pink/30 selection:text-brand-pink">
            <Navbar />
            <main className="pt-20">
                {children}
            </main>
        </div>
    );
};

export default Layout;
