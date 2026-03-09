import React from 'react';
import PageTemplate from '../components/PageTemplate';

const PrivacyPolicy = () => (
    <PageTemplate title="Privacy Policy">
        <p>At GitGhost, your privacy is a core architectural requirement.</p>
        <h3 className="text-zinc-100 font-medium mt-8 text-lg">Data Collection</h3>
        <p>We do not store or collect your GitHub credentials, code, or personal information on our servers. The application requests standard OAuth read/write access strictly to automate your repositories locally on your behalf.</p>
        <h3 className="text-zinc-100 font-medium mt-8 text-lg">Client-Side Storage</h3>
        <p>When using tokens, your keys are stored efficiently within your browser's local storage (`localStorage`). Clearing your browser cache or hitting 'Logout' instantly removes all metadata.</p>
    </PageTemplate>
);

export default PrivacyPolicy;
