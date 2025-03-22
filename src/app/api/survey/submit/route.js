import { PrismaClient } from '@prisma/client';
import { NextResponse } from "next/server";
import {createToken} from "@/utils/auth.js";

const prisma = new PrismaClient();

export async function POST(req) {
    try {
        const body = await req.json();
        const { respondent_id } = body;

        if (!respondent_id) {
            return new NextResponse.json({ message: 'Missing respondent_id' }, { status: 400 });
        }

        // Bước 1: Lấy câu trả lời sớm nhất (dựa vào trường updated_at)
        const earliestNextResponse = await prisma.responses.findFirst({
            where: { respondent_id },
            orderBy: { updated_at: 'asc' }
        });

        if (!earliestNextResponse) {
            return new NextResponse.json({ message: 'No responses found for respondent' }, { status: 404 });
        }

        // Lưu thời điểm của câu trả lời sớm nhất
        const startTime = new Date(earliestNextResponse.updated_at);

        // Bước 2: Cập nhật trạng thái các câu trả lời thành 'submitted'
        // Vì trigger MySQL chỉ cập nhật updated_at khi question_option_id thay đổi,
        // nên các giá trị updated_at không bị thay đổi trong bước này.
        await prisma.responses.updateMany({
            where: { respondent_id },
            data: { response_status: 'submitted' }
        });

        await prisma.respondents.update({
            where: { id: respondent_id },
            data: { submission_status: 'submitted' }
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

        const respondent = await prisma.respondents.findFirst(
            {
                where: {
                    id: respondent_id,
                }
            }
        )
        const token = await createToken(respondent);

        const response = NextResponse.json({ message: 'Survey submitted successfully', duration: durationSeconds } ,{ status: 200 });

        response.cookies.set("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "strict",
            path: "/"
        });
        return response

    } catch (error) {
        console.error('Error submitting survey:', error);
        return new NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}
