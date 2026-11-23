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
        dark: {
          950: '#06070b',
          900: '#0b0d14',
          850: '#10121d',
          800: '#161927',
          700: '#202438',
          600: '#2e334e',
          500: '#434a6e',
        },
        accent: {
          purple: '#8b5cf6',
          violet: '#7c3aed',
          electric: '#06b6d4',
          sky: '#0ea5e9',
          pink: '#ec4899',
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      boxShadow: {
        'glow-purple': '0 0 30px -5px rgba(139, 92, 246, 0.35)',
        'glow-cyan': '0 0 30px -5px rgba(6, 182, 212, 0.35)',
        'glow-combo': '0 0 45px -8px rgba(124, 58, 237, 0.45)',
        'card-dark': '0 10px 30px -10px rgba(0, 0, 0, 0.6)',
      },
      animation: {
        'float-slow': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 12s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        }
      }
    },
  },
  plugins: [],
}

