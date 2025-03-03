import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req) {
    try {
        const { question_id, respondent_id, question_option_id, question_option_answer } = await req.json();

        // Tìm response hiện có
        const existingResponse = await prisma.responses.findFirst({
            where: {
                question_id,
                respondent_id,
                question_option_id,
            },
        });

        let responseData;

        if (existingResponse) {
            // Nếu tồn tại, cập nhật `question_option_answer`
            responseData = await prisma.responses.update({
                where: { id: existingResponse.id },
                data: { question_option_answer },
            });
        } else {
            // Nếu không tồn tại, tạo mới response
            responseData = await prisma.responses.create({
                data: {
                    question_id,
                    respondent_id,
                    question_option_id,
                    question_option_answer,
                    response_status: 'saved', // Giá trị mặc định
                },
            });
        }

        return new Response(JSON.stringify(responseData), { status: existingResponse ? 200 : 201 });
    } catch (error) {
        console.error('Error saving reason response:', error);
        return new Response(JSON.stringify({ message: 'Internal server error' }), { status: 500 });
    }
}
