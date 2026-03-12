import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../assets/Logo.png';

const Navbar = ({ theme, setTheme }) => {
    return (
        <nav className="bg-header border-b border-main sticky top-0 z-50 flex items-center justify-between px-6 py-4">
            <Link to="/" className="flex items-center">
                <img src={Logo} alt="GitGhost Logo" className="h-14 w-auto drop-shadow-sm" />
                <h1 className="text-xl font-bold text-main tracking-tight">
                    GitGhost
                </h1>
            </Link>
            <div className="flex items-center gap-4">
                <div className="hidden md:flex items-center gap-6 mr-2">
                    <Link to="/how-it-works" className="text-sm font-medium text-muted hover:text-main transition-colors">How It Works</Link>
                    <Link to="/contact" className="text-sm font-medium text-muted hover:text-main transition-colors">Contact</Link>
                </div>
                
                <button
                    onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                    className="size-10 flex items-center justify-center rounded-full bg-surface border border-main text-muted hover:text-main hover:border-[var(--primary)] transition-all shadow-sm active:scale-95"
                    title={theme === 'dark' ? "Switch to Light Mode" : "Switch to Dark Mode"}
                >
                    <span className="material-symbols-outlined text-xl">
                        {theme === 'dark' ? 'light_mode' : 'dark_mode'}
                    </span>
                </button>

                <Link to="/login" className="btn-primary px-5 py-2 rounded-full text-sm font-bold shadow-lg hover:scale-105 active:scale-95 transition-all">
                    Console
                </Link>
            </div>
        </nav>
    );
};

export default Navbar;
