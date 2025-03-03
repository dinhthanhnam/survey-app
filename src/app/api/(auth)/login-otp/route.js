import {PrismaClient} from "@prisma/client";
import {sendOtpEmail} from "@/utils/mail";
import bcrypt from "bcryptjs";
import {respondents_belong_to_group} from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req) {
    try {
        const {email, creditCode, role} = await req.json();

        if (!email) {
            return Response.json({success: false, message: "Vui lòng nhập đầy đủ thông tin!"}, {status: 400});
        }

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

        const respondent = await prisma.respondents.findFirst({
            where: {
                email: email,
                belong_to_group: parsedRole,
                institutions: {
                    identity_code: creditCode
                }
            },
        });

        if (!respondent) {
            return Response.json({
                success: false,
                message: "Kiểm tra lại thông tin!",
            });
        }

        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const otpHash = await bcrypt.hash(otp, 8);

        await prisma.otptoken.deleteMany({where: {email}});

        await prisma.otptoken.create({
            data: {
                email,
                otpHash,
                expiresAt: new Date(Date.now() + 5 * 60 * 1000),
            },
        });

        const mailResponse = await sendOtpEmail(email, otp);
        if (!mailResponse.success) {
            return Response.json({success: false, message: "Gửi OTP thất bại"}, {status: 500});
        }
        return Response.json({success: true, message: "OTP đã được gửi!", respondent: respondent});
    } catch (error) {
        console.error(error);
        return Response.json({ success: false, message: "Lỗi server", error }, { status: 500 });
    }

}
