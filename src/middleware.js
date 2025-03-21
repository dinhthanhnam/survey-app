import { NextResponse } from "next/server";
import { verifyToken } from "@/utils/auth";

export const config = {
    matcher: ["/", "/admin/:path*", "/auth"],
};

export async function middleware(req) {
    const token = req.cookies.get("token")?.value;

    console.log("🔍 Debug Middleware:");
    console.log("🍪 Token from Cookie:", token);

    const user = token ? await verifyToken(token) : null;
    const url = req.nextUrl.pathname;
    if (!user) {
        console.log("❌ Không có token hợp lệ! Chặn vào route:", url);
        if (url.startsWith("/auth")) return NextResponse.next();
        return NextResponse.redirect(new URL("/auth", req.url));
    }

    if (user.auth_status === "admin") {
        if (!url.startsWith("/admin")) {
            console.log("❌ Admin không thể vào:", url);
            return NextResponse.redirect(new URL("/admin/dashboard", req.url)); // Điều hướng về trang chính của admin
        }
    } else {
        if (url.startsWith("/admin")) {
            console.log("❌ Người dùng không phải admin!");
            return NextResponse.redirect(new URL("/", req.url));
        }
    }

    console.log("✅ Token hợp lệ! Cho phép vào:", url);
    return NextResponse.next();
}
