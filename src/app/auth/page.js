"use client";
import { useState } from "react";
import Header from "@/app/components/Header";
import axios from "axios";

export default function AuthPage() {
    const [creditCode, setCreditCode] = useState(""); // Mã quỹ tín dụng
    const [name, setName] = useState(""); // Name
    const [email, setEmail] = useState(""); // Email
    const [phone, setPhone] = useState(""); // Phone
    const [role, setRole] = useState(""); // Vai trò
    const [otp, setOtp] = useState("");
    const [otpVisible, setOtpVisible] = useState(false); // Hiển thị ô OTP
    const [errorMessage, setErrorMessage] = useState(""); // Thông báo lỗi
    const [authedRespondent, setAuthedRespondent] = useState({});

    // Hàm gửi request lấy OTP
    const handleRequestOTP = async () => {
        setErrorMessage(""); // Reset lỗi trước khi kiểm tra
        if (!name || !creditCode || !email || !role) {
            setErrorMessage("Vui lòng nhập và chọn đầy đủ thông tin.");
            return;
        }

        try {
            const response = await axios.post("/api/generate-otp", {
                name,
                phone,
                email,
                creditCode,
                role,
            });

            if (response.data.success) {
                setOtpVisible(true);
            } else {
                setErrorMessage("Mã quỹ tín dụng không hợp lệ. Vui lòng kiểm tra lại.");
            }
        } catch (error) {
            setErrorMessage("Đã xảy ra lỗi khi lấy OTP. Vui lòng thử lại.");
        }
    };

    const handleVerifyOTP = async () => {

    };

    return (
        <div>
            <div className="min-h-screen bg-custom-wave bg-cover bg-repeat flex items-center justify-center p-4 sm:pt-8 sm:pb-8">
                <div className="w-full sm:w-[90%] md:w-[80%] lg:w-3/5 mx-auto bg-white shadow-lg rounded-lg sm:p-6 md:p-8 max-h-screen overflow-y-auto pb-32">
                    <Header />

                    <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-lg p-8">
                        <h2 className="text-2xl font-bold text-teal-700 mb-6 text-center sm:text-left">
                            THÔNG TIN QUỸ TÍN DỤNG
                        </h2>
                        {errorMessage && (
                            <p className="text-red-500 text-sm font-semibold">{errorMessage}</p>
                        )}
                        {/* Mã Quỹ Tín Dụng */}
                        <div className="border border-gray-300 rounded-lg shadow-md p-4 mb-6 bg-gray-50">
                            <label className="block text-gray-700 font-semibold text-lg">
                                1. Mã quỹ tín dụng
                            </label>
                            <input
                                type="text"
                                value={creditCode}
                                onChange={(e) => setCreditCode(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 mt-2"
                                placeholder="Nhập mã quỹ tín dụng..."
                            />
                        </div>

                        <div className="border border-gray-300 rounded-lg shadow-md p-4 mb-6 bg-gray-50">
                            <label className="block text-gray-700 font-semibold text-lg">
                                2. Tên
                            </label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 mt-2"
                                placeholder="Nhập họ tên đầy đủ..."
                            />
                        </div>

                        {/* Email */}
                        <div className="border border-gray-300 rounded-lg shadow-md p-4 mb-6 bg-gray-50">
                            <label className="block text-gray-700 font-semibold text-lg">
                                3. Email
                            </label>
                            <div className="flex items-center gap-2">
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                                    placeholder="Nhập email của bạn..."
                                />
                                <button
                                    onClick={handleRequestOTP}
                                    className="px-4 py-2 bg-gray-200 font-normal rounded-lg hover:bg-gray-300 focus:ring-2 focus:ring-teal-500 whitespace-nowrap"
                                >
                                    Gửi OTP
                                </button>
                            </div>
                        </div>

                        <div className="border border-gray-300 rounded-lg shadow-md p-4 mb-6 bg-gray-50">
                            <label className="block text-gray-700 font-semibold text-lg">
                                2. Số điện thoai
                            </label>
                            <input
                                type="text"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 mt-2"
                                placeholder="Nhập họ tên đầy đủ..."
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
                                <option value="leader">Lãnh đạo & Quản lý</option>
                                <option value="businessofficer">Cán bộ nghiệp vụ</option>
                                <option value="itsupport">Nhân viên CNTT & Hỗ trợ kỹ thuật</option>
                            </select>
                        </div>

                        {/* Hiển thị thông báo lỗi nếu có */}

                        {/* OTP Input (chỉ hiển thị khi thành công) */}
                        {otpVisible && (
                            <>
                                <p className="text-green-600 text-sm font-semibold">OTP đã được gửi, kiểm tra email của bạn.</p>
                                <div className="border border-gray-300 rounded-lg shadow-md p-4 mb-6 bg-gray-50">
                                    <label className="block text-gray-700 font-semibold text-lg">
                                        5. Nhập OTP
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
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
