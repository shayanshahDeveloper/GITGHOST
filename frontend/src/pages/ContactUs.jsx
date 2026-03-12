import React from 'react';
import PageTemplate from '../components/PageTemplate';

const ContactUs = ({ theme, setTheme }) => (
    <PageTemplate title="Contact Support" theme={theme} setTheme={setTheme}>
        <p>Experiencing system errors or have feedback? Submit a report.</p>
        <div className="bg-header border border-main p-6 rounded-lg mt-8 shadow-sm">
            <form className="flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
                <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-main">Email Address</label>
                    <input type="email" className="w-full bg-surface border border-main rounded-md px-3 py-2 text-sm text-main placeholder:text-muted focus:outline-none focus:ring-1 focus:ring-[var(--primary)] transition-colors" placeholder="you@example.com" />
                </div>
                <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-main">Message</label>
                    <textarea rows="4" className="w-full bg-surface border border-main rounded-md px-3 py-2 text-sm text-main placeholder:text-muted focus:outline-none focus:ring-1 focus:ring-[var(--primary)] transition-colors" placeholder="Describe your issue..."></textarea>
                </div>
                <button type="submit" className="btn-primary py-2 px-6 rounded-md text-sm font-bold shadow-md hover:scale-105 transition-all mt-2 self-start">Submit</button>
            </form>
        </div>
    </PageTemplate>
);

export default ContactUs;
