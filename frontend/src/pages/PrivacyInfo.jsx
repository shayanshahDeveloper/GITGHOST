import React from 'react';
import PageTemplate from '../components/PageTemplate';

const PrivacyPolicy = ({ theme, setTheme }) => (
    <PageTemplate title="Privacy Policy" theme={theme} setTheme={setTheme}>
        <p>At GitGhost, your privacy is a core architectural requirement.</p>
        <h3 className="text-main font-bold mt-8 text-lg lg:text-xl tracking-tight">Data Collection</h3>
        <p>We do not store or collect your GitHub credentials, code, or personal information on our servers. The application requests standard OAuth read/write access strictly to automate your repositories locally on your behalf.</p>
        <h3 className="text-main font-bold mt-8 text-lg lg:text-xl tracking-tight">Client-Side Storage</h3>
        <p>When using tokens, your keys are stored efficiently within your browser's local storage (`localStorage`). Clearing your browser cache or hitting 'Logout' instantly removes all metadata.</p>
    </PageTemplate>
);

export default PrivacyPolicy;
