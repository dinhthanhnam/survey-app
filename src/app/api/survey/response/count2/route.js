import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req) {
    try {
        const data = await req.json();
        const respondentId = parseInt(data.respondent_id, 10);
        const role = data.belong_to_group;

        if (!respondentId || isNaN(respondentId)) {
            return NextResponse.json(
                { error: 'Missing or invalid respondent_id' },
                { status: 400 }
            );
        }

        if (!role) {
            return NextResponse.json(
                { error: 'Missing or invalid belong_to_group' },
                { status: 400 }
            );
        }

        const surveyData = await prisma.question_survey.groupBy({
            by: ['survey_id'],
            _count: {
                question_id: true, 
            },
        });

        const surveyQuestionCounts = surveyData.map((s) => ({
            surveyId: s.survey_id,
            numQuestions: s._count.question_id,
        }));

        const questionRanges = await prisma.question_survey.findMany({
            select: {
                survey_id: true,
                question_id: true,
            },
            orderBy: {
                question_id: 'asc', // Đảm bảo thứ tự question_id
            },
        });

        const surveyQuestionRanges = surveyQuestionCounts.map((survey) => {
            const questions = questionRanges
                .filter((q) => q.survey_id === survey.surveyId)
                .map((q) => q.question_id);
            return {
                surveyId: survey.surveyId,
                questionIds: questions,
                total: survey.numQuestions,
            };
        });

        const questionCount = await prisma.questions.count({
            where: {
                OR: [
                    {
                        question_target: {
                            equals: ['Lãnh đạo & Quản lý']
                        }
                    },
                    {
                        question_target: {}
                    }
                ]
            }
        });

        // const roleQuestionCounts = roleSurveyData.map((s) => ({
        //     surveyId: s.survey_id,
        //     numQuestions: s._count.id,
        // }));
        

        return NextResponse.json({ questionCount });
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { message: 'Lỗi khi lấy dữ liệu khảo sát' },
            { status: 500 }
        );
    }
}
