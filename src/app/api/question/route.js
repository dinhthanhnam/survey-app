import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const surveyId = parseInt(searchParams.get('survey_id'));

    if (!surveyId) {
        return NextResponse.json({ error: 'survey_id is required' }, { status: 400 });
    }

    const questions = await prisma.questions.findMany({
        where: {
            question_survey: {
                some: {
                    survey_id: surveyId,
                },
            },
        },
        include: {
            question_options: true,
        },
    });

    return NextResponse.json(questions);
}

export async function POST(req) {
    const body = await req.json();
    const { question_name, question_text, question_type, belongs_to_pillar, question_options } = body;

    const question = await prisma.questions.create({
        data: {
            question_name,
            question_text,
            question_type,
            belongs_to_pillar,
            question_options: {
                create: question_options,
            },
        },
        include: {
            question_options: true,
        },
    });

    return NextResponse.json(question);
}
