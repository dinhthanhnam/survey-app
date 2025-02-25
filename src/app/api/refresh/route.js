import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { createToken } from "@/utils/auth";

const prisma = new PrismaClient();

export async function POST(req) {
    try{
        const { email } = await req.json();

        const respondent = await prisma.respondents.findFirst({ where: { email } });

        if(!respondent) {
            return NextResponse.json({ success: false, message: "Email không đúng với dữ liệu hệ thống!" }, { status: 400 });
        }

        const token = createToken(respondent);

        if(!token) {
            return NextResponse.json({ success: false, message: "Không tạo được Token!" });
        }

        // Tạo response và đặt token vào cookie
        const response = NextResponse.json({ success: true, message: "Xác thực thành công!" });

        response.cookies.set("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            path: "/"
        });

        return response;
    } catch (error) {
        console.error(error);
        return NextResponse.json({ success: false, message: "Lỗi server", error }, { status: 500 });
    }

}