import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

const PageTemplate = ({ title, children, theme, setTheme }) => (
    <div className="flex flex-col min-h-screen bg-main text-main font-sans transition-colors duration-300">
        <Navbar theme={theme} setTheme={setTheme} />
        <main className="flex-1 max-w-3xl mx-auto w-full px-6 py-20">
            <h1 className="text-3xl font-bold tracking-tight mb-10 text-main">{title}</h1>
            <div className="space-y-6 text-muted leading-relaxed text-sm">
                {children}
            </div>
        </main>
        <Footer />
    </div>
);

export default PageTemplate;
