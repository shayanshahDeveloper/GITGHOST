import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
import ParticleBackground from "../components/ParticleBackground";

import Avatar1 from "../assets/avatars/avatar1.png";
import Avatar2 from "../assets/avatars/avatar2.png";
import Avatar3 from "../assets/avatars/avatar3.png";
import Avatar4 from "../assets/avatars/avatar4.png";

const Landing = () => {
    return (
      <div className="flex flex-col min-h-screen bg-zinc-950 text-zinc-100 font-sans">
        <Navbar />

        {/* Hero & Features Wrapper with Unified Background */}
        <div className="relative overflow-hidden">
          <ParticleBackground />

          {/* Hero Section */}
          <section className="relative flex flex-col items-center justify-center py-24 sm:py-32 px-6 sm:px-12 text-center z-10">
            <div className="max-w-3xl mx-auto flex flex-col items-center relative">
              <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-white mb-6 leading-[1.1]">
                Automate your contribution graph
                <br className="hidden sm:block" />
                without thinking about it.
              </h1>

              <p className="text-lg sm:text-xl text-zinc-400 max-w-xl mx-auto mb-10 leading-relaxed font-light">
                A background client that bridges your local machine and your
                GitHub repositories. Set your schedule, authorize, and it just
                works.
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-4 justify-center w-full max-w-md mx-auto mb-12">
                <Link
                  to="/login"
                  className="w-full sm:w-auto px-8 py-3 rounded-full bg-white text-black font-bold hover:scale-105 transition-all shadow-xl"
                >
                  Get Started
                </Link>
                <Link
                  to="/how-it-works"
                  className="w-full sm:w-auto px-8 py-3 rounded-full bg-zinc-900/50 text-white font-semibold hover:bg-zinc-800 transition-all border border-zinc-700 backdrop-blur-sm"
                >
                  How it works
                </Link>
              </div>

              {/* Trust Section */}
              <div className="flex flex-col items-center animate-fade-in-up">
                <div className="flex -space-x-4 mb-4">
                  {[Avatar1, Avatar2, Avatar3, Avatar4].map((avatar, i) => (
                    <img
                      key={i}
                      src={avatar}
                      alt="User"
                      className="size-10 rounded-full border-2 border-zinc-950 object-cover hover:scale-105 transition-transform cursor-pointer"
                    />
                  ))}
                  <div className="size-10 rounded-full bg-zinc-800 border-2 border-zinc-950 flex items-center justify-center text-[10px] font-bold text-zinc-300">
                    +5k
                  </div>
                </div>
                <p className="text-sm text-zinc-400">
                  Trusted by over{" "}
                  <span className="text-zinc-100 font-semibold tracking-tight">
                    5,000+ developers
                  </span>{" "}
                  worldwide
                </p>
              </div>
            </div>
          </section>

          {/* Features Section */}
          <section className="relative px-6 sm:px-12 pb-32 z-10">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 w-full max-w-6xl mx-auto">
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
        </div>

        {/* How it works strip */}
        <section className="border-t border-zinc-800 bg-zinc-900">
          <div className="max-w-5xl mx-auto px-6 sm:px-12 py-20">
            <h2 className="text-2xl font-semibold text-zinc-100 mb-12">
              Setup in three steps
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <StepItem
                number="1"
                title="Generate a token"
                desc="Create a classic Personal Access Token from your GitHub Developer Settings with repo scope enabled."
              />
              <StepItem
                number="2"
                title="Paste and connect"
                desc="Log in to GitGhost and paste your token. Your repositories load instantly from the GitHub API."
              />
              <StepItem
                number="3"
                title="Configure and run"
                desc="Select a target repo, set your commit frequency, and start the pipeline. Manual or auto — your call."
              />
            </div>
          </div>
        </section>

        {/* Comparison table */}
        <section className="border-t border-zinc-800">
          <div className="max-w-5xl mx-auto px-6 sm:px-12 py-20">
            <h2 className="text-2xl font-semibold text-zinc-100 mb-10">
              Why GitGhost
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-zinc-800">
                    <th className="py-3 pr-6 text-zinc-500 font-medium">
                      Feature
                    </th>
                    <th className="py-3 px-6 text-zinc-500 font-medium">
                      Manual commits
                    </th>
                    <th className="py-3 px-6 text-zinc-500 font-medium">
                      Cron scripts
                    </th>
                    <th className="py-3 pl-6 text-zinc-100 font-medium">
                      GitGhost
                    </th>
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
                    <td className="py-3 pr-6 text-zinc-300">
                      Runs in background
                    </td>
                    <td className="py-3 px-6">No</td>
                    <td className="py-3 px-6">Yes</td>
                    <td className="py-3 pl-6 text-zinc-100">Yes</td>
                  </tr>
                  <tr className="border-b border-zinc-800/50">
                    <td className="py-3 pr-6 text-zinc-300">
                      Visual dashboard
                    </td>
                    <td className="py-3 px-6">No</td>
                    <td className="py-3 px-6">No</td>
                    <td className="py-3 pl-6 text-zinc-100">Yes</td>
                  </tr>
                  <tr className="border-b border-zinc-800/50">
                    <td className="py-3 pr-6 text-zinc-300">
                      Multi-repo support
                    </td>
                    <td className="py-3 px-6">Manual switching</td>
                    <td className="py-3 px-6">Per-script</td>
                    <td className="py-3 pl-6 text-zinc-100">Built in</td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-6 text-zinc-300">
                      Adjustable frequency
                    </td>
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
            <h2 className="text-2xl font-semibold text-zinc-100 mb-10">
              What you get
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-zinc-800 rounded-lg overflow-hidden border border-zinc-800">
              <CapabilityItem
                icon="terminal"
                title="Live console"
                desc="Real-time pipeline log showing every commit, push, and error as it happens."
              />
              <CapabilityItem
                icon="tune"
                title="Fine-grained control"
                desc="Payload size and interval sliders with second or minute precision."
              />
              <CapabilityItem
                icon="account_tree"
                title="Repository browser"
                desc="Card view of all connected repos with visibility, language, and branch info."
              />
              <CapabilityItem
                icon="monitoring"
                title="Activity analytics"
                desc="Track total commits, pipeline status, and review your recent activity log."
              />
              <CapabilityItem
                icon="calendar_month"
                title="Schedule presets"
                desc="One-click presets for light, moderate, or heavy commit schedules."
              />
              <CapabilityItem
                icon="help_outline"
                title="Built-in guide"
                desc="Step-by-step PAT setup instructions with annotated screenshots."
              />
            </div>
          </div>
        </section>

        <Footer />
      </div>
    );
};

const FeatureCard = ({ icon, title, desc }) => (
  <div className="flex flex-col p-8 rounded-2xl bg-zinc-900/40 border border-zinc-800/50 backdrop-blur-md hover:border-purple-500/50 hover:bg-zinc-900/60 transition-all group active:scale-[0.98]">
    <div className="size-12 rounded-xl bg-gradient-to-br from-purple-500/20 to-cyan-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
      <span className="material-symbols-outlined text-purple-400 text-2xl">
        {icon}
      </span>
    </div>
    <h3 className="text-lg font-bold text-white mb-3 tracking-tight">
      {title}
    </h3>
    <p className="text-zinc-400 text-sm leading-relaxed font-light">{desc}</p>
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
