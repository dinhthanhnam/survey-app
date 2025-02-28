

**File .env đầy đủ có dạng:**

  DATABASE_URL="mysql://root@localhost:3306/survey_app"

  JWT_SECRET="a-string-secret-at-least-256-bits-long"

  SMTP_EMAIL=coopbankhvnh@example.com

  SMTP_PASSWORD=a-secret-password
  
  - Sử dụng email và mật khẩu thực tế của tài khoản email dùng để gửi OTP.
  - Không có cấu hình tài khoản email thì không thể gửi được.
  - JWT_SECRET, có thể thay đổi nhưng phải đủ 256 bit.

**Hướng dẫn deploy**
  - Tiên quyết: nodejs 20.0.0 trở lên, npm 10.0.0 trở lên, mysql 8.0 trở lên. 
  - Bước 1: Clone source code: https://github.com/dinhthanhnam/survey-app
  - Bước 2: Tạo một database tên bất kì, ví dụ: "survey_app" trong mysql
  - Bước 3: Vào thư mục dự án tạo một file .env trong thư mục gốc và viết một url đến database cho Prisma, có dạng:
    - *DATABASE_URL="mysql://root:password123@localhost:3306/survey_app"*
    - Nếu không có mật khẩu.
    *DATABASE_URL="mysql://root@localhost:3306/survey_app"*
    - Nếu database không phải local, thay localhost = ip của DB:
    -*DATABASE_URL="mysql://root:password123@ip-cua-db:3306/survey_app"*
  - Bước 4: Chạy lệnh: *npm install* để cài đặt các phụ thuộc, gồm:
    - Prisma: ORM để tương tác csdl.
    - Jose: JWT token.
    - Nodemailer: Để gửi mail.
    - bcrypt & bcryptjs: Để mã hoá OTP.
  - Bước 5: Chạy *npx prisma migrate reset* để seed toàn bộ dữ liệu khảo sát, gồm:
    - Các bảng liên quan.
    - 1200 quỹ tín dụng.
    - 100 câu hỏi kèm câu trả lời đã định nghĩa sẵn.
  - Bước 6: *npm run build* để build các server component và *npm run start* để start server.