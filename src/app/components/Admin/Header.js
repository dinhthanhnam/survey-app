'use client';
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const AdminHeader = () => {
    const pathname = usePathname();

    return (
        <>
            {/* Hàng chứa logo */}
            <div className="mb-3 text-center sm:text-left px-2 ">
                <div className="flex flex-wrap items-center justify-center sm:justify-between gap-4 mb-2">
                    {/* Logo lớn bên trái */}
                    <img
                        src="/img/coop.png"
                        alt="Logo CoopBank"
                        className="h-12 sm:h-16 w-32 sm:w-52 flex-shrink-0"
                    />

                    {/* Hai logo nhỏ bên phải */}
                    <div className="flex items-center justify-center sm:justify-start space-x-4">
                        <img
                            src="/img/MCG.png"
                            alt="Logo MCG"
                            className="h-10 sm:h-14 max-w-[120px] flex-shrink-0"
                        />
                        <img
                            src="/img/ITDE.png"
                            alt="Logo ITDE"
                            className="h-10 sm:h-14 max-w-[90px] flex-shrink-0"
                        />
                    </div>
                </div>

                {/* Tiêu đề */}
                <div className="flex items-center justify-center h-full w-full">
                    <h1 className="text-lg sm:text-2xl font-bold text-teal-800 text-center">
                        Quản trị khảo sát chuyển đổi số trong hệ thống quỹ tín
                        dụng Co-op Bank
                    </h1>
                </div>
            </div>

            {/* Thanh điều hướng */}
            <div className="w-full flex justify-center gap-6 border-b">
                <NavLink href="/admin" active={pathname === '/admin'}>
                    Bộ câu hỏi
                </NavLink>
                <NavLink
                    href="/admin/dashboard"
                    active={pathname === '/admin/dashboard'}
                >
                    Dashboard
                </NavLink>
            </div>
        </>
    );
};

function NavLink({ href, active, children }) {
    return (
        <Link
            href={href}
            className={`px-4 py-2 text-lg ${
                active
                    ? 'text-teal-600 font-bold border-b-2 border-teal-600'
                    : 'text-gray-600'
            } hover:text-teal-700 transition-all duration-200`}
        >
            {children}
        </Link>
    );
}

export default AdminHeader;
