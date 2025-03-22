import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { createToken } from "@/utils/auth.js";

export async function POST(req) {
    const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
    const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD; // Mật khẩu dạng text (chưa hash)

    const { email, password } = await req.json();

    if (!ADMIN_EMAIL || !ADMIN_PASSWORD) {
        return NextResponse.json({ error: "Server chưa cấu hình ENV" }, { status: 500 });
    }

    if (email !== ADMIN_EMAIL) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Hash mật khẩu nhập vào để so sánh
    const passwordHash = bcrypt.hashSync(ADMIN_PASSWORD, 10);
    const isMatch = await bcrypt.compare(password, passwordHash);

    if (!isMatch) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const admin = {
        id: 2147483647,
        email: ADMIN_EMAIL,
        auth_status: "admin",
        belong_to_group: "admin",
        submission_status: "admin"
    };

    const token = await createToken(admin);

    const response = NextResponse.json({ success: true, message: "Xác thực admin thành công!" });

    response.cookies.set("token", token, {
        httpOnly: true,
        secure: false,
        sameSite: "strict",
        path: "/",
    });

    return response;
}
