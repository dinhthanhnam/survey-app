import { PrismaClient } from '@prisma/client';
import {ProtectApi} from "@/utils/protectapi";

const prisma = new PrismaClient();

export async function GET() {
    try {
        const authResponse = await ProtectApi();
        if (authResponse) return authResponse;
        const surveys = await prisma.surveys.findMany();

        // Kiểm tra nếu không tìm thấy survey
        if (!surveys) {
            return new Response(
                JSON.stringify({ error: `Surveys not found.` }),
                { status: 404 }
            );
        }

        // Trả dữ liệu JSON
        return new Response(JSON.stringify(surveys, null, 2), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.error('Lỗi khi lấy survey:', error);
        return Response.json({ error: 'Lỗi server' }, { status: 500 });
    }
}
