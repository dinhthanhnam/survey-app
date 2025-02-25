import nodemailer from "nodemailer";

export const sendOtpEmail = async (email, otp) => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.SMTP_EMAIL,
            pass: process.env.SMTP_PASSWORD,
        },
    });

    const mailOptions = {
        from: process.env.SMTP_EMAIL,
        to: email,
        subject: "Mã OTP của bạn",
        text: `Mã OTP của bạn là: ${otp}. Vui lòng không chia sẻ OTP này với ai.`,
    };

    try {
        await transporter.sendMail(mailOptions);
        return { success: true, message: "OTP đã được gửi!" };
    } catch (error) {
        return { success: false, message: "Không thể gửi email", error };
    }
};
