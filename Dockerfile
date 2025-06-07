FROM node:20

# Chạy với user node có sẵn (UID 1000)
USER node

# Thư mục làm việc bên trong container
WORKDIR /var/www

# Copy và cài đặt package trước để tận dụng cache
COPY --chown=node:node package*.json ./
RUN npm install

# Copy toàn bộ mã nguồn ứng dụng
COPY --chown=node:node . .

# Build ứng dụng Next.js
RUN npm run build

# Mở port ứng dụng
EXPOSE 3000

# Lệnh chạy app khi container khởi động
CMD ["npm", "start"]

