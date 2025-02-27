import { SignJWT, jwtVerify } from "jose";

const JWT_SECRET = process.env.JWT_SECRET;
const secretKey = new TextEncoder().encode(JWT_SECRET);

// ✅ Hàm tạo JWT
export async function createToken(user) {
    const iat = Math.floor(Date.now() / 1000);
    const exp = iat + 24 * 60 * 60; // Hết hạn sau 24h

    return new SignJWT({
        id: user.id,
        email: user.email,
        auth_status: user.auth_status,
    })
        .setProtectedHeader({ alg: "HS256", typ: "JWT" })
        .setIssuedAt(iat)
        .setExpirationTime(exp)
        .sign(secretKey);
}

// ✅ Hàm xác thực JWT
export async function verifyToken(token) {
    try {
        if (!token) {
            console.error("❌ Token rỗng hoặc không tồn tại!");
            return null;
        }

        console.log("🔐 Đang xác thực token:", token);
        const { payload } = await jwtVerify(token, secretKey);
        console.log("✅ Payload:", payload);
        return payload;
    } catch (error) {
        console.error("❌ Lỗi xác thực token:", error.message);
        return null;
    }
}
