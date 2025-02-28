import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
export const POST = async (req) => {
    try {
        const { question_id, respondent_id, question_option_id, isCheckbox } =
            await req.json();

        if (isCheckbox) {
            // Kiểm tra xem đã có câu trả lời checkbox chưa
            const existingResponse = await prisma.responses.findFirst({
                where: {
                    question_id,
                    respondent_id,
                    question_option_id,
                },
            });

            if (existingResponse) {
                // Nếu đã chọn trước đó và bây giờ là thao tác bỏ chọn => Xóa khỏi DB
                await prisma.responses.delete({
                    where: { id: existingResponse.id },
                });
                return NextResponse.json(
                    { message: 'Checkbox responses removed' },
                    { status: 200 }
                );
            } else {
                // Nếu chưa có thì thêm mới
                await prisma.responses.create({
                    data: {
                        question_id,
                        respondent_id,
                        question_option_id,
                        response_status: 'saved',
                    },
                });
                return NextResponse.json(
                    { message: 'Checkbox responses saved' },
                    { status: 201 }
                );
            }
        } else {
            // Xử lý radio: Xóa câu trả lời trước đó nếu đã có
            await prisma.responses.deleteMany({
                where: { question_id, respondent_id },
            });

            // Lưu câu trả lời mới
            await prisma.responses.create({
                data: {
                    question_id,
                    respondent_id,
                    question_option_id,
                    response_status: 'saved',
                },
            });

            return NextResponse.json(
                { message: 'Radio responses saved' },
                { status: 201 }
            );
        }
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
};
