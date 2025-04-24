import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

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

        const totalInstitutions = await prisma.institutions.count();

        // Lấy danh sách quỹ chưa trả lời
        const unresponsiveInstitutions = await prisma.institutions.findMany({
            where: {
                AND: [
                    query
                        ? {
                              OR: [
                                  { name: { contains: query } },
                                  { identity_code: { contains: query } },
                              ],
                          }
                        : {},
                    {
                        respondents: {
                            none: {},
                        },
                    },
                ],
            },
            select: {
                id: true,
                name: true,
                identity_code: true,
                _count: {
                    select: {
                        respondents: true,
                    },
                },
            },
        });

        // Lấy danh sách quỹ đã trả lời, bao gồm thông tin người trả lời
        const responsiveInstitutions = await prisma.institutions.findMany({
            where: {
                AND: [
                    query
                        ? {
                              OR: [
                                  { name: { contains: query } },
                                  { identity_code: { contains: query } },
                              ],
                          }
                        : {},
                    {
                        respondents: {
                            some: {},
                        },
                    },
                ],
            },
            select: {
                id: true,
                name: true,
                identity_code: true,
                _count: {
                    select: {
                        respondents: true,
                    },
                },
                respondents: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        phone: true,
                    },
                },
            },
        });

        // Định dạng kết quả cho quỹ chưa trả lời
        const formattedUnresponsiveResults = unresponsiveInstitutions.map((institution) => ({
            id: institution.id,
            name: institution.name,
            identity_code: institution.identity_code,
            respondentCount: institution._count.respondents,
            status: "unresponsive",
        }));

        // Định dạng kết quả cho quỹ đã trả lời
        const formattedResponsiveResults = responsiveInstitutions.map((institution) => ({
            id: institution.id,
            name: institution.name,
            identity_code: institution.identity_code,
            respondentCount: institution._count.respondents,
            status: "responsive",
            respondents: institution.respondents.map((respondent) => ({
                id: respondent.id,
                name: respondent.name,
                email: respondent.email || "Không có",
                phone: respondent.phone || "Không có",
            })),
        }));

        console.log("Search query:", query);
        console.log("Found unresponsive funds:", formattedUnresponsiveResults.length);
        console.log("Found responsive funds:", formattedResponsiveResults.length);

        return NextResponse.json({
            success: true,
            data: {
                unresponsive: formattedUnresponsiveResults,
                responsive: formattedResponsiveResults,
            },
            totalUnresponsive: formattedUnresponsiveResults.length,
            totalResponsive: formattedResponsiveResults.length,
            totalInstitutions: totalInstitutions,
        }, { status: 200 });
    } catch (error) {
        console.error("Error fetching funds:", {
            message: error.message,
            stack: error.stack,
        });
        return NextResponse.json(
            {
                success: false,
                error: "Internal Server Error",
                details: error.message,
            },
            { status: 500 }
        );
    } finally {
        await prisma.$disconnect();
    }
}