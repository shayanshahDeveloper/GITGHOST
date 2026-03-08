import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../assets/Logo.png';

const Navbar = () => {
    return (
        <nav className="bg-zinc-950 border-b border-zinc-900 sticky top-0 z-50 flex items-center justify-between px-6 py-4">
            <Link to="/" className="flex items-center">
                <img src={Logo} alt="GitGhost Logo" className="h-16 w-auto" />
                <h1 className="text-xl font-medium text-zinc-100">
                    GitGhost
                </h1>
            </Link>
            <div className="hidden md:flex items-center gap-6">
                <Link to="/how-it-works" className="text-sm text-zinc-400 hover:text-zinc-100 transition-colors">How It Works</Link>
                <Link to="/contact" className="text-sm text-zinc-400 hover:text-zinc-100 transition-colors">Contact</Link>
                <Link to="/login" className="px-4 py-2 rounded-md bg-zinc-100 text-zinc-900 text-sm font-medium hover:bg-white transition-colors">Go to Console</Link>
            </div>
        </nav>
    );
};

export default Navbar;
