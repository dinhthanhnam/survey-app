import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { createToken } from "@/utils/auth";

const prisma = new PrismaClient();

export async function POST(req) {
    try{
        const belongToGroupMapping = {
            Leader: "Lãnh đạo & Quản lý",
            Officer: "Cán bộ nghiệp vụ",
            ITSup: "Nhân viên CNTT & Hỗ trợ kỹ thuật"
        };

        const { email, creditCode } = await req.json();

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