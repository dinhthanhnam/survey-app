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
            question_name: 'Câu 1.1',
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
            question_name: 'Câu 1.2',
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
            question_name: 'Câu 1.3',
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
            question_name: 'Câu 1.4',
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
            question_name: 'Câu 1.5',
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
            question_name: 'Câu 1.6',
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
            question_name: 'Câu 1.7',
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
            question_name: 'Câu 1.8',
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
            question_name: 'Câu 1.9',
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
            question_name: 'Câu 1.10',
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
            question_name: 'Câu 1.11',
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
            question_name: 'Câu 1.12',
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
            question_name: 'Câu 1.13',
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
            question_name: 'Câu 2.1',
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
            question_name: 'Câu 2.2',
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
            question_name: 'Câu 2.3',
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
            question_name: 'Câu 2.4',
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
            question_name: 'Câu 2.5',
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
            question_name: 'Câu 2.6',
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
            question_name: 'Câu 2.7',
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
            question_name: 'Câu 2.8',
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
            question_name: 'Câu 2.9',
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
            question_name: 'Câu 2.10',
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
            question_name: 'Câu 2.11',
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
            question_text:
                'Đơn vị đã trang bị đầy đủ máy tính và thiết bị CNTT cần thiết chưa?',
            question_name: 'Câu 3.1',
            question_type: 'radiogroup',
            question_options: [
                { option_text: 'Hoàn toàn chưa có' },
                { option_text: 'Trang bị một phần' },
                { option_text: 'Trang bị gần đầy đủ' },
                { option_text: 'Trang bị đầy đủ' },
                { option_text: 'Trang bị đầy đủ và sử dụng hiệu quả' },
            ],
        },
        {
            question_text:
                'Mức độ ổn định và tốc độ của mạng nội bộ và internet tại đơn vị là như thế nào?',
            question_name: 'Câu 3.2',
            question_type: 'radiogroup',
            question_options: [
                {
                    option_text: 'Rất kém',
                    option_note: 'thường xuyên mất kết nối',
                },
                { option_text: 'Kém', option_note: 'mạng chậm, không ổn định' },
                {
                    option_text: 'Trung bình',
                    option_note: 'đáp ứng nhu cầu cơ bản',
                },
                {
                    option_text: 'Tốt',
                    option_note: 'ổn định, ít gián đoạn',
                },
                {
                    option_text: 'Rất tốt',
                    option_note: 'tốc độ cao, ổn định liên tục',
                },
            ],
        },
        {
            question_text:
                'Đơn vị có kế hoạch nâng cấp cơ sở hạ tầng CNTT trong thời gian tới không?',
            question_name: 'Câu 3.3',
            question_type: 'radiogroup',
            question_options: [
                { option_text: 'Chưa có kế hoạch' },
                { option_text: 'Có kế hoạch sơ bộ' },
                { option_text: 'Đang hoàn thiện kế hoạch' },
                { option_text: 'Kế hoạch đầy đủ' },
                { option_text: 'Kế hoạch đầy đủ sẵn sàng triển khai' },
            ],
        },
        {
            question_text:
                'Nguồn tài chính dành cho việc nâng cấp cơ sở hạ tầng CNTT có đủ không?',
            question_name: 'Câu 3.4',
            question_type: 'radiogroup',
            question_options: [
                { option_text: 'Hoàn toàn không đủ' },
                { option_text: 'Không đủ' },
                { option_text: 'Trung bình' },
                { option_text: 'Đủ' },
                { option_text: 'Hoàn toàn đủ' },
            ],
        },
        {
            question_text:
                'Đơn vị đã tích hợp hoặc có kế hoạch tích hợp điện toán đám mây vào hệ thống hiện tại chưa?',
            question_name: 'Câu 3.5',
            question_type: 'radiogroup',
            question_options: [
                { option_text: 'Chưa tích hợp' },
                { option_text: 'Đã tích hợp một phần' },
                { option_text: 'Tích hợp gần hoàn chỉnh' },
                { option_text: 'Tích hợp đầy đủ' },
            ],
        },
        {
            question_text:
                'Mức độ sử dụng các công nghệ AI hỗ trợ trong các quy trình tại đơn vị là như thế nào?',
            question_name: 'Câu 3.6',
            question_type: 'radiogroup',
            question_options: [
                { option_text: 'Không sử dụng' },
                { option_text: 'Sử dụng thử nghiệm' },
                { option_text: 'Sử dụng một phần' },
                { option_text: 'Sử dụng gần hoàn chỉnh' },
                { option_text: 'Sử dụng hoàn chỉnh và có hiệu quả cao' },
            ],
        },
        {
            question_text:
                'Core banking đã được triển khai và vận hành hiệu quả chưa?',
            question_name: 'Câu 3.7',
            question_type: 'radiogroup',
            question_options: [
                { option_text: 'Chưa triển khai' },
                { option_text: 'Đã triển khai nhưng hiệu quả thấp' },
                { option_text: 'Hiệu quả trung bình' },
                { option_text: 'Hiệu quả cao nhưng chưa tối ưu' },
                { option_text: 'Hiệu quả rất cao và đã tối ưu' },
            ],
        },
        {
            question_text: 'Mức độ ứng dụng e-banking tại đơn vị như thế nào?',
            question_name: 'Câu 3.8',
            question_type: 'radiogroup',
            question_options: [
                { option_text: 'Không sử dụng' },
                { option_text: 'Sử dụng thử nghiệm' },
                { option_text: 'Sử dụng nhưng còn hạn chế' },
                { option_text: 'Sử dụng tốt' },
                { option_text: 'Sử dụng rất hiệu quả' },
            ],
        },
        {
            question_text:
                'Đơn vị có tích hợp các phần mềm nghiệp vụ với hệ thống CNTT tổng thể chưa?',
            question_name: 'Câu 3.9',
            question_type: 'radiogroup',
            question_options: [
                { option_text: 'Chưa tích hợp' },
                { option_text: 'Đã tích hợp một phần' },
                { option_text: 'Tích hợp gần hoàn chỉnh ' },
                { option_text: 'Tích hợp hoàn chỉnh' },
                { option_text: 'Tích hợp hoàn chỉnh vẳ dụng hiệu quả' },
            ],
        },
        {
            question_text:
                'Mức độ sẵn sàng của nhân sự trong việc vận hành công nghệ mới như AI, điện toán đám mây tại đơn vị?',
            question_name: 'Câu 3.10',
            question_type: 'radiogroup',
            question_options: [
                { option_text: 'Hoàn toàn không sẵn sàng' },
                { option_text: 'Không sẵn sàng' },
                { option_text: 'Sẵn sàng nhưng cần đào tạo thêm' },
                { option_text: 'Sẵn sàng và có thể ứng dụng ngay' },
                {
                    option_text:
                        'Hoàn toàn sẵn sàng và có thể hướng dẫn người khác',
                },
            ],
        },
        {
            question_text:
                'Hiệu quả của các hệ thống CNTT đã triển khai trong việc hỗ trợ quản lý và vận hành tại đơn vị như thế nào?',
            question_name: 'Câu 3.11',
            question_type: 'radiogroup',
            question_options: [
                { option_text: 'Không hiệu quả ' },
                { option_text: 'Hiệu quả thấp' },
                { option_text: 'Hiệu quả trung bình' },
                { option_text: 'Hiệu quả tốt' },
                { option_text: 'Rất hiệu quả' },
            ],
        },
        {
            question_text:
                'Đơn vị có kế hoạch triển khai hoặc mở rộng ứng dụng AI, Blockchain vào quản lý hoạt động không?',
            question_name: 'Câu 3.12',
            question_type: 'radiogroup',
            question_options: [
                { option_text: 'Chưa có kế hoạch' },
                { option_text: 'Đang xây dựng kế hoạch sơ bộ' },
                { option_text: 'Đã có kế hoạch gần hoàn chỉnh' },
                { option_text: 'Kế hoạch hoàn chỉnh ' },
                { option_text: 'Đã bắt đầu triển khai' },
            ],
        },
        {
            question_text:
                'Mức độ tích hợp hệ thống CNTT của đơn vị với các nền tảng của NHNN & NHHTX như thế nào?',
            question_name: 'Câu 3.13',
            question_type: 'radiogroup',
            question_options: [
                { option_text: 'Hoàn toàn không tích hợp' },
                { option_text: 'Tích hợp một phần nhỏ ' },
                { option_text: 'Tích hợp các quy trình chính' },
                { option_text: 'Tích hợp hầu hết các quy trình' },
                { option_text: 'Tích hợp đầy đủ' },
            ],
        },
        {
            question_text:
                'Mức độ an toàn của hệ thống CNTT tại đơn vị trong việc bảo vệ dữ liệu khách hàng và giao dịch như thế nào?',
            question_name: 'Câu 4.1',
            question_type: 'radiogroup',
            question_options: [
                { option_text: 'Hoàn toàn không an toàn' },
                { option_text: 'Không an toàn' },
                { option_text: 'Tương đối an toàn' },
                { option_text: 'An toàn' },
                { option_text: 'Rất an toàn' },
            ],
        },
        {
            question_text:
                'Nhân viên tại đơn vị có nhận thức đầy đủ về rủi ro an ninh mạng và bảo mật dữ liệu không?',
            question_name: 'Câu 4.2',
            question_type: 'radiogroup',
            question_options: [
                { option_text: 'Hoàn toàn không nhận thức' },
                { option_text: 'Nhận thức hạn chế' },
                { option_text: 'Nhận thức tương đối' },
                { option_text: 'Nhận thức tốt' },
                { option_text: 'Nhận thức rất tốt' },
            ],
        },
        {
            question_text:
                'Đơn vị đã có kế hoạch ứng phó rõ ràng khi xảy ra sự cố an ninh mạng chưa?',
            question_name: 'Câu 4.3',
            question_type: 'radiogroup',
            question_options: [
                { option_text: 'Chưa có kế hoạch' },
                { option_text: 'Có kế hoạch sơ bộ' },
                { option_text: 'Kế hoạch gần hoàn chỉnh' },
                { option_text: 'Kế hoạch đầy đủ' },
                { option_text: 'Kế hoạch hoàn chỉnh và đã thử nghiệm' },
            ],
        },
        {
            question_text:
                'Đơn vị đã thực hiện diễn tập các kịch bản ứng phó với sự cố an ninh mạng chưa?',
            question_name: 'Câu 4.4',
            question_type: 'radiogroup',
            question_options: [
                { option_text: 'Chưa thực hiện' },
                { option_text: 'Đã thực hiện sơ bộ' },
                { option_text: 'Đã thực hiện một phần' },
                { option_text: 'Đã thực hiện đầy đủ' },
                { option_text: 'Đã thực hiện thường xuyên' },
            ],
        },
        {
            question_text:
                'Đơn vị đã trang bị các công cụ giám sát an ninh mạng đầy đủ chưa?',
            question_name: 'Câu 4.5',
            question_type: 'radiogroup',
            question_options: [
                { option_text: 'Chưa có công cụ ' },
                { option_text: 'Có công cụ nhưng chưa đủ' },
                { option_text: 'Có công cụ nhưng chưa tối ưu' },
                { option_text: 'Đã trang bị đầy đủ' },
                { option_text: 'Đã trang bị và đang cải tiến liên tục' },
            ],
        },
        {
            question_text:
                'Các công cụ giám sát an ninh mạng tại đơn vị có hoạt động hiệu quả không?',
            question_name: 'Câu 4.6',
            question_type: 'radiogroup',
            question_options: [
                { option_text: 'Không hiệu quả' },
                { option_text: 'Hiệu quả thấp' },
                { option_text: 'Hiệu quả trung bình' },
                { option_text: 'Hiệu quả tốt' },
                { option_text: 'Rất hiệu quả' },
            ],
        },
        {
            question_text:
                'Đơn vị có chính sách bảo mật dữ liệu rõ ràng và được tuân thủ không?',
            question_name: 'Câu 4.7',
            question_type: 'radiogroup',
            question_options: [
                { option_text: 'Không có chính sách ' },
                { option_text: 'Có chính sách nhưng chưa áp dụng' },
                { option_text: 'Có chính sách nhưng tuân thủ chưa đầy đủ' },
                { option_text: 'Chính sách bảo mật được tuân thủ tốt' },
                { option_text: 'Chính sách bảo mật được tuân thủ rất tốt' },
            ],
        },
        {
            question_text:
                'Đơn vị có tổ chức đào tạo định kỳ về nhận thức an ninh mạng cho nhân viên không?',
            question_name: 'Câu 4.8',
            question_type: 'radiogroup',
            question_options: [
                { option_text: 'Không đào tạo' },
                { option_text: 'Đào tạo không thường xuyên' },
                { option_text: 'Đào tạo một phần' },
                { option_text: 'Đào tạo đầy đủ' },
                { option_text: 'Đào tạo thường xuyên và có kiểm tra đánh giá' },
            ],
        },
        {
            question_text:
                'Đơn vị có nhận được sự hỗ trợ từ các tổ chức bên ngoài trong việc đảm bảo an ninh mạng không?',
            question_name: 'Câu 4.9',
            question_type: 'radiogroup',
            question_options: [
                { option_text: 'Không có hỗ trợ' },
                { option_text: 'Hỗ trợ hạn chế ' },
                { option_text: 'Hỗ trợ trung bình' },
                { option_text: 'Hỗ trợ tốt ' },
                { option_text: 'Hỗ trợ rất tốt' },
            ],
        },
        {
            question_text:
                'Đơn vị có tổ chức đào tạo định kỳ về nhận thức an ninh mạng và phòng chống rủi ro công nghệ không?',
            question_name: 'Câu 4.10',
            question_type: 'radiogroup',
            question_options: [
                { option_text: 'Không có chương trình đào tạo' },
                { option_text: 'Đào tạo không thường xuyên' },
                { option_text: 'Đào tạo một phần' },
                { option_text: 'Đào tạo đầy đủ ' },
                { option_text: 'Đào tạo thường xuyên và có đánh giá hiệu quả' },
            ],
        },
        {
            question_text:
                'Mức độ tuân thủ các tiêu chuẩn bảo mật theo quy định của NHNN và ngành ngân hàng tại đơn vị như thế nào?',
            question_name: 'Câu 4.11',
            question_type: 'radiogroup',
            question_options: [
                { option_text: 'Hoàn toàn không tuân thủ' },
                { option_text: 'Tuân thủ hạn chế' },
                { option_text: 'Tuân thủ ở mức cơ bản' },
                { option_text: 'Tuân thủ tốt ' },
                { option_text: 'Hoàn toàn tuân thủ' },
            ],
        },
        {
            question_text:
                'Mức độ số hóa dữ liệu tại đơn vị hiện nay như thế nào?',
            question_name: 'Câu 5.1',
            question_type: 'radiogroup',
            question_options: [
                { option_text: 'Không số hóa' },
                { option_text: 'Số hóa một phần' },
                { option_text: 'Số hóa gần hoàn chỉnh' },
                { option_text: 'Số hóa hoàn chỉnh' },
                { option_text: 'Số hóa hoàn chỉnh và tối ưu' },
            ],
        },
        {
            question_text:
                'Hệ thống lưu trữ dữ liệu tại đơn vị có đảm bảo an toàn và đầy đủ không?',
            question_name: 'Câu 5.2',
            question_type: 'radiogroup',
            question_options: [
                { option_text: 'Hoàn toàn không đảm bảo' },
                { option_text: 'Không đảm bảo' },
                { option_text: 'Đảm bảo một phần' },
                { option_text: 'Đảm bảo tốt' },
                { option_text: 'Hoàn toàn đảm bảo và có cơ chế bảo mật cao' },
            ],
        },
        {
            question_text:
                'Đơn vị có sử dụng công cụ phân tích dữ liệu để hỗ trợ ra quyết định kinh doanh không?',
            question_name: 'Câu 5.3',
            question_type: 'radiogroup',
            question_options: [
                { option_text: 'Không sử dụng' },
                { option_text: 'Sử dụng thử nghiệm' },
                { option_text: 'Sử dụng một phần' },
                { option_text: 'Sử dụng gần hoàn chỉnh' },
                { option_text: 'Sử dụng hoàn chỉnh và mang lại hiệu quả' },
            ],
        },
        {
            question_text:
                'Công cụ phân tích dữ liệu hiện tại có giúp cải thiện hiệu quả quản lý tại đơn vị không?',
            question_name: 'Câu 5.4',
            question_type: 'radiogroup',
            question_options: [
                { option_text: 'Hoàn toàn không hiệu quả' },
                { option_text: 'Không hiệu quả' },
                { option_text: 'Trung bình ' },
                { option_text: 'Hiệu quả ' },
                { option_text: 'Hiệu quả rất cao' },
            ],
        },
        {
            question_text:
                'Đơn vị đã ứng dụng các công cụ phân tích dữ liệu hiện đại như Big Data hoặc AI chưa?',
            question_name: 'Câu 5.5',
            question_type: 'radiogroup',
            question_options: [
                { option_text: 'Chưa ứng dụng' },
                { option_text: 'Đã ứng dụng thử nghiệm' },
                { option_text: 'Ứng dụng một phần' },
                { option_text: 'Ứng dụng gần hoàn chỉnh' },
                { option_text: 'Ứng dụng hoàn chỉnh và mang lại hiệu quả cao' },
            ],
        },
        {
            question_text:
                'Hiệu quả của các công cụ phân tích dữ liệu hiện đại trong việc hỗ trợ kinh doanh tại đơn vị như thế nào?',
            question_name: 'Câu 5.6',
            question_type: 'radiogroup',
            question_options: [
                { option_text: 'Không hiệu quả' },
                { option_text: 'Hiệu quả một phần' },
                { option_text: 'Hiệu quả trung bình' },
                { option_text: 'Hiệu quả tốt' },
                { option_text: 'Hiệu quả rất tốt' },
            ],
        },
        {
            question_text:
                'Đơn vị có sử dụng dữ liệu khách hàng để cải thiện trải nghiệm không?',
            question_name: 'Câu 5.7',
            question_type: 'radiogroup',
            question_options: [
                { option_text: 'Không sử dụng' },
                { option_text: 'Sử dụng thử nghiệm' },
                { option_text: 'Sử dụng một phần' },
                { option_text: 'Sử dụng gần hoàn chỉnh' },
                { option_text: 'Sử dụng hoàn chỉnh và có tác động tích cực' },
            ],
        },
        {
            question_text:
                'Mức độ hài lòng của khách hàng với các dịch vụ cải tiến dựa trên dữ liệu tại đơn vị như thế nào?',
            question_name: 'Câu 5.8',
            question_type: 'radiogroup',
            question_options: [
                { option_text: 'Rất không hài lòng' },
                { option_text: 'Không hài lòng' },
                { option_text: 'Trung bình' },
                { option_text: 'Hài lòng' },
                { option_text: 'Rất hài lòng' },
            ],
        },
        {
            question_text:
                'Đơn vị có chiến lược cụ thể để khai thác dữ liệu khách hàng trong tương lai không?',
            question_name: 'Câu 5.9',
            question_type: 'radiogroup',
            question_options: [
                { option_text: 'Không có chiến lược' },
                { option_text: 'Có chiến lược sơ bộ' },
                { option_text: 'Chiến lược gần hoàn chỉnh' },
                { option_text: 'Chiến lược hoàn chỉnh' },
                { option_text: 'Chiến lược hoàn chỉnh và đang triển khai' },
            ],
        },
        {
            question_text:
                'Đơn vị có sử dụng dữ liệu phân tích để cải thiện hiệu suất kinh doanh không?',
            question_name: 'Câu 5.10',
            question_type: 'radiogroup',
            question_options: [
                { option_text: 'Không sử dụng' },
                { option_text: 'Có kế hoạch nhưng chưa triển khai' },
                { option_text: 'Sử dụng một phần' },
                {
                    option_text:
                        'Sử dụng thường xuyên nhưng chưa đạt hiệu quả cao',
                },
                { option_text: 'Sử dụng có hiệu quả cao' },
            ],
        },
        {
            question_text:
                'Hệ thống dữ liệu tại đơn vị có khả năng liên thông với hệ thống ngân hàng số quốc gia không?',
            question_name: 'Câu 5.11',
            question_type: 'radiogroup',
            question_options: [
                { option_text: 'Hoàn toàn không liên thông' },
                { option_text: 'Liên thông một phần nhỏ' },
                { option_text: 'Liên thông các nghiệp vụ cơ bản' },
                { option_text: 'Liên thông hầu hết các nghiệp vụ' },
                { option_text: 'Liên thông đầy đủ và hoạt động ổn định' },
            ],
        },
        {
            question_text:
                'Mức độ ứng dụng công nghệ trong phát triển sản phẩm/dịch vụ ngân hàng số tại đơn vị như thế nào?',
            question_name: 'Câu 6.1',
            question_type: 'radiogroup',
            question_options: [
                { option_text: 'Không ứng dụng' },
                { option_text: 'Ứng dụng thử nghiệm' },
                { option_text: 'Ứng dụng một phần' },
                { option_text: 'Ứng dụng gần hoàn chỉnh' },
                { option_text: 'Ứng dụng hoàn chỉnh và mang lại hiệu quả' },
            ],
        },
        {
            question_text:
                'Đơn vị đã có kế hoạch cụ thể để triển khai ngân hàng số như mobile banking, … chưa?',
            question_name: 'Câu 6.2',
            question_type: 'radiogroup',
            question_options: [
                { option_text: 'Chưa có kế hoạch' },
                { option_text: 'Mới bắt đầu nghiên cứu' },
                { option_text: 'Đã có kế hoạch sơ bộ' },
                { option_text: 'Kế hoạch gần hoàn chỉnh' },
                { option_text: 'Kế hoạch đầy đủ và triển khai' },
            ],
        },
        {
            question_text:
                'Mức độ sẵn sàng của đơn vị trong việc triển khai các dịch vụ ngân hàng số là như thế nào?',
            question_name: 'Câu 6.3',
            question_type: 'radiogroup',
            question_options: [
                { option_text: 'Hoàn toàn không sẵn sàng' },
                { option_text: 'Không sẵn sàng' },
                { option_text: 'Đang chuẩn bị nhưng chưa đầy đủ' },
                { option_text: 'Sẵn sàng nhưng cần hỗ trợ thêm' },
                {
                    option_text:
                        'Hoàn toàn sẵn sàng và đã có kế hoạch triển khai',
                },
            ],
        },
        {
            question_text:
                'Khách hàng đánh giá mức độ hài lòng với các sản phẩm số hóa tại đơn vị như thế nào?',
            question_name: 'Câu 6.4',
            question_type: 'radiogroup',
            question_options: [
                { option_text: 'Rất không hài lòng' },
                { option_text: 'Không hài lòng' },
                { option_text: 'Trung lập' },
                { option_text: 'Hài lòng ' },
                { option_text: 'Rất hài lòng' },
            ],
        },
        {
            question_text:
                'Đơn vị có nhận được phản hồi tích cực từ khách hàng đối với các sản phẩm số hóa không?',
            question_name: 'Câu 6.5',
            question_type: 'radiogroup',
            question_options: [
                { option_text: 'Hoàn toàn không' },
                { option_text: 'Ít phản hồi tích cực' },
                { option_text: 'Phản hồi trung lập' },
                { option_text: 'Có nhiều phản hồi tích cực ' },
                { option_text: 'Phản hồi rất tích cực' },
            ],
        },
        {
            question_text:
                'Đơn vị có kế hoạch hợp tác với các tổ chức công nghệ để phát triển sản phẩm và dịch vụ ngân hàng số không?',
            question_name: 'Câu 6.6',
            question_type: 'radiogroup',
            question_options: [
                { option_text: 'Không có kế hoạch' },
                { option_text: 'Đã cân nhắc nhưng chưa lập kế hoạch' },
                { option_text: 'Có kế hoạch sơ bộ' },
                { option_text: 'Có kế hoạch hoàn chỉnh' },
                { option_text: 'Có kế hoạch hoàn chỉnh và bắt đầu triển khai' },
            ],
        },
        {
            question_text:
                'Mức độ hợp tác hiện tại của đơn vị với các tổ chức công nghệ để nâng cao dịch vụ ngân hàng số như thế nào?',
            question_name: 'Câu 6.7',
            question_type: 'radiogroup',
            question_options: [
                { option_text: 'Chưa có hợp tác' },
                { option_text: 'Đã tiếp cận đối tác nhưng chưa ký kết' },
                { option_text: 'Hợp tác một phần' },
                { option_text: 'Hợp tác gần hoàn chỉnh' },
                { option_text: 'Hợp tác toàn diện' },
            ],
        },
        {
            question_text:
                'Hiệu quả của việc ứng dụng công nghệ trong phát triển sản phẩm/dịch vụ ngân hàng số tại đơn vị như thế nào?',
            question_name: 'Câu 6.8',
            question_type: 'radiogroup',
            question_options: [
                { option_text: 'Hoàn toàn không hiệu quả' },
                { option_text: 'Hiệu quả rất thấp' },
                { option_text: 'Hiệu quả một phần' },
                { option_text: 'Hiệu quả tốt' },
                { option_text: 'Rất hiệu quả và đang mở rộng ứng dụng' },
            ],
        },
        {
            question_text:
                'Các sản phẩm ngân hàng số tại đơn vị có đáp ứng tốt nhu cầu của khách hàng không?',
            question_name: 'Câu 6.9',
            question_type: 'radiogroup',
            question_options: [
                { option_text: 'Hoàn toàn không đáp ứng' },
                { option_text: 'Đáp ứng rất ít' },
                { option_text: 'Đáp ứng trung bình' },
                { option_text: 'Đáp ứng tốt' },
                { option_text: 'Đáp ứng rất tốt và đang mở rộng sản phẩm' },
            ],
        },
        {
            question_text:
                'Ngân sách hiện tại dành cho CNTT và chuyển đổi số của đơn vị hàng năm là bao nhiêu?',
            question_name: 'Câu 7.1',
            question_type: 'radiogroup',
            question_options: [
                { option_text: 'Dưới 50 triệu VNĐ' },
                { option_text: '50 - 100 triệu VNĐ' },
                { option_text: '101 - 500 triệu VNĐ' },
                { option_text: '501 triệu - 1 tỷ VNĐ' },
                { option_text: 'Trên 1 tỷ VNĐ' },
            ],
        },
        {
            question_text:
                'Mức độ sẵn sàng của đơn vị trong việc đầu tư thêm ngân sách cho công nghệ và chuyển đổi số là như thế nào?',
            question_name: 'Câu 7.2',
            question_type: 'radiogroup',
            question_options: [
                { option_text: 'Hoàn toàn không sẵn sàng' },
                { option_text: 'Không sẵn sàng' },
                { option_text: 'Đang cân nhắc nhưng chưa có kế hoạch rõ ràng' },
                { option_text: 'Sẵn sàng đầu tư khi có điều kiện thuận lợi' },
                { option_text: 'Hoàn toàn sẵn sàng và đã có kế hoạch' },
            ],
        },
        {
            question_text:
                'Ngân sách dự kiến để mở rộng đầu tư công nghệ tại đơn vị trong 3 năm tới là bao nhiêu?',
            question_name: 'Câu 7.3',
            question_type: 'radiogroup',
            question_options: [
                { option_text: 'Dưới 100 triệu VNĐ' },
                { option_text: '100 - 300 triệu VNĐ' },
                { option_text: '301 - 500 triệu VNĐ' },
                { option_text: '501 triệu - 1 tỷ VNĐ' },
                { option_text: 'Trên 1 tỷ VNĐ' },
            ],
        },
        {
            question_text:
                'Đơn vị có sẵn sàng tham gia tài chính vào các dự án CNTT dùng chung với NHNN/NHHTX không?',
            question_name: 'Câu 7.4',
            question_type: 'radiogroup',
            question_options: [
                { option_text: 'Hoàn toàn không sẵn sàng' },
                { option_text: 'Không sẵn sàng' },
                { option_text: 'Đang cân nhắc nhưng chưa có cam kết' },
                { option_text: 'Sẵn sàng tham gia nếu có hỗ trợ ' },
                {
                    option_text:
                        'Hoàn toàn sẵn sàng và đang tìm kiếm cơ hội hợp tác',
                },
            ],
        },
        {
            question_text:
                'Đơn vị đánh giá mức độ hiệu quả của việc tham gia vào các dự án CNTT dùng chung như thế nào?',
            question_name: 'Câu 7.5',
            question_type: 'radiogroup',
            question_options: [
                { option_text: 'Hoàn toàn không hiệu quả' },
                { option_text: 'Hiệu quả rất thấp ' },
                { option_text: 'Hiệu quả trung bình ' },
                { option_text: 'Hiệu quả tốt ' },
                { option_text: 'Rất hiệu quả và mang lại giá trị rõ ràng' },
            ],
        },
        {
            question_text:
                'Ngân sách dành cho CNTT hiện tại có đảm bảo đủ cho các hoạt động và dự án chuyển đổi số không?',
            question_name: 'Câu 7.6',
            question_type: 'radiogroup',
            question_options: [
                { option_text: 'Hoàn toàn không đủ ' },
                { option_text: 'Không đủ ' },
                { option_text: 'Đủ cho duy trì hoạt động cơ bản ' },
                { option_text: 'Đủ nhưng cần thêm đầu tư để mở rộng ' },
                { option_text: 'Hoàn toàn đủ và có khả năng mở rộng thêm' },
            ],
        },
        {
            question_text:
                'Đơn vị có kế hoạch dài hạn để tăng ngân sách đầu tư CNTT không?',
            question_name: 'Câu 7.7',
            question_type: 'radiogroup',
            question_options: [
                { option_text: 'Không có kế hoạch ' },
                { option_text: 'Đang cân nhắc nhưng chưa có kế hoạch cụ thể ' },
                { option_text: 'Đã có kế hoạch sơ bộ' },
                { option_text: 'Kế hoạch gần hoàn chỉnh' },
                { option_text: 'Kế hoạch đầy đủ và đang triển khai' },
            ],
        },
        {
            question_text:
                'Đơn vị có nhận được hỗ trợ tài chính từ các tổ chức để thực hiện chuyển đổi số không?',
            question_name: 'Câu 7.8',
            question_type: 'radiogroup',
            question_options: [
                { option_text: 'Không có bất kỳ hỗ trợ nào' },
                { option_text: 'Hỗ trợ rất hạn chế' },
                { option_text: 'Hỗ trợ ở mức trung bình' },
                { option_text: 'Nhận được hỗ trợ tốt' },
                {
                    option_text:
                        'Hỗ trợ rất tốt và có nhiều cơ hội tiếp cận tài chính',
                },
            ],
        },
        {
            question_text:
                'Mức độ nhận thức của lãnh đạo về lộ trình chuyển đổi số tại đơn vị như thế nào?',
            question_name: 'Câu 8.1',
            question_type: 'radiogroup',
            question_options: [
                { option_text: 'Hoàn toàn không nhận thức' },
                { option_text: 'Nhận thức hạn chế' },
                { option_text: 'Nhận thức cơ bản' },
                { option_text: 'Nhận thức tốt' },
                { option_text: 'Nhận thức sâu sắc và có kế hoạch triển khai' },
            ],
        },
        {
            question_text:
                'Đơn vị đã chuẩn bị nhân lực, hạ tầng CNTT và tài chính để thực hiện CĐS như thế nào?',
            question_name: 'Câu 8.2',
            question_type: 'radiogroup',
            question_options: [
                { option_text: 'Hoàn toàn chưa chuẩn bị' },
                { option_text: 'Chuẩn bị hạn chế ' },
                { option_text: 'Chuẩn bị một phần ' },
                { option_text: 'Chuẩn bị gần hoàn chỉnh' },
                { option_text: 'Chuẩn bị đầy đủ và sẵn sàng triển khai' },
            ],
        },
        {
            question_text:
                'Mức độ đầy đủ của các nguồn lực hiện tại (nhân lực, tài chính, CNTT) cho việc triển khai lộ trình CĐS là như thế nào?',
            question_name: 'Câu 8.3',
            question_type: 'radiogroup',
            question_options: [
                { option_text: 'Hoàn toàn không đủ' },
                { option_text: 'Không đủ' },
                { option_text: 'Trung bình' },
                { option_text: 'Đầy đủ' },
                { option_text: 'Hoàn toàn đủ và có kế hoạch nâng cấp' },
            ],
        },
        {
            question_text:
                'Đơn vị đã xây dựng lộ trình cụ thể để đạt các mục tiêu CĐS ngành ngân hàng chưa?',
            question_name: 'Câu 8.4',
            question_type: 'radiogroup',
            question_options: [
                { option_text: 'Chưa xây dựng' },
                { option_text: 'Xây dựng sơ bộ' },
                { option_text: 'Gần hoàn chỉnh' },
                { option_text: 'Hoàn chỉnh' },
                { option_text: 'Hoàn chỉnh và đang triển khai' },
            ],
        },
        {
            question_text:
                'Lộ trình CĐS tại đơn vị có phù hợp với thực trạng và khả năng hiện tại không?',
            question_name: 'Câu 8.5',
            question_type: 'radiogroup',
            question_options: [
                { option_text: 'Hoàn toàn không phù hợp' },
                { option_text: 'Không phù hợp' },
                { option_text: 'Trung bình' },
                { option_text: 'Phù hợp' },
                { option_text: 'Hoàn toàn phù hợp và có kế hoạch mở rộng' },
            ],
        },
        {
            question_text:
                'Mức độ phối hợp với các đơn vị trong hệ thống ngân hàng để thực hiện CĐS tại đơn vị như thế nào?',
            question_name: 'Câu 8.6',
            question_type: 'radiogroup',
            question_options: [
                { option_text: 'Hoàn toàn không phối hợp' },
                { option_text: 'Phối hợp hạn chế ' },
                { option_text: 'Phối hợp một phần ' },
                { option_text: 'Phối hợp tốt ' },
                { option_text: 'Phối hợp rất tốt và có chiến lược dài hạn' },
            ],
        },
        {
            question_text:
                'Đơn vị có kế hoạch tăng cường phối hợp với các đơn vị khác trong hệ thống ngân hàng không?',
            question_name: 'Câu 8.7',
            question_type: 'radiogroup',
            question_options: [
                { option_text: 'Không có kế hoạch ' },
                { option_text: 'Kế hoạch sơ bộ' },
                { option_text: 'Kế hoạch gần hoàn chỉnh' },
                { option_text: 'Kế hoạch hoàn chỉnh' },
                { option_text: 'Kế hoạch hoàn chỉnh và đang triển khai' },
            ],
        },
        {
            question_text:
                'Mức độ tham gia của nhân viên vào việc thực hiện lộ trình CĐS tại đơn vị là như thế nào?',
            question_name: 'Câu 8.8',
            question_type: 'radiogroup',
            question_options: [
                { option_text: 'Hoàn toàn không tham gia' },
                { option_text: 'Tham gia hạn chế' },
                { option_text: 'Tham gia một phần' },
                { option_text: 'Tham gia tích cực' },
                { option_text: 'Tham gia rất tích cực và có cam kết dài hạn' },
            ],
        },
        {
            question_text:
                'Đơn vị có kế hoạch cụ thể để phối hợp với các tổ chức khác trong hệ thống ngân hàng không?',
            question_name: 'Câu 8.9',
            question_type: 'radiogroup',
            question_options: [
                { option_text: 'Không có kế hoạch' },
                { option_text: 'Có kế hoạch sơ bộ' },
                { option_text: 'Kế hoạch gần hoàn chỉnh' },
                { option_text: 'Kế hoạch hoàn chỉnh' },
                { option_text: 'Kế hoạch hoàn chỉnh và có đối tác hợp tác' },
            ],
        },
        {
            question_text:
                'Tổng thể, mức độ sẵn sàng của QTDND trong việc triển khai CĐS hiện nay là như thế nào?',
            question_name: 'Câu 8.10',
            question_type: 'radiogroup',
            question_options: [
                { option_text: 'Hoàn toàn chưa sẵn sàng' },
                { option_text: 'Sẵn sàng hạn chế' },
                { option_text: 'Sẵn sàng một phần' },
                { option_text: 'Sẵn sàng tốt' },
                { option_text: 'Hoàn toàn sẵn sàng và có kế hoạch rõ ràng' },
            ],
        },
        {
            question_text:
                'Khả năng phối hợp của đơn vị với NHNN/NHHTX để triển khai CĐS như thế nào?',
            question_name: 'Câu 8.11',
            question_type: 'radiogroup',
            question_options: [
                { option_text: 'Hoàn toàn không phối hợp' },
                { option_text: 'Phối hợp rất hạn chế' },
                { option_text: 'Phối hợp một phần' },
                { option_text: 'Phối hợp tốt' },
                { option_text: 'Phối hợp rất tốt và có chiến lược dài hạn' },
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

    const totalQuestions = 87; // Tổng số câu hỏi
    const surveyData = [
        { surveyId: 1, numQuestions: 13 },
        { surveyId: 2, numQuestions: 11 },
        { surveyId: 3, numQuestions: 13 },
        { surveyId: 4, numQuestions: 11 },
        { surveyId: 5, numQuestions: 11 },
        { surveyId: 6, numQuestions: 9 },
        { surveyId: 7, numQuestions: 8 },
        { surveyId: 8, numQuestions: 11 },
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
