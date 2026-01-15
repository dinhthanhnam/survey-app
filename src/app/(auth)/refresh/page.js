"use client";
import { useState } from "react";
import Header from "@/app/components/Header";
import axios from "axios";

export default function RefreshPage() {
    const [email, setEmail] = useState(""); // Email
    const [creditCode, setCreditCode] = useState("");
    const [role, setRole] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [otp, setOtp] = useState("");
    const handleRequestOTP = async () => {
        setSuccessMessage("");
        setErrorMessage("");
        if (!email || !role || !creditCode) {
            setErrorMessage("Vui lòng nhập đầy đủ thông tin!");
            return;
        }

        try {
            const response = await axios.post("/api/login-otp", { email, role, creditCode });

            if (response.data.success) {
                setSuccessMessage("OTP đã được gửi!");
            } else {
                setErrorMessage(response.data.message);
            }
        } catch (error) {
            setErrorMessage("Gửi OTP thất bại!");
        }
    };

    const handleRefresh = async () => {
        setSuccessMessage("");
        setErrorMessage("");
        if (!email || !otp || !creditCode || !role) {
            setErrorMessage("Vui lòng nhập đầy đủ thông tin!");
            return;
        }

        try {
            const response = await axios.post(
                "/api/refresh",
                { email, otp, creditCode, role },
            );

            if (response.data.success) {
                localStorage.setItem("respondent", response.data.respondent);
                window.location.href = "/";
            } else {
                setErrorMessage(response.data.message);
            }
        } catch (error) {
            setErrorMessage("Xác thực thất bại!");
        }
    };

    return (
        <div>
            <div className="min-h-screen bg-custom-wave bg-cover bg-repeat flex items-center justify-center p-4 sm:pt-8 sm:pb-8">
                <div className="w-full sm:w-[90%] md:w-[80%] lg:w-3/5 mx-auto bg-white shadow-lg rounded-lg sm:p-6 md:p-8 max-h-screen overflow-y-auto pb-32">
                    <Header />
                    <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-lg p-8">
                        <div className="w-full flex flex-col gap-2">
                            <h2 className="text-2xl font-bold text-teal-700">XÁC THỰC LẠI EMAIL ĐỂ TIẾP TỤC KHẢO SÁT</h2>
                            <a className="underline text-teal-600 self-end" href="/auth">Quay lại giao diện xác thực lần đầu</a>
                        </div>

                        <div className="border border-gray-300 rounded-lg shadow-md p-4 mb-6 bg-gray-50 flex flex-col gap-2">
                            {errorMessage && (
                                <div>
                                    <p className="text-red-700 bg-red-200 border border-red-500 rounded-md px-4 py-2 text-sm font-semibold transition-all">
                                        {errorMessage}
                                    </p>
                                </div>
                            )}
                            {successMessage && (
                                <div>
                                    <p className="text-green-700 bg-green-200 border border-green-500 rounded-md px-4 py-2 text-sm font-semibold transition-all">
                                        {successMessage}
                                    </p>
                                </div>

                            )}

                            <label className="block text-gray-700 font-semibold text-lg">
                                Mã thí sinh
                            </label>
                            <div className="flex items-center gap-2">
                                <input
                                    type="text"
                                    value={creditCode}
                                    onChange={(e) => setCreditCode(e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                                    placeholder="Nhập mã quỹ..."
                                />
                            </div>
                            <label className="block text-gray-700 font-semibold text-lg">
                                Vai trò
                            </label>
                            <div className="flex items-center gap-2">
                                <select
                                    onChange={(e) => setRole(e.target.value)}
                                    value={role}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 mt-2"
                                >
                                    <option value="">Chọn vai trò</option>
                                    <option value="Leader">Lãnh đạo & Quản lý</option>
                                    <option value="Officer">Cán bộ nghiệp vụ</option>
                                    {/*<option value="ITSup">Nhân viên CNTT & Hỗ trợ kỹ thuật</option>*/}
                                </select>
                            </div>
                            <label className="block text-gray-700 font-semibold text-lg">
                                Email
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
                                    onClick={handleRefresh}
                                    className="px-4 py-2 bg-gray-200 font-normal rounded-lg hover:bg-gray-300 focus:ring-2 focus:ring-teal-500 whitespace-nowrap"
                                >
                                    Xác nhận OTP
                                </button>
                            </div>
                            {/*<div className={`pt-6 flex flex-row-reverse`}>*/}
                            {/*    <button*/}
                            {/*        onClick={handleRefresh}*/}
                            {/*        className=" p-2 px-4 self-end bg-gray-200 font-normal rounded-lg hover:bg-gray-300 focus:ring-2 focus:ring-teal-500 whitespace-nowrap"*/}
                            {/*    >*/}
                            {/*        Gửi*/}
                            {/*    </button>*/}
                            {/*</div>*/}

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
