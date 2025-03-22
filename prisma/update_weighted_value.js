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
    'Câu 2.12',
    'Câu 2.13',
    'Câu 4.14.1',
    'Câu 4.14.2',
    'Câu 4.14.3',
    'Câu 4.14.4',
    'Câu 4.14.5',
    'Câu 4.14.6',
    'Câu 4.14.7',
    'Câu 4.14.8',
    'Câu 4.14.9',
    'Câu 4.14.10',
    'Câu 4.14.11',
    'Câu 4.9',
    'Câu 5.3',
    'Câu 5.5',
    'Câu 5.8',
    'Câu 5.11',
    'Câu 5.12',
    'Câu 5.13',
    'Câu 5.14',
    'Câu 6.8',
    'Câu 8.1',
    'Câu 8.2',
    'Câu 8.3',
    'Câu 8.4',
];

// Danh sách các options cần loại trừ (dựa trên question_name và option_value)
const excludedOptions = [
    { question_name: 'Câu 1.5', option_value: 6 },
    { question_name: 'Câu 1.5', option_value: 7 },
    { question_name: 'Câu 1.8', option_value: 5 },
    { question_name: 'Câu 2.9', option_value: 5 },
    { question_name: 'Câu 2.9', option_value: 6 },
    { question_name: 'Câu 2.12', option_value: 1 },
    { question_name: 'Câu 5.6', option_value: 4 },
    { question_name: 'Câu 5.6', option_value: 5 },
    { question_name: 'Câu 5.9', option_value: 5 },
    { question_name: 'Câu 6.2', option_value: 7 },
    { question_name: 'Câu 6.3', option_value: 7 },
    { question_name: 'Câu 2.14.1', option_value: 6 },
    { question_name: 'Câu 2.14.2', option_value: 6 },
    { question_name: 'Câu 2.14.3', option_value: 6 },
    { question_name: 'Câu 2.14.4', option_value: 6 },
    { question_name: 'Câu 2.14.5', option_value: 6 },
    { question_name: 'Câu 2.14.6', option_value: 6 },
    { question_name: 'Câu 2.14.7', option_value: 6 },
    { question_name: 'Câu 2.14.8', option_value: 6 },
];
const reincludeOptions = [
    { question_name: 'Câu 2.12', option_value: 1, new_weighted_value: 1 },
    { question_name: 'Câu 2.12', option_value: 2, new_weighted_value: 2 },
    { question_name: 'Câu 2.12', option_value: 3, new_weighted_value: 2 },
    { question_name: 'Câu 2.12', option_value: 4, new_weighted_value: 2 },
    { question_name: 'Câu 2.12', option_value: 5, new_weighted_value: 3 },
    { question_name: 'Câu 2.12', option_value: 6, new_weighted_value: 2 },
    { question_name: 'Câu 2.12', option_value: 7, new_weighted_value: 3 },
    { question_name: 'Câu 2.13', option_value: 1, new_weighted_value: 0 },
    { question_name: 'Câu 2.13', option_value: 2, new_weighted_value: 1 },
    { question_name: 'Câu 2.13', option_value: 3, new_weighted_value: 2 },
    { question_name: 'Câu 2.13', option_value: 4, new_weighted_value: 2 },
    { question_name: 'Câu 2.13', option_value: 5, new_weighted_value: 3 },
    { question_name: 'Câu 2.13', option_value: 6, new_weighted_value: 2 },
    { question_name: 'Câu 2.13', option_value: 7, new_weighted_value: 3 },
    { question_name: 'Câu 2.13', option_value: 8, new_weighted_value: 2 },
    { question_name: 'Câu 4.9', option_value: 1, new_weighted_value: 0 },
    { question_name: 'Câu 4.9', option_value: 2, new_weighted_value: 1 },
    { question_name: 'Câu 4.9', option_value: 3, new_weighted_value: 1 },
    { question_name: 'Câu 4.9', option_value: 4, new_weighted_value: 2 },
    { question_name: 'Câu 4.9', option_value: 5, new_weighted_value: 4 },
    { question_name: 'Câu 5.3', option_value: 1, new_weighted_value: 0 },
    { question_name: 'Câu 5.3', option_value: 2, new_weighted_value: 0 },
    { question_name: 'Câu 5.3', option_value: 3, new_weighted_value: 1 },
    { question_name: 'Câu 5.3', option_value: 4, new_weighted_value: 2 },
    { question_name: 'Câu 5.3', option_value: 5, new_weighted_value: 3 },
    { question_name: 'Câu 5.3', option_value: 6, new_weighted_value: 5 },
    { question_name: 'Câu 5.4', option_value: 5, new_weighted_value: 5 },
    { question_name: 'Câu 5.5', option_value: 1, new_weighted_value: 0 },
    { question_name: 'Câu 5.5', option_value: 2, new_weighted_value: 2 },
    { question_name: 'Câu 5.5', option_value: 3, new_weighted_value: 3 },
    { question_name: 'Câu 5.5', option_value: 4, new_weighted_value: 4 },
    { question_name: 'Câu 5.5', option_value: 5, new_weighted_value: 5 },
    { question_name: 'Câu 5.6', option_value: 4, new_weighted_value: 4 },
    { question_name: 'Câu 5.6', option_value: 5, new_weighted_value: 5 },
    { question_name: 'Câu 5.7', option_value: 5, new_weighted_value: 5 },
    { question_name: 'Câu 5.8', option_value: 2, new_weighted_value: 2 },
    { question_name: 'Câu 5.8', option_value: 3, new_weighted_value: 3 },
    { question_name: 'Câu 5.8', option_value: 4, new_weighted_value: 4 },
    { question_name: 'Câu 5.8', option_value: 5, new_weighted_value: 5 },
    { question_name: 'Câu 5.9', option_value: 5, new_weighted_value: 5 },
    { question_name: 'Câu 5.11', option_value: 1, new_weighted_value: 2 },
    { question_name: 'Câu 5.11', option_value: 2, new_weighted_value: 1 },
    { question_name: 'Câu 5.11', option_value: 3, new_weighted_value: 2 },
    { question_name: 'Câu 5.11', option_value: 4, new_weighted_value: 3 },
    { question_name: 'Câu 5.12', option_value: 1, new_weighted_value: 1 },
    { question_name: 'Câu 5.12', option_value: 2, new_weighted_value: 2 },
    { question_name: 'Câu 5.12', option_value: 3, new_weighted_value: 2 },
    { question_name: 'Câu 5.12', option_value: 4, new_weighted_value: 3 },
    { question_name: 'Câu 5.12', option_value: 5, new_weighted_value: 4 },
    { question_name: 'Câu 5.12', option_value: 6, new_weighted_value: 5 },
    { question_name: 'Câu 5.13', option_value: 1, new_weighted_value: 1 },
    { question_name: 'Câu 5.13', option_value: 2, new_weighted_value: 2 },
    { question_name: 'Câu 5.13', option_value: 3, new_weighted_value: 2 },
    { question_name: 'Câu 5.13', option_value: 4, new_weighted_value: 2 },
    { question_name: 'Câu 5.13', option_value: 5, new_weighted_value: 2 },
    { question_name: 'Câu 5.13', option_value: 6, new_weighted_value: 2 },
    { question_name: 'Câu 6.8', option_value: 1, new_weighted_value: 2 },
    { question_name: 'Câu 6.8', option_value: 2, new_weighted_value: 2 },
    { question_name: 'Câu 6.8', option_value: 3, new_weighted_value: 2 },
    { question_name: 'Câu 6.8', option_value: 4, new_weighted_value: 3 },
    { question_name: 'Câu 6.8', option_value: 5, new_weighted_value: 2 },
    { question_name: 'Câu 8.1', option_value: 1, new_weighted_value: 1 },
    { question_name: 'Câu 8.1', option_value: 2, new_weighted_value: 2 },
    { question_name: 'Câu 8.1', option_value: 3, new_weighted_value: 3 },
    { question_name: 'Câu 8.1', option_value: 4, new_weighted_value: 4 },
    { question_name: 'Câu 8.1', option_value: 5, new_weighted_value: 5 },
    { question_name: 'Câu 8.2', option_value: 1, new_weighted_value: 1 },
    { question_name: 'Câu 8.2', option_value: 2, new_weighted_value: 2 },
    { question_name: 'Câu 8.2', option_value: 3, new_weighted_value: 3 },
    { question_name: 'Câu 8.2', option_value: 4, new_weighted_value: 4 },
    { question_name: 'Câu 8.2', option_value: 5, new_weighted_value: 5 },
    { question_name: 'Câu 8.3', option_value: 1, new_weighted_value: 2 },
    { question_name: 'Câu 8.3', option_value: 2, new_weighted_value: 2 },
    { question_name: 'Câu 8.3', option_value: 3, new_weighted_value: 3 },
    { question_name: 'Câu 8.3', option_value: 4, new_weighted_value: 3 },
    { question_name: 'Câu 8.3', option_value: 5, new_weighted_value: 2 },
    { question_name: 'Câu 8.4', option_value: 1, new_weighted_value: 2 },
    { question_name: 'Câu 8.4', option_value: 2, new_weighted_value: 2 },
    { question_name: 'Câu 8.4', option_value: 3, new_weighted_value: 3 },
    { question_name: 'Câu 8.4', option_value: 4, new_weighted_value: 3 },
    { question_name: 'Câu 8.4', option_value: 5, new_weighted_value: 2 },
    { question_name: 'Câu 5.14', option_value: 1, new_weighted_value: 1 },
    { question_name: 'Câu 5.14', option_value: 2, new_weighted_value: 2 },
    { question_name: 'Câu 5.14', option_value: 3, new_weighted_value: 2 },
    { question_name: 'Câu 5.14', option_value: 4, new_weighted_value: 2 },
    { question_name: 'Câu 5.14', option_value: 5, new_weighted_value: 2 },
    { question_name: 'Câu 5.14', option_value: 6, new_weighted_value: 2 },
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
async function updateExcludedOptions() {
    try {
        for (const opt of reincludeOptions) {
            const option = await prisma.question_options.findFirst({
                where: {
                    questions: { question_name: opt.question_name },
                    option_value: opt.option_value,
                },
            });

            if (option) {
                await prisma.question_options.update({
                    where: { id: option.id },
                    data: { weighted_value: opt.new_weighted_value },
                });

                console.log(
                    `✅ Đã cập nhật weighted_value ${opt.new_weighted_value} cho ${opt.question_name} - Option ${opt.option_value}`
                );
            } else {
                console.log(
                    `⚠️ Không tìm thấy option ${opt.option_value} của ${opt.question_name}`
                );
            }
        }

        console.log('✅ Hoàn thành cập nhật lại các options bị loại trừ.');
    } catch (error) {
        console.error('❌ Lỗi khi cập nhật lại options bị loại trừ:', error);
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
await updateExcludedOptions();
