import './globals.css'; // Đường dẫn tới file CSS của bạn

export const metadata = {
    title: 'Khảo sát chuyển đổi số - Ngân hàng Hợp tác',
    description: 'Khảo sát chuyển đổi số - Ngân hàng Hợp tác',
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    );
}
