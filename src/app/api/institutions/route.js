import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
    try {
        // Lấy tất cả các institutions
        const institutions = await prisma.institutions.findMany();

        // Trả về danh sách institutions dưới dạng JSON
        return new Response(JSON.stringify(institutions, null, 2), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.error('Error fetching institutions:', error);
        return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
            status: 500,
        });
    }
}
