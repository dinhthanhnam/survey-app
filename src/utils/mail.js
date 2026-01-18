import nodemailer from "nodemailer";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const sendOtpEmail = async (email, otp) => {
    try {
        // Randomly select an account
        const emailAccounts = await prisma.otp_emails.findMany();

        if (!emailAccounts || emailAccounts.length === 0) {
            throw new Error("No email accounts are available. Please configure at least one.");
        }

        const selectedAccount = emailAccounts[Math.floor(Math.random() * emailAccounts.length)];

        // Create nodemailer transporter with the selected account
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: selectedAccount.email,
                pass: selectedAccount.password,
            },
        });

        const mailOptions = {
            from: `"VietNam Development Bank" <${selectedAccount.email}>`,
            to: email,
            subject: "Mã OTP - Xác thực tài khoản",
            html: `
                <div style="max-width: 600px; margin: auto; font-family: Arial, sans-serif; border: 1px solid #ddd; border-radius: 8px; overflow: hidden;">
                    <!-- Header -->
                    <div style="background-color: #0D9488; color: white; padding: 20px; text-align: center;">
                        <h1 style="margin: 0; font-size: 22px;">Khảo sát chuyển đổi số Ngân hàng phát triển Việt Nam</h1>
                        <p style="margin: 10px 0 0; font-size: 14px;">
                            Nghiên cứu này nhằm thu thập ý kiến về thực trạng chuyển đổi số và những khó khăn thách thức trong hành trình này.
                        </p>
                    </div>
                    <!-- Body -->
                    <div style="padding: 20px; background-color: white; color: #333;">
                        <p style="font-size: 16px; margin-bottom: 15px;">
                            Kính gửi Anh/Chị, <br>
                            Ngân hàng Hợp tác xin thông báo mã OTP truy cập Hệ thống Khảo sát chuyển đổi số của Anh/Chị là:
                        </p>
                        <p style="font-size: 16px; font-weight: bold; text-align: center; background-color: #f3f4f6; padding: 10px; border-radius: 5px;">
                            <span style="color: #0D9488; font-size: 20px;">${otp}</span>
                        </p>
                        <p style="font-size: 14px; color: #555; margin-top: 10px;">
                            Vui lòng không chia sẻ mã này với bất kỳ ai. Nếu Anh/Chị không thực hiện yêu cầu này, vui lòng bỏ qua email này.
                        </p>
                        <p style="font-size: 14px; color: #555; margin-top: 10px;">
                            Xin cảm ơn!
                        </p>
                    </div>
                    <!-- Footer -->
                    <div style="background-color: #0D9488; color: white; text-align: center; padding: 10px; font-size: 14px;">
                        © 2025 VietNam Development Bank. All rights reserved.
                    </div>
                </div>
            `,
        };

        await transporter.sendMail(mailOptions);

        return { success: true, message: "OTP đã được gửi!" };
    } catch (error) {
        console.error("Error sending OTP email:", error);
        return { success: false, message: error.message || "Không thể gửi email", error };
    } finally {
        await prisma.$disconnect();
    }
};
