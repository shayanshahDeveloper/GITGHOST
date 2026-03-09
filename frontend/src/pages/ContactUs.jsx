import React from 'react';
import PageTemplate from '../components/PageTemplate';

const ContactUs = () => (
    <PageTemplate title="Contact Support">
        <p>Experiencing system errors or have feedback? Submit a report.</p>
        <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-lg mt-8">
            <form className="flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
                <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-zinc-300">Email Address</label>
                    <input type="email" className="w-full bg-zinc-950 border border-zinc-800 rounded-md px-3 py-2 text-sm text-zinc-100 focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500 transition-colors" placeholder="you@example.com" />
                </div>
                <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-zinc-300">Message</label>
                    <textarea rows="4" className="w-full bg-zinc-950 border border-zinc-800 rounded-md px-3 py-2 text-sm text-zinc-100 focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500 transition-colors" placeholder="Describe your issue..."></textarea>
                </div>
                <button type="submit" className="bg-zinc-100 text-zinc-900 text-sm font-medium py-2 px-4 rounded-md hover:bg-white transition-colors mt-2 self-start">Submit</button>
            </form>
        </div>
    </PageTemplate>
);

export default ContactUs;
