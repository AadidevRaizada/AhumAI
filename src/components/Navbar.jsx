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

                {/* Kiro Ghost Badge - Right Side */}
                <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-purple-500/10 to-violet-500/10 border border-purple-500/30 hover:border-purple-400/50 transition-all duration-300 cursor-default group">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="20" viewBox="0 0 20 24" fill="none" className="group-hover:scale-110 transition-transform duration-300">
                        <path d="M3.80081 18.5661C1.32306 24.0572 6.59904 25.434 10.4904 22.2205C11.6339 25.8242 15.926 23.1361 17.4652 20.3445C20.8578 14.1915 19.4877 7.91459 19.1361 6.61988C16.7244 -2.20972 4.67055 -2.21852 2.59581 6.6649C2.11136 8.21946 2.10284 9.98752 1.82846 11.8233C1.69011 12.749 1.59258 13.3398 1.23436 14.3135C1.02841 14.8733 0.745043 15.3704 0.299833 16.2082C-0.391594 17.5095 -0.0998802 20.021 3.46397 18.7186V18.7195L3.80081 18.5661Z" fill="white" />
                        <path d="M10.9614 10.4413C9.97202 10.4413 9.82422 9.25893 9.82422 8.55407C9.82422 7.91791 9.93824 7.4124 10.1542 7.09197C10.3441 6.81003 10.6158 6.66699 10.9614 6.66699C11.3071 6.66699 11.6036 6.81228 11.8128 7.09892C12.0511 7.42554 12.177 7.92861 12.177 8.55407C12.177 9.73591 11.7226 10.4413 10.9616 10.4413H10.9614Z" fill="black" />
                        <path d="M15.0318 10.4413C14.0423 10.4413 13.8945 9.25893 13.8945 8.55407C13.8945 7.91791 14.0086 7.4124 14.2245 7.09197C14.4144 6.81003 14.6861 6.66699 15.0318 6.66699C15.3774 6.66699 15.6739 6.81228 15.8831 7.09892C16.1214 7.42554 16.2474 7.92861 16.2474 8.55407C16.2474 9.73591 15.793 10.4413 15.0319 10.4413H15.0318Z" fill="black" />
                    </svg>
                    <span className="text-xs font-medium text-purple-300 group-hover:text-purple-200 transition-colors">Kiro Startup</span>
                </div>
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
