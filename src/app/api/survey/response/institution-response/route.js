import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req) {
    try {
        const { institution_id } = await req.json(); // Lấy ID quỹ từ request

        // Kiểm tra xem fund_id có được cung cấp không
        if (!institution_id) {
            return NextResponse.json(
                { message: 'Vui lòng cung cấp fund_id' },
                { status: 400 }
            );
        }

        const institution = await prisma.institutions.findMany({
            where: {
                id: institution_id 
            },
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
        // Lấy tất cả người dùng thuộc quỹ đó từ bảng respondents
        const respondents = await prisma.respondents.findMany({
            where: {
                institution_id: institution_id
            },
        });

        // Lấy danh sách tất cả respondent_id
        const respondentIds = respondents.map(respondent => respondent.id);

        if (respondentIds.length === 0) {
            return NextResponse.json({
                message: 'Không tìm thấy người dùng nào thuộc quỹ này',
                responses: []
            });
        }

        // Lấy tất cả câu trả lời của các người dùng từ bảng responses
        const responses = await prisma.responses.findMany({
            where: {
                respondent_id: {
                    in: respondentIds // Tìm tất cả responses của các respondent_id trong danh sách
                }
            },
        });

        return NextResponse.json({
            institution,
            respondents,
            surveys,
            responses
        });

    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { message: 'Lỗi khi lấy dữ liệu', error: error.message },
            { status: 500 }
        );
    } finally {
        await prisma.$disconnect(); // Đóng kết nối Prisma sau khi hoàn tất
    }
}