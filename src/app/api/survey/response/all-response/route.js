import { NextResponse } from 'next/server';
import { PrismaClient, responses_response_status } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST() {
    try {
        const responses = await prisma.responses.findMany({
            where: {response_status : "submitted"},
        });

        const surveys = await prisma.surveys.findMany({
            include: {
                question_survey: {
                    include: {
                        questions: {
                            include: {
                                question_options: true, // Bao gồm các options
                            },
                        },
                    },
                },
            },
        });

        return NextResponse.json({
            surveys,
            responses
        });

    } catch (error) {
        console.error('Lỗi:', error);
        return NextResponse.json(
            { message: 'Lỗi khi lấy dữ liệu khảo sát', error: error.message },
            { status: 500 }
        );
    } finally {
        await prisma.$disconnect();
    }
}

export async function OPTIONS() {
    return NextResponse.json({}, { status: 200 });
}