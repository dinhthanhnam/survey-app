import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

// Bảng tổng số câu hỏi của khảo sát
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

// Cấu hình số câu hỏi theo từng vai trò
const surveyConfig = {
    'Lãnh đạo & Quản lý': [
        { surveyId: 1, numQuestions: 11 },
        { surveyId: 2, numQuestions: 7 },
        { surveyId: 3, numQuestions: 8 },
        { surveyId: 4, numQuestions: 18 },
        { surveyId: 5, numQuestions: 8 },
        { surveyId: 6, numQuestions: 6 },
        { surveyId: 7, numQuestions: 6 },
        { surveyId: 8, numQuestions: 8 },
    ],
    'Cán bộ nghiệp vụ': [
        { surveyId: 1, numQuestions: 8 },
        { surveyId: 2, numQuestions: 16 },
        { surveyId: 3, numQuestions: 5 },
        { surveyId: 4, numQuestions: 23 },
        { surveyId: 5, numQuestions: 15 },
        { surveyId: 6, numQuestions: 4 },
        { surveyId: 7, numQuestions: 2 },
        { surveyId: 8, numQuestions: 0 },
    ],
    // 'Nhân viên CNTT & Hỗ trợ kỹ thuật': [
    //     { surveyId: 1, numQuestions: 11 },
    //     { surveyId: 2, numQuestions: 11 },
    //     { surveyId: 3, numQuestions: 4 },
    //     { surveyId: 4, numQuestions: 4 },
    //     { surveyId: 5, numQuestions: 7 },
    //     { surveyId: 6, numQuestions: 3 },
    //     { surveyId: 7, numQuestions: 1 },
    //     { surveyId: 8, numQuestions: 3 },
    // ],
};

export async function GET(req) {
    try {
        const { searchParams } = new URL(req.url);
        const respondentId = parseInt(searchParams.get('respondent_id'), 10);
        const role = searchParams.get('belong_to_group');

        if (!respondentId || !role) {
            return NextResponse.json(
                { error: 'Missing respondent_id or belong_to_group' },
                { status: 400 }
            );
        }

        // Lấy `surveyData` theo vai trò
        const roleSurveyData = surveyConfig[role] || [];
        if (roleSurveyData.length === 0) {
            return NextResponse.json(
                { surveys: [], totalQuestions: 0, answeredCount: 0 },
                { status: 200 }
            );
        }

        // Xác định phạm vi `question_id` của từng khảo sát (dựa trên surveyData gốc)
        let currentQuestion = 1;
        const surveyQuestionRanges = surveyData.map((survey) => {
            const start = currentQuestion;
            const end = currentQuestion + survey.numQuestions - 1;
            currentQuestion += survey.numQuestions;
            return { surveyId: survey.surveyId, start, end };
        });

        // Lấy danh sách câu trả lời của người dùng
        const responses = await prisma.responses.findMany({
            where: { respondent_id: respondentId },
            select: { question_id: true },
        });

        // Chuyển danh sách câu trả lời thành Set để lọc trùng
        const answeredQuestions = new Set(responses.map((r) => r.question_id));

        // Đối chiếu với `surveyConfig` theo vai trò để lấy số lượng câu hỏi chính xác
        let roleCurrentQuestion = 1;
        const roleSurveyRanges = roleSurveyData.map((survey) => {
            const start = roleCurrentQuestion;
            const end = roleCurrentQuestion + survey.numQuestions - 1;
            roleCurrentQuestion += survey.numQuestions;

            // Xác định phạm vi câu hỏi trong bảng `surveyData`
            const originalSurvey = surveyQuestionRanges.find(
                (s) => s.surveyId === survey.surveyId
            );

            if (!originalSurvey) {
                return {
                    survey_id: survey.surveyId,
                    answered: 0,
                    total: survey.numQuestions,
                };
            }

            // Đếm số câu trả lời trong phạm vi của khảo sát
            const answeredCount = Array.from(answeredQuestions).filter(
                (q) => q >= originalSurvey.start && q <= originalSurvey.end
            ).length;

            return {
                survey_id: survey.surveyId,
                answered: answeredCount,
                total: survey.numQuestions, // Số câu hỏi theo vai trò
            };
        });

        // Tính tổng số câu hỏi và câu đã trả lời
        const totalQuestions = roleSurveyData.reduce(
            (sum, survey) => sum + survey.numQuestions,
            0
        );
        const answeredCount = roleSurveyRanges.reduce(
            (sum, survey) => sum + survey.answered,
            0
        );

        // Trả về dữ liệu với cả thông tin từng khảo sát và tổng cộng
        return NextResponse.json(
            {
                surveys: roleSurveyRanges,
                totalQuestions,
                answeredCount,
            },
            { status: 200 }
        );
    } catch (error) {
        console.error('Error fetching response counts:', error);
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}
