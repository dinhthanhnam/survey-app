import { NextResponse } from "next/server";
import { verifyToken } from "@/utils/auth";


export const config = {
    matcher: ["/", "/admin/:path*", "/auth"],
};


export function middleware(req) {
    const token = req.cookies.get("token")?.value;

    console.log("🔍 Debug Middleware:");
    console.log("🍪 Token from Cookie:", token);

    const user = token ? verifyToken(token) : null;
    console.log("👤 Decoded User:", user);

    const url = req.nextUrl.pathname;

    if (!user) {
        console.log("❌ Không có token hợp lệ! Chặn vào route:", url);
        if (url.startsWith("/auth")) return NextResponse.next();
        return NextResponse.redirect(new URL("/auth", req.url));
    }

    if (url.startsWith("/auth")) {
        console.log("✅ Đã có token nhưng đang ở /auth → Chuyển về /");
        return NextResponse.redirect(new URL("/", req.url));
    }

    console.log("✅ Token hợp lệ! Cho phép vào:", url);
    return NextResponse.next();
}
