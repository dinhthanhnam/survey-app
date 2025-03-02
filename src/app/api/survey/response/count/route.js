import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

// Định nghĩa `surveyData` cho từng vai trò
const surveyConfig = {
    'Lãnh đạo & Quản lý': [
        { surveyId: 1, numQuestions: 10 },
        { surveyId: 2, numQuestions: 18 },
        { surveyId: 3, numQuestions: 8 },
        { surveyId: 4, numQuestions: 17 },
        { surveyId: 5, numQuestions: 12 },
        { surveyId: 6, numQuestions: 11 },
        { surveyId: 7, numQuestions: 8 },
        { surveyId: 8, numQuestions: 8 },
    ],
    'Cán bộ nghiệp vụ': [
        { surveyId: 1, numQuestions: 11 },
        { surveyId: 2, numQuestions: 17 },
        { surveyId: 3, numQuestions: 5 },
        { surveyId: 4, numQuestions: 4 },
        { surveyId: 5, numQuestions: 6 },
        { surveyId: 6, numQuestions: 6 },
        { surveyId: 7, numQuestions: 7 },
        { surveyId: 8, numQuestions: 5 },
    ],
    'Nhân viên CNTT & Hỗ trợ kỹ thuật': [
        { surveyId: 1, numQuestions: 11 },
        { surveyId: 2, numQuestions: 12 },
        { surveyId: 3, numQuestions: 4 },
        { surveyId: 4, numQuestions: 4 },
        { surveyId: 5, numQuestions: 7 },
        { surveyId: 6, numQuestions: 3 },
        { surveyId: 7, numQuestions: 1 },
        { surveyId: 8, numQuestions: 3 },
    ],
};

// API lấy số câu trả lời theo vai trò
export async function GET(req) {
    try {
        const { searchParams } = new URL(req.url);
        const respondentId = parseInt(searchParams.get('respondent_id'), 10);
        const role = searchParams.get('belong_to_group'); // Lấy vai trò từ request

        if (!respondentId || !role) {
            return NextResponse.json(
                { error: 'Missing respondent_id or belong_to_group' },
                { status: 400 }
            );
        }

        // Lấy `surveyData` của vai trò, nếu không có thì dùng mảng rỗng
        const surveyData = surveyConfig[role] || [];

        // Xác định phạm vi câu hỏi cho từng khảo sát
        let currentQuestion = 1;
        const surveyQuestionRanges = surveyData.map((survey) => {
            const start = currentQuestion;
            const end = currentQuestion + survey.numQuestions - 1;
            currentQuestion += survey.numQuestions;
            return { surveyId: survey.surveyId, start, end };
        });

        // Truy vấn tất cả câu trả lời của respondentId **chỉ một lần**
        const responses = await prisma.responses.findMany({
            where: { respondent_id: respondentId },
            select: { question_id: true },
        });

        // Dùng Set để loại bỏ câu trả lời trùng lặp
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
