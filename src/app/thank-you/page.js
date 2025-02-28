export default function ThankYouPage() {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg text-center">
                <h2 className="text-2xl font-bold text-teal-900">
                    Cảm ơn bạn đã hoàn thành khảo sát!
                </h2>
                <p className="text-gray-700 mt-2">
                    Phản hồi của bạn đã được ghi nhận. Chúng tôi rất trân trọng
                    sự đóng góp của bạn.
                </p>
                <a
                    href="/"
                    className="mt-4 inline-block bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700"
                >
                    Quay về trang chủ
                </a>
            </div>
        </div>
    );
}
