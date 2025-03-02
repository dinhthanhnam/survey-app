import { PrismaClient, surveys } from '@prisma/client';
import { ProtectApi } from '@/utils/protectapi';

const prisma = new PrismaClient();

export async function GET(request, context) {
    try {
        const params = await context.params;
        const id = params.id;

        const url = new URL(request.url);
        const respondentParam = url.searchParams.get('respondent');

        if (!respondentParam) {
            return new Response(
                JSON.stringify({ error: 'Respondent data missing.' }),
                { status: 400 }
            );
        }

        const respondent = JSON.parse(respondentParam);
        console.log('Received respondent:', respondent);

        const survey = await prisma.surveys.findUnique({
            where: { id: parseInt(id) },
            include: {
                question_survey: {
                    include: {
                        questions: {
                            include: {
                                question_options: true,
                            },
                        },
                    },
                },
            },
        });

        if (!survey) {
            return new Response(
                JSON.stringify({ error: `Survey with ID ${id} not found.` }),
                { status: 404 }
            );
        }

        // Lọc câu hỏi theo `belong_to_group`
        const filteredQuestions = survey.question_survey.filter((q) => {
            const targetGroups = q.questions.question_target;
            return (
                !targetGroups ||
                targetGroups.includes(respondent.belong_to_group)
            );
        });

        survey.question_survey = filteredQuestions;

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
