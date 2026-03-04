/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './public/index.html',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      // ─── B테마: Ink & Linen 색상 토큰 ─────────────────────────────
      colors: {
        ink: {
          // primary: ink blue
          50:  '#EBF2F9',
          100: '#D2E5F3',
          200: '#A5CBE7',
          300: '#78B1DB',
          400: '#4B97CF',
          500: '#2D5F8A',  // BASE
          600: '#1E4A6E',
          700: '#153652',
          800: '#0C2136',
          900: '#030D1A',
        },
        linen: {
          // bg: warm white/linen
          50:  '#FAFAF8',  // BASE bg
          100: '#F2F0EB',  // surface
          200: '#E8E4DC',  // surface2
          300: '#D8D2C8',  // border
          400: '#C4BAA8',
          500: '#A99883',
        },
        spine: {
          // secondary: book spine brown
          50:  '#F9F5EF',
          100: '#F0E8DC',
          200: '#DEC9AA',
          300: '#C4A07A',
          400: '#A88558',
          500: '#8B6F47',  // BASE
          600: '#6E5535',
          700: '#513C23',
        },
        cover: {
          // accent3: book cover red
          500: '#E8564D',
          600: '#D4423A',
        },
        charcoal: {
          // text dark
          900: '#1A1A1A',
          700: '#4A4540',
          600: '#6A6260',
          500: '#8C857D',
          400: '#A09890',
        },
      },
      // ─── 폰트 패밀리 ──────────────────────────────────────────────
      fontFamily: {
        serif:  ['Merriweather', 'Noto Serif KR', 'Georgia', 'serif'],
        sans:   ['Noto Sans KR', 'Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        body:   ['Inter', 'Noto Sans KR', 'sans-serif'],
      },
      // ─── 간격/크기 ────────────────────────────────────────────────
      maxWidth: {
        content: '1100px',
      },
      // ─── 커스텀 애니메이션 ──────────────────────────────────────────
      transitionDuration: {
        800: '800ms',
      },
      keyframes: {
        fadeUp: {
          '0%':   { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      animation: {
        'fade-up':   'fadeUp 0.6s ease-out forwards',
        'fade-up-d': 'fadeUp 0.6s ease-out 0.2s forwards',
        'fade-in':   'fadeIn 0.4s ease-out forwards',
      },
    },
  },
  plugins: [],
};
