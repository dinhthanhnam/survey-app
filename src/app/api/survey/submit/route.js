import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req) {
    try {
        const body = await req.json();
        const { respondent_id } = body;

        if (!respondent_id) {
            return new Response(
                JSON.stringify({ message: 'Missing respondent_id' }),
                {
                    status: 400,
                }
            );
        }

        // Cập nhật trạng thái tất cả các câu trả lời thành 'submitted'
        await prisma.responses.updateMany({
            where: { respondent_id },
            data: { response_status: 'submitted' },
        });

        return new Response(
            JSON.stringify({ message: 'Survey submitted successfully' }),
            { status: 200 }
        );
    } catch (error) {
        console.error('Error submitting survey:', error);
        return new Response(
            JSON.stringify({ message: 'Internal Server Error' }),
            { status: 500 }
        );
    } finally {
        await prisma.$disconnect();
    }
}
