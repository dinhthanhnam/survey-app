import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Danh sách các câu hỏi cần loại trừ (dựa trên question_name)
const excludedQuestions = [
    'Câu 1.13',
    'Câu 1.14',
    'Câu 6.2',
    'Câu 6.6',
    'Câu 6.7',
    'Câu 7.8',
    'Câu 8.4',
    'Câu 2.10',
    'Câu 3.2',
    'Câu 4.14',
];

// Danh sách các options cần loại trừ (dựa trên question_name và option_value)
const excludedOptions = [
    { question_name: 'Câu 1.14', option_value: 2 },
    { question_name: 'Câu 2', option_value: 1 },
];

async function updateWeightedValuesForQuestion(questionId, questionName) {
    try {
        // 🔍 Lấy tất cả các options của câu hỏi, sắp xếp theo option_value tăng dần
        const options = await prisma.question_options.findMany({
            where: {
                question_id: questionId,
                // Loại trừ các option theo question_name và option_value
                NOT: excludedOptions.map((opt) => ({
                    questions: { question_name: opt.question_name },
                    option_value: opt.option_value,
                })),
            },
            orderBy: { option_value: 'asc' },
        });

        let weight = 0; // Bắt đầu từ 0

        for (const option of options) {
            await prisma.question_options.update({
                where: { id: option.id },
                data: { weighted_value: weight },
            });
            weight++; // Tăng dần giá trị weight
        }

        console.log(
            `✅ Cập nhật thành công weighted_value cho câu hỏi ${questionName} (${questionId})`
        );
    } catch (error) {
        console.error('❌ Lỗi khi cập nhật weighted_value:', error);
    }
}

async function updateAllQuestionsWeightedValues() {
    // 🔍 Lấy tất cả câu hỏi, loại trừ những câu trong excludedQuestions
    const questions = await prisma.questions.findMany({
        where: {
            NOT: { question_name: { in: excludedQuestions } },
        },
        select: { id: true, question_name: true },
    });

    for (const question of questions) {
        await updateWeightedValuesForQuestion(
            question.id,
            question.question_name
        );
    }
}

// 🏃‍♂️ Chạy cập nhật
await updateAllQuestionsWeightedValues();
