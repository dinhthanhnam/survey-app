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

        // Lấy danh sách survey và câu hỏi
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
                // Lấy câu trả lời cho câu hỏi ID 5 (dựa vào question_option_id)
                const question5Responses = await prisma.responses.findMany({
                    where: {
                        respondent_id: respondentId,
                        question_id: 5,
                    },
                    select: {
                        question_option_id: true,
                    },
                });
                const question5OptionIds = question5Responses.map((r) =>
                    parseInt(r.question_option_id, 10)
                );

                // Lọc câu hỏi: không phải type "group", phù hợp với vai trò, và kiểm tra câu 6
                const validQuestions = survey.question_survey.filter((qs) => {
                    const question = qs.questions;
                    if (question.question_type === 'group') return false;

                    const target = question.question_target;
                    if (!target || target === 'NULL' || target.includes(role)) {
                        // Kiểm tra câu hỏi ID 6
                        if (question.id === 6) {
                            // Nếu không có câu trả lời cho câu 5, giữ câu 6
                            if (!question5OptionIds.length) return true;
                            // Nếu câu 5 là radiogroup (1 lựa chọn), kiểm tra không phải 21
                            if (question5OptionIds.length === 1)
                                return question5OptionIds[0] !== 21;
                            // Nếu câu 5 là checkbox (nhiều lựa chọn), kiểm tra không chứa 21
                            return !question5OptionIds.includes(21);
                        }
                        return true; // Các câu hỏi khác luôn hợp lệ
                    }
                    return false;
                });

                const questionIds = validQuestions.map((qs) => qs.question_id);
                const total = questionIds.length;

                // Lấy danh sách question_id duy nhất từ responses
                const responses = await prisma.responses.findMany({
                    where: {
                        respondent_id: respondentId,
                        question_id: { in: questionIds },
                    },
                    select: {
                        question_id: true,
                    },
                    distinct: ['question_id'],
                });

                const answered = responses.length;

                return {
                    survey_id: survey.id,
                    answered,
                    total,
                };
            })
        );

        // Lọc bỏ survey không có câu hỏi hợp lệ
        const filteredSurveys = surveyResults.filter(
            (survey) => survey.total > 0
        );

        // Tính tổng số câu hỏi và số câu đã trả lời
        const totalQuestions = filteredSurveys.reduce(
            (sum, survey) => sum + survey.total,
            0
        );
        const answeredCount = filteredSurveys.reduce(
            (sum, survey) => sum + survey.answered,
            0
        );

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
            { error: 'Internal Server Error', details: error.message },
            { status: 500 }
        );
    } finally {
        await prisma.$disconnect(); // Đóng kết nối Prisma
    }
}
