const colors = require('tailwindcss/colors');

module.exports = {
  purge: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'light-blue': colors.lightBlue,
        cyan: colors.cyan,
        'oxford-blue': '#021027',
        'indigo-dye': '#04395E',
        'pine-tree': '#203129',
        'brunswick-green': '#385647',
        'polished-pine': '#70A288',
        'cultured': '#F3F7F5',
        'mint-cream': '#E6EFEA',
        'wheat': '#E7D1B1',
        'copper-crayola': '#D5896F'
      },
    },
  },
  variants: {},
  plugins: [],
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
};
