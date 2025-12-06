import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { Icon } from '@iconify/react';

import logo from '../assets/images/AhumAINoBg.png';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const location = useLocation();

    const navItems = [
        { name: 'Home', path: '/' },
        { name: 'Our Projects', path: '/projects' },
        { name: 'About Us', path: '/about' },
        { name: 'Contact Us', path: '/contact' }
    ];

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
    const closeMenu = () => setIsMenuOpen(false);

    return (
        <>
            <motion.nav
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 border-b border-glass-border bg-bg-main/70 backdrop-blur-xl"
            >
                {/* Logo */}
                <Link to="/" className="flex items-center gap-2" onClick={closeMenu}>
                    <img src={logo} alt="AhumAI Logo" className="w-7 h-7 sm:w-8 sm:h-8 object-contain" />
                    <span className="text-base sm:text-lg font-bold tracking-tight text-white">AhumAI</span>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center gap-6 lg:gap-8">
                    {navItems.slice(1).map((item) => (
                        <Link
                            key={item.name}
                            to={item.path}
                            className={`text-sm font-medium transition-colors ${location.pathname === item.path
                                    ? 'text-nebula-cyan'
                                    : 'text-gray-400 hover:text-white'
                                }`}
                        >
                            {item.name}
                        </Link>
                    ))}
                </div>

                {/* Mobile Menu Button */}
                <button
                    onClick={toggleMenu}
                    className="md:hidden w-10 h-10 flex items-center justify-center rounded-lg bg-white/5 border border-white/10 text-white"
                    aria-label="Toggle menu"
                >
                    <Icon
                        icon={isMenuOpen ? "solar:close-circle-linear" : "solar:hamburger-menu-linear"}
                        className="text-xl"
                    />
                </button>

                {/* Desktop spacer */}
                <div className="hidden md:block w-8 h-8" />
            </motion.nav>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMenuOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
                            onClick={closeMenu}
                        />

                        {/* Menu Panel */}
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'tween', duration: 0.3 }}
                            className="fixed top-0 right-0 bottom-0 w-[280px] bg-bg-main/95 backdrop-blur-xl border-l border-white/10 z-50 md:hidden"
                        >
                            {/* Menu Header */}
                            <div className="flex items-center justify-between px-4 py-4 border-b border-white/10">
                                <span className="text-lg font-semibold text-white">Menu</span>
                                <button
                                    onClick={closeMenu}
                                    className="w-10 h-10 flex items-center justify-center rounded-lg bg-white/5 text-white"
                                    aria-label="Close menu"
                                >
                                    <Icon icon="solar:close-circle-linear" className="text-xl" />
                                </button>
                            </div>

                            {/* Menu Items */}
                            <div className="px-4 py-6 space-y-2">
                                {navItems.map((item, index) => (
                                    <motion.div
                                        key={item.name}
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.05 }}
                                    >
                                        <Link
                                            to={item.path}
                                            onClick={closeMenu}
                                            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${location.pathname === item.path
                                                    ? 'bg-nebula-cyan/10 text-nebula-cyan border border-nebula-cyan/30'
                                                    : 'text-gray-300 hover:bg-white/5 hover:text-white'
                                                }`}
                                        >
                                            <Icon
                                                icon={
                                                    item.path === '/' ? 'solar:home-2-linear' :
                                                        item.path === '/projects' ? 'solar:folder-open-linear' :
                                                            item.path === '/about' ? 'solar:users-group-two-rounded-linear' :
                                                                'solar:phone-linear'
                                                }
                                                className="text-xl"
                                            />
                                            <span className="font-medium">{item.name}</span>
                                        </Link>
                                    </motion.div>
                                ))}
                            </div>

                            {/* Menu Footer */}
                            <div className="absolute bottom-0 left-0 right-0 px-4 py-6 border-t border-white/10">
                                <p className="text-center text-gray-500 text-xs">
                                    © 2025 AhumAI
                                </p>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
};

export default Navbar;
