import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

// Mảng JSON chứa dữ liệu cần cập nhật
export const question_score = [
    {
        question_option_id: 1,
        score: 1,
    },
    {
        question_option_id: 2,
        score: 3,
    },
    // Thêm các cặp question_option_id và score khác nếu cần
];

// Hàm chính để cập nhật score
async function main() {
    try {
        // Duyệt qua mảng question_score
        for (const item of question_score) {
            await db.question_options.update({
                where: {
                    id: item.question_option_id, // Tìm bản ghi theo question_option_id
                },
                data: {
                    score: item.score, // Cập nhật giá trị score
                },
            });
            console.log(`Updated question_option_id ${item.question_option_id} with score ${item.score}`);
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