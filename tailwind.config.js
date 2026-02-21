/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        graphite: '#0D0D0F',
        'neon-cyan': '#00F5FF',
        'neon-orange': '#FF6B35',
      },
      fontFamily: {
        heading: ['Orbitron', 'Rajdhani', 'sans-serif'],
        rajdhani: ['Rajdhani', 'sans-serif'],
        body: ['DM Sans', 'sans-serif'],
      },
      boxShadow: {
        'neon-cyan': '0 0 20px rgba(0, 245, 255, 0.5), 0 0 40px rgba(0, 245, 255, 0.3)',
        'neon-orange': '0 0 20px rgba(255, 107, 53, 0.5), 0 0 40px rgba(255, 107, 53, 0.3)',
        'neon-glow': '0 0 15px currentColor',
      },
      animation: {
        'pulse-neon': 'pulse-neon 2s ease-in-out infinite',
      },
      keyframes: {
        'pulse-neon': {
          '0%, 100%': { opacity: '1', boxShadow: '0 0 20px rgba(0, 245, 255, 0.5)' },
          '50%': { opacity: '0.9', boxShadow: '0 0 30px rgba(0, 245, 255, 0.7)' },
        },
      },
    },
  },
  plugins: [],
}
