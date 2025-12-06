import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

import logo from '../assets/images/AhumAINoBg.png';

const Navbar = () => {
    return (
        <motion.nav
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 border-b border-glass-border bg-bg-main/70 backdrop-blur-xl"
        >
            <Link to="/" className="flex items-center gap-2">
                <img src={logo} alt="AhumAI Logo" className="w-8 h-8 object-contain" />
                <span className="text-lg font-bold tracking-tight text-white">AhumAI</span>
            </Link>

            <div className="hidden md:flex items-center gap-8">
                {[
                    { name: 'Our Projects', path: '/projects' },
                    { name: 'About Us', path: '/about' },
                    { name: 'Contact Us', path: '/contact' }
                ].map((item) => (
                    <Link
                        key={item.name}
                        to={item.path}
                        className="text-sm font-medium text-gray-400 hover:text-white transition-colors"
                    >
                        {item.name}
                    </Link>
                ))}
            </div>

            <div className="w-8 h-8">
                {/* Spacer to balance the layout, or we can remove it */}
            </div>
        </motion.nav>
    );
};

export default Navbar;
