<p align="center">
  <img src="banner.png" alt="GitGhost Banner" width="100%" />
</p>

<p align="center">
  <img src="https://img.shields.io/badge/version-1.0.0-purple?style=for-the-badge" alt="Version" />
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind" />
  <img src="https://img.shields.io/badge/GitHub_API-181717?style=for-the-badge&logo=github&logoColor=white" alt="GitHub API" />
  <img src="https://img.shields.io/badge/License-MIT-green?style=for-the-badge" alt="License" />
</p>

---

## What is GitGhost?

GitGhost is a local-first tool that bridges your machine and your GitHub repositories. It automates staging, committing, and pushing to any repo you own — running silently in the background while you focus on real work.

- Select a target repository from your account
- Configure commit frequency with simple sliders
- Start the auto-commit pipeline or trigger manual pushes
- Monitor everything through a real-time console

## Features

| Feature | Description |
|---------|-------------|
| **Live Console** | Real-time pipeline log showing every commit, push, and error |
| **Fine-grained Control** | Payload size and interval sliders with second or minute precision |
| **Repository Browser** | Card view of all connected repos with visibility, language, and branch info |
| **Activity Analytics** | Track total commits, pipeline status, and recent activity |
| **Schedule Presets** | One-click presets for light, moderate, or heavy commit schedules |
| **Built-in Guide** | Step-by-step PAT setup instructions with annotated screenshots |

## Tech Stack

- **Frontend:** React + Vite + Tailwind CSS
- **Backend:** Node.js (Express) + Python helper script
- **Auth:** GitHub OAuth + Personal Access Tokens (classic)

## Getting Started

### Prerequisites

- Node.js (v18+)
- Python 3 (v3.9+)
- Git
- A GitHub account

### 1. Clone the repository

```bash
git clone https://github.com/shayanshahDeveloper/GITGHOST
cd GITGHOST
```

### 2. Setup the backend

```bash
cd backend
npm install
pip install -r requirements.txt
```

Create a `.env` file in the `backend/` directory:

```
GITHUB_CLIENT_ID=your_client_id
GITHUB_CLIENT_SECRET=your_client_secret
GITHUB_REDIRECT_URI=http://localhost:5173
```

Start the backend server:

```bash
npm start
```

The backend will be running at `http://localhost:8000`.

### 3. Setup the frontend

```bash
cd frontend
npm install
npm run dev
```

The app will be available at `http://localhost:5173`.

### 4. Generate a Personal Access Token

1. Go to GitHub → Settings → Developer Settings
2. Click **Personal access tokens** → **Tokens (classic)**
3. Click **Generate new token (classic)**
4. Give it a name, select the **repo** scope
5. Copy the token and paste it into the GitGhost login screen

## Project Structure

```
GITGHOST/
├── backend/              # Node.js Express server
│   ├── server.js         # Main API server
│   ├── git_sync.py       # Python helper for local git operations
│   ├── package.json      # Node.js dependencies
│   ├── requirements.txt  # Python dependencies
│   └── .env              # Environment variables (not committed)
├── frontend/             # React + Vite app
│   ├── src/
│   │   ├── assets/       # Logo, step screenshots
│   │   ├── components/   # Navbar, Footer
│   │   ├── pages/        # Landing, StaticPages
│   │   ├── App.jsx       # Main app with dashboard
│   │   └── index.css     # Global styles
│   └── index.html
├── .gitignore
└── README.md
```

## Screenshots

<div align="center">
  <img src="frontend/src/assets/GITGHOST Screenshot 1.png" alt="Dashboard View" width="47%" />
  &nbsp;
  <img src="frontend/src/assets/GITGHOST Screenshot 2.png" alt="Repositories View" width="47%" />
  <br/><br/>
  <img src="frontend/src/assets/GITGHOST Screenshot 3.png" alt="Schedule View" width="47%" />
  &nbsp;
  <img src="frontend/src/assets/GITGHOST Screenshot 4.png" alt="Analytics View" width="47%" />
  <br/><br/>
  <img src="frontend/src/assets/GITGHOST Screenshot 5.png" alt="Landing Page" width="47%" />
  &nbsp;
  <img src="frontend/src/assets/GITGHOST Screenshot 6.png" alt="Login Page" width="47%" />
  <br/><br/>
  <img src="frontend/src/assets/GITGHOST Screenshot 7.png" alt="How It Works" width="47%" />
  &nbsp;
  <img src="frontend/src/assets/GITSGHOST Screenshot 8.png" alt="Mobile View" width="47%" />
</div>

## License

This project is for personal and educational use. GitGhost is not affiliated with, sponsored by, or endorsed by GitHub, Inc. or Microsoft.

---

<p align="center">
  Built with purpose. No fluff.
</p>
