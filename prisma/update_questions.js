import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// 🟢 Tìm question_id từ question_name
async function getQuestionIdByName(questionName) {
    const question = await prisma.questions.findFirst({
        where: { question_name: questionName },
    });

    return question ? question.id : null;
}

// 🟢 Cập nhật câu hỏi dựa vào question_name
async function updateQuestionByName(questionName, newData) {
    try {
        const updatedQuestion = await prisma.questions.updateMany({
            where: { question_name: questionName },
            data: newData,
        });

        console.log(`✅ Cập nhật thành công ${updatedQuestion.count} câu hỏi.`);
    } catch (error) {
        console.error('❌ Lỗi khi cập nhật câu hỏi:', error);
    }
}

// 🟢 Cập nhật lựa chọn theo question_name và option_value
async function updateOptionByQuestionName(questionName, optionValue, newData) {
    try {
        const questionId = await getQuestionIdByName(questionName);
        if (!questionId) {
            console.log(`❌ Không tìm thấy câu hỏi: ${questionName}`);
            return;
        }

        const updatedOption = await prisma.question_options.updateMany({
            where: {
                question_id: questionId,
                option_value: optionValue,
            },
            data: newData,
        });

        console.log(
            `✅ Cập nhật thành công ${updatedOption.count} lựa chọn cho câu hỏi: ${questionName}`
        );
    } catch (error) {
        console.error('❌ Lỗi khi cập nhật lựa chọn:', error);
    }
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

// 🟢 Cập nhật cả câu hỏi và danh sách lựa chọn theo question_name
async function updateQuestionAndOptions(
    questionName,
    questionData,
    updatedOptions
) {
    try {
        const questionId = await getQuestionIdByName(questionName);
        if (!questionId) {
            console.log(`❌ Không tìm thấy câu hỏi: ${questionName}`);
            return;
        }

        // ✅ Cập nhật câu hỏi
        await updateQuestionByName(questionName, questionData);

        // ✅ Cập nhật danh sách lựa chọn
        await updateAllOptionsForQuestionName(questionName, updatedOptions);
    } catch (error) {
        console.error('❌ Lỗi khi cập nhật:', error);
    }
}

// 🏃‍♂️ Chạy thử cập nhật dữ liệu
async function main() {
    // 1️⃣ Cập nhật câu hỏi với question_name = "Câu 1.1"
    await updateQuestionByName('Câu 1.1', {
        question_text: 'Nội dung mới cho Câu 1.1',
        question_note: 'Ghi chú mới cho Câu 1.1',
    });

    // 2️⃣ Cập nhật một lựa chọn dựa trên question_name và option_value
    await updateOptionByQuestionName('Câu 1.11', 6, {
        option_text: 'Đã triển khai các chương trình khác',
        option_note: 'ngoài các chương trình trên',
    });

    await updateOptionByQuestionName('Câu 1.1', 2, {
        option_note: null, // Xóa ghi chú
    });

    // 3️⃣ Cập nhật toàn bộ lựa chọn của một câu hỏi theo question_name
    await updateAllOptionsForQuestionName('Câu 1.1', [
        {
            option_value: 1,
            option_text: 'Chưa có hiểu biết về CĐS',
            option_note: null,
        },
        {
            option_value: 2,
            option_text: 'Nhận thức sơ bộ, chưa hiểu rõ lợi ích',
            option_note: null,
        },
        {
            option_value: 3,
            option_text: 'Nhận thức được một số nội dung cơ bản',
            option_note: null,
        },
        {
            option_value: 4,
            option_text: 'Nhận thức đầy đủ',
            option_note: null,
        },
        {
            option_value: 5,
            option_text: 'Hiểu sâu sắc',
            option_note: null,
        },
    ]);
    await updateAllOptionsForQuestionName('Câu 1.3', [
        {
            option_value: 1,
            option_text: 'Hoàn toàn không được đào tạo, không biết về bảo mật',
            option_note: null,
        },
        {
            option_value: 2,
            option_text: 'Được đào tạo nhưng chưa hiểu rõ',
            option_note: null,
        },
        {
            option_value: 3,
            option_text: 'Được đào tạo, hiểu một số nguyên tắc cơ bản',
            option_note: null,
        },
        {
            option_value: 4,
            option_text: 'Được đào tạo, hiểu rõ và bước đầu tuân thủ',
            option_note: null,
        },
        {
            option_value: 5,
            option_text:
                'Được đào tạo, thành thạo về bảo mật và có thể hướng dẫn người khác',
            option_note: null,
        },
    ]);
    await updateAllOptionsForQuestionName('Câu 1.6', [
        {
            option_value: 1,
            option_text: 'Các chương trình không hữu ích',
            option_note: null,
        },
        {
            option_value: 2,
            option_text:
                'Có chương trình nhưng nội dung chưa thực tế, khó áp dụng',
            option_note: null,
        },
        {
            option_value: 3,
            option_text: 'Chương trình có ích nhưng chưa thực sự hiệu quả',
            option_note: null,
        },
        {
            option_value: 4,
            option_text:
                'Chương trình có nội dung phù hợp, hỗ trợ tốt cho công việc',
            option_note: null,
        },
        {
            option_value: 5,
            option_text:
                'Chương trình hiệu quả, giúp nâng cao năng lực thực tế đáng kể',
            option_note: null,
        },
    ]);
    await updateAllOptionsForQuestionName('Câu 1.7', [
        {
            option_value: 1,
            option_text: 'Hoàn toàn không hỗ trợ/hỗ trợ không đáng kể',
            option_note: null,
        },
        {
            option_value: 2,
            option_text:
                'Hỗ trợ còn hạn chế, chưa đáp ứng được nhu cầu thực tế',
            option_note: null,
        },
        {
            option_value: 3,
            option_text: 'Hỗ trợ khá đầy đủ nhưng ít thực tế',
            option_note: null,
        },
        {
            option_value: 4,
            option_text: 'Hỗ trợ khá đầy đủ và thực tế',
            option_note: null,
        },
        {
            option_value: 5,
            option_text:
                'Hỗ trợ rất đầy đủ, hiệu quả và sát với nhu cầu thực tế',
            option_note: null,
        },
    ]);

    // 4️⃣ Cập nhật cả câu hỏi và tất cả lựa chọn cùng lúc
    await updateQuestionAndOptions(
        'Câu 1.10',
        {
            question_text:
                'Anh/chị đã có những hành động cụ thể nào để thúc đẩy chuyển đổi số tại Quỹ?',
        },
        [
            {
                option_value: 1,
                option_text:
                    'Chưa thực hiện bất kỳ hành động nào liên quan đến chuyển đổi số và không quan tâm đến vấn đề này',
                option_note: null,
            },
            {
                option_value: 2,
                option_text:
                    'Đã nghe nói về chuyển đổi số nhưng chỉ thực hiện một số công việc nhỏ như sử dụng email, nhập liệu trên phần mềm mà chưa chủ động tìm hiểu hoặc áp dụng thêm',
                option_note: null,
            },
            {
                option_value: 3,
                option_text:
                    'Có áp dụng công nghệ vào công việc hằng ngày như sử dụng phần mềm nội bộ, khai thác dữ liệu số, nhưng chưa chủ động đề xuất hoặc tham gia cải tiến quy trình số hóa',
                option_note: null,
            },
            {
                option_value: 4,
                option_text:
                    'Chủ động sử dụng các công cụ công nghệ vào công việc, hướng dẫn đồng nghiệp sử dụng hệ thống số hóa và có đóng góp trong các sáng kiến chuyển đổi số tại Quỹ',
                option_note: null,
            },
            {
                option_value: 5,
                option_text:
                    'Là người tiên phong trong chuyển đổi số, đề xuất giải pháp mới, thử nghiệm và triển khai công nghệ vào công việc, đồng thời hướng dẫn đồng nghiệp áp dụng',
                option_note: null,
            },
        ]
    );
    await updateQuestionAndOptions(
        'Câu 1.12',
        {
            question_text:
                'Anh/Chị đánh giá mức độ sẵn sàng của đội ngũ lãnh đạo trong việc tiếp cận và ứng dụng công nghệ số như thế nào?',
        },
        [
            {
                option_value: 1,
                option_text: 'Hoàn toàn không sẵn sàng',
                option_note: 'Không quan tâm',
            },
            {
                option_value: 2,
                option_text: 'Không sẵn sàng ',
                option_note: 'Quan tâm nhưng chưa có hành động',
            },
            {
                option_value: 3,
                option_text: 'Khá sẵn sàng',
                option_note: 'Có nhận thức nhưng cần thêm hỗ trợ',
            },
            {
                option_value: 4,
                option_text: 'Sẵn sàng',
                option_note: 'Đã có hành động ban đầu',
            },
            {
                option_value: 5,
                option_text: 'Hoàn toàn sẵn sàng',
                option_note: 'Đang tích cực triển khai & mở rộng',
            },
        ]
    );
    await updateQuestionAndOptions(
        'Câu 3.5',
        {
            question_text:
                'Nguồn tài chính hiện tại dành cho việc nâng cấp cơ sở hạ tầng CNTT có đáp ứng được yêu cầu thực tế của tổ chức hay không?',
        },
        [
            {
                option_value: 1,
                option_text: 'Hoàn toàn không đáp ứng được',
            },
            {
                option_value: 2,
                option_text: 'Ít đáp ứng được',
            },
            {
                option_value: 3,
                option_text: 'Đáp ứng được một phần',
            },
            {
                option_value: 4,
                option_text: 'Phần lớn đáp ứng được',
            },
            {
                option_value: 5,
                option_text: 'Đáp ứng được hoàn toàn',
            },
        ]
    );
    await updateQuestionAndOptions(
        'Câu 3.6',
        {
            question_text:
                'Quỹ đã có kế hoạch hoặc triển khai ứng dụng công nghệ điện toán đám mây vào hệ thống CNTT hiện tại ở mức độ nào?',
        },
        [
            {
                option_value: 1,
                option_text: 'Chưa có kế hoạch triển khai',
            },
            {
                option_value: 2,
                option_text: 'Đã có kế hoạch nhưng chưa triển khai',
            },
            {
                option_value: 3,
                option_text: 'Đã triển chính thức một phần',
            },
            {
                option_value: 4,
                option_text:
                    'Đã triển khai hoàn chỉnh nhưng chưa khai thác hiệu quả',
            },
            {
                option_value: 5,
                option_text:
                    'Đã triển khai hoàn chỉnh và đang khai thác hiệu quả',
            },
        ]
    );
    await updateQuestionAndOptions(
        'Câu 3.8',
        {
            question_text:
                'Hệ thống Core đã được triển khai và vận hành tại đơn vị anh/chị hiện nay như thế nào?',
        },
        [
            {
                option_value: 1,
                option_text: 'Chưa triển khai Hệ thống Core',
            },
            {
                option_value: 2,
                option_text: 'Đã triển khai Hệ thống Core nhưng hiệu quả thấp',
            },
            {
                option_value: 3,
                option_text:
                    'Đã triển khai Hệ thống Core đạt được hiệu quả như mong đợi',
            },
            {
                option_value: 4,
                option_text:
                    'Đã triển khai Hệ thống Core đạt được hiệu quả trên mong đợi',
            },
            {
                option_value: 5,
                option_text:
                    'Đã triển khai Hệ thống Core đạt được hiệu quả tối ưu',
            },
        ]
    );
    await updateAllOptionsForQuestionName('Câu 4.4', [
        {
            option_value: 1,
            option_text: 'Chưa từng tổ chức đào tạo',
        },
        {
            option_value: 2,
            option_text: 'Đã có kế hoạch nhưng chưa thực hiện đào tạo',
        },
        {
            option_value: 3,
            option_text: 'Có tổ chức đào tạo nhưng không theo định kỳ',
            option_note: 'thỉnh thoảng, không thường xuyên',
        },
        {
            option_value: 4,
            option_text: 'Đào tạo thường xuyên nhưng chưa hiệu quả',
        },
        {
            option_value: 5,
            option_text: 'Đào tạo thường xuyên có hiệu quả',
        },
        {
            option_value: 6,
            option_text:
                'Tổ chức đào tạo định kỳ hiệu quả tốt và sát với thực tiễn công việc',
        },
    ]);
    await updateAllOptionsForQuestionName('Câu 4.5', [
        {
            option_value: 1,
            option_text:
                'Không biết cách xử lý và không biết cần báo cáo cho ai',
            option_note: null,
        },
        {
            option_value: 2,
            option_text:
                'Biết cần báo cáo cho bộ phận IT nhưng không biết rõ quy trình',
            option_note: null,
        },
        {
            option_value: 3,
            option_text: 'Biết báo cáo và hiểu rõ quy trình xử lý sự cố',
            option_note: null,
        },
        {
            option_value: 4,
            option_text:
                'Có thể thực hiện các biện pháp bảo vệ cơ bản trước khi báo IT',
            option_note: null,
        },
        {
            option_value: 5,
            option_text:
                'Thành thạo xử lý sự cố và có thể hướng dẫn đồng nghiệp',
            option_note: null,
        },
    ]);
    await updateAllOptionsForQuestionName('Câu 7.2', [
        {
            option_value: 1,
            option_text: 'Hoàn toàn không đáp ứng được',
            option_note: null,
        },
        {
            option_value: 2,
            option_text: 'Ít đáp ứng được',
            option_note: null,
        },
        {
            option_value: 3,
            option_text: 'Chỉ đủ để duy trì các hoạt động vận hành cơ bản',
            option_note: null,
        },
        {
            option_value: 4,
            option_text:
                'Đủ đáp ứng các hoạt động và dự án hiện tại, nhưng cần bổ sung thêm ngân sách nếu muốn mở rộng',
            option_note: null,
        },
        {
            option_value: 5,
            option_text:
                'Hoàn toàn đáp ứng đủ và sẵn sàng cho việc mở rộng, phát triển thêm',
            option_note: null,
        },
    ]);
    await updateQuestionAndOptions(
        'Câu 7.3',
        {
            question_text:
                'Quỹ vui lòng cho biết mức độ sẵn sàng của đơn vị trong việc bổ sung ngân sách để đầu tư vào công nghệ và chuyển đổi số trong thời gian tới',
        },
        [
            {
                option_value: 1,
                option_text: 'Hoàn toàn không sẵn sàng',
            },
            {
                option_value: 2,
                option_text: 'Ít sẵn sàng ',
            },
            {
                option_value: 3,
                option_text: 'Đang cân nhắc, chưa có kế hoạch cụ thể',
            },
            {
                option_value: 4,
                option_text: 'Sẵn sàng đầu tư khi có điều kiện thuận lợi',
            },
            {
                option_value: 5,
                option_text: 'Hoàn toàn sẵn sàng, đã có kế hoạch rõ ràng',
            },
        ]
    );
    await updateAllOptionsForQuestionName('Câu 8.1', [
        {
            option_value: 1,
            option_text: '10% - 20%',
        },
        {
            option_value: 2,
            option_text: '30% - 50%',
        },
        {
            option_value: 3,
            option_text: '60% - 70%',
        },
        {
            option_value: 4,
            option_text: '80% - 90%',
        },
        {
            option_value: 5,
            option_text: '95 % - 100%',
        },
    ]);
}

// 🏃‍♂️ Chạy script
main()
    .catch(console.error)
    .finally(() => prisma.$disconnect());
