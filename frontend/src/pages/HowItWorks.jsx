import React from 'react';
import PageTemplate from '../components/PageTemplate';
import ExpandableImage from '../components/ExpandableImage';

// Import the new GitGhost Screenshots
import Screenshot1 from '../assets/GITGHOST Screenshot 1.png';
import Screenshot2 from '../assets/GITGHOST Screenshot 2.png';
import Screenshot3 from '../assets/GITGHOST Screenshot 3.png';
import Screenshot4 from '../assets/GITGHOST Screenshot 4.png';
import Screenshot5 from '../assets/GITGHOST Screenshot 5.png';

const HowItWorks = () => (
    <PageTemplate title="How It Works">
        <p className="mb-10 text-base">GitGhost is a powerful automation engine designed to simplify your GitHub workflow. Here is a guide on how to navigate and use the Master Console effectively.</p>

        <div className="space-y-16 mt-4">
            <div className="flex flex-col gap-3">
                <h3 className="text-zinc-100 font-medium text-lg">1. The Master Dashboard</h3>
                <p>The core of GitGhost. Once authenticated, you'll see a real-time overview of your repositories. From here, you can select any target repository and begin your automated sync pipeline.</p>
                <ExpandableImage src={Screenshot1} alt="Dashboard Overview" />
            </div>

            <div className="flex flex-col gap-3">
                <h3 className="text-zinc-100 font-medium text-lg">2. Repository Management</h3>
                <p>Toggle between your public and private repositories using the built-in filter system. You can catch a quick glimpse of branch names, ownership, and current sync status for every project you own.</p>
                <ExpandableImage src={Screenshot2} alt="Repository Management" />
            </div>

            <div className="flex flex-col gap-3">
                <h3 className="text-zinc-100 font-medium text-lg">3. Precision Scheduling</h3>
                <p>Configure exactly how often GitGhost should push to your target repository. Use the payload slider to choose commit volume and the interval slider to set the timing gap between pushes.</p>
                <ExpandableImage src={Screenshot3} alt="Scheduling and Configuration" />
            </div>

            <div className="flex flex-col gap-3">
                <h3 className="text-zinc-100 font-medium text-lg">4. Real-time Analytics</h3>
                <p>Track your cumulative progress through the Analytics suite. Monitor total successful pushes, view your active pipeline status, and review a deep chronological log of all recent system operations.</p>
                <ExpandableImage src={Screenshot4} alt="Analytics and Logs" />
            </div>

            <div className="flex flex-col gap-3">
                <h3 className="text-zinc-100 font-medium text-lg">5. Seamless Authentication</h3>
                <p>Our landing page provides direct access to the Master Console. Simply log in with your GitHub Personal Access Token to establish a secure, encrypted link between your local machine and the cloud.</p>
                <ExpandableImage src={Screenshot5} alt="Landing and Auth" />
            </div>
        </div>
    </PageTemplate>
);

export default HowItWorks;
