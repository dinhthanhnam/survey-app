"use client";
import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import axios from "axios";

const AdminHeader = () => {
    const pathname = usePathname();
    const router = useRouter();

    const handleLogout = async () => {
        try {
            await axios.post("/api/logout", {}, { withCredentials: true });
            localStorage.removeItem("respondent");
            router.push("/auth");
        } catch (error) {
            console.error("Lỗi khi đăng xuất:", error);
        }
    };

    return (
        <header className="bg-white py-2 px-4 sm:px-6 shadow-md">
            <div className="max-w-7xl mx-auto">
                {/* Hàng chứa logo */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-2 mb-2">
                    <div className="flex justify-center sm:justify-start">
                        <img
                            src="/img/coop.png"
                            alt="Logo CoopBank"
                            className="h-10 sm:h-12 w-auto max-w-[180px] object-contain"
                        />
                    </div>
                    <div className="flex items-center justify-center gap-3">
                        <img
                            src="/img/MCG.png"
                            alt="Logo MCG"
                            className="h-10 sm:h-12 w-auto max-w-[90px] object-contain"
                        />
                        <img
                            src="/img/ITDE.png"
                            alt="Logo ITDE"
                            className="h-10 sm:h-12 w-auto max-w-[70px] object-contain"
                        />
                    </div>
                </div>

                {/* Tiêu đề */}
                <div className="text-center mb-2">
                    <h1 className="text-base sm:text-lg md:text-xl font-bold text-teal-800">
                        Quản trị khảo sát chuyển đổi số trong hệ thống quỹ tín dụng Co-op Bank
                    </h1>
                </div>

                {/* Thanh điều hướng */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-t pt-2 relative">
                    <div className="flex justify-center gap-4">
                        <NavLink href="/admin" active={pathname === "/admin"}>
                            Biểu đồ
                        </NavLink>
                        <NavLink href="/admin/responses" active={pathname === "/admin/responses"}>
                            Câu trả lời
                        </NavLink>
                        <NavLink href="/admin/funds" active={pathname === "/admin/funds"}>
                            Quỹ trả lời
                        </NavLink>
                        <NavLink href="/admin/survey-stats" active={pathname === "/admin/survey-stats"}>
                            Thống kê
                        </NavLink>
                    </div>
                    <div className="flex justify-center sm:absolute sm:right-0 sm:top-1/2 sm:-translate-y-1/2">
                        <button
                            onClick={handleLogout}
                            className="bg-red-500 text-white px-3 py-1 rounded-lg text-sm sm:text-base font-semibold shadow hover:bg-red-600 transition"
                        >
                            Đăng xuất
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
};

function NavLink({ href, active, children }) {
    return (
        <Link
            href={href}
            className={`px-3 py-1 text-sm sm:text-base ${
                active
                    ? "text-teal-600 font-bold border-b-2 border-teal-600"
                    : "text-gray-600 hover:text-teal-700"
            } transition-all duration-200`}
        >
            {children}
        </Link>
    );
}

export default AdminHeader;
