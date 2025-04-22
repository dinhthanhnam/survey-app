import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// 🟢 Tìm question_id từ question_name
async function getQuestionIdByName(questionName) {
    const question = await prisma.questions.findFirst({
        where: { question_name: questionName },
    });

    return question ? question.id : null;
}

// 🟢 Cập nhật toàn bộ lựa chọn của một câu hỏi theo question_name
async function updateAllOptionsForQuestionName(questionName, updatedOptions) {
    try {
        const questionId = await getQuestionIdByName(questionName);
        if (!questionId) {
            console.log(`❌ Không tìm thấy câu hỏi: ${questionName}`);
            return;
        }

        for (const option of updatedOptions) {
            await prisma.question_options.updateMany({
                where: {
                    question_id: questionId,
                    option_value: option.option_value,
                },
                data: {
                    option_text: option.option_text,
                    option_note: option.option_note || null,
                },
            });

            console.log(
                `✅ Lựa chọn với option_value ${option.option_value} đã được cập nhật cho câu hỏi: ${questionName}`
            );
        }
    } catch (error) {
        console.error('❌ Lỗi khi cập nhật các lựa chọn:', error);
    }
}

// 🟢 Cập nhật các lựa chọn cho câu 6.1
async function updateOptionsForQuestion61() {
    await updateAllOptionsForQuestionName('Câu 6.1', [
        {
            option_value: 1,
            option_text: 'Chưa triển khai cung ứng sản phẩm/dịch vụ ngân hàng số',
            option_note: null,
        },
        {
            option_value: 2,
            option_text: 'Cung ứng sản phẩm/dịch vụ ngân hàng số cho Ngân hàng Hợp tác xã (NHHTX)',
            option_note: null,
        },
        {
            option_value: 3,
            option_text: 'Cung ứng sản phẩm/dịch vụ ngân hàng số cho các Tổ chức tín dụng khác và công ty Fintech',
            option_note: null,
        },
        {
            option_value: 4,
            option_text: 'Tự cung ứng sản phẩm/dịch vụ ngân hàng số qua ứng dụng riêng của Quỹ',
            option_note: null,
        },
        {
            option_value: 5,
            option_text: 'Tự triển khai dịch vụ ngân hàng số và hợp tác với các Tổ chức tín dụng khác để cung ứng dịch vụ',
            option_note: null,
        },
    ]);
}

// 🏃‍♂️ Chạy script
async function main() {
    try {
        await updateOptionsForQuestion61();
        console.log('✅ Hoàn tất cập nhật câu hỏi 6.1');
    } catch (error) {
        console.error('❌ Lỗi trong quá trình thực thi:', error);
    } finally {
        await prisma.$disconnect();
    }
}

main();