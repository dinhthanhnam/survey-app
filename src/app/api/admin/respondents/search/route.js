import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

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
            take: 10,
        });

        if (!respondents) {
            throw new Error("Prisma returned null or undefined");
        }

        const respondentIds = respondents.map(r => r.id);

        const durations = await prisma.respondent_duration.groupBy({
            by: ["respondent_id"],
            _sum: { total_duration: true },
            where: {
                respondent_id: { in: respondentIds },
            },
        });

        const durationMap = durations.reduce((acc, cur) => {
            acc[cur.respondent_id] = cur._sum.total_duration || 0;
            return acc;
        }, {});

        const formattedRespondents = respondents.map((respondent) => ({
            id: respondent.id,
            name: respondent.name,
            email: respondent.email,
            belong_to_group: respondent.belong_to_group
                ? groupMapping[respondent.belong_to_group]
                : null,
            total_duration: durationMap[respondent.id] || 0,
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
