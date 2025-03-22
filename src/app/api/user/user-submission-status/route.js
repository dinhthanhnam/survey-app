import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import {verifyToken} from "@/utils/auth.js";

const prisma = new PrismaClient();

export async function GET(req) {
    const token = req.cookies.get("token")?.value;
    if (!token) {
        return NextResponse.json({ message: "No token" }, { status: 401 });
    }

    try {
        // Giả sử bạn có verifyToken để lấy user ID từ token
        const user = await verifyToken(token);
        if (!user) {
            return NextResponse.json({ message: "Invalid token" }, { status: 401 });
        }

        // Truy vấn trạng thái submission từ database
        const respondent = await prisma.respondents.findUnique({
            where: { id: user.id },
            select: { submission_status: true },
        });

        if (!respondent) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }

        return NextResponse.json({ submission_status: respondent.submission_status });
    } catch (error) {
        console.error("Error fetching user status:", error);
        return NextResponse.json({ message: "Server error" }, { status: 500 });
    }
}
