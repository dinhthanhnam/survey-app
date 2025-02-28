"use client";
import { useState } from "react";
import Header from "@/app/components/Header";
import axios from "axios";

export default function RefreshPage() {
    const [email, setEmail] = useState(""); // Email
    const [creditCode, setCreditCode] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const handleRefresh = async() => {
        if(!email) {
            setErrorMessage("Vui lòng nhập email!");
            return;
        }
        try {
            const response = await axios.post("/api/refresh",
                {email, creditCode},
                { withCredentials: true }
            );

            if (response.data.success) {
                localStorage.setItem("respondent", response.data.respondent);
                window.location.href = "/";
            } else {
                setErrorMessage(response.data.message);
            }
        } catch (error) {
            setErrorMessage("Xác thực lại thất bại!");
        }
    }

    return (
        <div>
            <div className="min-h-screen bg-custom-wave bg-cover bg-repeat flex items-center justify-center p-4 sm:pt-8 sm:pb-8">
                <div className="w-full sm:w-[90%] md:w-[80%] lg:w-3/5 mx-auto bg-white shadow-lg rounded-lg sm:p-6 md:p-8 max-h-screen overflow-y-auto pb-32">
                    <Header />
                    {errorMessage && (
                        <p className="text-red-500 text-sm font-semibold">{errorMessage}</p>
                    )}
                    <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-lg p-8">
                        <div className="w-full flex flex-col gap-2">
                            <h2 className="text-2xl font-bold text-teal-700">NHẬP LẠI EMAIL ĐỂ TIẾP TỤC KHẢO SÁT</h2>
                            <a className="underline text-teal-600 self-end" href="/auth">Lần đầu?</a>
                        </div>

                        <div className="border border-gray-300 rounded-lg shadow-md p-4 mb-6 bg-gray-50 flex flex-col gap-2">
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
                            </div>
                            <label className="block text-gray-700 font-semibold text-lg">
                                Mã quỹ
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
                            <div className={`pt-6 flex flex-row-reverse`}>
                                <button
                                    onClick={handleRefresh}
                                    className=" p-2 px-4 self-end bg-gray-200 font-normal rounded-lg hover:bg-gray-300 focus:ring-2 focus:ring-teal-500 whitespace-nowrap"
                                >
                                    Gửi
                                </button>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
