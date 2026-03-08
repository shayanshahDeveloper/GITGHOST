import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../assets/Logo.png';

const Footer = () => {
    return (
        <footer className="w-full bg-zinc-950 py-10 border-t border-zinc-900">
            <div className="max-w-5xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 text-sm">
                <div className="flex flex-col gap-3">
                    <div className="flex items-center">
                        <img src={Logo} alt="GitGhost Logo" className="h-14 w-auto drop-shadow-sm" />
                        <span className="font-semibold text-lg text-zinc-100">GitGhost</span>
                    </div>
                    <p className="text-zinc-500 max-w-sm">Automating your local repository pushes in the background.</p>
                </div>

                <div className="flex flex-col gap-2">
                    <h4 className="text-zinc-100 font-medium mb-1">Platform</h4>
                    <Link to="/how-it-works" className="text-zinc-400 hover:text-zinc-200 transition-colors">How It Works</Link>
                    <Link to="/login" className="text-zinc-400 hover:text-zinc-200 transition-colors">Console Login</Link>
                    <Link to="/contact" className="text-zinc-400 hover:text-zinc-200 transition-colors">Contact Support</Link>
                </div>

                <div className="flex flex-col gap-2">
                    <h4 className="text-zinc-100 font-medium mb-1">Legal</h4>
                    <Link to="/privacy" className="text-zinc-400 hover:text-zinc-200 transition-colors">Privacy Policy</Link>
                    <Link to="/disclaimer" className="text-zinc-400 hover:text-zinc-200 transition-colors">Disclaimer</Link>
                    <span className="text-zinc-400 cursor-not-allowed">Terms of Service</span>
                </div>
            </div>
            <div className="max-w-5xl mx-auto px-6 mt-10 pt-6 border-t border-zinc-900 text-zinc-600 flex justify-between items-center text-sm">
                <span>© {new Date().getFullYear()} GitGhost</span>
                <span>v1.0.0</span>
            </div>
        </footer>
    );
};

export default Footer;
