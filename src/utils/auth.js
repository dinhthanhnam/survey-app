import jwt from 'jsonwebtoken';

const SECRET_KEY = env("JWT_SECRET");

// ✅ Hàm tạo JWT
export function createToken(user) {
    return jwt.sign(
        { id: user.id, email: user.email },
        SECRET_KEY,
        { expiresIn: '1h' }
    );
}

// ✅ Hàm xác minh JWT
export function verifyToken(req) {
    const authHeader = req.headers.get('authorization');
    if (!authHeader) return null;

    const token = authHeader.split(' ')[1]; // Lấy token từ `Bearer <token>`
    if (!token) return null;

    try {
        return jwt.verify(token, SECRET_KEY); // Xác minh JWT
    } catch (error) {
        return null; // Token không hợp lệ hoặc hết hạn
    }
}
