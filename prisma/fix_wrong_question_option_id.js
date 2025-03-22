import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const loop1 = [29, 30, 31, 32, 34, 35, 36];
const loop2 = [64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 85, 86, 87, 88];

(async () => {
    for (let i = 0; i < loop1.length; i++) {
        const q = loop1[i];
        const incrementValue = (i + 1) * 6; // Tăng theo yêu cầu

        try {
            // Lấy tất cả responses có question_id = q
            const responses = await prisma.responses.findMany({
                where: { question_id: q },
                select: { id: true, question_option_id: true }
            });

            for (const response of responses) {
                const updated = await prisma.responses.update({
                    where: { id: response.id },
                    data: { question_option_id: response.question_option_id + incrementValue }
                });

                console.log(`✅ Cập nhật thành công response ID ${updated.id}, câu hỏi số ${q} với giá trị question_option_id mới: ${updated.question_option_id}`);
            }
        } catch (e) {
            console.error(`❌ Có lỗi xảy ra với question_id ${q}:`, e);
        }
    }

    for (let i = 0; i < loop2.length; i++) {
        const q = loop2[i];
        const incrementValue = (i + 1) * 5; // Tăng theo yêu cầu

        try {
            // Lấy tất cả responses có question_id = q
            const responses = await prisma.responses.findMany({
                where: { question_id: q },
                select: { id: true, question_option_id: true }
            });

            for (const response of responses) {
                const updated = await prisma.responses.update({
                    where: { id: response.id },
                    data: { question_option_id: response.question_option_id + incrementValue }
                });

                console.log(`✅ Cập nhật thành công response ID ${updated.id}, câu hỏi số ${q} với giá trị question_option_id mới: ${updated.question_option_id}`);
            }
        } catch (e) {
            console.error(`❌ Có lỗi xảy ra với question_id ${q}:`, e);
        }
    }

    console.log("✅ Cập nhật hoàn tất!");
    await prisma.$disconnect();
})();
