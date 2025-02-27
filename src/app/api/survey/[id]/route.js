import { PrismaClient, surveys } from '@prisma/client';
import {ProtectApi} from "@/utils/protectapi";

const prisma = new PrismaClient();

export async function GET(request, { params }) {
    const { id } = await params;

    try {
        const authResponse = await ProtectApi();
        if (authResponse) return authResponse;

        // Lấy dữ liệu survey từ database
        const survey = await prisma.surveys.findUnique({
            where: { id: parseInt(id) },
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

        // Kiểm tra nếu không tìm thấy survey
        if (!survey) {
            return new Response(
                JSON.stringify({ error: `Survey with ID ${id} not found.` }),
                { status: 404 }
            );
        }

        // Trả dữ liệu JSON
        return new Response(JSON.stringify(survey, null, 2), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.error('Error fetching survey:', error);
        return new Response(
            JSON.stringify({ error: 'Internal Server Error' }),
            { status: 500 }
        );
    }
}
