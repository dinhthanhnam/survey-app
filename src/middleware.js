import { NextResponse } from "next/server";
import { verifyToken } from "@/utils/auth";

export const config = {
    matcher: ["/", "/admin/:path*", "/auth"],
};

export async function middleware(req) {
    const token = req.cookies.get("token")?.value;
    const url = req.nextUrl.pathname;

    console.log("🔍 Debug Middleware:");
    console.log("🍪 Token from Cookie:", token);

    const user = token ? await verifyToken(token) : null;

    if (!user) {
        console.log("❌ Không có token hợp lệ! Chặn vào route:", url);
        if (url.startsWith("/auth")) return NextResponse.next();
        return NextResponse.redirect(new URL("/auth", req.url));
    }

    // 🔥 Gọi API để lấy trạng thái submission từ server
    const response = await fetch(new URL("/api/user/user-submission-status", req.url), {
        method: "GET",
        headers: { Cookie: req.headers.get("cookie") || "" },
    });

    if (!response.ok) {
        console.log("❌ Lỗi khi lấy trạng thái người dùng!");
        return NextResponse.redirect(new URL("/auth", req.url));
    }

    const { submission_status } = await response.json();

    // Nếu người dùng đã submit, chặn họ vào "/"
    if (submission_status !== null && url === "/") {
        console.log("🚫 Người dùng đã submit, chuyển hướng đến /survey-report");
        return NextResponse.redirect(new URL("/survey-report", req.url));
    }

    // Nếu là admin, chỉ cho phép truy cập vào admin route
    if (user.auth_status === "admin") {
        if (!url.startsWith("/admin")) {
            console.log("❌ Admin không thể vào:", url);
            return NextResponse.redirect(new URL("/admin", req.url));
        }
    } else {
        // Chặn người dùng không phải admin truy cập vào admin route
        if (url.startsWith("/admin")) {
            console.log("❌ Người dùng không phải admin!");
            return NextResponse.redirect(new URL("/", req.url));
        }
    }

    console.log("✅ Token hợp lệ! Cho phép vào:", url);
    return NextResponse.next();
}
