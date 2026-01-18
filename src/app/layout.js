import './globals.css'; // Đường dẫn tới file CSS của bạn

export const metadata = {
    title: 'Khảo sát chuyển đổi số - Ngân hàng phát triển Việt Nam',
    description: 'Khảo sát chuyển đổi số - Ngân hàng phát triển Việt Nam',
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    );
}
