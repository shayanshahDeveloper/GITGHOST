import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

const PageTemplate = ({ title, children }) => (
    <div className="flex flex-col min-h-screen bg-zinc-950 text-zinc-100 font-sans">
        <Navbar />
        <main className="flex-1 max-w-3xl mx-auto w-full px-6 py-20">
            <h1 className="text-3xl font-semibold tracking-tight mb-10 text-zinc-100">{title}</h1>
            <div className="space-y-6 text-zinc-400 leading-relaxed text-sm">
                {children}
            </div>
        </main>
        <Footer />
    </div>
);

export default PageTemplate;
