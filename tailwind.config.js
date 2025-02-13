/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    colors: {
      'mindaro': { DEFAULT: '#c5d86d', 100: '#2d340e', 200: '#59671b', 300: '#869b29', 400: '#b0cb3a', 500: '#c5d86d', 600: '#d1e08b', 700: '#dce8a8', 800: '#e8f0c5', 900: '#f3f7e2' },
      'licorice': { DEFAULT: '#261c15', 100: '#080604', 200: '#100c09', 300: '#18110d', 400: '#201711', 500: '#261c15', 600: '#614836', 700: '#9b7355', 800: '#bfa18b', 900: '#dfd0c5' },
      'baby_powder': { DEFAULT: '#f7f7f2', 100: '#3d3d25', 200: '#79794a', 300: '#adad79', 400: '#d2d2b6', 500: '#f7f7f2', 600: '#f9f9f5', 700: '#fafaf7', 800: '#fcfcfa', 900: '#fdfdfc' },
      'beige': { DEFAULT: '#e4e6c3', 100: '#3a3c19', 200: '#747732', 300: '#aeb34b', 400: '#c9cc86', 500: '#e4e6c3', 600: '#e9ebce', 700: '#eff0da', 800: '#f4f5e7', 900: '#fafaf3' },
      'giants_orange': { DEFAULT: '#f05d23', 100: '#331104', 200: '#672207', 300: '#9a330b', 400: '#ce450e', 500: '#f05d23', 600: '#f37e50', 700: '#f69e7b', 800: '#f9bea7', 900: '#fcdfd3' }
    },
    fontFamily: {
      sans: ['Graphik', 'sans-serif'],
      serif: ['Merriweather', 'serif'],
    },
    extend: {},
  },
  plugins: [],
}

