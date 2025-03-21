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
