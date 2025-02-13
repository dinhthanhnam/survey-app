/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}', // Đảm bảo đường dẫn chính xác tới các file của bạn
  ],
  theme: {
    extend: {
      backgroundImage: {
        'custom-wave':
          "url('https://cdn.forms.office.net/images/aio/wave-pattern-v1.svg'), linear-gradient(180deg, rgba(3, 120, 124, 0.2) 0%, rgba(3, 120, 124, 0.8) 100%)",
      },
    },
  },
  plugins: [],
};