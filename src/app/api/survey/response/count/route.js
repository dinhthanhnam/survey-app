import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const totalQuestions = 118;
const surveyData = [
    { surveyId: 1, numQuestions: 14 },
    { surveyId: 2, numQuestions: 22 },
    { surveyId: 3, numQuestions: 13 },
    { surveyId: 4, numQuestions: 25 },
    { surveyId: 5, numQuestions: 17 },
    { surveyId: 6, numQuestions: 11 },
    { surveyId: 7, numQuestions: 8 },
    { surveyId: 8, numQuestions: 8 },
];

// Xác định phạm vi câu hỏi của từng survey
let currentQuestion = 1;
const surveyQuestionRanges = surveyData.map((survey) => {
    const start = currentQuestion;
    const end = currentQuestion + survey.numQuestions - 1;
    currentQuestion += survey.numQuestions;
    return { surveyId: survey.surveyId, start, end };
});

export async function GET(req) {
    try {
        const { searchParams } = new URL(req.url);
        const respondentId = parseInt(searchParams.get('respondent_id'), 10);

        if (!respondentId) {
            return new Response(
                JSON.stringify({ error: 'Missing respondent_id' }),
                { status: 400 }
            );
        }

        const surveyCounts = [];

        for (const survey of surveyQuestionRanges) {
            const responses = await prisma.responses.findMany({
                where: {
                    respondent_id: respondentId,
                    question_id: {
                        gte: survey.start,
                        lte: survey.end,
                    },
                },
                distinct: ['question_id'], // Loại bỏ các câu trả lời trùng nhau của cùng một câu hỏi
                select: {
                    question_id: true,
                },
            });

            surveyCounts.push({
                survey_id: survey.surveyId,
                answered: responses.length, // Số câu hỏi đã trả lời (không trùng)
                total: survey.end - survey.start + 1,
            });
        }

        return new Response(JSON.stringify(surveyCounts), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.error('Error fetching response counts:', error);
        return new Response(
            JSON.stringify({ error: 'Internal Server Error' }),
            { status: 500 }
        );
    }
}
