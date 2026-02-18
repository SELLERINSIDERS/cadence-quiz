/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'forest-green': '#345248',
        'blush-purple': '#B6A8CC',
      },
      fontFamily: {
        arizona: ['Arizona', 'serif'],
      },
    },
  },
  plugins: [],
}
