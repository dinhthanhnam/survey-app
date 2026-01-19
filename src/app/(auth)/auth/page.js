'use client';
import { useEffect, useRef, useState } from 'react';
import Header from '@/app/components/Header';
import axios from 'axios';

export default function AuthPage() {
    const [creditCode, setCreditCode] = useState(''); // Mã quỹ tín dụng
    const [name, setName] = useState(''); // Name
    const [email, setEmail] = useState(''); // Email
    const [phone, setPhone] = useState(''); // Phone
    const [role, setRole] = useState(''); // Vai trò
    const [otp, setOtp] = useState('');
    const [successMessage, setSuccessMessage] = useState(''); // Hiển thị ô OTP
    const [errorMessage, setErrorMessage] = useState(''); // Thông báo lỗi
    const [unAuthedRespondent, setUnAuthedRespondent] = useState({});
    const [requireLogin, setRequireLogin] = useState(false);
    const [isOtpButtonDisabled, setIsOtpButtonDisabled] = useState(false); // Trạng thái nút gửi OTP
    const loginLinkRef = useRef(null);
    const timeoutRef = useRef(null); // Ref để lưu timeout

    // Hàm gửi request lấy OTP với cơ chế debounce
    const handleRequestOTP = async () => {
        if (isOtpButtonDisabled) {
            return;
        }

        setErrorMessage('');
        setSuccessMessage('');
        if (!name || !creditCode || !email || !role) {
            setErrorMessage('Vui lòng nhập và chọn đầy đủ thông tin.');
            return;
        }
        console.log({ name, creditCode, email, role });

        try {
            // Vô hiệu hóa nút và bắt đầu countdown 30 giây
            setIsOtpButtonDisabled(true);
            timeoutRef.current = setTimeout(() => {
                setIsOtpButtonDisabled(false);
                setErrorMessage(''); // Xóa thông báo lỗi nếu có
            }, 15000); // 15 giây

            const response = await axios.post('/api/generate-otp', {
                name,
                phone,
                email,
                creditCode,
                role,
            });

            if (response.data.success) {
                setSuccessMessage(response.data.message);
                setUnAuthedRespondent(response.data.respondent);
            } else {
                setErrorMessage(response.data.message);
                if (response.data.require_login) setRequireLogin(true);
            }
        } catch (error) {
            console.error(error);
            setErrorMessage('Gửi OTP thất bại!');
        }
    };

    const handleVerifyOTP = async () => {
        try {
            const response = await axios.post(
                '/api/verify-otp',
                { otp, respondent: unAuthedRespondent },
                { withCredentials: true }
            );

            if (response.data.success) {
                setSuccessMessage(response.data.message);
                localStorage.setItem('respondent', response.data.respondent);
                window.location.href = '/'; // Chuyển hướng về trang chủ
            } else {
                setErrorMessage(response.data.message);
            }
        } catch (error) {
            setErrorMessage('Xác thực OTP thất bại!');
        }
    };

    useEffect(() => {
        console.log('Require Login:', requireLogin);
        if (requireLogin && loginLinkRef.current) {
            console.log('Focusing link...');
            loginLinkRef.current.focus();
        }
        setRequireLogin(false);
    }, [requireLogin]);

    // Cleanup timeout khi component unmount
    useEffect(() => {
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, []);

    return (
        <div>
            <div className="min-h-screen bg-custom-wave bg-cover bg-repeat flex items-center justify-center p-4 sm:pt-8 sm:pb-8">
                <div className="w-full sm:w-[90%] md:w-[80%] lg:w-3/5 mx-auto bg-white shadow-lg rounded-lg sm:p-6 md:p-8 max-h-screen overflow-y-auto pb-32">
                    <Header />

                    <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-lg p-8">
                        <div className="w-full flex flex-col gap-2">
                            <h2 className="text-2xl font-bold text-teal-700">
                                NHẬP THÔNG TIN ĐỂ THỰC HIỆN KHẢO SÁT
                            </h2>
                            <a
                                ref={loginLinkRef}
                                className="underline text-teal-600 focus:ring-2 focus:ring-teal-400 p-2 self-end"
                                href="/refresh"
                                tabIndex="0" // Giúp đảm bảo nó có thể focus
                            >
                                Tiếp tục khảo sát với Email đã xác thực
                            </a>
                        </div>

                        {errorMessage && (
                            <div className="py-4">
                                <p className="text-red-700 bg-red-200 border border-red-500 rounded-md px-4 py-2 text-sm font-semibold transition-all">
                                    {errorMessage}
                                </p>
                            </div>
                        )}
                        {/* Mã Quỹ Tín Dụng */}
                        <div className="border border-gray-300 rounded-lg shadow-md p-4 mb-6 bg-gray-50">
                            <label className="block text-gray-700 font-semibold text-lg">
                                1. Mã thí sinh
                            </label>
                            <input
                                type="text"
                                value={creditCode}
                                onChange={(e) => setCreditCode(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 mt-2"
                                placeholder="Nhập mã thí sinh..."
                            />
                        </div>

                        <div className="border border-gray-300 rounded-lg shadow-md p-4 mb-6 bg-gray-50">
                            <label className="block text-gray-700 font-semibold text-lg">
                                2. Họ và tên
                            </label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 mt-2"
                                placeholder="Nhập họ tên đầy đủ..."
                            />
                        </div>
                        <div className="border border-gray-300 rounded-lg shadow-md p-4 mb-6 bg-gray-50">
                            <label className="block text-gray-700 font-semibold text-lg">
                                3. Số điện thoại
                            </label>
                            <input
                                type="text"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 mt-2"
                                placeholder="Nhập số điện thoại..."
                            />
                        </div>

                        {/* Vai trò */}
                        <div className="border border-gray-300 rounded-lg shadow-md p-4 mb-6 bg-gray-50">
                            <label className="block text-gray-700 font-semibold text-lg">
                                4. Vai trò của bạn:
                            </label>
                            <select
                                onChange={(e) => setRole(e.target.value)}
                                value={role}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 mt-2"
                            >
                                <option value="">Chọn vai trò</option>
                                <option value="Leader">
                                    Lãnh đạo & Quản lý
                                </option>
                                <option value="Officer">
                                    Cán bộ nghiệp vụ
                                </option>
                            </select>
                        </div>
                        {/* Email */}
                        <div className="border border-gray-300 rounded-lg shadow-md p-4 mb-6 bg-gray-50">
                            <label className="block text-gray-700 font-semibold text-lg">
                                5. Email
                            </label>
                            <div className="flex items-center gap-2 flex-col">
                                {isOtpButtonDisabled && (
                                    <p className="text-green-600 text-sm font-semibold">
                                        Vui lòng chờ 15 giây trước khi gửi lại OTP
                                    </p>
                                )}
                                <div className="flex gap-2 w-full">
                                    <div className="flex-1">
                                        <input
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                                            placeholder="Nhập email của bạn..."
                                        />
                                    </div>
                                    <button
                                        onClick={handleRequestOTP}
                                        disabled={isOtpButtonDisabled}
                                        className={`px-4 py-2 font-normal rounded-lg whitespace-nowrap ${
                                            isOtpButtonDisabled
                                                ? 'bg-gray-300 text-gray-500 cursor-not-allowed opacity-50'
                                                : 'bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-2 focus:ring-teal-500'
                                        }`}
                                    >
                                        Gửi OTP
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* OTP Input (chỉ hiển thị khi thành công) */}
                        {successMessage && (
                            <div className="pb-4">
                                <p className="text-green-700 bg-green-200 border border-green-500 rounded-md px-4 py-2 text-sm font-semibold transition-all">
                                    {successMessage}
                                </p>
                            </div>
                        )}
                        <div className="border border-gray-300 rounded-lg shadow-md p-4 mb-6 bg-gray-50">
                            <label className="block text-gray-700 font-semibold text-lg">
                                6. Nhập OTP
                            </label>
                            <div className="flex items-center gap-2">
                                <input
                                    type="text"
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                                    placeholder="Nhập OTP..."
                                />
                                <button
                                    onClick={handleVerifyOTP}
                                    className="px-4 py-2 bg-gray-200 font-normal rounded-lg hover:bg-gray-300 focus:ring-2 focus:ring-teal-500 whitespace-nowrap"
                                >
                                    Xác nhận OTP
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}