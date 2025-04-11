import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET(req, context) {
    const params = await context.params;
    const question = await prisma.questions.findUnique({
        where: { id: Number(params.id) },
        include: { question_options: true },
    });
    return NextResponse.json(question);
}

export async function PUT(req, context) {
    const params = await context.params;
    const body = await req.json();
    const { question_name, question_text, question_type, belongs_to_pillar, question_options } = body;

    const updatedQuestion = await prisma.questions.update({
        where: { id: Number(params.id) },
        data: {
            question_name,
            question_text,
            question_type,
            belongs_to_pillar,
        },
    });

    await prisma.question_options.deleteMany({
        where: { question_id: updatedQuestion.id },
    });

    await prisma.question_options.createMany({
        data: question_options.map((opt) => ({
            ...opt,
            question_id: updatedQuestion.id,
        })),
    });

    const fullData = await prisma.questions.findUnique({
        where: { id: updatedQuestion.id },
        include: { question_options: true },
    });

    return NextResponse.json(fullData);
}

export async function DELETE(req, context) {
    const params = await context.params;
    await prisma.question_options.deleteMany({
        where: { question_id: Number(params.id) },
    });

    const deleted = await prisma.questions.delete({
        where: { id: Number(params.id) },
    });

    return NextResponse.json(deleted);
}
