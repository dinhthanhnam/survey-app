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
    const [successMessage, setSuccessMessage] = useState(""); // Hiển thị ô OTP
    const [errorMessage, setErrorMessage] = useState(""); // Thông báo lỗi
    const [unAuthedRespondent, setUnAuthedRespondent] = useState({});
    const [maskedCode, setMaskedCode] = useState("");
    // Hàm gửi request lấy OTP
    const handleRequestOTP = async () => {
        setErrorMessage("");
        setSuccessMessage("");
        if (!name || !creditCode || !email || !role) {
            setErrorMessage("Vui lòng nhập và chọn đầy đủ thông tin.");
            return;
        }
        console.log({ name, creditCode, email, role });
        try {
            const response = await axios.post("/api/generate-otp", {
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
            }
        } catch (error) {
            setErrorMessage("Kiểm tra lại thông tin mã quỹ.");
        }
    };

    const handleVerifyOTP = async () => {
        try {
            const response = await axios.post("/api/verify-otp",
                { otp, respondent: unAuthedRespondent },
                { withCredentials: true }
            );

            if (response.data.success) {
                setSuccessMessage(response.data.message);
                localStorage.setItem("respondent", response.data.respondent);
                window.location.href = "/"; // Chuyển hướng về trang chủ
            } else {
                setErrorMessage(response.data.message);
            }
        } catch (error) {
            setErrorMessage("Xác thực OTP thất bại!");
        }
    };

    const maskCreditCode = (value) => {
        if (value.length <= 3) return value; // Hiển thị toàn bộ nếu ngắn
        return value.slice(0, 3) + "*".repeat(value.length - 4) + value.slice(-1);
    };

    const handleChange = (e) => {
        const value = e.target.value;
        setCreditCode(value);
        setMaskedCode(maskCreditCode(value));
    };

    return (
        <div>
            <div className="min-h-screen bg-custom-wave bg-cover bg-repeat flex items-center justify-center p-4 sm:pt-8 sm:pb-8">
                <div className="w-full sm:w-[90%] md:w-[80%] lg:w-3/5 mx-auto bg-white shadow-lg rounded-lg sm:p-6 md:p-8 max-h-screen overflow-y-auto pb-32">
                    <Header />

                    <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-lg p-8">
                        <div className="w-full flex flex-col gap-2">
                            <h2 className="text-2xl font-bold text-teal-700">NHẬP THÔNG TIN ĐỂ THỰC HIỆN KHẢO SÁT</h2>
                            <a className="underline text-teal-600 self-end" href="/refresh">Không phải lần đầu?</a>
                        </div>

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
                                value={maskedCode}
                                onChange={handleChange}
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
                        <div className="border border-gray-300 rounded-lg shadow-md p-4 mb-6 bg-gray-50">
                            <label className="block text-gray-700 font-semibold text-lg">
                                2. Số điện thoại
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
                                3. Vai trò của bạn:
                            </label>
                            <select
                                onChange={(e) => setRole(e.target.value)}
                                value={role}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 mt-2"
                            >
                                <option value="">Chọn vai trò</option>
                                <option value="Leader">Lãnh đạo & Quản lý</option>
                                <option value="Officer">Cán bộ nghiệp vụ</option>
                                <option value="ITSup">Nhân viên CNTT & Hỗ trợ kỹ thuật</option>
                            </select>
                        </div>
                        {/* Email */}
                        <div className="border border-gray-300 rounded-lg shadow-md p-4 mb-6 bg-gray-50">
                            <label className="block text-gray-700 font-semibold text-lg">
                                4. Email
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

                        {/* OTP Input (chỉ hiển thị khi thành công) */}
                        {successMessage !== "" && (
                            <p className="text-green-600 text-sm font-semibold">OTP đã được gửi, kiểm tra email của bạn.</p>
                        )}
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
                    </div>
                </div>
            </div>
        </div>
    );
}
