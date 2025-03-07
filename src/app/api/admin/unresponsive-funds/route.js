// /app/api/admin/unresponsive-funds/route.js
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

        const unresponsiveInstitutions = await prisma.institutions.findMany({
            where: {
                AND: [
                    query
                        ? {
                              OR: [
                                  { name: { contains: query } }, // Loại bỏ mode
                                  { identity_code: { contains: query } }, // Loại bỏ mode
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

        const formattedResults = unresponsiveInstitutions.map((institution) => ({
            id: institution.id,
            name: institution.name,
            identity_code: institution.identity_code,
            respondentCount: institution._count.respondents,
        }));

        console.log("Search query:", query);
        console.log("Found unresponsive funds:", formattedResults.length);

        return NextResponse.json({
            success: true,
            data: formattedResults,
            total: formattedResults.length,
            totalInstitutions: totalInstitutions,
        }, { status: 200 });
    } catch (error) {
        console.error("Error fetching unresponsive funds:", {
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