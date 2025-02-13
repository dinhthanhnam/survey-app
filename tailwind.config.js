/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}', // Đảm bảo đường dẫn chính xác tới các file của bạn
  ],
  theme: {
    extend: {
      backgroundImage: {
        'custom-wave': "url('/img/rose-petals.svg')",
      },
    },
  },
  plugins: [],
};