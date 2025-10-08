module.exports = {
  darkMode: 'class',
  content: [
    "./index.html",
    "./*.html",
    "./**/*.js"
  ],
  theme: {
    extend: {
       colors: {
        // palette "developer"
        slate: {
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
        },
        emerald: {
          400: '#34d399',
          500: '#10b981',
        },
        cyan: {
          300: '#67e8f9',
          400: '#22d3ee',
        },
      },
      animation: {
        pulse: 'pulse 4s ease-in-out infinite',
      },
      keyframes: {
        pulse: {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '1' },
        },
      },
    },
  },
  safelist: [
    // gradienti e classi dinamiche da mantenere
    'bg-gradient-to-r',
    'bg-gradient-to-br',
    'from-emerald-400',
    'via-cyan-400',
    'to-blue-400',
    'from-teal-400',
    'via-cyan-300',
    'to-blue-400',
    'drop-shadow-lg',
    'drop-shadow-[0_0_20px_rgba(34,197,94,0.25)]',
    'text-emerald-300',
    'text-cyan-300',
    'border-emerald-500',
    'border-teal-500'
  ],
  plugins: [],
}