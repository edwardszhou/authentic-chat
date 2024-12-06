/** @type {import('tailwindcss').Config} */

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    colors: {
      grayscale: {
        0: 'var(--grayscale-00)',
        // 40: 'var(--grayscale-40)',
        60: 'var(--grayscale-60)',
        70: 'var(--grayscale-70)',
        80: 'var(--grayscale-80)',
        5: 'var(--grayscale-5)',
        25: 'var(--grayscale-25)',
        90: 'var(--grayscale-90)',
        100: 'var(--grayscale-100)'
      },
      green: {
        light: 'var(--green-light)',
        medium: 'var(--green-med)',
        dark: 'var(--green-dark)'
      },
      pink: {
        light: 'var(--pink-light)',
        medium: 'var(--pink-medium)',
        dark: 'var(--pink-dark)'
      },
      yellow: {
        light: 'var(--yellow-light)',
        dark: 'var(--yellow-dark)'
      },
      blue: {
        light: 'var(--blue-light)',
        dark: 'var(--blue-dark)'
      },
      orange: {
        light: 'var(--orange-light)',
        dark: 'var(--orange-dark)'
      }
    },
    extend: {
      fontFamily: {
        main: ['ApfelGrotezk', 'ui-sans-serif'],
        alt: ['Roboto']
      },
      boxShadow: {
        'glow-sm': '0 0 2px -0 var(--tw-shadow-color)',
        'glow-md': '0 0 6px -1px var(--tw-shadow-color)',
        'glow-lg': '0 0 15px -3px var(--tw-shadow-color)',
        'glow-xl': '0 0 25px -5px var(--tw-shadow-color)',
        'glow-2xl': '0 0 50px -12px var(--tw-shadow-color)'
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '3rem'
      },
      fontSize: {
        h1: ['5.5rem', { lineHeight: '112%', letterSpacing: '-4px' }],
        h2: ['4.25rem', { lineHeight: '112%', letterSpacing: '-2px' }],
        h3: ['3.25rem', { lineHeight: '112%', letterSpacing: '-2px' }],
        h4: ['2.25rem', { lineHeight: '112%', letterSpacing: '-1px' }],
        h5: ['1.75rem', { lineHeight: '112%', letterSpacing: '-1px' }],
        h6: ['1.25rem', { lineHeight: '112%', letterSpacing: '-0.5px' }],
        p: ['1rem', { lineHeight: '130%', letterSpacing: '-0.15px' }],
        small: ['0.75rem', { lineHeight: '130%', letterSpacing: '-0.15px' }]
      }
    }
  },
  plugins: []
};
