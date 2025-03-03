import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

// Cấu hình số câu hỏi của từng khảo sát
const surveyData = [
    { surveyId: 1, numQuestions: 14 },
    { surveyId: 2, numQuestions: 22 },
    { surveyId: 3, numQuestions: 13 },
    { surveyId: 4, numQuestions: 25 },
    { surveyId: 5, numQuestions: 18 },
    { surveyId: 6, numQuestions: 11 },
    { surveyId: 7, numQuestions: 8 },
    { surveyId: 8, numQuestions: 8 },
];

// Xác định phạm vi `question_id` cho từng khảo sát
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
            return NextResponse.json(
                { error: 'Missing respondent_id' },
                { status: 400 }
            );
        }

        // Lấy danh sách câu trả lời của người dùng
        const responses = await prisma.responses.findMany({
            where: { respondent_id: respondentId },
            select: { question_id: true },
        });

        // Chuyển danh sách câu trả lời thành Set để lọc trùng
        const answeredQuestions = new Set(responses.map((r) => r.question_id));

        // Tính số câu trả lời theo từng khảo sát
        const surveyCounts = surveyQuestionRanges.map((survey) => {
            const answeredCount = Array.from(answeredQuestions).filter(
                (q) => q >= survey.start && q <= survey.end
            ).length;

            return {
                survey_id: survey.surveyId,
                answered: answeredCount,
                total: survey.end - survey.start + 1,
            };
        });

        return NextResponse.json(surveyCounts, { status: 200 });
    } catch (error) {
        console.error('Error fetching response counts:', error);
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}
