import { PrismaClient, surveys } from '@prisma/client';

const prisma = new PrismaClient();
/**
 * @typedef {Object} survey
 * @property {string} survey_title
 * @property {string} survey_description
 * @property {array} question_survey
 * @property {Array} show_questions_number
 */
export async function GET(request, { params }) {
    const { id } = await params;

    try {
        // Lấy dữ liệu survey từ database
        const survey = await prisma.surveys.findUnique({
            where: { id: parseInt(id) },
            include: {
                question_survey: {
                    include: {
                        questions: {
                            include: {
                                question_options: true, // Bao gồm các options
                            },
                        },
                    },
                },
            },
        });

        // Kiểm tra nếu không tìm thấy survey
        if (!survey) {
            return new Response(
                JSON.stringify({ error: `Survey with ID ${id} not found.` }),
                { status: 404 }
            );
        }

        // Trả dữ liệu JSON
        return new Response(JSON.stringify(survey, null, 2), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.error('Error fetching survey:', error);
        return new Response(
            JSON.stringify({ error: 'Internal Server Error' }),
            { status: 500 }
        );
    }
}
