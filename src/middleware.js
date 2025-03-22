import { NextResponse } from "next/server";
import { verifyToken } from "@/utils/auth";

export const config = {
    matcher: ["/", "/admin/:path*", "/auth", "/admin-auth"], // Thêm /admin-auth vào
}

export async function middleware(req) {
    const token = req.cookies.get("token")?.value;
    const url = req.nextUrl.pathname;

    console.log("🔍 Debug Middleware:");
    console.log("🍪 Token from Cookie:", token);

    const user = token ? await verifyToken(token) : null;

    // Nếu không có user (chưa xác thực)
    if (!user) {
        console.log("❌ Không có token hợp lệ! Chặn vào route:", url);
        if (url.startsWith("/auth") || url.startsWith("/admin-auth")) {
            return NextResponse.next(); // Cho phép vào /auth hoặc /admin-auth nếu chưa đăng nhập
        }
        return NextResponse.redirect(new URL("/auth", req.url)); // Chuyển hướng đến /auth nếu chưa đăng nhập
    }

    // Nếu đã xác thực (có user)
    if (user) {
        // Người dùng đã xác thực không được vào /auth
        if (url.startsWith("/auth")) {
            console.log("🚫 Người dùng đã xác thực, không cho phép vào /auth");
            return NextResponse.redirect(new URL("/", req.url));
        }

        // Admin đã xác thực không được vào /admin-auth
        if (user.auth_status === "admin" && url.startsWith("/admin-auth")) {
            console.log("🚫 Admin đã xác thực, không cho phép vào /admin-auth");
            return NextResponse.redirect(new URL("/admin", req.url));
        }
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