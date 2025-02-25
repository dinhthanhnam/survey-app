import { PrismaClient } from "@prisma/client";
import { sendOtpEmail } from "@/utils/mail";
import bcrypt from "bcryptjs";
import { respondents_belong_to_group } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req) {
    try {
        const { phone, name, email, creditCode, role  } = await req.json();

        if (!email || !creditCode || !role) {
            return Response.json({ success: false, message: "Vui lòng nhập đầy đủ thông tin!" }, { status: 400 });
        }
        const institution = await prisma.institutions.findUnique({
            where: {identity_code: creditCode},
        })
        if(!institution) {
            return Response.json({success: false, message: "Mã quỹ sai!"}, {status: 400});
        }

        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const otpHash = await bcrypt.hash(otp, 8);

        await prisma.otpToken.deleteMany({ where: { email } });

        await prisma.otpToken.create({
            data: {
                email,
                otpHash,
                expiresAt: new Date(Date.now() + 5 * 60 * 1000),
            },
        });

        let parsedRole;
        switch (role) {
            case "Leader":
                parsedRole = respondents_belong_to_group.Leader;
                break;
            case "Officer":
                parsedRole = respondents_belong_to_group.Officer;
                break;
            case "ITSup":
                parsedRole = respondents_belong_to_group.ITSup;
                break;
            default:
                parsedRole = null; // Hoặc xử lý lỗi nếu role không hợp lệ
                console.error("Invalid role:", role);
        }

        const unAuthedRespondent = {
                name: name,
                email: email,
                phone: phone,
                auth_status: "unauthorized",
                institution_id: institution.id,
                belong_to_group: parsedRole
        }

        const mailResponse = await sendOtpEmail(email, otp);
        if (!mailResponse.success) {
            return Response.json({ success: false, message: "Gửi OTP thất bại" }, { status: 500 });
        }
        return Response.json({ success: true, message: "OTP đã được gửi!", respondent: unAuthedRespondent });
    } catch (error) {
        return Response.json({ success: false, message: "Lỗi server", error }, { status: 500 });
    }
}
