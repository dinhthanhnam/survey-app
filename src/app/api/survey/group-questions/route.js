import { PrismaClient } from '@prisma/client';
import {ProtectApi} from "@/utils/protectapi";

const prisma = new PrismaClient();

export async function GET() {
    try {
        const authResponse = await ProtectApi();
        if (authResponse) return authResponse;

        const questionGroup = await prisma.questions.findMany({
            where: {
              question_type: "group",
            },
            select: {
                id: true,
            },
        });
        return Response.json({ questionGroup });
    } catch (error) {
        console.error('Lỗi khi đếm survey:', error);
        return Response.json({ error: 'Lỗi server' }, { status: 500 });
    }
}
