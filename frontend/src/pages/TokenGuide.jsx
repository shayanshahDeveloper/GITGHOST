import React from 'react';
import PageTemplate from '../components/PageTemplate';
import ExpandableImage from '../components/ExpandableImage';

// Import all step assets
import Step1 from '../assets/Step 1.png';
import Step2 from '../assets/Step 2.jpg';
import Step3 from '../assets/Step 3.jpg';
import Step4 from '../assets/Step 4.jpg';
import Step5 from '../assets/Step 5.jpg';
import Step6 from '../assets/Step 6.jpg';
import Step7 from '../assets/Step 7.jpg';
import Step8 from '../assets/Step 8.jpg';

const TokenGuide = ({ theme, setTheme }) => (
    <PageTemplate title="How to Get Your GitHub Token" theme={theme} setTheme={setTheme}>
        <p className="mb-10 text-base">To use GitGhost, you need a Personal Access Token (Classic) with repository permissions. Follow this step-by-step guide to generate your token securely.</p>

        <div className="space-y-16 mt-4">
            <div className="flex flex-col gap-3">
                <h3 className="text-main font-bold text-lg tracking-tight">Step 1: Access GitHub Settings</h3>
                <p>Log in to your GitHub account. Click on your profile picture in the top-right corner and select <strong className="text-main">Settings</strong> from the dropdown menu.</p>
                <ExpandableImage src={Step1} alt="Step 1" />
            </div>

            <div className="flex flex-col gap-3">
                <h3 className="text-main font-bold text-lg tracking-tight">Step 2: Developer Settings</h3>
                <p>In the left sidebar, scroll all the way to the bottom and click on <strong className="text-main">Developer settings</strong>.</p>
                <ExpandableImage src={Step2} alt="Step 2" />
            </div>

            <div className="flex flex-col gap-3">
                <h3 className="text-main font-bold text-lg tracking-tight">Step 3: Personal Access Tokens</h3>
                <p>In the Developer Settings sidebar, click on <strong className="text-main">Personal access tokens</strong> to expand the section.</p>
                <ExpandableImage src={Step3} alt="Step 3" />
            </div>

            <div className="flex flex-col gap-3">
                <h3 className="text-main font-bold text-lg tracking-tight">Step 4: Select Classic Tokens</h3>
                <p>Click on <strong className="text-main">Tokens (classic)</strong>. We currently use classic tokens for broad compatibility with repository operations.</p>
                <ExpandableImage src={Step4} alt="Step 4" />
            </div>

            <div className="flex flex-col gap-3">
                <h3 className="text-main font-bold text-lg tracking-tight">Step 5: Generate a New Token</h3>
                <p>Click the <strong className="text-main">Generate new token</strong> button on the right, and then select the classic option.</p>
                <ExpandableImage src={Step5} alt="Step 5" />
            </div>

            <div className="flex flex-col gap-3">
                <h3 className="text-main font-bold text-lg tracking-tight">Step 6: Confirm Classic Format</h3>
                <p>GitHub may ask you to confirm. Choose <strong className="text-main">Generate new token (classic)</strong> to proceed to the configuration page.</p>
                <ExpandableImage src={Step6} alt="Step 6" />
            </div>

            <div className="flex flex-col gap-3">
                <h3 className="text-main font-bold text-lg tracking-tight">Step 7: Configure Scopes</h3>
                <p>Give your token a name (e.g., "GitGhost"). Most importantly, check the <strong className="text-main">repo</strong> box. This grants GitGhost the permission to sync your code.</p>
                <ExpandableImage src={Step7} alt="Step 7" />
            </div>

            <div className="flex flex-col gap-3">
                <h3 className="text-main font-bold text-lg tracking-tight">Step 8: Save Your Token</h3>
                <p>Scroll to the bottom and hit "Generate token". Copy the resulting string immediately—you won't be able to see it again! Paste this into GitGhost to start your engine.</p>
                <ExpandableImage src={Step8} alt="Step 8" />
            </div>
        </div>
    </PageTemplate>
);

export default TokenGuide;
