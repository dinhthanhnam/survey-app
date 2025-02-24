import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req) {
    try {
        const { respondent_id } = await req.json(); // Lấy ID người dùng từ request

        // Lấy tất cả các khảo sát mà người dùng đã tham gia
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

        // Lấy tất cả câu trả lời của người dùng từ bảng responses
        const responses = await prisma.responses.findMany({
            where: { respondent_id },
        });

        return NextResponse.json({ surveys, responses });
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { message: 'Lỗi khi lấy dữ liệu khảo sát' },
            { status: 500 }
        );
    }
}
