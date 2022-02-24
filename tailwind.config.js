const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  darkMode: 'class',
  content: ['./pages/**/*.tsx', './components/**/*.tsx'],
  plugins: [require('@tailwindcss/typography')],
  theme: {
    extend: {
      fontFamily: {
        mono: ['Fira Code', ...defaultTheme.fontFamily.mono],
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            a: {
              textDecoration: 'none',
              borderBottom: '2px solid var(--tw-prose-hr)',
              transition: 'border 0.3s ease-in-out',
            },
            'a:hover': {
              borderBottom: '2px solid var(--tw-prose-links)',
            },
            blockquote: {
              fontStyle: 'normal',
            },
            'summary + div > *': {
              marginTop: '0',
            },
          },
        },
      }),
    },
  },
}
