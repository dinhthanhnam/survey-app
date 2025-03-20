import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

// Mảng JSON chứa dữ liệu cần cập nhật
export const question_parent_id = [
    {
        id: 29,
        parent_id: 28,
    },
    {
        id: 30,
        parent_id: 28,
    },
    {
        id: 31,
        parent_id: 28,
    },
    {
        id: 32,
        parent_id: 28,
    },
    {
        id: 33,
        parent_id: 28,
    },
    {
        id: 34,
        parent_id: 28,
    },
    {
        id: 35,
        parent_id: 28,
    },
    {
        id: 36,
        parent_id: 28,
    },
    {
        id: 64,
        parent_id: 63,
    },
    {
        id: 65,
        parent_id: 63,
    },
    {
        id: 66,
        parent_id: 63,
    },
    {
        id: 67,
        parent_id: 63,
    },
    {
        id: 68,
        parent_id: 63,
    },
    {
        id: 69,
        parent_id: 63,
    },
    {
        id: 70,
        parent_id: 63,
    },
    {
        id: 71,
        parent_id: 63,
    },
    {
        id: 72,
        parent_id: 63,
    },
    {
        id: 73,
        parent_id: 63,
    },
    {
        id: 74,
        parent_id: 63,
    },
    {
        id: 85,
        parent_id: 84,
    },
    {
        id: 86,
        parent_id: 84,
    },
    {
        id: 87,
        parent_id: 84,
    },
    {
        id: 88,
        parent_id: 84,
    },
];

// Hàm chính để cập nhật score
async function main() {
    try {
        // Duyệt qua mảng question_score
        for (const item of question_parent_id) {
            await db.questions.update({
                where: {
                    id: item.id,
                },
                data: {
                    parent_id: item.parent_id, // Cập nhật giá trị score
                },
            });
            console.log(`Updating parent_id for question_id: ${item.id}`);
        }
        console.log("Update completed successfully!");
    } catch (error) {
        console.error("Error updating scores:", error);
    } finally {
        await db.$disconnect(); // Đóng kết nối Prisma
    }
}

// Gọi hàm main
main();