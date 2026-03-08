import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

// Import all step assets
import Step1 from '../assets/Step 1.png';
import Step2 from '../assets/Step 2.jpg';
import Step3 from '../assets/Step 3.jpg';
import Step4 from '../assets/Step 4.jpg';
import Step5 from '../assets/Step 5.jpg';
import Step6 from '../assets/Step 6.jpg';
import Step7 from '../assets/Step 7.jpg';
import Step8 from '../assets/Step 8.jpg';

const ExpandableImage = ({ src, alt }) => {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    return (
        <>
            <img
                src={src}
                alt={alt}
                onClick={() => setIsOpen(true)}
                className="rounded-md border border-zinc-800 mt-2 w-full object-cover shadow-sm cursor-pointer hover:border-zinc-700 transition-colors"
            />

            {isOpen && (
                <div
                    className="fixed inset-0 z-[100] bg-zinc-950/80 backdrop-blur-md flex justify-center items-center p-4 md:p-10"
                    onClick={() => setIsOpen(false)}
                >
                    <button
                        className="absolute top-6 right-6 text-zinc-400 hover:text-white bg-zinc-900 border border-zinc-700 w-10 h-10 flex items-center justify-center rounded-md transition-colors z-50"
                        onClick={(e) => { e.stopPropagation(); setIsOpen(false); }}
                    >
                        <span className="material-symbols-outlined">close</span>
                    </button>
                    <img
                        src={src}
                        alt={alt}
                        className="max-h-[90vh] max-w-[90vw] rounded-lg border border-zinc-800 shadow-2xl object-contain relative z-40"
                        onClick={(e) => e.stopPropagation()}
                    />
                </div>
            )}
        </>
    );
};

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

export const HowItWorks = () => (
    <PageTemplate title="How It Works">
        <p className="mb-10 text-base">GitGhost acts as a background bridge between your local development environment and global repositories. Follow these steps to set up your automated commit pipeline.</p>

        <div className="space-y-16 mt-4">
            <div className="flex flex-col gap-3">
                <h3 className="text-zinc-100 font-medium text-lg">Step 1: Access GitHub Settings</h3>
                <p>Log in to GitHub and navigate to your account settings via the profile dropdown menu in the top right corner.</p>
                <ExpandableImage src={Step1} alt="Step 1" />
            </div>

            <div className="flex flex-col gap-3">
                <h3 className="text-zinc-100 font-medium text-lg">Step 2: Developer Settings</h3>
                <p>Scroll down to the very bottom of the left sidebar menu and click on <strong className="text-zinc-200">Developer settings</strong>.</p>
                <ExpandableImage src={Step2} alt="Step 2" />
            </div>

            <div className="flex flex-col gap-3">
                <h3 className="text-zinc-100 font-medium text-lg">Step 3: Personal Access Tokens</h3>
                <p>Inside the Developer settings sidebar, click on the <strong className="text-zinc-200">Personal access tokens</strong> menu to expand it.</p>
                <ExpandableImage src={Step3} alt="Step 3" />
            </div>

            <div className="flex flex-col gap-3">
                <h3 className="text-zinc-100 font-medium text-lg">Step 4: Select Classic Tokens</h3>
                <p>From the expanded menu options beneath Personal access tokens, select <strong className="text-zinc-200">Tokens (classic)</strong>.</p>
                <ExpandableImage src={Step4} alt="Step 4" />
            </div>

            <div className="flex flex-col gap-3">
                <h3 className="text-zinc-100 font-medium text-lg">Step 5: Generate a New Token</h3>
                <p>Click the <strong className="text-zinc-200">Generate new token</strong> dropdown button located at the top right of the page.</p>
                <ExpandableImage src={Step5} alt="Step 5" />
            </div>

            <div className="flex flex-col gap-3">
                <h3 className="text-zinc-100 font-medium text-lg">Step 6: Choose Classic Format</h3>
                <p>From the dropdown prompt, select the <strong className="text-zinc-200">Generate new token (classic)</strong> option for general use.</p>
                <ExpandableImage src={Step6} alt="Step 6" />
            </div>

            <div className="flex flex-col gap-3">
                <h3 className="text-zinc-100 font-medium text-lg">Step 7: Configure Token Scopes</h3>
                <p>Give your token a recognizable Note (like "GIT-TOOL"). Crucially, scroll down to the scopes section and ensure the <strong className="text-zinc-200">repo</strong> checkbox is selected to grant necessary repository access.</p>
                <ExpandableImage src={Step7} alt="Step 7" />
            </div>

            <div className="flex flex-col gap-3">
                <h3 className="text-zinc-100 font-medium text-lg">Step 8: Copy and Paste</h3>
                <p>Scroll to the bottom and click "Generate token". Once generated, completely copy your new Personal Access Token and paste it directly into the GitGhost login console to authenticate!</p>
                <ExpandableImage src={Step8} alt="Step 8" />
            </div>
        </div>
    </PageTemplate>
);

export const PrivacyPolicy = () => (
    <PageTemplate title="Privacy Policy">
        <p>At GitGhost, your privacy is a core architectural requirement.</p>
        <h3 className="text-zinc-100 font-medium mt-8 text-lg">Data Collection</h3>
        <p>We do not store or collect your GitHub credentials, code, or personal information on our servers. The application requests standard OAuth read/write access strictly to automate your repositories locally on your behalf.</p>
        <h3 className="text-zinc-100 font-medium mt-8 text-lg">Client-Side Storage</h3>
        <p>When using tokens, your keys are stored efficiently within your browser's local storage (`localStorage`). Clearing your browser cache or hitting 'Logout' instantly removes all metadata.</p>
    </PageTemplate>
);

export const Disclaimer = () => (
    <PageTemplate title="Disclaimer">
        <p>GitGhost is an independent tool created for workflow efficiency.</p>
        <h3 className="text-zinc-100 font-medium mt-8 text-lg">Not Affiliated</h3>
        <p>GitGhost is in no way affiliated with, sponsored by, or endorsed by GitHub, Inc. or Microsoft. The use of the term "GitHub" is solely for descriptive purposes.</p>
        <h3 className="text-zinc-100 font-medium mt-8 text-lg">Use As Is</h3>
        <p>This software is provided "as is," without warranty of any kind. You are solely responsible for compliance with GitHub's Terms of Service and API Rate Limitations.</p>
    </PageTemplate>
);

export const ContactUs = () => (
    <PageTemplate title="Contact Support">
        <p>Experiencing system errors or have feedback? Submit a report.</p>
        <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-lg mt-8">
            <form className="flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
                <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-zinc-300">Email Address</label>
                    <input type="email" className="w-full bg-zinc-950 border border-zinc-800 rounded-md px-3 py-2 text-sm text-zinc-100 focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500 transition-colors" placeholder="you@example.com" />
                </div>
                <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-zinc-300">Message</label>
                    <textarea rows="4" className="w-full bg-zinc-950 border border-zinc-800 rounded-md px-3 py-2 text-sm text-zinc-100 focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500 transition-colors" placeholder="Describe your issue..."></textarea>
                </div>
                <button type="submit" className="bg-zinc-100 text-zinc-900 text-sm font-medium py-2 px-4 rounded-md hover:bg-white transition-colors mt-2 self-start">Submit</button>
            </form>
        </div>
    </PageTemplate>
);
