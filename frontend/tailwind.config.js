/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                "primary": "#583573",
                "ghost-blue": "#355872",
                "ghost-cream": "#F7F8F0",
                "ghost-accent": "#7AAACE",
                "ghost-success": "#9CD5FF",
                "background-light": "#f7f6f7",
                "background-dark": "#0f172a",
            },
            fontFamily: {
                "display": ["Space Grotesk", "sans-serif"],
                "mono": ["Fira Code", "monospace"]
            },
            borderRadius: { "DEFAULT": "0.25rem", "lg": "0.5rem", "xl": "0.75rem", "full": "9999px" },
        },
    },
    plugins: [],
}
