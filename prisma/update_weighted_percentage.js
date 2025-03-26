import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// 🔹 Danh sách trọng số theo nhóm câu hỏi (đã chia 100 để thành số thập phân)
const weightedPercentages = {
    'Câu 1.1': 0.15,
    'Câu 1.2': 0.25,
    'Câu 1.3': 0.25,
    'Câu 1.4': 0.3,
    'Câu 1.5': 0.3,
    'Câu 1.6': 0.3,
    'Câu 1.7': 0.3,
    'Câu 1.8': 0.15,
    'Câu 1.9': 0.15,
    'Câu 1.10': 0.15,
    'Câu 1.11': 0.15,
    'Câu 1.12': 0.15,

    'Câu 2.1': 0.18,
    'Câu 2.2': 0.18,
    'Câu 2.3': 0.2,
    'Câu 2.4': 0.2,
    'Câu 2.5': 0.12,
    'Câu 2.6': 0.2,
    'Câu 2.7': 0.1,
    'Câu 2.8': 0,
    'Câu 2.9': 0.1,
    'Câu 2.10': 0.1,
    'Câu 2.11': 0.1,
    'Câu 2.12': 0.1,
    'Câu 2.13': 0.1,
    'Câu 2.14': 0.1,

    'Câu 2.14.1': 0.1,
    'Câu 2.14.2': 0.1,
    'Câu 2.14.3': 0.1,
    'Câu 2.14.4': 0.1,
    'Câu 2.14.5': 0.1,
    'Câu 2.14.6': 0.1,
    'Câu 2.14.7': 0.1,
    'Câu 2.14.8': 0.1,

    'Câu 3.1': 0.25,
    'Câu 3.2': 0.25,
    'Câu 3.3': 0.25,
    'Câu 3.4': 0.2,
    'Câu 3.5': 0.2,
    'Câu 3.6': 0.2,
    'Câu 3.7': 0.2,
    'Câu 3.8': 0.2,
    'Câu 3.9': 0.2,
    'Câu 3.10': 0.2,
    'Câu 3.11': 0.2,
    'Câu 3.12': 0.2,
    'Câu 3.13': 0.15,

    'Câu 4.1': 0.15,
    'Câu 4.2': 0.15,
    'Câu 4.3': 0.2,
    'Câu 4.4': 0.2,
    'Câu 4.5': 0.3,
    'Câu 4.6': 0.3,
    'Câu 4.7': 0.3,
    'Câu 4.8': 0.3,
    'Câu 4.9': 0.3,
    'Câu 4.10': 0.15,
    'Câu 4.11': 0.15,
    'Câu 4.12': 0.2,
    'Câu 4.13': 0.2,

    'Câu 5.1': 0.15,
    'Câu 5.2': 0.1,
    'Câu 5.3': 0.15,
    'Câu 5.4': 0.15,
    'Câu 5.5': 0.15,
    'Câu 5.6': 0.15,
    'Câu 5.7': 0.15,
    'Câu 5.8': 0.15,
    'Câu 5.9': 0.15,
    'Câu 5.10': 0.15,
    'Câu 5.10.1': 0.15,
    'Câu 5.10.2': 0.15,
    'Câu 5.10.3': 0.15,
    'Câu 5.10.4': 0.15,
    'Câu 5.11': 0.15,
    'Câu 5.12': 0.15,
    'Câu 5.13': 0.15,
    'Câu 5.14': 0.15,

    'Câu 6.1': 0.2,
    'Câu 6.2': 0.25,
    'Câu 6.3': 0.25,
    'Câu 6.4': 0.25,
    'Câu 6.5': 0.3,
    'Câu 6.6': 0.25,
    'Câu 6.7': 0.25,
    'Câu 6.8': 0.25,
    'Câu 6.9': 0.3,
    'Câu 6.10': 0,
    'Câu 6.11': 0,

    'Câu 7.1': 0.4,
    'Câu 7.2': 0.4,
    'Câu 7.3': 0.35,
    'Câu 7.4': 0.4,
    'Câu 7.5': 0.35,
    'Câu 7.6': 0.25,
    'Câu 7.7': 0.25,
    'Câu 7.8': 0,

    'Câu 8.1': 0.2,
    'Câu 8.2': 0.2,
    'Câu 8.3': 0.2,
    'Câu 8.4': 0.2,
    'Câu 8.5': 0.15,
    'Câu 8.6': 0.25,
    'Câu 8.7': 0.25,
    'Câu 8.8': 0.2,
};

async function updateWeightedPercentage() {
    try {
        for (const [questionName, percentage] of Object.entries(
            weightedPercentages
        )) {
            const updatedQuestion = await prisma.questions.updateMany({
                where: { question_name: questionName },
                data: { weighted_percentage: percentage },
            });

            if (updatedQuestion.count > 0) {
                console.log(
                    `✅ Cập nhật ${updatedQuestion.count} câu hỏi: ${questionName} -> ${percentage}`
                );
            } else {
                console.log(`⚠️ Không tìm thấy câu hỏi: ${questionName}`);
            }
        }
        console.log('✅ Hoàn thành cập nhật weighted_percentage.');
    } catch (error) {
        console.error('❌ Lỗi khi cập nhật weighted_percentage:', error);
    }
}

// 🏃‍♂️ Chạy cập nhật
await updateWeightedPercentage();
