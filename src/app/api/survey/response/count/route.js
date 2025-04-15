import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

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

        // Lấy danh sách survey và câu hỏi, lọc theo vai trò và bỏ qua type "group"
        const surveysWithQuestions = await prisma.surveys.findMany({
            include: {
                question_survey: {
                    include: {
                        questions: {
                            select: {
                                id: true,
                                question_type: true,
                                question_target: true,
                            },
                        },
                    },
                },
            },
        });

        // Xử lý dữ liệu: Đếm số câu hỏi hợp lệ và số câu đã trả lời
        const surveyResults = await Promise.all(
            surveysWithQuestions.map(async (survey) => {
                // Lọc câu hỏi: không phải type "group" và phù hợp với vai trò
                const validQuestions = survey.question_survey.filter((qs) => {
                    const question = qs.questions;
                    if (question.question_type === 'group') return false;

                    const target = question.question_target;
                    if (!target || target === 'NULL') return true;
                    return target.includes(role);
                });

                const questionIds = validQuestions.map((qs) => qs.question_id);
                const total = questionIds.length;

                // Lấy danh sách question_id duy nhất từ responses (để xử lý câu hỏi checkbox)
                const responses = await prisma.responses.findMany({
                    where: {
                        respondent_id: respondentId,
                        question_id: { in: questionIds },
                    },
                    select: {
                        question_id: true,
                    },
                    distinct: ['question_id'], // Đảm bảo chỉ lấy question_id duy nhất
                });

                const answered = responses.length; // Số câu hỏi đã trả lời (mỗi question_id chỉ tính 1 lần)

                return {
                    survey_id: survey.id,
                    answered,
                    total,
                };
            })
        );

        // Lọc bỏ survey không có câu hỏi hợp lệ (total = 0)
        const filteredSurveys = surveyResults.filter((survey) => survey.total > 0);

        // Tính tổng số câu hỏi và số câu đã trả lời
        const totalQuestions = filteredSurveys.reduce((sum, survey) => sum + survey.total, 0);
        const answeredCount = filteredSurveys.reduce((sum, survey) => sum + survey.answered, 0);

        return NextResponse.json(
            {
                surveys: filteredSurveys,
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