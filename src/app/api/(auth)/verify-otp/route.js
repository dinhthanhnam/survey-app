import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { createToken } from "@/utils/auth";

const prisma = new PrismaClient();

export async function POST(req) {
    try {
        const belongToGroupMapping = {
            Leader: "Lãnh đạo & Quản lý",
            Officer: "Cán bộ nghiệp vụ",
            ITSup: "Nhân viên CNTT & Hỗ trợ kỹ thuật"
        };

        const { otp, respondent } = await req.json();

        if (!otp || !respondent?.email) {
            return NextResponse.json({ success: false, message: "Vui lòng nhập email và OTP!" }, { status: 400 });
        }

        // Tìm OTP hợp lệ
        const otpRecord = await prisma.otpToken.findFirst({
            where: {
                email: respondent.email,
                expiresAt: { gte: new Date() } // Lấy OTP chưa hết hạn
            },
            orderBy: { id: "desc" } // Lấy OTP gần nhất
        });

        if (!otpRecord) {
            return NextResponse.json({ success: false, message: "OTP đã hết hạn!" }, { status: 400 });
        }

        // Kiểm tra OTP có đúng không
        const isMatch = await bcrypt.compare(otp, otpRecord.otpHash);
        if (!isMatch) {
            return NextResponse.json({ success: false, message: "OTP không chính xác!" }, { status: 400 });
        }
        // Xoá OTP sau khi dùng
        await prisma.otpToken.delete({ where: { id: otpRecord.id } });

        // Tạo người dùng đã xác thực
        const authedRespondent = await prisma.respondents.create({
            data: { ...respondent, auth_status: "authorized" }
        });

        if(!authedRespondent) {
            return NextResponse.json({ success: false, message: "Không tạo được Respondent!" });
        }

        // Tạo JWT token
        const token = await createToken(authedRespondent);

        if(!token) {
            return NextResponse.json({ success: false, message: "Không tạo được Token!" });
        }
        const returnedRespondent = {
            ...authedRespondent,
            belong_to_group: belongToGroupMapping[respondent.belong_to_group]
        };
        // Tạo response và đặt token vào cookie
        const response = NextResponse.json({ success: true, message: "Xác thực thành công!", respondent: JSON.stringify(returnedRespondent)});

        response.cookies.set("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            path: "/"
        });

        return response;
    } catch (error) {
        console.error(error);
        return Response.json({ success: false, message: "Lỗi server", error }, { status: 500 });
    }
}
