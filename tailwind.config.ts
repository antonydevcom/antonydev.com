import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Brand palette — maps to CSS variables in tokens.css
        cafe: {
          DEFAULT: '#2A201B',
          negro: '#1E1713',
        },
        marfil: '#EEE8DF',
        hueso:  '#F7F4EE',
        taupe:  '#B7A79A',
        // Semantic tokens — use in components for clarity
        'bg-page':    'var(--bg-page)',
        'bg-surface': 'var(--bg-surface)',
        'bg-dark':    'var(--bg-dark)',
        'text-primary':  'var(--text-primary)',
        'text-muted':    'var(--text-muted)',
        'text-inverse':  'var(--text-inverse)',
        'border-warm':   'var(--border)',
        'accent':        'var(--accent)',
      },
      fontFamily: {
        display: ['Poppins', 'sans-serif'],
        body:    ['Inter', 'sans-serif'],
      },
      borderRadius: {
        // Override defaults with brand scale
        sm:   '4px',
        md:   '16px',
        lg:   '24px',
        xl:   '32px',
        full: '9999px',
      },
      boxShadow: {
        sm:   'var(--shadow-sm)',
        md:   'var(--shadow-md)',
        lg:   'var(--shadow-lg)',
        card: 'var(--shadow-card)',
      },
      transitionTimingFunction: {
        'ease-brand':  'cubic-bezier(0.16, 1, 0.3, 1)',
        'ease-spring': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
      transitionDuration: {
        fast:  '150ms',
        base:  '250ms',
        slow:  '400ms',
        enter: '600ms',
      },
      maxWidth: {
        container: '1200px',
      },
    },
  },
  plugins: [],
};

export default config;
