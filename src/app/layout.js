
import './globals.css';  // Đường dẫn tới file CSS của bạn

export const metadata = {
  title: 'Survey App',
  description: 'Survey Application',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
