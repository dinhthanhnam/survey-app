import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { createToken } from "@/utils/auth";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export async function POST(req) {
    try{
        const belongToGroupMapping = {
            Leader: "Lãnh đạo & Quản lý",
            Officer: "Cán bộ nghiệp vụ",
            ITSup: "Nhân viên CNTT & Hỗ trợ kỹ thuật"
        };

        const { email, creditCode, otp } = await req.json();

        const respondent = await prisma.respondents.findFirst({
            where: {
                email: email,
                institutions: {
                    identity_code: creditCode
                }
            }
        });

        // if(respondent.institutions()) {}
        if(!respondent) {
            return NextResponse.json({ success: false, message: "Email không đúng với dữ liệu hệ thống!" }, { status: 400 });
        }

        const otpRecord = await prisma.otptoken.findFirst({
            where: {
                email: email,
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
        await prisma.otptoken.delete({ where: { id: otpRecord.id } });

        const token = await createToken(respondent);

        if(!token) {
            return NextResponse.json({ success: false, message: "Không tạo được Token!" });
        }

        const returnedRespondent = {
            ...respondent,
            belong_to_group: belongToGroupMapping[respondent.belong_to_group]
        };
        // Tạo response và đặt token vào cookie
        const response = NextResponse.json({ success: true, message: "Xác thực thành công!", respondent: JSON.stringify(returnedRespondent) });

        response.cookies.set("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "strict",
            path: "/"
        });

        return response;
    } catch (error) {
        console.error(error);
        return NextResponse.json({ success: false, message: "Lỗi server", error }, { status: 500 });
    }

}