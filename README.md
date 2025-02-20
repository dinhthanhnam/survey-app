**Hướng dẫn deploy**
  - Tiên quyết: nodejs 20.0.0 trở lên, npm 10.0.0 trở lên, mysql 8.0 trở lên. 
  - Bước 1: Clone source code: https://github.com/dinhthanhnam/survey-app
  - Bước 2: Tạo một database tên bất kì, ví dụ: "survey_app" trong mysql
  - Bước 3: Vào thư mục dự án tạo một file .env trong thư mục gốc và viết một url đến database cho Prisma, có dạng: 
  *DATABASE_URL="mysql://root:password123@localhost:3306/survey_app"*
  *DATABASE_URL="mysql://root@localhost:3306/survey_app"* nếu không có mật khẩu.
  - Bước 4: Chạy lệnh: *npm install* , sau đó chạy *npx prisma migrate reset*
  - Bước 5: *npm run dev*