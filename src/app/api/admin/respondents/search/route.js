// /app/api/admin/respondents/search/route.js
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Ánh xạ từ enum name sang giá trị gốc trong database
const groupMapping = {
    Leader: "Lãnh đạo & Quản lý",
    Officer: "Cán bộ nghiệp vụ",
    ITSup: "Nhân viên CNTT & Hỗ trợ kỹ thuật",
};

export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const query = searchParams.get("query") || "";

        if (typeof query !== "string") {
            return NextResponse.json(
                { success: false, error: "Query must be a string" },
                { status: 400 }
            );
        }

        // Truy vấn Prisma với giới hạn 10 kết quả
        const respondents = await prisma.respondents.findMany({
            where: {
                OR: [
                    { name: { contains: query } },
                    { email: { contains: query } },
                ],
            },
            select: {
                id: true,
                name: true,
                email: true,
                belong_to_group: true,
            },
            take: 10, // Giới hạn tối đa 10 respondents
        });

        if (!respondents) {
            throw new Error("Prisma returned null or undefined");
        }

        // Chuyển đổi belong_to_group sang giá trị gốc
        const formattedRespondents = respondents.map((respondent) => ({
            id: respondent.id,
            name: respondent.name,
            email: respondent.email,
            belong_to_group: respondent.belong_to_group
                ? groupMapping[respondent.belong_to_group]
                : null,
        }));

        return NextResponse.json({ success: true, data: formattedRespondents }, { status: 200 });
    } catch (error) {
        console.error("Error searching respondents:", {
            message: error.message,
            stack: error.stack,
        });
        return NextResponse.json(
            { success: false, error: "Internal Server Error", details: error.message },
            { status: 500 }
        );
    } finally {
        await prisma.$disconnect();
    }
}