import {cookies} from "next/headers";
import {verifyToken} from "@/utils/auth";

export const ProtectApi = async () => {
    const token = (await cookies()).get("token")?.value;
    if (!token) {
        return new Response(JSON.stringify({ error: "Unauthorized: No token" }), { status: 401 });
    }

// 📌 2. Xác thực token
    const decoded = await verifyToken(token);
    if (!decoded) {
        return new Response(JSON.stringify({ error: "Unauthorized: Invalid token" }), { status: 401 });
    }
}