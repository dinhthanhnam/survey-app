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
        <header className="bg-white py-4 px-4 sm:px-6">
            <div className="max-w-7xl mx-auto">
                {/* Hàng chứa tất cả logo */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-4">
                    <div className="flex justify-center sm:justify-start">
                        <img
                            src="/img/coop.png"
                            alt="Logo CoopBank"
                            className="h-12 sm:h-14 w-auto max-w-[200px] object-contain"
                        />
                    </div>
                    <div className="flex items-center justify-center gap-4">
                        <img
                            src="/img/MCG.png"
                            alt="Logo MCG"
                            className="h-12 sm:h-16 w-auto max-w-[100px] object-contain"
                        />
                        <img
                            src="/img/ITDE.png"
                            alt="Logo ITDE"
                            className="h-12 sm:h-16 w-auto max-w-[80px] object-contain"
                        />
                    </div>
                </div>

                {/* Tiêu đề */}
                <div className="text-center mb-4">
                    <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-teal-800">
                        Quản trị khảo sát chuyển đổi số trong hệ thống quỹ tín dụng Co-op Bank
                    </h1>
                </div>

                {/* Thanh điều hướng */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-t pt-4 relative">
                    <div className="flex justify-center gap-6">
                        <NavLink href="/admin" active={pathname === "/admin"}>
                            Bộ câu hỏi
                        </NavLink>
                        <NavLink href="/admin/responses" active={pathname === "/admin/responses"}>
                            Câu trả lời
                        </NavLink>
                        <NavLink href="/admin/unresponsive-funds" active={pathname === "/admin/unresponsive-funds"}>
                            Quỹ chưa trả lời
                        </NavLink>
                    </div>
                    <div className="flex justify-center sm:absolute sm:right-0 sm:top-1/2 sm:-translate-y-1/2">
                        <button
                            onClick={handleLogout}
                            className="bg-red-500 text-white px-4 py-2 rounded-lg text-sm sm:text-base font-semibold shadow-md hover:bg-red-600 transition"
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
            className={`px-4 py-2 text-base sm:text-lg ${
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