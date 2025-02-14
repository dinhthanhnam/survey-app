import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
    try {
        const total = await prisma.surveys.count();
        return Response.json({ total });
    } catch (error) {
        console.error('Lỗi khi đếm survey:', error);
        return Response.json({ error: 'Lỗi server' }, { status: 500 });
    }
}
