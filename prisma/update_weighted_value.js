import { PrismaClient } from '@prisma/client';

const db = new PrismaClient();

// Mảng JSON chứa dữ liệu cần cập nhật
export const question_weighted_value = [
    {
        question_option_id: 1,
        weighted_value: 0,
    },
    {
        question_option_id: 2,
        weighted_value: 1,
    },
];

// Hàm chính để cập nhật score
async function main() {
    try {
        // Duyệt qua mảng question_score
        for (const item of question_weighted_value) {
            await db.question_options.update({
                where: {
                    id: item.question_option_id,
                },
                data: {
                    weighted_value: item.weighted_value,
                },
            });
            console.log(
                `Updated question_option_id ${item.question_option_id} with weighted_value ${item.score}`
            );
        }
        console.log('Update completed successfully!');
    } catch (error) {
        console.error('Error updating scores:', error);
    } finally {
        await db.$disconnect(); // Đóng kết nối Prisma
    }
}

// Gọi hàm main
main();
