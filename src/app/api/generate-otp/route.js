import { PrismaClient } from "@prisma/client";
import { sendOtpEmail } from "@/utils/mail";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export async function POST(req) {
    try {
        const { phone, name, email, creditCode, role  } = await req.json();

        if (!email || !creditCode || !role) {
            return Response.json({ success: false, message: "Vui lòng nhập đầy đủ thông tin!" }, { status: 400 });
        }
        const institution = prisma.institutions.findUnique({
            where: {identity_code: creditCode},
        })

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
        console.log("Sending OTP to:", email, "OTP:", otp);

        const mailResponse = await sendOtpEmail(email, otp);
        if (!mailResponse.success) {
            return Response.json({ success: false, message: "Gửi OTP thất bại" }, { status: 500 });
        }
        return Response.json({ success: true, message: "OTP đã được gửi!" });
    } catch (error) {
        return Response.json({ success: false, message: "Lỗi server", error }, { status: 500 });
    }
}
