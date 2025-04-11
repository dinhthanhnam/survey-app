import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST() {
    try {
        // Lấy tất cả các khảo sát mà người dùng đã tham gia
        const survey_pillars = await prisma.survey_pillars.findMany({

        });


        return NextResponse.json({ survey_pillars });
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { message: 'Lỗi khi lấy dữ liệu khảo sát' },
            { status: 500 }
        );
    }
}
