import React from 'react';
import PageTemplate from '../components/PageTemplate';

const Disclaimer = () => (
    <PageTemplate title="Disclaimer">
        <p>GitGhost is an independent tool created for workflow efficiency.</p>
        <h3 className="text-zinc-100 font-medium mt-8 text-lg">Not Affiliated</h3>
        <p>GitGhost is in no way affiliated with, sponsored by, or endorsed by GitHub, Inc. or Microsoft. The use of the term "GitHub" is solely for descriptive purposes.</p>
        <h3 className="text-zinc-100 font-medium mt-8 text-lg">Use As Is</h3>
        <p>This software is provided "as is," without warranty of any kind. You are solely responsible for compliance with GitHub's Terms of Service and API Rate Limitations.</p>
    </PageTemplate>
);

export default Disclaimer;
