/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ["'Cormorant Garamond'", 'serif'],
        serif: ["'Cormorant Garamond'", "'Playfair Display'", 'serif'],
        script: ["'Parisienne'", 'cursive'],
        body: ["'Jost'", "'Inter'", 'sans-serif'],
        mono: ["'Space Mono'", 'monospace'],
      },
    },
  },
  plugins: [],
};
