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
        brand: {
          primary: '#4F46E5',     // Indigo-600
          secondary: '#6366F1',   // Indigo-500
          success: '#22C55E',     // Green-500
          danger: '#EF4444',      // Red-500
          background: '#F8FAFC',  // Slate-50
          darkbg: '#0F172A',      // Slate-900 for dark mode
          darkcard: '#1E293B'     // Slate-800 for dark mode cards
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
