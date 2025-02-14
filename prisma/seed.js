const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    // Dữ liệu cho credit_funds
    const creditFundsData = [
        { name: 'Credit Fund A', identity_code: 'CF-A001' },
        { name: 'Credit Fund B', identity_code: 'CF-B002' },
        { name: 'Credit Fund C', identity_code: 'CF-C003' },
    ];

    // Thêm dữ liệu vào bảng credit_funds
    for (const creditFund of creditFundsData) {
        await prisma.credit_funds.create({
            data: creditFund,
        });
    }

    // Dữ liệu cho surveys
    const surveysData = [
        {
            survey_title: 'NHÂN LỰC VÀ NĂNG LỰC NHẬN THỨC CHUYỂN ĐỔI SỐ',
            survey_description:
                'Đánh giá nhận thức, kỹ năng, mức độ sẵn sàng của nhân sự và lãnh đạo QTDND đối với chuyển đổi số (CĐS)',
            show_questions_number: 'onPage',
            credit_fund_id: 1,
        },
        {
            survey_title:
                'HIỆN TRẠNG QUY TRÌNH NGHIỆP VỤ VÀ MÔ HÌNH QUẢN TRỊ SỐ',
            survey_description:
                'Đánh giá mức độ số hóa và tự động hóa trong các quy trình nghiệp vụ cốt lõi tại QTDND',
            show_questions_number: 'onPage',
            credit_fund_id: 2,
        },
        {
            survey_title: 'CƠ SỞ HẠ TẦNG CNTT VÀ MỨC ĐỘ ỨNG DỤNG CÔNG NGHỆ',
            survey_description:
                'Đánh giá mức độ hiện đại hóa hạ tầng công nghệ thông tin tại các Quỹ Tín Dụng Nhân Dân (QTDND), đảm bảo khả năng triển khai chuyển đổi số (CĐS) trong hệ thống tài chính vi mô',
            show_questions_number: 'onPage',
            credit_fund_id: 3,
        },
        {
            survey_title: 'AN NINH THÔNG TIN & QUẢN TRỊ RỦI RO CÔNG NGHỆ',
            survey_description:
                'Đánh giá mức độ an toàn thông tin và khả năng ứng phó với rủi ro công nghệ tại QTDND',
            show_questions_number: 'onPage',
            credit_fund_id: 3,
        },
        {
            survey_title: 'QUẢN LÝ & KHAI THÁC DỮ LIỆU SỐ',
            survey_description:
                'Đánh giá khả năng lưu trữ, phân tích và khai thác dữ liệu số nhằm nâng cao hiệu quả hoạt động tại QTDND',
            show_questions_number: 'onPage',
            credit_fund_id: 3,
        },
        {
            survey_title: 'PHÁT TRIỂN SẢN PHẨM & DỊCH VỤ NGÂN HÀNG SỐ',
            survey_description:
                'Đánh giá khả năng triển khai và phát triển các dịch vụ tài chính số tại QTDND nhằm nâng cao trải nghiệm khách hàng và năng lực cạnh tranh',
            show_questions_number: 'onPage',
            credit_fund_id: 3,
        },
        {
            survey_title: 'NGUỒN LỰC TÀI CHÍNH & KHẢ NĂNG HỢP TÁC',
            survey_description:
                'Đánh giá mức độ sẵn sàng đầu tư vào công nghệ và khả năng hợp tác tài chính của QTDND trong quá trình thực hiện chuyển đổi số',
            show_questions_number: 'onPage',
            credit_fund_id: 3,
        },
        {
            survey_title: 'LỘ TRÌNH CHUYỂN ĐỔI SỐ ĐỒNG BỘ & THỐNG NHẤT',
            survey_description:
                'Đánh giá tổng thể mức độ sẵn sàng của QTDND đối với quá trình chuyển đổi số',
            show_questions_number: 'onPage',
            credit_fund_id: 3,
        },
    ];

    // Thêm dữ liệu vào bảng surveys
    for (const survey of surveysData) {
        await prisma.surveys.create({
            data: survey,
        });
    }

    // Dữ liệu cho respondents
    const respondentsData = [
        { name: 'John Doe', email: 'john.doe@example.com', credit_fund_id: 1 },
        {
            name: 'Jane Smith',
            email: 'jane.smith@example.com',
            credit_fund_id: 2,
        },
        {
            name: 'Alice Johnson',
            email: 'alice.johnson@example.com',
            credit_fund_id: 3,
        },
    ];

    // Thêm dữ liệu vào bảng respondents
    for (const respondent of respondentsData) {
        await prisma.respondents.create({
            data: respondent,
        });
    }
    // Dữ liệu cho questions
    const questionsData = [
        {
            question_text:
                'Anh/Chị đánh giá mức độ nhận thức về tầm quan trọng của chuyển đổi số tại QTDND như thế nào?',
            question_name: 'Câu 1',
            question_type: 'radiogroup',
            question_options: [
                {
                    option_text: 'Rất thấp',
                    option_note: 'Chưa có nhận thức về CĐS',
                },
                {
                    option_text: 'Thấp',
                    option_note: 'Nhận thức sơ bộ, chưa hiểu rõ lợi ích',
                },
                {
                    option_text: 'Trung bình',
                    option_note: 'Hiểu một phần nhưng chưa áp dụng',
                },
                {
                    option_text: 'Cao',
                    option_note: 'Nhận thức tốt, đã có ứng dụng',
                },
                {
                    option_text: 'Rất cao',
                    option_note: 'Hiểu sâu sắc, đang tích cực triển khai',
                },
            ],
        },
        {
            question_text:
                'Mức độ thành thạo của Anh/Chị trong việc sử dụng phần mềm nghiệp vụ (ngân hàng, quản lý dữ liệu và bảo mật thông tin) như thế nào?',
            question_name: 'Câu 2',
            question_type: 'radiogroup',
            question_options: [
                { option_text: 'Hoàn toàn không thể sử dụng' },
                { option_text: 'Có thể sử dụng nhưng cần hỗ trợ nhiều' },
                { option_text: 'Có thể sử dụng ở mức cơ bản' },
                { option_text: 'Sử dụng tốt và có thể làm việc độc lập' },
                { option_text: 'Thành thạo và có thể hướng dẫn người khác' },
            ],
        },
        {
            question_text:
                'Anh/Chị có sẵn sàng tham gia các chương trình đào tạo nâng cao kỹ năng CNTT trong thời gian tới không?',
            question_name: 'Câu 3',
            question_type: 'radiogroup',
            question_options: [
                { option_text: 'Hoàn toàn không sẵn sàng' },
                { option_text: 'Không sẵn sàng' },
                { option_text: 'Phân vân/Chưa quyết định' },
                { option_text: 'Sẵn sàng' },
                { option_text: 'Hoàn toàn sẵn sàng' },
            ],
        },
        {
            question_text:
                'Bộ phận nào hiện đang phụ trách các công việc liên quan đến CNTT tại đơn vị? ',
            question_name: 'Câu 4',
            question_note: 'Chọn nhiều đáp án nếu cần',
            question_type: 'checkbox',
            question_options: [
                { option_text: 'Không có nhân sự phụ trách' },
                { option_text: 'Nhân viên kiêm nhiệm CNTT' },
                { option_text: 'Nhân sự chuyên trách CNTT' },
                { option_text: 'Hợp tác với đối tác bên ngoài' },
                { option_text: 'Khác ...' },
            ],
        },
        {
            question_text:
                'Lãnh đạo tại đơn vị có chủ động thúc đẩy chuyển đổi số không?',
            question_name: 'Câu 5',
            question_type: 'radiogroup',
            question_options: [
                {
                    option_text: 'Hoàn toàn không',
                    option_note: 'Không quan tâm',
                },
                {
                    option_text: 'Ít quan tâm ',
                    option_note: 'Có nhận thức nhưng chưa hành động',
                },
                {
                    option_text: 'Quan tâm vừa phải',
                    option_note: 'Có kế hoạch nhưng chưa triển khai',
                },
                {
                    option_text: 'Chủ động',
                    option_note: 'Có kế hoạch rõ ràng',
                },
                {
                    option_text: 'Rất chủ động ',
                    option_note: 'Đã triển khai mạnh mẽ',
                },
            ],
        },
        {
            question_text:
                'Hiện tại, đơn vị đã triển khai chương trình đào tạo về CNTT và chuyển đổi số như thế nào? ',
            question_name: 'Câu 6',
            question_type: 'radiogroup',
            question_options: [
                { option_text: 'Chưa có chương trình nào' },
                { option_text: 'Đã triển khai sơ bộ' },
                { option_text: 'Đang triển khai' },
                { option_text: 'Đã triển khai nhưng chưa hiệu quả' },
                { option_text: 'Đã triển khai đầy đủ và hiệu quả' },
            ],
        },
        {
            question_text:
                'Anh/Chị đánh giá mức độ hỗ trợ từ NHNN/Co-opBank trong đào tạo nhân lực CNTT tại đơn vị như thế nào? ',
            question_name: 'Câu 7',
            question_type: 'radiogroup',
            question_options: [
                { option_text: 'Không hỗ trợ' },
                { option_text: 'Hỗ trợ hạn chế' },
                { option_text: 'Hỗ trợ trung bình' },
                { option_text: 'Hỗ trợ tốt' },
                { option_text: 'Hỗ trợ rất tốt' },
            ],
        },
        {
            question_text:
                'Đơn vị có gặp khó khăn trong việc tuyển dụng nhân sự CNTT chuyên trách không?',
            question_name: 'Câu 8',
            question_type: 'radiogroup',
            question_options: [
                {
                    option_text: 'Rất khó khăn',
                    option_note: 'Không thể tuyển',
                },
                {
                    option_text: 'Khó khăn',
                    option_note: 'Tuyển dụng ít, thiếu ứng viên phù hợp',
                },
                {
                    option_text: 'Trung bình',
                    option_note:
                        'Có thể tuyển nhưng không đủ số lượng/chất lượng',
                },
                {
                    option_text: 'Dễ dàng',
                    option_note: 'Tuyển đủ số lượng nhưng cần đào tạo thêm',
                },
                {
                    option_text: 'Rất dễ dàng',
                    option_note: 'Có thể tuyển ngay nhân sự đáp ứng yêu cầu',
                },
            ],
        },
        {
            question_text:
                'Anh/Chị đánh giá mức độ thành thạo của nhân sự tại đơn vị trong việc sử dụng phần mềm ngân hàng lõi và các công cụ liên quan như thế nào? ',
            question_name: 'Câu 9',
            question_type: 'radiogroup',
            question_options: [
                { option_text: 'Rất kém', option_note: 'Không sử dụng được' },
                {
                    option_text: 'Kém',
                    option_note: 'Sử dụng được nhưng cần nhiều hỗ trợ',
                },
                {
                    option_text: 'Khá',
                    option_note: 'Sử dụng cơ bản, cần hỗ trợ một số chức năng',
                },
                {
                    option_text: 'Tốt',
                    option_note: 'Sử dụng tốt, ít cần hỗ trợ',
                },
                {
                    option_text: 'Rất tốt',
                    option_note: 'Thành thạo, có thể hướng dẫn người khác',
                },
            ],
        },
        {
            question_text:
                'Mức độ hiệu quả của các chương trình nâng cao nhận thức về chuyển đổi số tại đơn vị Anh/Chị như thế nào? ',
            question_name: 'Câu 10',
            question_type: 'radiogroup',
            question_options: [
                {
                    option_text: 'Rất kém',
                    option_note: 'Chưa có chương trình nào',
                },
                {
                    option_text: 'Kém',
                    option_note: 'Có chương trình nhưng chưa hiệu quả',
                },
                {
                    option_text: 'Khá',
                    option_note: 'Có chương trình, hiệu quả chưa cao',
                },
                {
                    option_text: 'Tốt',
                    option_note: 'Có chương trình, hiệu quả tốt',
                },
                {
                    option_text: 'Rất tốt',
                    option_note: 'Chương trình hiệu quả, tạo tác động tích cực',
                },
            ],
        },
        {
            question_text:
                'Anh/Chị đánh giá mức độ hỗ trợ từ NHNN, Co-opBank, các đơn vị đào tạo trong việc nâng cao nhận thức về chuyển đổi số tại đơn vị như thế nào? ',
            question_name: 'Câu 11',
            question_type: 'radiogroup',
            question_options: [
                { option_text: 'Không hỗ trợ' },
                { option_text: 'Hỗ trợ hạn chế' },
                { option_text: 'Hỗ trợ trung bình' },
                { option_text: 'Hỗ trợ tốt' },
                { option_text: 'Hỗ trợ rất tốt' },
            ],
        },
        {
            question_text:
                'Hiện tại, đơn vị đã triển khai chương trình đào tạo nội bộ về chuyển đổi số như thế nào? ',
            question_name: 'Câu 12',
            question_type: 'radiogroup',
            question_options: [
                { option_text: 'Không có kế hoạch nào' },
                { option_text: 'Có kế hoạch sơ bộ nhưng chưa thực hiện' },
                { option_text: 'Đã có kế hoạch nhưng chưa hoàn chỉnh' },
                { option_text: 'Kế hoạch hoàn chỉnh, đang triển khai' },
                { option_text: 'Đã triển khai đầy đủ & có đánh giá hiệu quả' },
            ],
        },
        {
            question_text:
                'Anh/Chị đánh giá mức độ sẵn sàng của đội ngũ lãnh đạo trong việc tiếp cận và ứng dụng công nghệ số như thế nào? ',
            question_name: 'Câu 13',
            question_type: 'radiogroup',
            question_options: [
                {
                    option_text: 'Hoàn toàn không sẵn sàng',
                    option_note: 'Không quan tâm',
                },
                {
                    option_text: 'Không sẵn sàng',
                    option_note: 'Quan tâm nhưng chưa có hành động',
                },
                {
                    option_text: 'Khá sẵn sàng',
                    option_note: 'Có nhận thức nhưng cần thêm hỗ trợ',
                },
                {
                    option_text: 'Sẵn sàng',
                    option_note: 'Đã có hành động ban đầu',
                },
                {
                    option_text: 'Hoàn toàn sẵn sàng',
                    option_note: 'Đang tích cực triển khai & mở rộng',
                },
            ],
        },
        {
            question_text:
                'Đơn vị đã chuẩn bị ở mức độ nào để chuyển đổi sang mô hình ngân hàng số?',
            question_name: 'Câu 1',
            question_type: 'radiogroup',
            question_options: [
                { option_text: 'Chưa chuẩn bị gì' },
                { option_text: 'Mới bắt đầu tìm hiểu' },
                { option_text: 'Đã có kế hoạch sơ bộ' },
                { option_text: 'Đang triển khai một phần' },
                { option_text: 'Đã có kế hoạch hoàn chỉnh và đang thực hiện' },
            ],
        },
        {
            question_text:
                'Mức độ số hóa quy trình tín dụng tại đơn vị hiện nay ra sao?',
            question_name: 'Câu 2',
            question_type: 'radiogroup',
            question_options: [
                { option_text: 'Hoàn toàn thủ công' },
                {
                    option_text: 'Số hóa một phần',
                    option_note: 'chỉ nhập liệu cơ bản',
                },
                {
                    option_text:
                        'Số hóa phần lớn nhưng còn phụ thuộc vào giấy tờ',
                },
                { option_text: 'Hầu hết quy trình đã số hóa' },
                {
                    option_text:
                        'Hoàn toàn số hóa, có tích hợp hệ thống tự động',
                },
            ],
        },
        {
            question_text:
                'Mức độ số hóa quy trình kế toán tại đơn vị hiện nay như thế nào?',
            question_name: 'Câu 3',
            question_type: 'radiogroup',
            question_options: [
                { option_text: 'Hoàn toàn thủ công' },
                {
                    option_text: 'Số hóa một phần',
                    option_note: 'chỉ nhập liệu cơ bản',
                },
                {
                    option_text:
                        'Số hóa phần lớn nhưng chưa tích hợp hệ thống ',
                },
                { option_text: 'Hầu hết quy trình đã số hóa' },
                {
                    option_text:
                        'Hoàn toàn số hóa, có tích hợp phần mềm kế toán',
                },
            ],
        },
        {
            question_text:
                'Mức độ tích hợp công nghệ vào quy trình quản trị nội bộ tại đơn vị như thế nào?',
            question_name: 'Câu 4',
            question_type: 'radiogroup',
            question_options: [
                { option_text: 'Hoàn toàn chưa tích hợp' },
                {
                    option_text: 'Chỉ áp dụng một số công cụ cơ bản',
                    option_note: 'Excel, Word',
                },
                { option_text: 'Tích hợp công nghệ nhưng chưa đồng bộ' },
                { option_text: 'Hầu hết các quy trình đã số hóa' },
                {
                    option_text:
                        'Hoàn toàn số hóa và có hệ thống quản trị tập trung',
                },
            ],
        },
        {
            question_text:
                'Mức độ tích hợp công nghệ vào các dịch vụ khách hàng tại đơn vị ra sao?',
            question_name: 'Câu 5',
            question_type: 'radiogroup',
            question_options: [
                {
                    option_text: 'Không tích hợp',
                    option_note: 'chỉ giao dịch trực tiếp',
                },
                {
                    option_text: 'Mới có một số dịch vụ cơ bản',
                    option_note: 'tin nhắn, tổng đài',
                },
                {
                    option_text:
                        'Tích hợp các kênh online nhưng chưa hoàn chỉnh ',
                },
                {
                    option_text:
                        'Đã có ứng dụng hoặc cổng giao dịch trực tuyến ',
                },
                {
                    option_text:
                        'Hoàn toàn số hóa dịch vụ, có trải nghiệm khách hàng số',
                },
            ],
        },
        {
            question_text:
                'Đơn vị đang gặp những rào cản nào khi chuẩn hóa quy trình để số hóa?',
            question_name: 'Câu 6',
            question_type: 'radiogroup',
            question_options: [
                { option_text: 'Thiếu tài chính' },
                { option_text: 'Thiếu nhân lực chuyên môn' },
                { option_text: 'Thiếu hạ tầng công nghệ' },
                { option_text: 'Chưa có kế hoạch rõ ràng' },
                { option_text: 'Các rào cản khác', option_note: 'Ghi cụ thể' },
            ],
        },
        {
            question_text:
                'Đơn vị có kế hoạch gì để khắc phục các rào cản trong số hóa quy trình?',
            question_name: 'Câu 7',
            question_type: 'radiogroup',
            question_options: [
                { option_text: 'Chưa có kế hoạch' },
                { option_text: 'Đang xây dựng kế hoạch' },
                { option_text: 'Có kế hoạch nhưng chưa thực hiện' },
                { option_text: 'Đã triển khai một phần' },
                { option_text: 'Đã có kế hoạch hoàn chỉnh và đang thực hiện' },
            ],
        },
        {
            question_text:
                'Mức độ số hóa quy trình quản trị nội bộ tại đơn vị hiện nay như thế nào?',
            question_name: 'Câu 8',
            question_type: 'radiogroup',
            question_options: [
                { option_text: 'Hoàn toàn chưa số hóa' },
                { option_text: 'Số hóa một phần nhưng chưa đồng bộ' },
                {
                    option_text:
                        'Đã áp dụng công nghệ vào một số quy trình chính',
                },
                { option_text: 'Hầu hết quy trình đã số hóa' },
                {
                    option_text:
                        'Hoàn toàn số hóa và tích hợp hệ thống quản trị tập trung',
                },
            ],
        },
        {
            question_text:
                'Đơn vị đã có sự chuẩn bị như thế nào để thích nghi với mô hình ngân hàng số?',
            question_name: 'Câu 9',
            question_type: 'radiogroup',
            question_options: [
                { option_text: 'Chưa có sự chuẩn bị' },
                { option_text: 'Đang tìm hiểu mô hình' },
                {
                    option_text:
                        'Đã có kế hoạch triển khai nhưng chưa thực hiện',
                },
                { option_text: 'Đã thực hiện một số hạng mục' },
                { option_text: 'Đã hoàn thiện mô hình chuyển đổi số' },
            ],
        },
        {
            question_text:
                'Đơn vị có kế hoạch tự động hóa các quy trình nghiệp vụ như thế nào?',
            question_name: 'Câu 10',
            question_type: 'radiogroup',
            question_options: [
                { option_text: 'Không có kế hoạch' },
                { option_text: 'Có kế hoạch sơ bộ' },
                { option_text: 'Đang triển khai từng phần' },
                { option_text: 'Đã triển khai nhưng chưa hoàn thiện' },
                { option_text: 'Đã hoàn thiện và đang tối ưu' },
            ],
        },
        {
            question_text:
                'Mức độ tuân thủ tiêu chuẩn ngành ngân hàng và tiêu chuẩn quốc tế của các quy trình tại đơn vị như thế nào?',
            question_name: 'Câu 11',
            question_type: 'radiogroup',
            question_options: [
                { option_text: 'Hoàn toàn không phù hợp' },
                { option_text: 'Không phù hợp' },
                { option_text: 'Phù hợp một phần' },
                { option_text: 'Phù hợp' },
                { option_text: 'Hoàn toàn phù hợp' },
            ],
        },
        {
            question_text: 'adkj',
            question_name: 'Câu',
            question_note: 'Chọn',
            question_type: 'radiogroup',
            question_options: [
                { option_text: 'ádasdasádasdas' },
                { option_text: 'sddsdssddsds' },
                { option_text: 'sdsdsd' },
                { option_text: 'sdasdasdsdasdasd' },
                { option_text: 'Kádasdaádasda' },
            ],
        },
    ];

    for (const question of questionsData) {
        const createdQuestion = await prisma.questions.create({
            data: {
                question_name: question.question_name,
                question_text: question.question_text,
                question_note: question.question_note,
                question_type: question.question_type,
            },
        });

        if (question.question_options && question.question_options.length > 0) {
            const optionsData = question.question_options.map((option) => ({
                option_text: option.option_text,
                option_note: option.option_note ?? null, // Thêm dòng này
                question_id: createdQuestion.id,
            }));

            // Tạo tất cả question_options liên quan đến câu hỏi trong 1 lần
            await prisma.question_options.createMany({
                data: optionsData,
            });
        }
    }

    const totalQuestions = 24; // Tổng số câu hỏi
    const surveyData = [
        { surveyId: 1, numQuestions: 13 },
        { surveyId: 2, numQuestions: 11 },
    ];

    let currentQuestion = 1;
    const questionSurveyData = [];

    for (const survey of surveyData) {
        for (let i = 0; i < survey.numQuestions; i++) {
            if (currentQuestion > totalQuestions) break; // Dừng nếu vượt quá số câu hỏi

            questionSurveyData.push({
                survey_id: survey.surveyId,
                question_id: currentQuestion,
            });

            currentQuestion++;
        }
    }

    // Chèn dữ liệu vào database
    await prisma.question_survey.createMany({
        data: questionSurveyData,
    });

    console.log('Seeding completed!');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
