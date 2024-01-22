module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./containers/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js",
  ],
  theme: {
    extend: {
      fontFamily: {
        'body': ['"Noto sans"', 'system-ui', 'sans-serif'],
        'heading': ['Lato', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        header: {
          '0%' : { transform: 'scale(0)' },
          '100%': { transform: 'scale(2)' },
        }
      },
      animation: {
        header: 'header 3s linear infinite',
      }
    },
  },
  plugins: [require('flowbite/plugin')],
}
