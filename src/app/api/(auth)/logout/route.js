import { NextResponse } from "next/server";

export async function POST() {
    const response = NextResponse.json({ success: true, message: "Đăng xuất thành công!" });

    // Xóa cookie chứa token bằng cách đặt nó hết hạn
    response.cookies.set("token", "", {
        httpOnly: true,
        secure: false,
        expires: new Date(0), // Xóa ngay lập tức
        path: "/",
    });

    return response;
}
