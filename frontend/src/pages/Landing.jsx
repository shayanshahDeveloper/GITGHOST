import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';

const Landing = () => {
    return (
        <div className="flex flex-col min-h-screen bg-zinc-950 text-zinc-100 font-sans">
            <Navbar />

            {/* Hero */}
            <section className="flex flex-col items-center justify-center py-24 px-6 sm:px-12 text-center">
                <div className="max-w-3xl mx-auto flex flex-col items-center">
                    <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight text-white mb-6 leading-tight">
                        Automate your contribution graph<br />
                        without thinking about it.
                    </h1>

                    <p className="text-lg text-zinc-400 max-w-xl mx-auto mb-10">
                        A background client that bridges your local machine and your GitHub repositories. Set your schedule, authorize, and it just works.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center gap-4 justify-center w-full max-w-md mx-auto">
                        <Link to="/login" className="w-full sm:w-auto px-6 py-2.5 rounded-md bg-zinc-100 text-zinc-900 font-medium hover:bg-white transition-colors">
                            Get Started
                        </Link>
                        <Link to="/how-it-works" className="w-full sm:w-auto px-6 py-2.5 rounded-md bg-zinc-800 text-zinc-100 font-medium hover:bg-zinc-700 transition-colors border border-zinc-700">
                            How it works
                        </Link>
                    </div>
                </div>
            </section>

            {/* Features */}
            <section className="px-6 sm:px-12 pb-20">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full max-w-5xl mx-auto text-left">
                    <FeatureCard
                        icon="sync"
                        title="Consistent Automation"
                        desc="Configure your targeted commit frequency. GitGhost handles staging, committing, and pushing silently in the background."
                    />
                    <FeatureCard
                        icon="visibility_off"
                        title="Out of sight"
                        desc="Once authorized, it stays out of your way. Leave your terminal active and focus on your actual development workflows."
                    />
                    <FeatureCard
                        icon="lock"
                        title="Secure access"
                        desc="Works exclusively via OAuth or local Personal Access Tokens stored only in your browser's local storage."
                    />
                </div>
            </section>

            {/* How it works strip */}
            <section className="border-t border-zinc-800 bg-zinc-900">
                <div className="max-w-5xl mx-auto px-6 sm:px-12 py-20">
                    <h2 className="text-2xl font-semibold text-zinc-100 mb-12">Setup in three steps</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <StepItem number="1" title="Generate a token" desc="Create a classic Personal Access Token from your GitHub Developer Settings with repo scope enabled." />
                        <StepItem number="2" title="Paste and connect" desc="Log in to GitGhost and paste your token. Your repositories load instantly from the GitHub API." />
                        <StepItem number="3" title="Configure and run" desc="Select a target repo, set your commit frequency, and start the pipeline. Manual or auto — your call." />
                    </div>
                </div>
            </section>

            {/* Comparison table */}
            <section className="border-t border-zinc-800">
                <div className="max-w-5xl mx-auto px-6 sm:px-12 py-20">
                    <h2 className="text-2xl font-semibold text-zinc-100 mb-10">Why GitGhost</h2>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm">
                            <thead>
                                <tr className="border-b border-zinc-800">
                                    <th className="py-3 pr-6 text-zinc-500 font-medium">Feature</th>
                                    <th className="py-3 px-6 text-zinc-500 font-medium">Manual commits</th>
                                    <th className="py-3 px-6 text-zinc-500 font-medium">Cron scripts</th>
                                    <th className="py-3 pl-6 text-zinc-100 font-medium">GitGhost</th>
                                </tr>
                            </thead>
                            <tbody className="text-zinc-400">
                                <tr className="border-b border-zinc-800/50">
                                    <td className="py-3 pr-6 text-zinc-300">Setup time</td>
                                    <td className="py-3 px-6">None</td>
                                    <td className="py-3 px-6">15-30 min</td>
                                    <td className="py-3 pl-6 text-zinc-100">2 min</td>
                                </tr>
                                <tr className="border-b border-zinc-800/50">
                                    <td className="py-3 pr-6 text-zinc-300">Runs in background</td>
                                    <td className="py-3 px-6">No</td>
                                    <td className="py-3 px-6">Yes</td>
                                    <td className="py-3 pl-6 text-zinc-100">Yes</td>
                                </tr>
                                <tr className="border-b border-zinc-800/50">
                                    <td className="py-3 pr-6 text-zinc-300">Visual dashboard</td>
                                    <td className="py-3 px-6">No</td>
                                    <td className="py-3 px-6">No</td>
                                    <td className="py-3 pl-6 text-zinc-100">Yes</td>
                                </tr>
                                <tr className="border-b border-zinc-800/50">
                                    <td className="py-3 pr-6 text-zinc-300">Multi-repo support</td>
                                    <td className="py-3 px-6">Manual switching</td>
                                    <td className="py-3 px-6">Per-script</td>
                                    <td className="py-3 pl-6 text-zinc-100">Built in</td>
                                </tr>
                                <tr>
                                    <td className="py-3 pr-6 text-zinc-300">Adjustable frequency</td>
                                    <td className="py-3 px-6">N/A</td>
                                    <td className="py-3 px-6">Edit crontab</td>
                                    <td className="py-3 pl-6 text-zinc-100">Slider control</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            {/* Capabilities */}
            <section className="border-t border-zinc-800 bg-zinc-900">
                <div className="max-w-5xl mx-auto px-6 sm:px-12 py-20">
                    <h2 className="text-2xl font-semibold text-zinc-100 mb-10">What you get</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-zinc-800 rounded-lg overflow-hidden border border-zinc-800">
                        <CapabilityItem icon="terminal" title="Live console" desc="Real-time pipeline log showing every commit, push, and error as it happens." />
                        <CapabilityItem icon="tune" title="Fine-grained control" desc="Payload size and interval sliders with second or minute precision." />
                        <CapabilityItem icon="account_tree" title="Repository browser" desc="Card view of all connected repos with visibility, language, and branch info." />
                        <CapabilityItem icon="monitoring" title="Activity analytics" desc="Track total commits, pipeline status, and review your recent activity log." />
                        <CapabilityItem icon="calendar_month" title="Schedule presets" desc="One-click presets for light, moderate, or heavy commit schedules." />
                        <CapabilityItem icon="help_outline" title="Built-in guide" desc="Step-by-step PAT setup instructions with annotated screenshots." />
                    </div>
                </div>
            </section>


            <Footer />
        </div>
    );
};

const FeatureCard = ({ icon, title, desc }) => (
    <div className="flex flex-col p-6 rounded-lg bg-zinc-900 border border-zinc-800">
        <span className="material-symbols-outlined text-zinc-400 text-xl mb-3">{icon}</span>
        <h3 className="text-sm font-medium text-zinc-100 mb-2">{title}</h3>
        <p className="text-zinc-400 text-sm leading-relaxed">{desc}</p>
    </div>
);

const StepItem = ({ number, title, desc }) => (
    <div className="flex gap-4">
        <span className="text-sm font-medium text-zinc-500 mt-0.5 shrink-0">{number}.</span>
        <div>
            <h3 className="text-sm font-medium text-zinc-100 mb-1">{title}</h3>
            <p className="text-sm text-zinc-400 leading-relaxed">{desc}</p>
        </div>
    </div>
);

const CapabilityItem = ({ icon, title, desc }) => (
    <div className="bg-zinc-900 p-6">
        <div className="flex items-center gap-2 mb-2">
            <span className="material-symbols-outlined text-zinc-400 text-lg">{icon}</span>
            <h3 className="text-sm font-medium text-zinc-100">{title}</h3>
        </div>
        <p className="text-sm text-zinc-400 leading-relaxed">{desc}</p>
    </div>
);

export default Landing;
