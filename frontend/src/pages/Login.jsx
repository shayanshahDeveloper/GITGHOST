import React from 'react';
import { motion } from 'framer-motion';
import Logo from '../assets/Logo.png';

const Login = ({ triggerOAuth, pat, setPat, onLogin }) => {
  return (
    <div className="flex flex-col min-h-screen overflow-hidden items-center justify-center bg-zinc-950">
      <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="z-10 w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-lg p-8 shadow-sm">
        <div className="flex flex-col items-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <img src={Logo} alt="GitGhost Logo" className="h-20 w-auto drop-shadow-md" />
          </div>
          <h1 className="text-2xl font-semibold text-zinc-100 mb-1">Log in to GitGhost</h1>
          <p className="text-zinc-400 text-sm">Choose your connection method</p>
        </div>
        <div className="space-y-6">
          <button onClick={triggerOAuth} className="w-full bg-zinc-100 text-zinc-900 font-medium py-2.5 rounded-md hover:bg-white flex items-center justify-center gap-2 transition-colors">
            <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
            Continue with GitHub
          </button>

          <div className="relative flex items-center py-2">
            <div className="flex-grow border-t border-zinc-800"></div>
            <span className="flex-shrink-0 mx-4 text-zinc-500 text-xs">or use token</span>
            <div className="flex-grow border-t border-zinc-800"></div>
          </div>

          <div className="space-y-3">
            <label className="text-sm font-medium text-zinc-300 block">Personal Access Token</label>
            <input type="password" placeholder="ghp_xxxxxxxxxxxx" className="w-full bg-zinc-950 border border-zinc-800 rounded-md px-3 py-2 text-sm text-zinc-100 focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500 transition-colors font-mono placeholder:text-zinc-600" value={pat} onChange={(e) => setPat(e.target.value)} />
            <button onClick={() => onLogin(pat)} className="w-full bg-zinc-800 border border-zinc-700 text-zinc-100 text-sm font-medium py-2 rounded-md hover:bg-zinc-700 transition-colors">Log In</button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
