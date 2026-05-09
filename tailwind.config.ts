import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Fond principal — quasi noir terminal
        void: {
          DEFAULT: '#080b10',
          50:  '#0d1117',
          100: '#161b22',
          200: '#21262d',
          300: '#30363d',
          400: '#3d444d',
        },
        // CUPADEV — cyan/bleu terminal
        cupadev: {
          50:  '#ecfeff',
          100: '#cffafe',
          200: '#a5f3fc',
          300: '#67e8f9',
          400: '#22d3ee',
          500: '#06b6d4',
          600: '#0891b2',
          700: '#0e7490',
          800: '#155e75',
          900: '#164e63',
          950: '#083344',
        },
        // Cupacode Studios — vert émeraude (terminal green)
        studios: {
          50:  '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
          950: '#052e16',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'Consolas', 'monospace'],
      },
      backgroundImage: {
        'grid-pattern': `linear-gradient(rgba(34,211,238,0.04) 1px, transparent 1px),
                          linear-gradient(90deg, rgba(34,211,238,0.04) 1px, transparent 1px)`,
        'noise': "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E\")",
      },
      backgroundSize: {
        'grid': '32px 32px',
      },
      animation: {
        'blink': 'blink 1s step-end infinite',
        'glow-pulse': 'glowPulse 2s ease-in-out infinite',
      },
      keyframes: {
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%':       { opacity: '0' },
        },
        glowPulse: {
          '0%, 100%': { boxShadow: '0 0 8px rgba(34,211,238,0.3)' },
          '50%':       { boxShadow: '0 0 20px rgba(34,211,238,0.6)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
