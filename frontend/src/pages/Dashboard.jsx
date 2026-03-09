import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from '../assets/Logo.png';
import Step1 from '../assets/Step 1.png';
import Step2 from '../assets/Step 2.jpg';
import Step3 from '../assets/Step 3.jpg';
import Step4 from '../assets/Step 4.jpg';
import Step5 from '../assets/Step 5.jpg';
import Step6 from '../assets/Step 6.jpg';
import Step7 from '../assets/Step 7.jpg';
import Step8 from '../assets/Step 8.jpg';
import ExpandableImage from '../components/ExpandableImage';

const Dashboard = ({
  totalCommits, repos, githubUser, setGithubUser, dashboardPage, setDashboardPage,
  searchQuery, setSearchQuery, repoFilter, setRepoFilter, isAutoActive, toggleAuto, filteredRepos,
  selectedRepo, setSelectedRepo, targetCommits, setTargetCommits,
  commitInterval, setCommitInterval, intervalUnit, setIntervalUnit,
  isPushed, clearLogs, statusLogs, terminalRef, handleCommit
}) => {
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('gh_pat');
    setGithubUser(null);
    toast.success("Successfully logged out");
    setShowLogoutModal(false);
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-zinc-900">
      {/* Header */}
      <header className="bg-zinc-950 sticky top-0 z-50 flex flex-wrap items-center justify-between px-6 py-3 shrink-0 border-b border-zinc-800">
        <div className="flex items-center gap-3">
          <img src={Logo} alt="GitGhost Logo" className="h-14 w-auto drop-shadow-sm" />
          <h1 className="text-xl font-medium text-zinc-100 truncate">
            GitGhost
          </h1>
        </div>

        <div className="flex items-center gap-4 sm:gap-6">
          <div className="hidden md:flex items-center gap-6">
            <div className="flex flex-col items-end">
              <span className="text-xs text-zinc-400">Total Commits</span>
              <span className="text-sm font-medium text-zinc-100">{totalCommits.toLocaleString()}</span>
            </div>
            <div className="flex flex-col items-end">
              <span className="text-xs text-zinc-400">Repositories</span>
              <span className="text-sm font-medium text-zinc-100">{repos.length}</span>
            </div>
          </div>

          <div className="hidden sm:block h-6 w-px bg-zinc-800 mx-2"></div>

          <div className="flex items-center gap-4">
            <button className="text-zinc-400 hover:text-zinc-100 transition-colors">
              <span className="material-symbols-outlined text-xl">settings</span>
            </button>

            <div className="size-8 rounded-full overflow-hidden group relative border border-zinc-700">
              <img alt="Profile" className="object-cover w-full h-full" src={githubUser?.avatar_url || "https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"} />
              <button onClick={() => setShowLogoutModal(true)} className="absolute inset-0 bg-zinc-900/80 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity" title="Logout">
                <span className="material-symbols-outlined text-zinc-100 text-sm">logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar - Hidden on mobile, shown as a skinny bar on desktop */}
        <aside className="hidden md:flex w-16 bg-zinc-950 border-r border-zinc-800 flex-col items-center py-6 shrink-0 gap-8">
          <nav className="flex flex-col gap-6">
            <button onClick={() => setDashboardPage('dashboard')} className={`${dashboardPage === 'dashboard' ? 'text-zinc-100' : 'text-zinc-500 hover:text-zinc-100'} transition-colors`} title="Dashboard">
              <span className="material-symbols-outlined text-2xl">grid_view</span>
            </button>
            <button onClick={() => setDashboardPage('repos')} className={`${dashboardPage === 'repos' ? 'text-zinc-100' : 'text-zinc-500 hover:text-zinc-100'} transition-colors`} title="Repositories">
              <span className="material-symbols-outlined text-2xl">account_tree</span>
            </button>
            <button onClick={() => setDashboardPage('schedule')} className={`${dashboardPage === 'schedule' ? 'text-zinc-100' : 'text-zinc-500 hover:text-zinc-100'} transition-colors`} title="Schedule">
              <span className="material-symbols-outlined text-2xl">calendar_month</span>
            </button>
            <button onClick={() => setDashboardPage('analytics')} className={`${dashboardPage === 'analytics' ? 'text-zinc-100' : 'text-zinc-500 hover:text-zinc-100'} transition-colors`} title="Analytics">
              <span className="material-symbols-outlined text-2xl">monitoring</span>
            </button>
          </nav>
          <div className="mt-auto flex flex-col gap-6 mb-4">
            <button onClick={() => setDashboardPage('how-it-works')} className={`${dashboardPage === 'how-it-works' ? 'text-zinc-100' : 'text-zinc-500 hover:text-zinc-100'} transition-colors`} title="How It Works">
              <span className="material-symbols-outlined text-2xl">integration_instructions</span>
            </button>
            <button onClick={() => setDashboardPage('help')} className={`${dashboardPage === 'help' ? 'text-zinc-100' : 'text-zinc-500 hover:text-zinc-100'} transition-colors`} title="Help">
              <span className="material-symbols-outlined text-2xl">help_outline</span>
            </button>
          </div>
        </aside>

        {dashboardPage === 'dashboard' && (
          <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
            {/* Main List Section */}
            <section className="w-full lg:w-7/12 flex flex-col border-b lg:border-b-0 lg:border-r border-zinc-800 bg-zinc-900 min-h-[50%] lg:min-h-0">
              <div className="p-4 border-b border-zinc-800 flex flex-wrap items-center justify-between bg-zinc-950 gap-3">
                <div className="flex items-center gap-2 flex-1 min-w-[200px] bg-zinc-900 px-3 py-1.5 rounded-md border border-zinc-800 focus-within:border-purple-500 transition-colors">
                  <span className="material-symbols-outlined text-zinc-500 text-sm">search</span>
                  <input className="bg-transparent border-none focus:ring-0 text-sm w-full placeholder:text-zinc-500 text-zinc-100" placeholder="Search repositories..." type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                </div>
                <div className="flex items-center gap-3 ml-auto">
                  <div className="relative group hidden sm:block z-20">
                    <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-zinc-800 text-zinc-300 text-sm font-medium hover:bg-zinc-700 transition-colors border border-zinc-700">
                      <span className="material-symbols-outlined text-sm">filter_list</span>
                      {repoFilter === 'all' ? 'All' : repoFilter === 'public' ? 'Public' : 'Private'}
                    </button>
                    <div className="absolute right-0 top-full mt-2 w-32 bg-zinc-900 border border-zinc-800 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                      <div className="flex flex-col p-1">
                        <button onClick={() => setRepoFilter('all')} className={`text-left px-3 py-2 text-xs rounded-sm hover:bg-zinc-800 ${repoFilter === 'all' ? 'text-white font-medium bg-zinc-800/50' : 'text-zinc-400'}`}>All</button>
                        <button onClick={() => setRepoFilter('public')} className={`text-left px-3 py-2 text-xs rounded-sm hover:bg-zinc-800 ${repoFilter === 'public' ? 'text-white font-medium bg-zinc-800/50' : 'text-zinc-400'}`}>Public</button>
                        <button onClick={() => setRepoFilter('private')} className={`text-left px-3 py-2 text-xs rounded-sm hover:bg-zinc-800 ${repoFilter === 'private' ? 'text-white font-medium bg-zinc-800/50' : 'text-zinc-400'}`}>Private</button>
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
                    <thead className="sticky top-0 bg-zinc-950 text-zinc-400 z-10 border-b border-zinc-800">
                      <tr>
                        <th className="px-6 py-3 font-medium text-xs uppercase text-zinc-500 tracking-wider">Repository</th>
                        <th className="px-6 py-3 font-medium text-xs uppercase text-zinc-500 tracking-wider hidden sm:table-cell">Status</th>
                        <th className="px-6 py-3 font-medium text-xs uppercase text-zinc-500 tracking-wider hidden md:table-cell">Visibility</th>
                        <th className="px-6 py-3 font-medium text-xs uppercase text-zinc-500 tracking-wider text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-800/50">
                      {filteredRepos.map(repo => (
                        <tr key={repo.id} className={`hover:bg-zinc-800/50 cursor-pointer ${selectedRepo?.id === repo.id ? 'bg-zinc-800/80' : ''}`} onClick={() => setSelectedRepo(repo)}>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <span className="material-symbols-outlined text-zinc-400 text-xl">{repo.private ? 'lock' : 'folder'}</span>
                              <div className="truncate">
                                <div className="font-medium text-zinc-100">{repo.name}</div>
                                <div className="text-xs text-zinc-500">{repo.default_branch} • {repo.owner.login}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 hidden sm:table-cell">
                            <div className="flex items-center gap-2">
                              <span className={`size-2 rounded-full ${repo.id === selectedRepo?.id ? 'bg-green-500' : 'bg-green-500/40'}`}></span>
                              <span className="text-zinc-300">Active</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 hidden md:table-cell">
                            <span className="text-zinc-400 capitalize">{repo.visibility}</span>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <button onClick={(e) => { e.stopPropagation(); setSelectedRepo(repo); }} className={`text-xs font-medium px-3 py-1.5 rounded-md transition-colors border ${selectedRepo?.id === repo.id ? 'bg-zinc-800 text-zinc-300 border-zinc-700' : 'text-zinc-900 bg-zinc-100 border-transparent hover:bg-white'}`}>{selectedRepo?.id === repo.id ? 'Selected' : 'Select'}</button>
                          </td>
                        </tr>
                      ))}
                      {filteredRepos.length === 0 && <tr><td colSpan="4" className="px-6 py-8 text-center text-zinc-500 text-sm">No repositories found.</td></tr>}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="p-6 bg-zinc-950 border-t border-zinc-800 grid grid-cols-1 sm:grid-cols-2 gap-8 shrink-0">
                <div className="space-y-4">
                  <div className="flex justify-between items-center text-sm">
                    <label className="font-medium text-zinc-300">Commits Payload</label>
                    <span className="text-zinc-100">{targetCommits}</span>
                  </div>
                  <input step="1" min="1" max="100" type="range" value={targetCommits} onChange={(e) => setTargetCommits(parseInt(e.target.value))} className="w-full" />
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between items-center text-sm">
                    <label className="font-medium text-zinc-300 mr-2">Interval</label>
                    <div className="flex bg-zinc-800 rounded-md p-0.5 border border-zinc-700">
                      <button
                        onClick={() => setIntervalUnit('sec')}
                        className={`px-3 py-1 text-xs font-medium rounded-sm transition-colors ${intervalUnit === 'sec' ? 'bg-zinc-600 text-white' : 'text-zinc-400'}`}
                      >Sec</button>
                      <button
                        onClick={() => setIntervalUnit('min')}
                        className={`px-3 py-1 text-xs font-medium rounded-sm transition-colors ${intervalUnit === 'min' ? 'bg-zinc-600 text-white' : 'text-zinc-400'}`}
                      >Min</button>
                    </div>
                    <span className="text-zinc-100 ml-2">{commitInterval}{intervalUnit}</span>
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
            </section>

            {/* Console Section */}
            <section className="w-full lg:w-5/12 flex flex-col bg-zinc-950 relative h-1/2 lg:h-auto overflow-hidden">
              <div className="p-4 border-b border-zinc-800 flex justify-between items-center bg-zinc-950 shrink-0">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-zinc-500 text-lg">terminal</span>
                  <h2 className="text-sm font-medium text-zinc-100">Console Pipeline</h2>
                </div>
                <div className="flex gap-4 items-center">
                  <div className="hidden sm:flex items-center gap-2">
                     <span className={`size-2 rounded-full ${isPushed ? 'bg-green-500' : 'bg-zinc-600'}`}></span>
                    <span className="text-xs text-zinc-500 font-mono">{isPushed ? 'Active' : 'Idle'}</span>
                  </div>
                  <button onClick={clearLogs} className="text-zinc-500 hover:text-zinc-300 transition-colors">
                    <span className="material-symbols-outlined text-lg">delete</span>
                  </button>
                </div>
              </div>

              <div className="flex-1 p-4 font-mono text-xs leading-relaxed overflow-y-auto space-y-2 bg-zinc-950 text-zinc-300" ref={terminalRef}>
                {statusLogs.length === 0 && (
                  <div className="flex gap-2">
                    <span className="text-zinc-500">{new Date().toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit' })}</span>
                    <span className="text-purple-400">system</span>
                    <span className="text-zinc-400">ready. awaiting commands.</span>
                  </div>
                )}
                {statusLogs.map(log => (
                  <div key={log.id} className="flex gap-2 items-start">
                    <span className="text-zinc-500 mt-0.5">{log.timestamp}</span>
                    <span className={`font-medium ${log.success ? 'text-green-400' : 'text-red-400'}`}>
                      {log.success ? 'success' : 'error'}
                    </span>
                    <span className="text-zinc-300">{log.message}</span>
                  </div>
                ))}
                <div className="flex gap-2 pt-2"><span className="text-green-500">▋</span></div>
              </div>

              <div className="p-4 bg-zinc-900 border-t border-zinc-800 shrink-0 mt-auto">
                <div className="flex flex-col gap-2 p-3 bg-zinc-950 rounded-md border border-zinc-800 focus-within:border-purple-500 transition-colors">
                  <div className="flex items-center gap-3">
                    <span className="hidden sm:inline text-purple-400 font-mono text-xs shrink-0">&gt; target: {selectedRepo ? selectedRepo.name : 'none'} $</span>
                    <input readOnly value={isPushed ? "Executing payload..." : (selectedRepo ? `Awaiting start signal...` : "Select a repository to begin.")} className="bg-transparent border-none focus:ring-0 text-xs font-mono text-zinc-100 w-full placeholder:text-zinc-500 p-0 truncate" />
                    <button
                      onClick={() => selectedRepo && handleCommit(selectedRepo)}
                      disabled={!selectedRepo || isPushed || isAutoActive}
                      className="shrink-0 bg-zinc-100 text-zinc-900 border border-transparent px-3 py-1.5 rounded-md text-xs font-medium hover:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Manual Push
                    </button>
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* Repositories Page */}
        {dashboardPage === 'repos' && (
          <div className="flex-1 overflow-auto p-8">
            <h2 className="text-2xl font-semibold text-zinc-100 mb-6">Repositories</h2>
            <p className="text-zinc-400 text-sm mb-8">All your connected GitHub repositories at a glance.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {repos.map(repo => (
                <div key={repo.id} className="bg-zinc-950 border border-zinc-800 rounded-lg p-5 hover:border-zinc-700 transition-colors">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-zinc-400">{repo.private ? 'lock' : 'folder'}</span>
                      <h3 className="text-sm font-medium text-zinc-100 truncate">{repo.name}</h3>
                    </div>
                    <span className="text-xs text-zinc-500 capitalize bg-zinc-900 px-2 py-0.5 rounded-full border border-zinc-800">{repo.visibility}</span>
                  </div>
                  <p className="text-xs text-zinc-500 mb-4 line-clamp-2">{repo.description || 'No description provided.'}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-zinc-500">{repo.default_branch} • {repo.language || 'N/A'}</span>
                    <button onClick={() => { setSelectedRepo(repo); setDashboardPage('dashboard'); }} className="text-xs font-medium text-purple-400 hover:text-purple-300 transition-colors">Select →</button>
                  </div>
                </div>
              ))}
            </div>
            {repos.length === 0 && <p className="text-zinc-500 text-sm text-center py-12">No repositories found. Connect your GitHub account to get started.</p>}
          </div>
        )}

        {/* Schedule Page */}
        {dashboardPage === 'schedule' && (
          <div className="flex-1 overflow-auto p-8">
            <h2 className="text-2xl font-semibold text-zinc-100 mb-6">Schedule</h2>
            <p className="text-zinc-400 text-sm mb-8">Manage your automated commit schedule and timing preferences.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-zinc-950 border border-zinc-800 rounded-lg p-6">
                <div className="flex items-center gap-3 mb-4">
                  <span className="material-symbols-outlined text-purple-400">schedule</span>
                  <h3 className="text-sm font-medium text-zinc-100">Current Configuration</h3>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-zinc-400">Commit Payload</span>
                    <span className="text-sm font-medium text-zinc-100">{targetCommits} commits</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-zinc-400">Interval</span>
                    <span className="text-sm font-medium text-zinc-100">{commitInterval} {intervalUnit === 'min' ? 'minutes' : 'seconds'}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-zinc-400">Auto Mode</span>
                    <span className={`text-sm font-medium ${isAutoActive ? 'text-green-400' : 'text-zinc-500'}`}>{isAutoActive ? 'Active' : 'Inactive'}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-zinc-400">Target Repository</span>
                    <span className="text-sm font-medium text-zinc-100">{selectedRepo ? selectedRepo.name : 'None selected'}</span>
                  </div>
                </div>
              </div>
              <div className="bg-zinc-950 border border-zinc-800 rounded-lg p-6">
                <div className="flex items-center gap-3 mb-4">
                  <span className="material-symbols-outlined text-purple-400">timer</span>
                  <h3 className="text-sm font-medium text-zinc-100">Quick Actions</h3>
                </div>
                <div className="space-y-3">
                  <button onClick={() => { setTargetCommits(1); setCommitInterval(2); setIntervalUnit('min'); }} className="w-full text-left px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-md text-sm text-zinc-300 hover:bg-zinc-800 hover:border-zinc-700 transition-colors">🟢 Light — 1 commit / 2 min</button>
                  <button onClick={() => { setTargetCommits(5); setCommitInterval(5); setIntervalUnit('min'); }} className="w-full text-left px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-md text-sm text-zinc-300 hover:bg-zinc-800 hover:border-zinc-700 transition-colors">🟡 Moderate — 5 commits / 5 min</button>
                  <button onClick={() => { setTargetCommits(20); setCommitInterval(1); setIntervalUnit('min'); }} className="w-full text-left px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-md text-sm text-zinc-300 hover:bg-zinc-800 hover:border-zinc-700 transition-colors">🔴 Heavy — 20 commits / 1 min</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Analytics Page */}
        {dashboardPage === 'analytics' && (
          <div className="flex-1 overflow-auto p-8">
            <h2 className="text-2xl font-semibold text-zinc-100 mb-6">Analytics</h2>
            <p className="text-zinc-400 text-sm mb-8">Track your commit activity and repository statistics.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
              <div className="bg-zinc-950 border border-zinc-800 rounded-lg p-5">
                <span className="text-xs text-zinc-500 uppercase tracking-wider">Total Commits</span>
                <p className="text-2xl font-semibold text-zinc-100 mt-1">{totalCommits.toLocaleString()}</p>
              </div>
              <div className="bg-zinc-950 border border-zinc-800 rounded-lg p-5">
                <span className="text-xs text-zinc-500 uppercase tracking-wider">Repositories</span>
                <p className="text-2xl font-semibold text-zinc-100 mt-1">{repos.length}</p>
              </div>
              <div className="bg-zinc-950 border border-zinc-800 rounded-lg p-5">
                <span className="text-xs text-zinc-500 uppercase tracking-wider">Active Target</span>
                <p className="text-2xl font-semibold text-zinc-100 mt-1">{selectedRepo ? selectedRepo.name : '—'}</p>
              </div>
              <div className="bg-zinc-950 border border-zinc-800 rounded-lg p-5">
                <span className="text-xs text-zinc-500 uppercase tracking-wider">Pipeline Status</span>
                <p className={`text-2xl font-semibold mt-1 ${isAutoActive ? 'text-green-400' : 'text-zinc-500'}`}>{isAutoActive ? 'Running' : 'Stopped'}</p>
              </div>
            </div>
            <div className="bg-zinc-950 border border-zinc-800 rounded-lg p-6">
              <h3 className="text-sm font-medium text-zinc-100 mb-4">Recent Activity Log</h3>
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {statusLogs.length === 0 && <p className="text-zinc-500 text-sm">No activity recorded yet. Start committing to see logs here.</p>}
                {statusLogs.slice(-20).reverse().map(log => (
                  <div key={log.id} className="flex items-center gap-3 px-3 py-2 bg-zinc-900 rounded-md border border-zinc-800">
                    <span className={`size-2 rounded-full shrink-0 ${log.success ? 'bg-green-500' : 'bg-red-500'}`}></span>
                    <span className="text-xs text-zinc-500 font-mono shrink-0">{log.timestamp}</span>
                    <span className="text-sm text-zinc-300 truncate">{log.message}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Help Page */}
        {dashboardPage === 'help' && (
          <div className="flex-1 overflow-auto p-8">
            <h2 className="text-2xl font-semibold text-zinc-100 mb-6">Help & Guide</h2>
            <p className="text-zinc-400 text-sm mb-8">Quick reference guide for using the GitGhost dashboard.</p>
            <div className="space-y-4">
              <div className="bg-zinc-950 border border-zinc-800 rounded-lg p-5">
                <div className="flex items-center gap-3 mb-2">
                  <span className="material-symbols-outlined text-purple-400">grid_view</span>
                  <h3 className="text-sm font-medium text-zinc-100">Dashboard</h3>
                </div>
                <p className="text-sm text-zinc-400">The main command center. Select a repository from the table, configure your commit payload and interval using the sliders, then start the auto-commit pipeline or trigger a manual push.</p>
              </div>
              <div className="bg-zinc-950 border border-zinc-800 rounded-lg p-5">
                <div className="flex items-center gap-3 mb-2">
                  <span className="material-symbols-outlined text-purple-400">account_tree</span>
                  <h3 className="text-sm font-medium text-zinc-100">Repositories</h3>
                </div>
                <p className="text-sm text-zinc-400">Browse all your connected GitHub repositories in a card layout. Click "Select" on any repo to quickly target it for commits in the dashboard.</p>
              </div>
              <div className="bg-zinc-950 border border-zinc-800 rounded-lg p-5">
                <div className="flex items-center gap-3 mb-2">
                  <span className="material-symbols-outlined text-purple-400">calendar_month</span>
                  <h3 className="text-sm font-medium text-zinc-100">Schedule</h3>
                </div>
                <p className="text-sm text-zinc-400">View your current configuration at a glance and use quick presets (Light, Moderate, Heavy) to rapidly adjust your commit frequency.</p>
              </div>
              <div className="bg-zinc-950 border border-zinc-800 rounded-lg p-5">
                <div className="flex items-center gap-3 mb-2">
                  <span className="material-symbols-outlined text-purple-400">monitoring</span>
                  <h3 className="text-sm font-medium text-zinc-100">Analytics</h3>
                </div>
                <p className="text-sm text-zinc-400">Monitor your commit stats, repository count, pipeline status, and review your recent activity log in one place.</p>
              </div>
              <div className="bg-zinc-950 border border-zinc-800 rounded-lg p-5">
                <div className="flex items-center gap-3 mb-2">
                  <span className="material-symbols-outlined text-purple-400">token</span>
                  <h3 className="text-sm font-medium text-zinc-100">Personal Access Token</h3>
                </div>
                <p className="text-sm text-zinc-400">GitGhost uses a classic GitHub Personal Access Token (PAT) with <strong className="text-zinc-300">repo</strong> scope to authenticate. Tokens are stored locally in your browser and can be cleared by logging out.</p>
              </div>
            </div>
          </div>
        )}

        {/* How It Works Page */}
        {dashboardPage === 'how-it-works' && (
          <div className="flex-1 overflow-auto p-8 custom-scrollbar">
            <h2 className="text-2xl font-semibold text-zinc-100 mb-6">How It Works</h2>
            <p className="text-zinc-400 text-sm mb-8">Follow these steps to generate a GitHub Personal Access Token and set up your automated commit pipeline.</p>
            
            <div className="space-y-12 max-w-4xl text-zinc-400 text-sm">
                <div className="flex flex-col gap-3 pb-6 border-b border-zinc-800/50">
                    <h3 className="text-zinc-100 font-medium text-lg">Step 1: Access GitHub Settings</h3>
                    <p>Log in to GitHub and navigate to your account settings via the profile dropdown menu in the top right corner.</p>
                    <ExpandableImage src={Step1} alt="Step 1" />
                </div>

                <div className="flex flex-col gap-3 pb-6 border-b border-zinc-800/50">
                    <h3 className="text-zinc-100 font-medium text-lg">Step 2: Developer Settings</h3>
                    <p>Scroll down to the very bottom of the left sidebar menu and click on <strong className="text-zinc-200">Developer settings</strong>.</p>
                    <ExpandableImage src={Step2} alt="Step 2" />
                </div>

                <div className="flex flex-col gap-3 pb-6 border-b border-zinc-800/50">
                    <h3 className="text-zinc-100 font-medium text-lg">Step 3: Personal Access Tokens</h3>
                    <p>Inside the Developer settings sidebar, click on the <strong className="text-zinc-200">Personal access tokens</strong> menu to expand it.</p>
                    <ExpandableImage src={Step3} alt="Step 3" />
                </div>

                <div className="flex flex-col gap-3 pb-6 border-b border-zinc-800/50">
                    <h3 className="text-zinc-100 font-medium text-lg">Step 4: Select Classic Tokens</h3>
                    <p>From the expanded menu options beneath Personal access tokens, select <strong className="text-zinc-200">Tokens (classic)</strong>.</p>
                    <ExpandableImage src={Step4} alt="Step 4" />
                </div>

                <div className="flex flex-col gap-3 pb-6 border-b border-zinc-800/50">
                    <h3 className="text-zinc-100 font-medium text-lg">Step 5: Generate a New Token</h3>
                    <p>Click the <strong className="text-zinc-200">Generate new token</strong> dropdown button located at the top right of the page.</p>
                    <ExpandableImage src={Step5} alt="Step 5" />
                </div>

                <div className="flex flex-col gap-3 pb-6 border-b border-zinc-800/50">
                    <h3 className="text-zinc-100 font-medium text-lg">Step 6: Choose Classic Format</h3>
                    <p>From the dropdown prompt, select the <strong className="text-zinc-200">Generate new token (classic)</strong> option for general use.</p>
                    <ExpandableImage src={Step6} alt="Step 6" />
                </div>

                <div className="flex flex-col gap-3 pb-6 border-b border-zinc-800/50">
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
              className="relative w-full max-w-sm bg-zinc-900 border border-zinc-800 rounded-xl shadow-2xl p-6"
            >
              <div className="flex flex-col items-center text-center">
                <div className="size-12 rounded-full bg-red-500/10 flex items-center justify-center mb-4">
                  <span className="material-symbols-outlined text-red-500 text-2xl">logout</span>
                </div>
                <h3 className="text-xl font-semibold text-zinc-100 mb-2">Confirm Logout</h3>
                <p className="text-zinc-400 text-sm mb-8">
                  Are you sure you want to log out of GitGhost? You will need to re-authenticate to continue.
                </p>
                <div className="flex w-full gap-3">
                  <button
                    onClick={() => setShowLogoutModal(false)}
                    className="flex-1 py-2.5 px-4 rounded-md border border-zinc-700 text-zinc-300 font-medium hover:bg-zinc-800 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleLogout}
                    className="flex-1 py-2.5 px-4 rounded-md bg-red-600 border border-red-500 text-white font-medium hover:bg-red-500 transition-colors"
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
