import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from '../assets/Logo.png';
import ExpandableImage from '../components/ExpandableImage';

const Dashboard = ({
  totalCommits, repos, githubUser, setGithubUser, dashboardPage, setDashboardPage,
  searchQuery, setSearchQuery, repoFilter, setRepoFilter, isAutoActive, toggleAuto, filteredRepos,
  selectedRepo, setSelectedRepo, targetCommits, setTargetCommits,
  commitInterval, setCommitInterval, intervalUnit, setIntervalUnit,
  isPushed, clearLogs, statusLogs, terminalRef, handleCommit,
  handleDatedCommit, theme, setTheme
}) => {
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [customDate, setCustomDate] = useState('');
  const [customTime, setCustomTime] = useState('10:30');
  const [datedCommitCount, setDatedCommitCount] = useState(1);
  const [isDatedCommitting, setIsDatedCommitting] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('gh_pat');
    setGithubUser(null);
    toast.success("Successfully logged out");
    setShowLogoutModal(false);
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-[var(--bg-base)]">
      {/* Header */}
      <header className="bg-[var(--bg-header)] sticky top-0 z-50 flex flex-wrap items-center justify-between px-6 py-3 shrink-0 border-b border-[var(--border)]">
        <div className="flex items-center gap-3">
          <img src={Logo} alt="GitGhost Logo" className="h-14 w-auto drop-shadow-sm" />
          <h1 className="text-xl font-medium text-[var(--text-main)] truncate">
            GitGhost
          </h1>
        </div>

        <div className="flex items-center gap-4 sm:gap-6">
          <div className="hidden md:flex items-center gap-6">
            <div className="flex flex-col items-end">
              <span className="text-xs text-[var(--text-muted)]">Total Commits</span>
              <span className="text-sm font-medium text-[var(--text-main)]">{totalCommits.toLocaleString()}</span>
            </div>
            <div className="flex flex-col items-end">
              <span className="text-xs text-[var(--text-muted)]">Repositories</span>
              <span className="text-sm font-medium text-[var(--text-main)]">{repos.length}</span>
            </div>
          </div>

          <div className="hidden sm:block h-6 w-px bg-[var(--border)] mx-2"></div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="text-[var(--text-muted)] hover:text-[var(--text-main)] transition-colors p-1.5 rounded-lg hover:bg-[var(--bg-surface)]"
              title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            >
              <span className="material-symbols-outlined text-xl">
                {theme === 'dark' ? 'light_mode' : 'dark_mode'}
              </span>
            </button>

            <button className="text-[var(--text-muted)] hover:text-[var(--text-main)] transition-colors p-1.5 rounded-lg hover:bg-[var(--bg-surface)]">
              <span className="material-symbols-outlined text-xl">settings</span>
            </button>

            <div className="size-8 rounded-full overflow-hidden group relative border border-[var(--border)]">
              <img alt="Profile" className="object-cover w-full h-full" src={githubUser?.avatar_url || "https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"} />
              <button onClick={() => setShowLogoutModal(true)} className={`absolute inset-0 ${theme === 'dark' ? 'bg-zinc-900/80' : 'bg-white/80'} opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity`} title="Logout">
                <span className={`material-symbols-outlined ${theme === 'dark' ? 'text-zinc-100' : 'text-zinc-900'} text-sm`}>logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar - Hidden on mobile, shown as a skinny bar on desktop */}
        <aside className="hidden md:flex w-16 bg-[var(--bg-sidebar)] border-r border-[var(--border)] flex-col items-center py-6 shrink-0 gap-8">
          <nav className="flex flex-col gap-6">
            <button onClick={() => setDashboardPage('dashboard')} className={`${dashboardPage === 'dashboard' ? 'text-[var(--primary)]' : 'text-[var(--text-muted)] hover:text-[var(--text-main)]'} transition-colors`} title="Dashboard">
              <span className="material-symbols-outlined text-2xl">grid_view</span>
            </button>
            <button onClick={() => setDashboardPage('repos')} className={`${dashboardPage === 'repos' ? 'text-[var(--primary)]' : 'text-[var(--text-muted)] hover:text-[var(--text-main)]'} transition-colors`} title="Repositories">
              <span className="material-symbols-outlined text-2xl">account_tree</span>
            </button>
            <button onClick={() => setDashboardPage('schedule')} className={`${dashboardPage === 'schedule' ? 'text-[var(--primary)]' : 'text-[var(--text-muted)] hover:text-[var(--text-main)]'} transition-colors`} title="Schedule">
              <span className="material-symbols-outlined text-2xl">calendar_month</span>
            </button>
            <button onClick={() => setDashboardPage('analytics')} className={`${dashboardPage === 'analytics' ? 'text-[var(--primary)]' : 'text-[var(--text-muted)] hover:text-[var(--text-main)]'} transition-colors`} title="Analytics">
              <span className="material-symbols-outlined text-2xl">monitoring</span>
            </button>
          </nav>
          <div className="mt-auto flex flex-col gap-6 mb-4">
            <button onClick={() => setDashboardPage('help')} className={`${dashboardPage === 'help' ? 'text-[var(--primary)]' : 'text-[var(--text-muted)] hover:text-[var(--text-main)]'} transition-colors`} title="Help">
              <span className="material-symbols-outlined text-2xl">help_outline</span>
            </button>
          </div>
        </aside>

        {dashboardPage === 'dashboard' && (
          <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
            {/* Main List Section */}
            <section className="w-full lg:w-7/12 flex flex-col border-b lg:border-b-0 lg:border-r border-main bg-main min-h-[50%] lg:min-h-0">
              <div className="p-4 border-b border-main flex flex-wrap items-center justify-between bg-header gap-3">
                <div className="flex items-center gap-2 flex-1 min-w-[200px] bg-surface px-3 py-1.5 rounded-md border border-main focus-within:border-[var(--primary)] transition-colors">
                  <span className="material-symbols-outlined text-muted text-sm">search</span>
                  <input className="bg-transparent border-none focus:ring-0 focus:outline-none text-sm w-full placeholder:text-muted text-main" placeholder="Search repositories..." type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                </div>
                <div className="flex items-center gap-3 ml-auto">
                  <div className="relative group hidden sm:block z-20">
                    <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-surface text-muted text-sm font-medium hover:bg-main transition-colors border border-main">
                      <span className="material-symbols-outlined text-sm">filter_list</span>
                      {repoFilter === 'all' ? 'All' : repoFilter === 'public' ? 'Public' : 'Private'}
                    </button>
                    <div className="absolute right-0 top-full mt-2 w-32 bg-header border border-main rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                      <div className="flex flex-col p-1">
                        <button onClick={() => setRepoFilter('all')} className={`text-left px-3 py-2 text-xs rounded-sm hover:bg-surface ${repoFilter === 'all' ? 'text-[var(--primary)] font-medium bg-[var(--border)]' : 'text-muted'}`}>All</button>
                        <button onClick={() => setRepoFilter('public')} className={`text-left px-3 py-2 text-xs rounded-sm hover:bg-surface ${repoFilter === 'public' ? 'text-[var(--primary)] font-medium bg-[var(--border)]' : 'text-muted'}`}>Public</button>
                        <button onClick={() => setRepoFilter('private')} className={`text-left px-3 py-2 text-xs rounded-sm hover:bg-surface ${repoFilter === 'private' ? 'text-[var(--primary)] font-medium bg-[var(--border)]' : 'text-muted'}`}>Private</button>
                      </div>
                    </div>
                  </div>
                  <button onClick={toggleAuto} className={`flex items-center gap-1.5 px-4 py-1.5 rounded-md transition-colors text-white text-sm font-medium border ${isAutoActive ? 'bg-red-600 border-red-500 hover:bg-red-500' : 'bg-purple-600 border-purple-500 hover:bg-purple-500'}`}>
                    <span className="material-symbols-outlined text-sm">{isAutoActive ? 'pause' : 'play_arrow'}</span>
                    <span>{isAutoActive ? 'Stop Auto' : 'Start Auto'}</span>
                  </button>
                </div>
              </div>

              <div className="flex-1 overflow-auto custom-scrollbar">
                <div className="min-w-[500px] lg:min-w-0">
                  <table className="w-full text-left text-sm whitespace-nowrap">
                    <thead className="sticky top-0 bg-header text-muted z-10 border-b border-main">
                      <tr>
                        <th className="px-6 py-3 font-medium text-xs uppercase tracking-wider">Repository</th>
                        <th className="px-6 py-3 font-medium text-xs uppercase tracking-wider hidden sm:table-cell">Status</th>
                        <th className="px-6 py-3 font-medium text-xs uppercase tracking-wider hidden md:table-cell">Visibility</th>
                        <th className="px-6 py-3 font-medium text-xs uppercase tracking-wider text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y border-muted">
                      {filteredRepos.map(repo => (
                        <tr key={repo.id} className={`hover:bg-surface/50 cursor-pointer ${selectedRepo?.id === repo.id ? 'bg-surface' : ''}`} onClick={() => setSelectedRepo(repo)}>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <span className="material-symbols-outlined text-muted text-xl">{repo.private ? 'lock' : 'folder'}</span>
                              <div className="truncate">
                                <div className="font-medium text-main">{repo.name}</div>
                                <div className="text-xs text-muted">{repo.default_branch} • {repo.owner.login}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 hidden sm:table-cell">
                            <div className="flex items-center gap-2">
                              <span className={`size-2 rounded-full ${repo.id === selectedRepo?.id ? 'bg-green-500' : (theme === 'dark' ? 'bg-green-500/40' : 'bg-green-500/20')}`}></span>
                              <span className="text-main opacity-80">Active</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 hidden md:table-cell">
                            <span className="text-muted capitalize">{repo.visibility}</span>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <button onClick={(e) => { e.stopPropagation(); setSelectedRepo(repo); }} className={`text-xs font-medium px-3 py-1.5 rounded-md transition-colors border ${selectedRepo?.id === repo.id ? 'bg-surface text-main border-main' : 'btn-primary shadow-sm'}`}>{selectedRepo?.id === repo.id ? 'Selected' : 'Select'}</button>
                          </td>
                        </tr>
                      ))}
                      {filteredRepos.length === 0 && <tr><td colSpan="4" className="px-6 py-8 text-center text-muted text-sm">No repositories found.</td></tr>}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="p-6 bg-header border-t border-main grid grid-cols-1 sm:grid-cols-2 gap-8 shrink-0">
                <div className="space-y-4">
                  <div className="flex justify-between items-center text-sm">
                    <label className="font-medium text-muted">Commits Payload</label>
                    <span className="text-main">{targetCommits}</span>
                  </div>
                  <input step="1" min="1" max="100" type="range" value={targetCommits} onChange={(e) => setTargetCommits(parseInt(e.target.value))} className="w-full" />
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between items-center text-sm">
                    <label className="font-medium text-muted mr-2">Interval</label>
                    <div className="flex bg-surface rounded-md p-0.5 border border-main">
                      <button
                        onClick={() => setIntervalUnit('sec')}
                        className={`px-3 py-1 text-xs font-medium rounded-sm transition-colors ${intervalUnit === 'sec' ? 'bg-main text-main shadow-sm' : 'text-muted'}`}
                      >Sec</button>
                      <button
                        onClick={() => setIntervalUnit('min')}
                        className={`px-3 py-1 text-xs font-medium rounded-sm transition-colors ${intervalUnit === 'min' ? 'bg-main text-main shadow-sm' : 'text-muted'}`}
                      >Min</button>
                    </div>
                    <span className="text-main ml-2">{commitInterval}{intervalUnit}</span>
                  </div>
                  <input
                    step="1"
                    min="1"
                    max={intervalUnit === 'min' ? 60 : 120}
                    type="range"
                    value={commitInterval}
                    onChange={(e) => setCommitInterval(parseInt(e.target.value))}
                    className="w-full"
                  />
                </div>
              </div>

              {/* Time Travel Commit - Main Dashboard */}
              {selectedRepo && (
                <div className="p-5 bg-header border-t border-main shrink-0">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="material-symbols-outlined text-[var(--primary)] text-lg">history</span>
                    <h3 className="text-xs font-bold text-main uppercase tracking-wider">Time Travel Commit</h3>
                    <span className="text-[9px] text-muted ml-auto hidden sm:block">
                      {targetCommits} commit(s) • {commitInterval}{intervalUnit} interval → <span className="text-[var(--primary)] font-bold">{selectedRepo.default_branch}</span>
                    </span>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-end">
                    <div className="flex-1 min-w-0">
                      <label className="text-[10px] font-bold text-muted uppercase tracking-wider mb-1 block">Date</label>
                      <input
                        type="date"
                        value={customDate}
                        onChange={(e) => setCustomDate(e.target.value)}
                        className="w-full bg-surface border border-main rounded-md px-2.5 py-2 text-xs text-main focus:outline-none focus:ring-1 focus:ring-[var(--primary)] transition-all"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <label className="text-[10px] font-bold text-muted uppercase tracking-wider mb-1 block">Time</label>
                      <input
                        type="time"
                        value={customTime}
                        onChange={(e) => setCustomTime(e.target.value)}
                        className="w-full bg-surface border border-main rounded-md px-2.5 py-2 text-xs text-main focus:outline-none focus:ring-1 focus:ring-[var(--primary)] transition-all"
                      />
                    </div>
                    <button
                      disabled={!customDate || isPushed || isDatedCommitting}
                      onClick={async () => {
                        if (!selectedRepo || !customDate) return;
                        setIsDatedCommitting(true);
                        const delayMs = intervalUnit === 'min' ? commitInterval * 60000 : commitInterval * 1000;
                        const MAX_RETRIES = 5;

                        // Helper: check if internet is available
                        const checkInternet = async () => {
                          try {
                            await fetch('https://api.github.com', { method: 'HEAD', mode: 'no-cors' });
                            return true;
                          } catch { return false; }
                        };

                        // Helper: wait for internet to come back
                        const waitForInternet = async () => {
                          toast.warning('No internet connection. Waiting to reconnect...');
                          while (true) {
                            await new Promise(r => setTimeout(r, 3000));
                            if (await checkInternet()) {
                              toast.info('Internet restored. Resuming commits...');
                              return;
                            }
                          }
                        };

                        let successCount = 0;

                        while (successCount < targetCommits) {
                          // Check internet before each commit
                          if (!(await checkInternet())) {
                            await waitForInternet();
                          }

                          const offsetHr = String(Math.floor(Math.random() * 23)).padStart(2, '0');
                          const offsetMin = String(Math.floor(Math.random() * 59)).padStart(2, '0');
                          const offsetSec = String(Math.floor(Math.random() * 59)).padStart(2, '0');
                          const commitDate = `${customDate} ${offsetHr}:${offsetMin}:${offsetSec}`;

                          let success = false;
                          for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
                            success = await handleDatedCommit(selectedRepo, commitDate);
                            if (success) break;

                            // Failed — check internet, wait if needed, then retry
                            if (!(await checkInternet())) {
                              await waitForInternet();
                            }
                            toast.warning(`Commit failed. Retrying (${attempt}/${MAX_RETRIES})...`);
                            await new Promise(r => setTimeout(r, 2000));
                          }

                          if (success) {
                            successCount++;
                          } else {
                            toast.error(`Commit failed after ${MAX_RETRIES} retries. Skipping and continuing...`);
                          }

                          // Wait for the interval between commits (skip after last one)
                          if (successCount < targetCommits) {
                            await new Promise(resolve => setTimeout(resolve, delayMs));
                          }
                        }

                        setIsDatedCommitting(false);
                        toast.success(`${successCount}/${targetCommits} commit(s) placed on ${customDate} → pushed to ${selectedRepo.default_branch}`);
                      }}
                      className="shrink-0 btn-primary px-4 py-2 rounded-md text-xs font-bold uppercase transition-all shadow-sm active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1.5"
                    >
                      {isDatedCommitting ? (
                        <><span className="animate-spin text-xs">⏳</span> Working...</>
                      ) : (
                        <><span className="material-symbols-outlined text-sm">schedule_send</span> Time Travel</>
                      )}
                    </button>
                  </div>
                </div>
              )}
            </section>

            {/* Console Section */}
            <section className="w-full lg:w-5/12 flex flex-col bg-header relative h-1/2 lg:h-auto overflow-hidden">
              <div className="p-4 border-b border-main flex justify-between items-center bg-header shrink-0">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-muted text-lg">terminal</span>
                  <h2 className="text-sm font-medium text-main">Console Pipeline</h2>
                </div>
                <div className="flex gap-4 items-center">
                  <div className="hidden sm:flex items-center gap-2">
                    <span className={`size-2 rounded-full ${isPushed ? 'bg-green-500' : 'bg-muted opacity-40'}`}></span>
                    <span className="text-xs text-muted font-mono">{isPushed ? 'Active' : 'Idle'}</span>
                  </div>
                  <button onClick={clearLogs} className="text-muted hover:text-main transition-colors">
                    <span className="material-symbols-outlined text-lg">delete</span>
                  </button>
                </div>
              </div>

              <div className="terminal" ref={terminalRef}>
                {statusLogs.length === 0 && (
                  <div className="flex gap-2">
                    <span className="text-muted opacity-50">{new Date().toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit' })}</span>
                    <span className="text-[var(--primary)] font-medium">system</span>
                    <span className="text-muted italic opacity-70">ready. awaiting commands.</span>
                  </div>
                )}
                {statusLogs.map(log => (
                  <div key={log.id} className="flex gap-2 items-start text-[11px]">
                    <span className="text-muted opacity-40 mt-0.5 whitespace-nowrap">{log.timestamp}</span>
                    <span className={`font-semibold min-w-[55px] ${log.success ? 'text-green-500' : 'text-red-500'}`}>
                      {log.success ? 'SUCCESS' : 'ERROR'}
                    </span>
                    <span className="text-main opacity-90">{log.message}</span>
                  </div>
                ))}
                <div className="flex gap-2 pt-2"><span className="text-green-500 animate-pulse">▋</span></div>
              </div>

              <div className="p-4 bg-main border-t border-main shrink-0 mt-auto">
                <div className="flex flex-col gap-2 p-3 bg-header rounded-md border border-main focus-within:border-[var(--primary)] transition-colors">
                  <div className="flex items-center gap-3">
                    <span className="hidden sm:inline text-[var(--primary)] font-mono text-[10px] shrink-0 uppercase tracking-tighter opacity-80">&gt; target: {selectedRepo ? selectedRepo.name : 'none'} $</span>
                    <input readOnly value={isPushed ? "Executing payload..." : (selectedRepo ? `Awaiting start signal...` : "Select a repository to begin.")} className="bg-transparent border-none focus:ring-0 focus:outline-none text-[11px] font-mono text-main w-full placeholder:text-muted p-0 truncate" />
                    <button
                      onClick={() => selectedRepo && handleCommit(selectedRepo)}
                      disabled={!selectedRepo || isPushed || isAutoActive}
                      className="shrink-0 btn-primary px-3 py-1.5 rounded-md text-[11px] font-bold uppercase transition-all shadow-sm active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Trigger
                    </button>
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* Repositories Page */}
        {dashboardPage === 'repos' && (
          <div className="flex-1 overflow-auto p-8 bg-main">
            <h2 className="text-2xl font-semibold text-main mb-6">Repositories</h2>
            <p className="text-muted text-sm mb-8">All your connected GitHub repositories at a glance.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {repos.map(repo => (
                <div key={repo.id} className="bg-card border border-main rounded-lg p-5 hover:border-[var(--primary)] transition-colors shadow-sm">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-muted">{repo.private ? 'lock' : 'folder'}</span>
                      <h3 className="text-sm font-medium text-main truncate">{repo.name}</h3>
                    </div>
                    <span className="text-xs text-muted capitalize bg-surface px-2 py-0.5 rounded-full border border-main">{repo.visibility}</span>
                  </div>
                  <p className="text-xs text-muted mb-4 line-clamp-2">{repo.description || 'No description provided.'}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted opacity-80">{repo.default_branch} • {repo.language || 'N/A'}</span>
                    <button onClick={() => { setSelectedRepo(repo); setDashboardPage('dashboard'); }} className="text-xs font-medium text-[var(--primary)] hover:opacity-80 transition-all">Select Repo →</button>
                  </div>
                </div>
              ))}
            </div>
            {repos.length === 0 && <p className="text-muted text-sm text-center py-12">No repositories found. Connect your GitHub account to get started.</p>}
          </div>
        )}

        {/* Schedule Page */}
        {dashboardPage === 'schedule' && (
          <div className="flex-1 overflow-auto p-8 bg-main">
            <h2 className="text-2xl font-semibold text-main mb-6">Schedule</h2>
            <p className="text-muted text-sm mb-8">Manage your automated commit schedule and timing preferences.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-card border border-main rounded-lg p-6 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <span className="material-symbols-outlined text-[var(--primary)]">schedule</span>
                  <h3 className="text-sm font-medium text-main">Current Configuration</h3>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted">Commit Payload</span>
                    <span className="text-sm font-medium text-main">{targetCommits} commits</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted">Interval</span>
                    <span className="text-sm font-medium text-main">{commitInterval} {intervalUnit === 'min' ? 'minutes' : 'seconds'}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted">Auto Mode</span>
                    <span className={`text-sm font-medium ${isAutoActive ? 'text-green-500' : 'text-muted opacity-60'}`}>{isAutoActive ? 'Active' : 'Inactive'}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted">Target Repository</span>
                    <span className="text-sm font-medium text-main">{selectedRepo ? selectedRepo.name : 'None selected'}</span>
                  </div>
                </div>
              </div>
              <div className="bg-card border border-main rounded-lg p-6 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <span className="material-symbols-outlined text-[var(--primary)]">timer</span>
                  <h3 className="text-sm font-medium text-main">Quick Actions</h3>
                </div>
                <div className="space-y-3">
                  <button onClick={() => { setTargetCommits(1); setCommitInterval(2); setIntervalUnit('min'); }} className="w-full text-left px-4 py-3 bg-surface border border-main rounded-md text-sm text-main hover:bg-header hover:border-[var(--primary)] transition-all">🟢 Light — 1 commit / 2 min</button>
                  <button onClick={() => { setTargetCommits(5); setCommitInterval(5); setIntervalUnit('min'); }} className="w-full text-left px-4 py-3 bg-surface border border-main rounded-md text-sm text-main hover:bg-header hover:border-[var(--primary)] transition-all">🟡 Moderate — 5 commits / 5 min</button>
                  <button onClick={() => { setTargetCommits(20); setCommitInterval(1); setIntervalUnit('min'); }} className="w-full text-left px-4 py-3 bg-surface border border-main rounded-md text-sm text-main hover:bg-header hover:border-[var(--primary)] transition-all">🔴 Heavy — 20 commits / 1 min</button>
                </div>
              </div>
            </div>

            {/* Time Travel Commit Section */}
            <div className="mt-6 bg-card border border-main rounded-lg p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-2">
                <span className="material-symbols-outlined text-[var(--primary)]">history</span>
                <h3 className="text-sm font-medium text-main">Time Travel Commit</h3>
              </div>
              <p className="text-xs text-muted mb-6">Select a specific date and time to place commits on your contribution graph. Commits will appear as if they were made on that exact date.</p>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-muted uppercase tracking-wider">Date</label>
                  <input
                    type="date"
                    value={customDate}
                    onChange={(e) => setCustomDate(e.target.value)}
                    className="w-full bg-surface border border-main rounded-lg px-3 py-2.5 text-sm text-main focus:outline-none focus:ring-2 focus:ring-[var(--primary)] transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-muted uppercase tracking-wider">Time</label>
                  <input
                    type="time"
                    value={customTime}
                    onChange={(e) => setCustomTime(e.target.value)}
                    className="w-full bg-surface border border-main rounded-lg px-3 py-2.5 text-sm text-main focus:outline-none focus:ring-2 focus:ring-[var(--primary)] transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-muted uppercase tracking-wider">Commits</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      min="1"
                      max="50"
                      value={datedCommitCount}
                      onChange={(e) => setDatedCommitCount(Math.max(1, Math.min(50, parseInt(e.target.value) || 1)))}
                      className="w-full bg-surface border border-main rounded-lg px-3 py-2.5 text-sm text-main focus:outline-none focus:ring-2 focus:ring-[var(--primary)] transition-all"
                    />
                  </div>
                </div>
                <button
                  disabled={!selectedRepo || !customDate || isPushed || isDatedCommitting}
                  onClick={async () => {
                    if (!selectedRepo || !customDate) return;
                    setIsDatedCommitting(true);
                    const fullDate = `${customDate} ${customTime}:00`;
                    for (let i = 0; i < datedCommitCount; i++) {
                      // Add slight random time offset to each commit so they're unique
                      const offsetMin = Math.floor(Math.random() * 59);
                      const offsetSec = Math.floor(Math.random() * 59);
                      const [datePart] = fullDate.split(' ');
                      const commitDate = `${datePart} ${String(Math.floor(Math.random() * 23)).padStart(2, '0')}:${String(offsetMin).padStart(2, '0')}:${String(offsetSec).padStart(2, '0')}`;
                      await handleDatedCommit(selectedRepo, commitDate);
                    }
                    setIsDatedCommitting(false);
                    toast.success(`${datedCommitCount} commit(s) placed on ${customDate}`);
                  }}
                  className="btn-primary px-4 py-2.5 rounded-lg text-sm font-bold transition-all shadow-md hover:scale-[1.02] active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
                >
                  {isDatedCommitting ? (
                    <><span className="animate-spin">⏳</span> Committing...</>
                  ) : (
                    <><span className="material-symbols-outlined text-base">schedule_send</span> Time Travel</>
                  )}
                </button>
              </div>

              {!selectedRepo && (
                <p className="text-xs text-red-400 mt-3 flex items-center gap-1">
                  <span className="material-symbols-outlined text-xs">warning</span>
                  Select a repository from the main dashboard first.
                </p>
              )}
            </div>
          </div>
        )}

        {/* Analytics Page */}
        {dashboardPage === 'analytics' && (
          <div className="flex-1 overflow-auto p-8 bg-main">
            <h2 className="text-2xl font-semibold text-main mb-6">Analytics</h2>
            <p className="text-muted text-sm mb-8">Track your commit activity and repository statistics.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
              <div className="bg-card border border-main rounded-lg p-5 shadow-sm">
                <span className="text-xs text-muted uppercase tracking-wider font-semibold opacity-70">Total Commits</span>
                <p className="text-2xl font-bold text-main mt-1 tracking-tight">{totalCommits.toLocaleString()}</p>
              </div>
              <div className="bg-card border border-main rounded-lg p-5 shadow-sm">
                <span className="text-xs text-muted uppercase tracking-wider font-semibold opacity-70">Repositories</span>
                <p className="text-2xl font-bold text-main mt-1 tracking-tight">{repos.length}</p>
              </div>
              <div className="bg-card border border-main rounded-lg p-5 shadow-sm">
                <span className="text-xs text-muted uppercase tracking-wider font-semibold opacity-70">Active Target</span>
                <p className="text-2xl font-bold text-main mt-1 tracking-tight truncate">{selectedRepo ? selectedRepo.name : '—'}</p>
              </div>
              <div className="bg-card border border-main rounded-lg p-5 shadow-sm">
                <span className="text-xs text-muted uppercase tracking-wider font-semibold opacity-70">Pipeline Status</span>
                <p className={`text-2xl font-bold mt-1 tracking-tight ${isAutoActive ? 'text-green-500' : 'text-muted opacity-40'}`}>{isAutoActive ? 'Running' : 'Stopped'}</p>
              </div>
            </div>
            <div className="bg-card border border-main rounded-lg p-6 shadow-sm">
              <h3 className="text-sm font-semibold text-main mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-sm">history</span>
                Recent Activity Log
              </h3>
              <div className="space-y-2 max-h-64 overflow-y-auto custom-scrollbar">
                {statusLogs.length === 0 && <p className="text-muted text-sm italic">No activity recorded yet. Start committing to see logs here.</p>}
                {statusLogs.slice(-20).reverse().map(log => (
                  <div key={log.id} className="flex items-center gap-3 px-3 py-2 bg-surface rounded-md border border-main">
                    <span className={`size-2 rounded-full shrink-0 ${log.success ? 'bg-green-500' : 'bg-red-500'}`}></span>
                    <span className="text-xs text-muted font-mono shrink-0 opacity-60">{log.timestamp}</span>
                    <span className="text-sm text-main opacity-90 truncate">{log.message}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Help Page */}
        {dashboardPage === 'help' && (
          <div className="flex-1 overflow-auto p-8 bg-main font-['Inter', sans-serif]">
            <h2 className="text-2xl font-bold text-main mb-6">Help & Guide</h2>
            <p className="text-muted text-sm mb-8 opacity-80">Quick reference guide for using the GitGhost dashboard.</p>
            <div className="space-y-4">
              <div className="bg-card border border-main rounded-lg p-5 shadow-sm hover:border-[var(--primary)] transition-all">
                <div className="flex items-center gap-3 mb-2">
                  <span className="material-symbols-outlined text-[var(--primary)]">grid_view</span>
                  <h3 className="text-sm font-semibold text-main">Dashboard</h3>
                </div>
                <p className="text-sm text-muted">The main command center. Select a repository from the table, configure your commit payload and interval using the sliders, then start the auto-commit pipeline or trigger a manual push.</p>
              </div>
              <div className="bg-card border border-main rounded-lg p-5 shadow-sm hover:border-[var(--primary)] transition-all">
                <div className="flex items-center gap-3 mb-2">
                  <span className="material-symbols-outlined text-[var(--primary)]">account_tree</span>
                  <h3 className="text-sm font-semibold text-main">Repositories</h3>
                </div>
                <p className="text-sm text-muted">Browse all your connected GitHub repositories in a card layout. Click "Select" on any repo to quickly target it for commits in the dashboard.</p>
              </div>
              <div className="bg-card border border-main rounded-lg p-5 shadow-sm hover:border-[var(--primary)] transition-all">
                <div className="flex items-center gap-3 mb-2">
                  <span className="material-symbols-outlined text-[var(--primary)]">calendar_month</span>
                  <h3 className="text-sm font-semibold text-main">Schedule</h3>
                </div>
                <p className="text-sm text-muted">View your current configuration at a glance and use quick presets (Light, Moderate, Heavy) to rapidly adjust your commit frequency.</p>
              </div>
              <div className="bg-card border border-main rounded-lg p-5 shadow-sm hover:border-[var(--primary)] transition-all">
                <div className="flex items-center gap-3 mb-2">
                  <span className="material-symbols-outlined text-[var(--primary)]">monitoring</span>
                  <h3 className="text-sm font-semibold text-main">Analytics</h3>
                </div>
                <p className="text-sm text-muted">Monitor your commit stats, repository count, pipeline status, and review your recent activity log in one place.</p>
              </div>
              <div className="bg-card border border-main rounded-lg p-5 shadow-sm hover:border-[var(--primary)] transition-all">
                <div className="flex items-center gap-3 mb-2">
                  <span className="material-symbols-outlined text-[var(--primary)]">token</span>
                  <h3 className="text-sm font-semibold text-main">Personal Access Token</h3>
                </div>
                <p className="text-sm text-muted">GitGhost uses a classic GitHub Personal Access Token (PAT) with <strong className="text-main font-bold">repo</strong> scope to authenticate. Tokens are stored locally in your browser and can be cleared by logging out.</p>
              </div>
            </div>
          </div>
        )}
      </div>

      <style>{`
        .spin { animation: spin 1s linear infinite; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .material-symbols-outlined { font-variation-settings: 'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24; }
      `}</style>

      {/* Logout Confirmation Modal */}
      <AnimatePresence>
        {showLogoutModal && (
          <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setShowLogoutModal(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-sm bg-card border border-main rounded-xl shadow-2xl p-6"
            >
              <div className="flex flex-col items-center text-center">
                <div className="size-12 rounded-full bg-red-500/10 flex items-center justify-center mb-4">
                  <span className="material-symbols-outlined text-red-500 text-2xl">logout</span>
                </div>
                <h3 className="text-xl font-bold text-main mb-2">Confirm Logout</h3>
                <p className="text-muted text-sm mb-8 opacity-80">
                  Are you sure you want to log out of GitGhost? You will need to re-authenticate to continue.
                </p>
                <div className="flex w-full gap-3">
                  <button
                    onClick={() => setShowLogoutModal(false)}
                    className="flex-1 py-2.5 px-4 rounded-md border border-main text-muted font-medium hover:bg-surface transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleLogout}
                    className="flex-1 py-2.5 px-4 rounded-md bg-red-600 border border-red-500 text-white font-bold hover:bg-red-500 transition-colors shadow-lg active:scale-95"
                  >
                    Log Out
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Dashboard;
