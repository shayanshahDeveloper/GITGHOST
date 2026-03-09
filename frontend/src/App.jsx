import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import { HowItWorks, PrivacyPolicy, Disclaimer, ContactUs } from './pages/StaticPages';
import Logo from './assets/Logo.png';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

const App = () => {
  // --- States ---
  const [repoPath, setRepoPath] = useState('');
  const [isAutoActive, setIsAutoActive] = useState(false);
  const [targetCommits, setTargetCommits] = useState(1);
  const [commitInterval, setCommitInterval] = useState(2);
  const [intervalUnit, setIntervalUnit] = useState('min'); // 'sec' or 'min'
  const [statusLogs, setStatusLogs] = useState([]);
  const [totalCommits, setTotalCommits] = useState(0);
  const [isPushed, setIsPushed] = useState(false);
  const terminalRef = useRef(null);

  const [searchQuery, setSearchQuery] = useState('');

  // --- GitHub API Integration ---
  const [githubUser, setGithubUser] = useState(null);
  const [repos, setRepos] = useState([]);
  const [selectedRepo, setSelectedRepo] = useState(null);
  const [showLogin, setShowLogin] = useState(false);
  const [pat, setPat] = useState('');
  const [clientId, setClientId] = useState('');
  const [isInitializing, setIsInitializing] = useState(true);
  const oauthProgress = useRef(false);
  const pendingToast = useRef(null);
  const [dashboardPage, setDashboardPage] = useState('dashboard');

  // --- Effects ---
  useEffect(() => {
    const init = async () => {
      try {
        const configResp = await axios.get(`${API_BASE_URL}/github/oauth/config`);
        setClientId(configResp.data.clientId);
      } catch (e) { console.error("Config fetch failed"); }

      const savedToken = localStorage.getItem('gh_pat');
      if (savedToken) await onLogin(savedToken);

      const storedPath = localStorage.getItem('git_repo_path');
      if (storedPath) setRepoPath(storedPath);

      const params = new URLSearchParams(window.location.search);
      const code = params.get('code');

      if (code) {
        if (!oauthProgress.current) {
          oauthProgress.current = true;
          window.history.replaceState({}, document.title, window.location.pathname);
          await handleOAuthCallback(code);
        }
      } else if (oauthProgress.current) {
        // StrictMode 2nd pass: `code` is gone from URL, but OAuth is in progress.
        // Let the 1st pass finish and unset isInitializing.
        return;
      }

      setIsInitializing(false);
    };
    init();
  }, []);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [statusLogs]);

  useEffect(() => {
    let interval;
    if (isAutoActive) {
      let currentSessionCommits = 0;

      const sessionCommit = async () => {
        if (currentSessionCommits < targetCommits) {
          await handleCommit();
          currentSessionCommits++;

          if (currentSessionCommits >= targetCommits) {
            setIsAutoActive(false);
            addLog(`🏁 Series Complete: ${targetCommits} drops reached.`, true);
          }
        }
      };

      // Start first commit immediately
      sessionCommit();

      // Schedule subsequent commits
      interval = setInterval(sessionCommit, (intervalUnit === 'min' ? commitInterval * 60000 : commitInterval * 1000));
    }
    return () => clearInterval(interval);
  }, [isAutoActive, targetCommits, commitInterval, intervalUnit]);

  useEffect(() => {
    if (githubUser && !isInitializing && pendingToast.current) {
      const msg = pendingToast.current;
      pendingToast.current = null;
      setTimeout(() => {
        toast.success(msg);
      }, 300);
    }
  }, [githubUser, isInitializing]);

  // --- Helpers ---
  const addLog = (message, success = true) => {
    setStatusLogs(prev => [...prev, {
      timestamp: new Date().toLocaleTimeString([], { hour12: false }),
      success,
      message,
      id: Date.now()
    }]);
  };

  const onLogin = async (token) => {
    try {
      const resp = await axios.post(`${API_BASE_URL}/github/login`, { token });
      if (!resp.data.hasRepoScope) {
        toast.warning("Token missing 'repo' permissions. Some features may not work.");
      }
      setGithubUser(resp.data.user);
      localStorage.setItem('gh_pat', token);
      setShowLogin(false);
      fetchRepos();
      pendingToast.current = `Welcome back, ${resp.data.user.login}!`;
    } catch (e) {
      toast.error("Invalid or Unauthorized Personal Access Token");
      localStorage.removeItem('gh_pat');
    }
  };

  const handleOAuthCallback = async (code) => {
    try {
      const resp = await axios.post(`${API_BASE_URL}/github/oauth/callback`, { code });
      if (resp.data.status === 'success') {
        const { token, user } = resp.data;
        setGithubUser(user);
        localStorage.setItem('gh_pat', token);
        await fetchRepos(token);
        pendingToast.current = `Successfully authenticated as ${user.login}!`;
      }
    } catch (e) {
      toast.error(`OAuth Login Failed: ${e.response?.data?.message || 'Unknown Server Error'}`);
      localStorage.removeItem('gh_pat');
      setGithubUser(null);
    }
  };

  const triggerOAuth = () => {
    if (!clientId) {
      toast.error("GitHub Client ID not configured in backend or backend is offline.");
      return;
    }
    const scope = 'repo,workflow,user';
    window.location.href = `https://github.com/login/oauth/authorize?client_id=${clientId}&scope=${scope}`;
  };

  const fetchRepos = async (tokenOverride = null) => {
    try {
      const token = tokenOverride || pat || localStorage.getItem('gh_pat');
      const resp = await axios.get(`${API_BASE_URL}/github/repos`);
      setRepos(resp.data.repos);
    } catch (e) { }
  };

  const handleCommit = async (specificRepo = null) => {
    const target = specificRepo || selectedRepo;
    if (githubUser && target) {
      setIsPushed(true);
      try {
        const resp = await axios.post(`${API_BASE_URL}/commit-api`, {
          owner: target.owner.login,
          repo: target.name,
          branch: target.default_branch
        });
        const logData = resp.data.log;
        setStatusLogs(prev => [...prev, { ...logData, id: Date.now() }]);
        if (resp.data.status === 'success') setTotalCommits(prev => prev + 1);
      } catch (e) {
        addLog(e.response?.data?.log?.message || "Spectral broadcast failed", false);
      } finally {
        setIsPushed(false);
      }
      return;
    }

    if (!repoPath) {
      addLog("Handshake required: No target selection detected", false);
      return;
    }

    setIsPushed(true);
    try {
      const response = await axios.post(`${API_BASE_URL}/commit`, { repo_path: repoPath });
      setStatusLogs(prev => [...prev, { ...response.data.log, id: Date.now() }]);
      if (response.data.status === 'success') setTotalCommits(prev => prev + 1);
    } catch (error) {
      addLog(error.response?.data?.detail || 'Handshake failed', false);
    } finally {
      setIsPushed(false);
    }
  };

  const filteredRepos = repos.filter(r =>
    r.full_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleAuto = () => setIsAutoActive(!isAutoActive);
  const clearLogs = () => setStatusLogs([]);

  const renderLoading = () => (
    <div className="flex flex-col h-screen items-center justify-center bg-zinc-950">
      <div className="flex items-center justify-center mb-1 animate-pulse">
        <img src={Logo} alt="GitGhost Logo" className="h-14 w-auto drop-shadow-md" />
        <h1 className="text-3xl font-semibold text-zinc-100 uppercase tracking-widest">GitGhost</h1>
      </div>
      <h2 className="text-zinc-500 font-medium ml-10 text-sm">Synchronizing access...</h2>
    </div>
  );

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <Routes>
        <Route path="/" element={
          isInitializing ? renderLoading() :
            githubUser ? <Navigate to="/dashboard" /> : <Landing />
        } />
        <Route path="/how-it-works" element={<HowItWorks />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/disclaimer" element={<Disclaimer />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/login" element={
          isInitializing ? renderLoading() :
            githubUser ? <Navigate to="/dashboard" /> : (
              <>
                <button 
                  onClick={() => toast("Test!")} 
                  className="fixed top-4 right-4 z-[99999] bg-white text-black p-2"
                >
                  TEST TOAST
                </button>
                <Login triggerOAuth={triggerOAuth} pat={pat} setPat={setPat} onLogin={onLogin} />
              </>
            )
        } />
        <Route path="/dashboard" element={
          isInitializing ? renderLoading() :
            !githubUser ? <Navigate to="/login" /> : (
              <Dashboard
                totalCommits={totalCommits}
                repos={repos}
                githubUser={githubUser}
                setGithubUser={setGithubUser}
                dashboardPage={dashboardPage}
                setDashboardPage={setDashboardPage}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                isAutoActive={isAutoActive}
                toggleAuto={toggleAuto}
                filteredRepos={filteredRepos}
                selectedRepo={selectedRepo}
                setSelectedRepo={setSelectedRepo}
                targetCommits={targetCommits}
                setTargetCommits={setTargetCommits}
                commitInterval={commitInterval}
                setCommitInterval={setCommitInterval}
                intervalUnit={intervalUnit}
                setIntervalUnit={setIntervalUnit}
                isPushed={isPushed}
                clearLogs={clearLogs}
                statusLogs={statusLogs}
                terminalRef={terminalRef}
                handleCommit={handleCommit}
              />
            )
        } />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
};

export default App;
