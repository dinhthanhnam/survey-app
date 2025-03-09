import { PrismaClient } from '@prisma/client';
import { ProtectApi } from '@/utils/protectapi';

const prisma = new PrismaClient();

export async function GET(request, context) {
    try {
        const params = await context.params;
        const surveyId = parseInt(params.id);

        // Lấy survey với tất cả câu hỏi, options và responses
        const survey = await prisma.surveys.findUnique({
            where: { id: surveyId },
            include: {
                question_survey: {
                    include: {
                        questions: {
                            include: {
                                question_options: true,
                                responses: {
                                    select: {
                                        id: true,
                                        respondent_id: true,
                                        question_option_id: true
                                    }
                                }
                            }
                        }
                    }
                }
            }
        });

        if (!survey) {
            return new Response(
                JSON.stringify({ error: `Survey with ID ${surveyId} not found.` }),
                { status: 404 }
            );
        }

        // Xử lý dữ liệu để tạo thống kê
        const surveyStats = {
            survey_id: survey.id,
            survey_title: survey.survey_titile,
            questions: survey.question_survey.map(qs => {
                const question = qs.questions;
                
                // Tính tổng số response cho câu hỏi này
                const totalResponses = question.responses.length;
                
                // Thống kê cho từng option
                const optionsStats = question.question_options.map(option => {
                    const responseCount = question.responses.filter(
                        r => r.question_option_id === option.id
                    ).length;
                    
                    return {
                        option_id: option.id,
                        option_text: option.option_text,
                        response_count: responseCount,
                        response_percentage: totalResponses > 0 
                            ? Number((responseCount / totalResponses * 100).toFixed(2))
                            : 0
                    };
                });

                return {
                    question_id: question.id,
                    question_name: question.question_name,
                    question_text: question.question_text,
                    question_type: question.question_type,
                    question_note: question.question_note,
                    question_target: question.question_target,
                    total_responses: totalResponses,
                    options: optionsStats
                };
            })
        };

        return new Response(
            JSON.stringify(surveyStats, null, 2),
            {
                status: 200,
                headers: { 'Content-Type': 'application/json' },
            }
        );

    } catch (error) {
        console.error('Error fetching survey statistics:', error);
        return new Response(
            JSON.stringify({ error: 'Internal Server Error' }),
            { status: 500 }
        );
    }
}

// Đóng kết nối Prisma khi process kết thúc
process.on('SIGTERM', async () => {
    await prisma.$disconnect();
});