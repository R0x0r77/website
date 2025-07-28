import azure from './src/styles/typography/azure-magenta';

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  theme: {
    extend: {
      typography: () => ({
        azure: azure,
      }),
    },
  },
};
