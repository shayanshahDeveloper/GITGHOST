const express = require('express');
const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();
const { Octokit } = require("@octokit/rest");

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

let terminalLogs = [];
let githubToken = null;

const CLIENT_ID = process.env.GITHUB_CLIENT_ID;
const CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;
const REDIRECT_URI = process.env.GITHUB_REDIRECT_URI;

// --- GITHUB API HELPERS ---
app.get('/github/oauth/config', (req, res) => {
    res.json({ clientId: CLIENT_ID });
});

app.post('/github/oauth/callback', async (req, res) => {
    const { code } = req.body;
    try {
        const response = await axios.post('https://github.com/login/oauth/access_token', {
            client_id: CLIENT_ID,
            client_secret: CLIENT_SECRET,
            code,
            redirect_uri: REDIRECT_URI
        }, {
            headers: { Accept: 'application/json' }
        });

        const token = response.data.access_token;
        if (response.data.error) {
            return res.status(400).json({ status: 'error', message: response.data.error_description || response.data.error });
        }
        if (!token) {
            return res.status(400).json({ status: 'error', message: 'Failed to obtain access token' });
        }

        // Now verify user with this token
        const octokit = new Octokit({ auth: token });
        const { data, headers } = await octokit.rest.users.getAuthenticated();
        const scopes = headers['x-oauth-scopes'] || '';
        const hasRepoScope = scopes.includes('repo');

        githubToken = token;
        res.json({
            status: 'success',
            token: token,
            user: data,
            scopes: scopes,
            hasRepoScope: hasRepoScope
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: 'error', message: err.message });
    }
});
app.post('/github/login', async (req, res) => {
    const { token } = req.body;
    try {
        const octokit = new Octokit({ auth: token });
        const { data, headers } = await octokit.rest.users.getAuthenticated();

        // GitHub returns available scopes in this header
        const scopes = headers['x-oauth-scopes'] || '';
        const hasRepoScope = scopes.includes('repo');

        githubToken = token;
        res.json({
            status: 'success',
            user: data,
            scopes: scopes,
            hasRepoScope: hasRepoScope
        });
    } catch (err) {
        res.status(401).json({ status: 'error', message: 'Invalid GitHub Token' });
    }
});

app.get('/github/repos', async (req, res) => {
    if (!githubToken) return res.status(401).json({ status: 'error', message: 'Not connected' });
    try {
        const octokit = new Octokit({ auth: githubToken });
        const data = await octokit.paginate(octokit.rest.repos.listForAuthenticatedUser, {
            per_page: 100,
            sort: 'updated',
            direction: 'desc'
        });

        // Manually sort to ensure newest is always first (GitHub API can be inconsistent with pagination sorting)
        data.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));
        console.log(`[GITHUB] Fetched ${data.length} repositories total.`);
        // Debug: count private vs public
        const privateCount = data.filter(r => r.private).length;
        console.log(`[GITHUB] Private: ${privateCount}, Public: ${data.length - privateCount}`);

        res.json({ status: 'success', repos: data });
    } catch (err) {
        res.status(500).json({ status: 'error', message: err.message });
    }
});

app.post('/commit-api', async (req, res) => {
    const { owner, repo, branch = 'main' } = req.body;
    if (!githubToken) return res.status(401).json({ status: 'error', detail: 'GitHub not connected' });

    const timestamp = new Date().toLocaleTimeString();
    const octokit = new Octokit({ auth: githubToken });
    const logPath = 'github_contribution_log.txt';
    const commitMsg = [
        "Feat: automated pulse update",
        "Chore: contribute to graph",
        "Refactor: background sync logic",
        "Docs: update development logs",
        "Style: refine contribution markers"
    ][Math.floor(Math.random() * 5)];

    try {
        let sha;
        let content = `Contribution on ${new Date().toISOString()}\n`;
        try {
            const { data } = await octokit.repos.getContent({ owner, repo, path: logPath });
            sha = data.sha;
            content = Buffer.from(data.content, 'base64').toString() + content;
        } catch (e) { /* File new */ }

        await octokit.repos.createOrUpdateFileContents({
            owner, repo, path: logPath,
            message: commitMsg,
            content: Buffer.from(content).toString('base64'),
            sha, branch
        });

        const log = { timestamp, success: true, message: `[API] Pushed to ${owner}/${repo} (${branch})` };
        terminalLogs.push(log);
        res.json({ status: 'success', log });
    } catch (err) {
        const log = { timestamp, success: false, message: `API Error: ${err.message}` };
        terminalLogs.push(log);
        res.status(500).json({ status: 'error', log });
    }
});

// --- LEGACY/LOCAL HELPERS ---
app.get('/logs', (req, res) => {
    res.json({ logs: terminalLogs.slice(-10) });
});

app.post('/status', async (req, res) => {
    let { repo_path } = req.body;
    if (!repo_path) return res.json({ status: 'idle' });
    repo_path = repo_path.trim();

    if (repo_path.startsWith('http')) {
        return res.json({ status: 'valid', remote: repo_path, isUrl: true });
    }

    const repoPath = repo_path.startsWith('~')
        ? path.join(process.env.HOME, repo_path.slice(1))
        : path.resolve(repo_path);

    if (!fs.existsSync(repoPath) || !fs.existsSync(path.join(repoPath, '.git'))) {
        return res.json({ status: 'invalid', message: 'Not a valid local Git repository' });
    }

    const { execSync } = require('child_process');
    try {
        const remote = execSync('git remote get-url origin', { cwd: repoPath }).toString().trim();
        res.json({ status: 'valid', remote, path: repoPath });
    } catch (e) {
        res.json({ status: 'semi-valid', message: 'No origin remote set.', path: repoPath });
    }
});

app.post('/commit', async (req, res) => {
    let { repo_path } = req.body;
    if (!repo_path) return res.status(400).json({ status: 'error', detail: 'Path/URL required' });

    repo_path = repo_path.trim();
    let repoPath = repo_path;
    const workspaceDir = path.join(__dirname, 'workspace');
    if (!fs.existsSync(workspaceDir)) fs.mkdirSync(workspaceDir);

    if (repo_path.startsWith('http')) {
        const repoName = repo_path.split('/').pop().replace('.git', '');
        repoPath = path.join(workspaceDir, repoName);
        if (!fs.existsSync(repoPath)) {
            const { execSync } = require('child_process');
            try {
                execSync(`git clone ${repo_path} ${repoName}`, { cwd: workspaceDir });
            } catch (err) {
                return res.status(500).json({ status: 'error', log: { timestamp: new Date().toLocaleTimeString(), success: false, message: `Clone Error.` } });
            }
        }
    } else {
        repoPath = repo_path.startsWith('~') ? path.join(process.env.HOME, repo_path.slice(1)) : path.resolve(repo_path);
    }

    const pythonProcess = spawn('python3', [path.join(__dirname, 'git_sync.py'), repoPath]);
    let out = '', err = '';
    pythonProcess.stdout.on('data', d => out += d);
    pythonProcess.stderr.on('data', d => err += d);
    pythonProcess.on('close', code => {
        const log = { timestamp: new Date().toLocaleTimeString(), success: code === 0, message: code === 0 ? out.trim() : err.trim() };
        terminalLogs.push(log);
        res.json({ status: log.success ? 'success' : 'error', log });
    });
});

app.listen(port, '0.0.0.0', () => {
    console.log(`Backend server listening at http://0.0.0.0:${port}`);
});
