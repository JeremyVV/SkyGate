/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#1e3a5f',
          light: '#264a78',
          dark: '#142840',
        },
        skyblue: {
          DEFAULT: '#4a9edd',
          light: '#7ab8e8',
          dark: '#2e7bb5',
        },
        gold: {
          DEFAULT: '#c9922a',
          light: '#dba94a',
          dark: '#a67018',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
