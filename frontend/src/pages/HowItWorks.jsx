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

const HowItWorks = () => (
    <PageTemplate title="How It Works">
        <p className="mb-10 text-base">GitGhost acts as a background bridge between your local development environment and global repositories. Follow these steps to set up your automated commit pipeline.</p>

        <div className="space-y-16 mt-4">
            <div className="flex flex-col gap-3">
                <h3 className="text-zinc-100 font-medium text-lg">Step 1: Access GitHub Settings</h3>
                <p>Log in to GitHub and navigate to your account settings via the profile dropdown menu in the top right corner.</p>
                <ExpandableImage src={Step1} alt="Step 1" />
            </div>

            <div className="flex flex-col gap-3">
                <h3 className="text-zinc-100 font-medium text-lg">Step 2: Developer Settings</h3>
                <p>Scroll down to the very bottom of the left sidebar menu and click on <strong className="text-zinc-200">Developer settings</strong>.</p>
                <ExpandableImage src={Step2} alt="Step 2" />
            </div>

            <div className="flex flex-col gap-3">
                <h3 className="text-zinc-100 font-medium text-lg">Step 3: Personal Access Tokens</h3>
                <p>Inside the Developer settings sidebar, click on the <strong className="text-zinc-200">Personal access tokens</strong> menu to expand it.</p>
                <ExpandableImage src={Step3} alt="Step 3" />
            </div>

            <div className="flex flex-col gap-3">
                <h3 className="text-zinc-100 font-medium text-lg">Step 4: Select Classic Tokens</h3>
                <p>From the expanded menu options beneath Personal access tokens, select <strong className="text-zinc-200">Tokens (classic)</strong>.</p>
                <ExpandableImage src={Step4} alt="Step 4" />
            </div>

            <div className="flex flex-col gap-3">
                <h3 className="text-zinc-100 font-medium text-lg">Step 5: Generate a New Token</h3>
                <p>Click the <strong className="text-zinc-200">Generate new token</strong> dropdown button located at the top right of the page.</p>
                <ExpandableImage src={Step5} alt="Step 5" />
            </div>

            <div className="flex flex-col gap-3">
                <h3 className="text-zinc-100 font-medium text-lg">Step 6: Choose Classic Format</h3>
                <p>From the dropdown prompt, select the <strong className="text-zinc-200">Generate new token (classic)</strong> option for general use.</p>
                <ExpandableImage src={Step6} alt="Step 6" />
            </div>

            <div className="flex flex-col gap-3">
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
    </PageTemplate>
);

export default HowItWorks;
