import nodemailer from "nodemailer";

export const sendOtpEmail = async (email, otp) => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        // host: process.env.SMTP_HOST, // Sử dụng SMTP_HOST thay vì service
        // port: process.env.SMTP_PORT, // SMTP_PORT từ .env
        // secure: process.env.SMTP_SECURE === "true", // Chuyển đổi string "true"/"false" thành boolean
        auth: {
            user: process.env.SMTP_EMAIL,
            pass: process.env.SMTP_PASSWORD,
        },
        // tls: {
        //     rejectUnauthorized: false, // Nếu gặp lỗi certificate
        // },
        // logger: true,
        // debug: true,
    });

    const mailOptions = {
        from: `"Co-op Bank" <${process.env.SMTP_EMAIL}>`,
        to: email,
        subject: "Mã OTP - Xác thực tài khoản",
        html: `
            <div style="max-width: 600px; margin: auto; font-family: Arial, sans-serif; border: 1px solid #ddd; border-radius: 8px; overflow: hidden;">
                
                <!-- Header -->
                <div style="background-color: #0D9488; color: white; padding: 20px; text-align: center;">
                    <h1 style="margin: 0; font-size: 22px;">Khảo sát chuyển đổi số trong hệ thống quỹ tín dụng Ngân hàng Hợp tác</h1>
                    <p style="margin: 10px 0 0; font-size: 14px;">
                        Nghiên cứu này nhằm thu thập ý kiến về thực trạng chuyển đổi số và những khó khăn thách thức trong hành trình này.
                    </p>
                </div>

                <!-- Body -->
                <div style="padding: 20px; background-color: white; color: #333;">
                    <p style="font-size: 16px; margin-bottom: 15px;">
                        Kính gửi Anh/Chị, <br>
                        Ngân hàng Hợp tác xin thông báo mã OTP truy cập Hệ thống Khảo sát chuyển đổi số QTDND của Anh/Chị là:
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
                    © 2025 Co-op Bank. All rights reserved.
                </div>
            </div>
        `,
    };

    try {
        await transporter.sendMail(mailOptions);
        return { success: true, message: "OTP đã được gửi!" };
    } catch (error) {
        return { success: false, message: "Không thể gửi email", error };
    }
};
