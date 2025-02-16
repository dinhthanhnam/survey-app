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

        // Chuyển đổi dữ liệu thành định dạng SurveyJS
        const surveyData = {
            survey_id: survey.id,
            survey_title: survey.survey_title,
            survey_description: survey.survey_description,
            question_survey: survey.question_survey.map((qs) => ({
                question_id: qs.questions.id,
                question_name: qs.questions.question_name,
                question_type: qs.questions.question_type,
                question_text: qs.questions.question_text,
                question_note: qs.questions.question_note,
                question_options: qs.questions.question_options.map(
                    (option) => ({
                        question_options_id: option.id,
                        option_text: option.option_text,
                        option_note: option.option_note,
                        option_value: option.option_value,
                    })
                ),
            })),
        };

        // Trả dữ liệu JSON
        return new Response(JSON.stringify(surveyData, null, 2), {
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
