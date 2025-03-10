import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req) {
    try {
        const body = await req.json();
        const { respondent_id } = body;

        if (!respondent_id) {
            return new Response(
                JSON.stringify({ message: 'Missing respondent_id' }),
                { status: 400 }
            );
        }

        // Bước 1: Lấy câu trả lời sớm nhất (dựa vào trường updated_at)
        const earliestResponse = await prisma.responses.findFirst({
            where: { respondent_id },
            orderBy: { updated_at: 'asc' }
        });

        if (!earliestResponse) {
            return new Response(
                JSON.stringify({ message: 'No responses found for respondent' }),
                { status: 404 }
            );
        }

        // Lưu thời điểm của câu trả lời sớm nhất
        const startTime = new Date(earliestResponse.updated_at);

        // Bước 2: Cập nhật trạng thái các câu trả lời thành 'submitted'
        // Vì trigger MySQL chỉ cập nhật updated_at khi question_option_id thay đổi,
        // nên các giá trị updated_at không bị thay đổi trong bước này.
        await prisma.responses.updateMany({
            where: { respondent_id },
            data: { response_status: 'submitted' }
        });

        // Bước 3: Lấy thời điểm hiện tại làm thời điểm submit
        const submitTime = new Date();

        // Tính thời gian (tính theo giây)
        const durationMs = submitTime.getTime() - startTime.getTime();
        const durationSeconds = Math.floor(durationMs / 1000);

        // Bước 4:
        // Trước khi tạo bản ghi mới, xoá các bản ghi respondent_duration cũ của respondent
        await prisma.respondent_duration.deleteMany({
            where: { respondent_id }
        });

        // Bước 4: Lưu tổng thời gian trả lời vào bảng respondent_duration
        await prisma.respondent_duration.create({
            data: {
                respondent_id,
                total_duration: durationSeconds
            }
        });

        return new Response(
            JSON.stringify({ message: 'Survey submitted successfully', duration: durationSeconds }),
            { status: 200 }
        );
    } catch (error) {
        console.error('Error submitting survey:', error);
        return new Response(
            JSON.stringify({ message: 'Internal Server Error' }),
            { status: 500 }
        );
    } finally {
        await prisma.$disconnect();
    }
}
