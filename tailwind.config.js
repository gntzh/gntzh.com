module.exports = {
  darkMode: 'class',
  content: ['./pages/**/*.tsx', './components/**/*.tsx'],
  plugins: [require('@tailwindcss/typography')],
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            'summary + div > *': {
              marginTop: '0',
            },
            blockquote: {
              fontStyle: 'normal',
            },
          },
        },
      },
    },
  },
}
