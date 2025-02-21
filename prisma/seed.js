const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    // Dữ liệu cho credit_funds
    const institutionsData = [
        { name: 'Credit Fund A', identity_code: 'CF-A001' },
        { name: 'Credit Fund B', identity_code: 'CF-B002' },
        { name: 'Credit Fund C', identity_code: 'CF-C003' },
    ];

    // Thêm dữ liệu vào bảng credit_funds
    for (const institution of institutionsData) {
        await prisma.institutions.create({
            data: institution,
        });
    }

    // Dữ liệu cho surveys
    const surveysData = [
        {
            survey_title: 'NHÂN LỰC VÀ NĂNG LỰC NHẬN THỨC CHUYỂN ĐỔI SỐ',
            survey_description:
                'Đánh giá mức độ nhận thức về chuyển đổi số và năng lực CNTT của nhân sự',
            institution_id: 1,
        },
        {
            survey_title:
                'HIỆN TRẠNG QUY TRÌNH NGHIỆP VỤ VÀ MÔ HÌNH QUẢN TRỊ SỐ',
            survey_description:
                'Đánh giá mức độ số hóa và tự động hóa trong các quy trình nghiệp vụ cốt lõi tại QTDND',
            institution_id: 2,
        },
        {
            survey_title: 'CƠ SỞ HẠ TẦNG CNTT VÀ MỨC ĐỘ ỨNG DỤNG CÔNG NGHỆ',
            survey_description:
                'Đánh giá mức độ hiện đại hóa hạ tầng công nghệ thông tin tại các Quỹ Tín Dụng Nhân Dân (QTDND), đảm bảo khả năng triển khai chuyển đổi số (CĐS) trong hệ thống tài chính vi mô',
            institution_id: 3,
        },
        {
            survey_title: 'AN NINH THÔNG TIN & QUẢN TRỊ RỦI RO CÔNG NGHỆ',
            survey_description:
                'Đánh giá mức độ an toàn thông tin và khả năng ứng phó với rủi ro công nghệ tại QTDND',
            institution_id: 3,
        },
        {
            survey_title: 'QUẢN LÝ VÀ KHAI THÁC DỮ LIỆU SỐ',
            survey_description:
                'Đánh giá khả năng lưu trữ, phân tích và khai thác dữ liệu số nhằm nâng cao hiệu quả hoạt động tại QTDND',
            institution_id: 3,
        },
        {
            survey_title: 'PHÁT TRIỂN SẢN PHẨM VÀ DỊCH VỤ NGÂN HÀNG SỐ',
            survey_description:
                'Đánh giá khả năng triển khai và phát triển các dịch vụ tài chính số tại QTDND nhằm nâng cao trải nghiệm khách hàng và năng lực cạnh tranh',
            institution_id: 3,
        },
        {
            survey_title: 'NGUỒN LỰC TÀI CHÍNH VÀ KHẢ NĂNG HỢP TÁC',
            survey_description:
                'Đánh giá mức độ sẵn sàng đầu tư vào công nghệ và khả năng hợp tác tài chính của QTDND trong quá trình thực hiện chuyển đổi số',
            institution_id: 3,
        },
        {
            survey_title: 'LỘ TRÌNH CHUYỂN ĐỔI SỐ ĐỒNG BỘ VÀ THỐNG NHẤT',
            survey_description:
                'Đánh giá tổng thể mức độ sẵn sàng của QTDND đối với quá trình chuyển đổi số',
            institution_id: 3,
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
        { name: 'John Doe', email: 'john.doe@example.com', institution_id: 1 },
        {
            name: 'Jane Smith',
            email: 'jane.smith@example.com',
            institution_id: 2,
        },
        {
            name: 'Alice Johnson',
            email: 'alice.johnson@example.com',
            institution_id: 3,
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
                'Anh/Chị nhận thấy mức độ hiểu biết của anh chị về chuyển đổi số tại đơn vị mình như thế nào?',
            question_name: 'Câu 1.1',
            question_type: 'radiogroup',
            question_options: [
                {
                    option_text: 'Rất thấp',
                    option_note: 'Chưa có hiểu biết về CĐS',
                },
                {
                    option_text: 'Thấp',
                    option_note: 'Nhận thức sơ bộ, chưa hiểu rõ lợi ích',
                },
                {
                    option_text: 'Trung bình',
                    option_note: 'Nhận thức được một số nội dung cơ bản',
                },
                { option_text: 'Cao', option_note: 'Nhận thức đầy đủ' },
                { option_text: 'Rất cao', option_note: 'Hiểu sâu sắc' },
            ],
        },
        {
            question_text:
                'Anh/Chị đánh giá mức độ thành thạo của mình trong việc sử dụng phần mềm nghiệp vụ như thế nào?',
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
                'Anh/Chị có hiểu và tuân thủ các nguyên tắc bảo mật dữ liệu trong công việc không?',
            question_name: 'Câu 1.3',
            question_type: 'radiogroup',
            question_options: [
                {
                    option_text: 'Hoàn toàn không tuân thủ',
                    option_note: 'Không biết về các nguyên tắc bảo mật',
                },
                {
                    option_text:
                        'Biết một số nguyên tắc nhưng chưa áp dụng thường xuyên',
                },
                {
                    option_text: 'Áp dụng bảo mật cơ bản',
                    option_note:
                        'Đổi mật khẩu định kỳ, không chia sẻ thông tin',
                },
                { option_text: 'Tuân thủ chặt chẽ các quy tắc bảo mật' },
                {
                    option_text:
                        'Thành thạo về bảo mật và có thể hướng dẫn người khác',
                },
            ],
        },
        {
            question_text:
                'Anh/Chị có sẵn sàng tham gia các chương trình đào tạo nâng cao kỹ năng CNTT do đơn vị hoặc NHNN/NHHTX trong thời gian tới không?',
            question_name: 'Câu 1.4',
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
                'Hình thức đào tạo nội bộ về CNTT và chuyển đổi số tại đơn vị đang được triển khai như thế nào?',
            question_name: 'Câu 1.5',
            question_note: 'Có thể chọn nhiều đáp án',
            question_type: 'checkbox',
            question_options: [
                { option_text: 'Không thực hiện chương trình đào tạo nào' },
                {
                    option_text:
                        'Tổ chức các buổi đào tạo nội bộ định kỳ (Nhân viên có kinh nghiệm hướng dẫn)',
                },
                {
                    option_text:
                        'Mời chuyên gia bên ngoài đào tạo theo từng đợt',
                },
                { option_text: 'Tổ chức đào tạo trực tuyến' },
                {
                    option_text:
                        'Hỗ trợ nhân sự tự học và cấp kinh phí/tài liệu đào tạo',
                },
                {
                    option_text:
                        'Đào tạo theo hình thức hướng dẫn thực tế khi làm việc',
                },
                { option_text: 'Khác ...' },
            ],
        },
        {
            question_text:
                'Anh/Chị đánh giá mức độ hiệu quả của các chương trình đào tạo nội bộ về CNTT và chuyển đổi số tại đơn vị như thế nào?',
            question_name: 'Câu 1.6',
            question_type: 'radiogroup',
            question_options: [
                {
                    option_text: 'Rất kém',
                    option_note:
                        'Không có chương trình hoặc chương trình không hữu ích',
                },
                {
                    option_text: 'Kém',
                    option_note:
                        'Có chương trình nhưng nội dung chưa thực tế, khó áp dụng',
                },
                {
                    option_text: 'Trung bình',
                    option_note:
                        'Chương trình có ích nhưng chưa thực sự hiệu quả',
                },
                {
                    option_text: 'Tốt',
                    option_note:
                        'Chương trình có nội dung phù hợp, hỗ trợ tốt cho công việc',
                },
                {
                    option_text: 'Rất tốt',
                    option_note:
                        'Chương trình hiệu quả, giúp nâng cao năng lực thực tế đáng kể',
                },
            ],
        },
        {
            question_text:
                'Anh/Chị đánh giá mức độ hỗ trợ từ NHNN/CoopBank trong đào tạo nhân lực CNTT tại đơn vị ra sao?',
            question_name: 'Câu 1.7',
            question_type: 'radiogroup',
            question_options: [
                {
                    option_text: 'Rất kém',
                    option_note: 'Hoàn toàn không hỗ trợ/hỗ trợ không đáng kể',
                },
                {
                    option_text: 'Kém',
                    option_note:
                        'Hỗ trợ còn hạn chế, chưa đáp ứng được nhu cầu thực tế',
                },
                {
                    option_text: 'Trung bình',
                    option_note: 'Hỗ trợ khá đầy đủ nhưng ít thực tế',
                },
                {
                    option_text: 'Tốt',
                    option_note: 'Hỗ trợ khá đầy đủ và thực tế',
                },
                {
                    option_text: 'Rất tốt',
                    option_note:
                        'Hỗ trợ rất đầy đủ, hiệu quả và sát với nhu cầu thực tế',
                },
            ],
        },
        {
            question_text:
                'Hiện tại, đơn vị có cán bộ phụ trách các công việc liên quan đến CNTT không?',
            question_name: 'Câu 1.8',
            question_note: 'Có thể chọn nhiều đáp án',
            question_type: 'checkbox',
            question_options: [
                { option_text: 'Không có nhân sự phụ trách' },
                { option_text: 'Cán bộ kiêm nhiệm cho CNTT' },
                { option_text: 'Có cán bộ phụ trách CNTT' },
                { option_text: 'Hợp tác với đối tác bên ngoài' },
                { option_text: 'Khác ...' },
            ],
        },
        {
            question_text:
                'Đơn vị có gặp khó khăn trong việc tuyển dụng nhân sự CNTT chuyên trách không?',
            question_name: 'Câu 1.9',
            question_type: 'radiogroup',
            question_options: [
                { option_text: 'Không có nhu cầu tuyển dụng' },
                { option_text: 'Rất khó khăn', option_note: 'Không thể tuyển' },
                {
                    option_text: 'Khó khăn',
                    option_note: 'Tuyển dụng ít, thiếu ứng viên phù hợp',
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
                'Anh/chị có chủ động thúc đẩy chuyển đổi số tại Quỹ không?',
            question_name: 'Câu 1.10',
            question_type: 'radiogroup',
            question_options: [
                {
                    option_text: 'Hoàn toàn không',
                    option_note: 'Không quan tâm',
                },
                {
                    option_text: 'Ít quan tâm',
                    option_note: 'Có quan tâm nhưng chưa hành động',
                },
                {
                    option_text: 'Quan tâm vừa phải',
                    option_note: 'Có kế hoạch nhưng chưa triển khai',
                },
                { option_text: 'Chủ động', option_note: 'Có kế hoạch rõ ràng' },
                {
                    option_text: 'Rất chủ động',
                    option_note: 'Đã triển khai mạnh mẽ',
                },
            ],
        },
        {
            question_text:
                'Đơn vị đã triển khai những chương trình đào tạo nào về CNTT và chuyển đổi số?',
            question_name: 'Câu 1.11',
            question_note: 'Có thể chọn nhiều đáp án',
            question_type: 'checkbox',
            question_options: [
                { option_text: 'Chưa có chương trình nào' },
                {
                    option_text:
                        'Đang triển khai các chương trình cơ bản về ứng dụng CNTT',
                },
                { option_text: 'Đã triển khai các chương trình về nghiệp vụ' },
                {
                    option_text:
                        'Đã triển khai các chương trình về quản trị thông tin',
                },
                {
                    option_text:
                        'Đã triển khai các chương trình về bảo mật thông tin',
                },
                {
                    option_text:
                        'Đã triển khai các chương trình về quản trị rủi ro',
                },
            ],
        },
        {
            question_text:
                'Anh/chị đánh giá mức độ hiệu quả của các chương trình đào tạo CNTT tại đơn vị như thế nào?',
            question_name: 'Câu 1.12',
            question_type: 'radiogroup',
            question_options: [
                {
                    option_text: 'Rất kém',
                    option_note:
                        'Chưa có chương trình nào hoặc chương trình không phù hợp',
                },
                {
                    option_text: 'Kém',
                    option_note:
                        'Có chương trình nhưng nội dung chưa phù hợp hoặc chưa ứng dụng được vào thực tế',
                },
                {
                    option_text: 'Trung bình',
                    option_note:
                        'Chương trình có nội dung hữu ích nhưng chưa thực sự hiệu quả',
                },
                {
                    option_text: 'Tốt',
                    option_note:
                        'Chương trình có nội dung phù hợp và hỗ trợ tốt cho công việc',
                },
                {
                    option_text: 'Rất tốt',
                    option_note:
                        'Chương trình hiệu quả, giúp nâng cao năng lực thực tế đáng kể',
                },
            ],
        },
        {
            question_text:
                'Anh/Chị đánh giá mức độ thực tế và ứng dụng của các chương trình nâng cao nhận thức về chuyển đổi số tại đơn vị như thế nào?',
            question_name: 'Câu 1.13',
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
                'Anh/Chị đánh giá mức độ sẵn sàng của đội ngũ lãnh đạo trong việc tiếp cận và ứng dụng công nghệ số như thế nào?',
            question_name: 'Câu 1.14',
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
                'Mức độ chuẩn bị của đơn vị trong việc số hóa quy trình nghiệp vụ và vận hành theo mô hình ngân hàng số như thế nào?',
            question_name: 'Câu 2.1',
            question_type: 'radiogroup',
            question_options: [
                {
                    option_text: 'Chưa có kế hoạch',
                    option_note:
                        'Đơn vị vẫn hoạt động theo mô hình truyền thống, chưa có định hướng chuyển đổi số, các quy trình chủ yếu thực hiện thủ công',
                },
                {
                    option_text: 'Mới bắt đầu tìm hiểu',
                    option_note:
                        'Đơn vị đang nghiên cứu mô hình ngân hàng số, đánh giá khả năng áp dụng công nghệ nhưng chưa có kế hoạch cụ thể',
                },
                {
                    option_text: 'Đã có kế hoạch sơ bộ nhưng chưa triển khai',
                    option_note:
                        'Đơn vị đã xác định chiến lược chuyển đổi số, bước đầu xây dựng kế hoạch nhưng chưa thực hiện do hạn chế tài chính, nhân lực hoặc công nghệ',
                },
                {
                    option_text:
                        'Đã có kế hoạch sơ bộ, đang triển khai từng phần',
                    option_note:
                        'Đã bắt đầu số hóa một số mảng như dịch vụ khách hàng, quản lý nội bộ hoặc tín dụng nhưng chưa tích hợp đầy đủ hệ thống ngân hàng số',
                },
                {
                    option_text: 'Đã có kế hoạch hoàn chỉnh và đang thực hiện',
                    option_note:
                        'Đơn vị đã có chiến lược số hóa đồng bộ, triển khai ngân hàng số với nền tảng công nghệ tích hợp, tự động hóa quy trình vận hành và trải nghiệm khách hàng số toàn diện',
                },
            ],
        },
        {
            question_text:
                'Mức độ chuẩn bị của đơn vị trong việc triển khai hệ thống quản trị số (bao gồm quản lý nội bộ, tài chính, dữ liệu và ra quyết định thông minh) như thế nào?',
            question_name: 'Câu 2.2',
            question_type: 'radiogroup',
            question_options: [
                {
                    option_text: 'Chưa có kế hoạch',
                    option_note:
                        'Quản lý nội bộ vẫn chủ yếu thủ công, chưa ứng dụng công nghệ trong giám sát, điều hành và ra quyết định',
                },
                {
                    option_text: 'Mới bắt đầu tìm hiểu',
                    option_note:
                        'Đang đánh giá mô hình quản trị số, nghiên cứu hệ thống quản lý nhưng chưa xây dựng kế hoạch cụ thể',
                },
                {
                    option_text: 'Đã có kế hoạch sơ bộ nhưng chưa triển khai',
                    option_note:
                        'Có kế hoạch triển khai hệ thống quản trị số nhưng chưa thực hiện do hạn chế nguồn lực hoặc công nghệ',
                },
                {
                    option_text:
                        'Đã có kế hoạch sơ bộ, đang triển khai từng phần',
                    option_note:
                        'Một số mảng như quản lý nhân sự, tài chính đã có hệ thống nhưng chưa đồng bộ hoặc chưa khai thác dữ liệu số để ra quyết định',
                },
                {
                    option_text: 'Đã có kế hoạch hoàn chỉnh và đang thực hiện',
                    option_note:
                        'Đơn vị đã triển khai quản trị số đồng bộ, dữ liệu được kết nối và khai thác, có hệ thống hỗ trợ ra quyết định thông minh',
                },
            ],
        },
        {
            question_text:
                'Mức độ số hóa quy trình tín dụng tại đơn vị hiện nay như thế nào? (bao gồm Core Bank, AI, tự động hóa quy trình)',
            question_name: 'Câu 2.3',
            question_type: 'radiogroup',
            question_options: [
                {
                    option_text: 'Hoàn toàn thủ công',
                    option_note:
                        'Tất cả quy trình thực hiện bằng giấy tờ, không có hệ thống hỗ trợ',
                },
                {
                    option_text: 'Số hóa một phần',
                    option_note:
                        'Chỉ nhập liệu cơ bản vào hệ thống, nhưng xử lý vẫn thủ công',
                },
                {
                    option_text:
                        'Số hóa phần lớn nhưng còn phụ thuộc vào giấy tờ',
                    option_note: 'Chưa có AI hỗ trợ',
                },
                {
                    option_text: 'Hầu hết quy trình đã số hóa',
                    option_note: 'Tích hợp vào CoreBank',
                },
                {
                    option_text: 'Hoàn toàn số hóa',
                    option_note:
                        'Có hệ thống tự động hỗ trợ xét duyệt tín dụng',
                },
            ],
        },
        {
            question_text:
                'Mức độ số hóa quy trình kế toán tại đơn vị hiện nay như thế nào?',
            question_name: 'Câu 2.4',
            question_type: 'radiogroup',
            question_options: [
                {
                    option_text: 'Hoàn toàn thủ công',
                    option_note: 'Sổ sách giấy, không có phần mềm hỗ trợ',
                },
                {
                    option_text: 'Số hóa một phần',
                    option_note: 'Chỉ nhập liệu cơ bản, xử lý vẫn thủ công',
                },
                {
                    option_text:
                        'Số hóa phần lớn nhưng chưa tích hợp hệ thống Ngân hàng',
                },
                {
                    option_text: 'Hầu hết quy trình đã số hóa',
                    option_note: 'Có tích hợp phần mềm kế toán',
                },
                {
                    option_text: 'Hoàn toàn số hóa và tự động hóa',
                    option_note: 'Báo cáo tài chính tự động, đối soát tự động',
                },
            ],
        },
        {
            question_text:
                'Mức độ tích hợp công nghệ vào các dịch vụ khách hàng tại đơn vị như thế nào?',
            question_name: 'Câu 2.5',
            question_type: 'radiogroup',
            question_options: [
                {
                    option_text: 'Không tích hợp',
                    option_note: 'Chỉ giao dịch trực tiếp',
                },
                {
                    option_text: 'Mới có một số dịch vụ cơ bản',
                    option_note: 'Tin nhắn, tổng đài',
                },
                {
                    option_text:
                        'Tích hợp các kênh online nhưng chưa hoàn chỉnh',
                },
                {
                    option_text:
                        'Đã có ứng dụng hoặc cổng giao dịch trực tuyến',
                },
                {
                    option_text: 'Hoàn toàn số hóa',
                    option_note:
                        'Hệ thống quản trị nội bộ đồng bộ, dữ liệu liên kết chặt chẽ',
                },
            ],
        },
        {
            question_text:
                'Anh/chị cho biết mức độ tích hợp (liên thông) giữa các hệ thống thông tin trong đơn vị hiện nay như thế nào?',
            question_name: 'Câu 2.6',
            question_type: 'radiogroup',
            question_options: [
                { option_text: 'Hoàn toàn chưa tích hợp' },
                { option_text: 'Đã tích hợp các nghiệp vụ trong core nội bộ' },
                {
                    option_text:
                        'Đã tích hợp được nghiệp vụ trong core và một số ứng dụng CNTT khác tại nội bộ đơn vị',
                },
                { option_text: 'Đã tích hợp tất cả các ứng dụng CNTT nội bộ' },
                {
                    option_text:
                        'Đã tích hợp với các hệ thống của NHNN và Coop – Bank',
                },
            ],
        },
        {
            question_text:
                'Đơn vị có kế hoạch tự động hóa các quy trình nghiệp vụ, bao gồm ứng dụng AI, RPA và quy trình vận hành tự động, như thế nào?',
            question_name: 'Câu 2.7',
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
                'Mức độ tuân thủ các tiêu chuẩn ngành ngân hàng trong quy trình nghiệp vụ tại đơn vị như thế nào?',
            question_name: 'Câu 2.8',
            question_type: 'radiogroup',
            question_options: [
                {
                    option_text: 'Hoàn toàn không tuân thủ',
                    option_note:
                        'Chưa áp dụng bất kỳ tiêu chuẩn nào của NHNN, Basel, ISO 20022 hoặc IFRS',
                },
                {
                    option_text: 'Không tuân thủ đầy đủ',
                    option_note:
                        'Có áp dụng một số quy định của NHNN nhưng chưa đáp ứng các tiêu chuẩn quốc tế',
                },
                {
                    option_text: 'Tuân thủ một phần',
                    option_note:
                        'Đã áp dụng một số tiêu chuẩn ngành nhưng chưa đồng bộ',
                },
                {
                    option_text: 'Tuân thủ tương đối tốt',
                    option_note:
                        'Hầu hết quy trình đã tuân thủ các tiêu chuẩn NHNN và một phần tiêu chuẩn quốc tế',
                },
                {
                    option_text: 'Hoàn toàn tuân thủ',
                    option_note:
                        'Quy trình nghiệp vụ đã tuân thủ đầy đủ NHNN, Basel, ISO 20022 và IFRS',
                },
            ],
        },
        {
            question_text:
                'Đơn vị đang gặp những rào cản nào khi chuẩn hóa quy trình để số hóa?',
            question_name: 'Câu 2.9',
            question_note: 'Có thể chọn nhiều đáp án',
            question_type: 'checkbox',
            question_options: [
                { option_text: 'Thiếu tài chính' },
                { option_text: 'Thiếu nhân lực chuyên môn' },
                { option_text: 'Thiếu hạ tầng công nghệ' },
                { option_text: 'Chưa có kế hoạch rõ ràng' },
                { option_text: 'Các rào cản khác' },
            ],
        },
        {
            question_text:
                'Anh/Chị vui lòng cho biết những rào cản và khó khăn trong việc sử dụng các hệ thống thông tin tại đơn vị? (Chọn tối đa 3 lý do chính)',
            question_name: 'Câu 2.10',
            question_type: 'checkbox',
            question_options: [
                {
                    option_text:
                        'Giao diện khó sử dụng, nhân viên chưa thành thạo',
                },
                {
                    option_text:
                        'Chưa có đủ tài liệu/hướng dẫn sử dụng hệ thống',
                },
                {
                    option_text:
                        'Tính năng chưa đáp ứng đủ yêu cầu của nghiệp vụ',
                },
                {
                    option_text:
                        'Hệ thống thường xuyên lỗi, gián đoạn hoạt động',
                },
                {
                    option_text:
                        'Chưa có sự kết nối/liên thông tốt với các hệ thống khác',
                },
                { option_text: 'Chi phí vận hành & duy trì hệ thống quá cao' },
                { option_text: 'Nhân sự chưa được đào tạo đầy đủ về hệ thống' },
                { option_text: 'Khác' },
            ],
        },
        {
            question_text:
                'Đơn vị có kế hoạch gì để khắc phục các rào cản trong số hóa quy trình?',
            question_name: 'Câu 2.11',
            question_type: 'radiogroup',
            question_options: [
                { option_text: 'Chưa có kế hoạch cụ thể' },
                { option_text: 'Đang xây dựng kế hoạch nhưng chưa triển khai' },
                {
                    option_text:
                        'Có kế hoạch nhưng chưa thực hiện được do hạn chế nguồn lực',
                },
                { option_text: 'Đã triển khai một phần nhưng chưa hoàn chỉnh' },
                { option_text: 'Đã có kế hoạch hoàn chỉnh và đang thực hiện' },
            ],
        },
        {
            question_text:
                'Theo Anh/Chị, các giải pháp công nghệ số nào sau đây là cần thiết và phù hợp để triển khai dùng chung giữa các QTDND? (Có thể chọn nhiều đáp án)',
            question_name: 'Câu 2.12',
            question_type: 'checkbox',
            question_options: [
                {
                    option_text:
                        'Hệ thống nghiệp vụ ngân hàng lõi (CoreBanking)',
                },
                {
                    option_text:
                        'Hệ thống Mobile Banking cho thành viên/khách hàng',
                },
                { option_text: 'Hệ thống thanh toán chuyển tiền CF-eBank' },
                { option_text: 'Hệ thống chấm điểm tín dụng khách hàng' },
                { option_text: 'Hệ thống báo cáo quản trị điều hành' },
                {
                    option_text:
                        'Hệ thống mã định danh tài khoản thu hộ/chi hộ',
                },
                {
                    option_text:
                        'Hệ thống trục thanh toán Payment Hub kết nối với NHHT',
                },
                { option_text: 'Giải pháp khác' },
            ],
        },
        {
            question_text:
                'Anh/Chị vui lòng cho biết đơn vị đang sử dụng các ứng dụng nào của các hệ thống Co-opBank cung cấp cho QTDND sau đây tại đơn vị? (Có thể chọn nhiều đáp án)',
            question_name: 'Câu 2.13',
            question_type: 'checkbox',
            question_options: [
                { option_text: 'Hệ thống thanh toán chuyển tiền CF-eBank' },
                { option_text: 'Hệ thống khởi tạo dịch vụ từ xa CFePCF' },
                { option_text: 'Ứng dụng di động Co-opBank Mobile Banking' },
                {
                    option_text:
                        'Ứng dụng Mobile Banking dành cho QTDND (CFeBiz)',
                },
                { option_text: 'Ứng dụng giao dịch tài chính Co-opSmart' },
                { option_text: 'Hệ thống trục thanh toán Payment Hub' },
                { option_text: 'Hệ thống quản lý tài khoản định danh CfeAM' },
                { option_text: 'Không sử dụng bất kỳ hệ thống nào' },
                { option_text: 'Khác' },
            ],
        },
        {
            question_text:
                'Anh/Chị vui lòng cho biết mức độ hiệu quả của các hệ thống Co-opBank đã triển khai tại đơn vị?',
            question_name: 'Câu 2.14',
            question_type: 'group',
        },
        {
            question_text: 'Hệ thống thanh toán chuyển tiền CF-eBank',
            question_name: 'Câu 2.14.1',
            question_type: 'radiogroup',
            question_options: [
                { option_text: 'Không hiệu quả' },
                { option_text: 'Đáp ứng một phần' },
                { option_text: 'Đáp ứng cơ bản' },
                { option_text: 'Hiệu quả' },
                { option_text: 'Rất hiệu quả' },
                { option_text: 'Không sử dụng' },
            ],
        },
        {
            question_text: 'Hệ thống khởi tạo dịch vụ từ xa CFePCF',
            question_name: 'Câu 2.14.2',
            question_type: 'radiogroup',
            question_options: [
                { option_text: 'Không hiệu quả' },
                { option_text: 'Đáp ứng một phần' },
                { option_text: 'Đáp ứng cơ bản' },
                { option_text: 'Hiệu quả' },
                { option_text: 'Rất hiệu quả' },
                { option_text: 'Không sử dụng' },
            ],
        },
        {
            question_text: 'Hệ thống Báo cáo giám sát QTDND - PRMS',
            question_name: 'Câu 2.14.3',
            question_type: 'radiogroup',
            question_options: [
                { option_text: 'Không hiệu quả' },
                { option_text: 'Đáp ứng một phần' },
                { option_text: 'Đáp ứng cơ bản' },
                { option_text: 'Hiệu quả' },
                { option_text: 'Rất hiệu quả' },
                { option_text: 'Không sử dụng' },
            ],
        },
        {
            question_text: 'Ứng dụng di động Co-opBank Mobile Banking',
            question_name: 'Câu 2.14.4',
            question_type: 'radiogroup',
            question_options: [
                { option_text: 'Không hiệu quả' },
                { option_text: 'Đáp ứng một phần' },
                { option_text: 'Đáp ứng cơ bản' },
                { option_text: 'Hiệu quả' },
                { option_text: 'Rất hiệu quả' },
                { option_text: 'Không sử dụng' },
            ],
        },
        {
            question_text: 'Ứng dụng Mobile Banking dành cho QTDND (CFeBiz)',
            question_name: 'Câu 2.14.5',
            question_type: 'radiogroup',
            question_options: [
                { option_text: 'Không hiệu quả' },
                { option_text: 'Đáp ứng một phần' },
                { option_text: 'Đáp ứng cơ bản' },
                { option_text: 'Hiệu quả' },
                { option_text: 'Rất hiệu quả' },
                { option_text: 'Không sử dụng' },
            ],
        },
        {
            question_text: 'Ứng dụng giao dịch tài chính Co-opSmart',
            question_name: 'Câu 2.14.6',
            question_type: 'radiogroup',
            question_options: [
                { option_text: 'Không hiệu quả' },
                { option_text: 'Đáp ứng một phần' },
                { option_text: 'Đáp ứng cơ bản' },
                { option_text: 'Hiệu quả' },
                { option_text: 'Rất hiệu quả' },
                { option_text: 'Không sử dụng' },
            ],
        },
        {
            question_text: 'Hệ thống trục thanh toán Payment Hub',
            question_name: 'Câu 2.14.7',
            question_type: 'radiogroup',
            question_options: [
                { option_text: 'Không hiệu quả' },
                { option_text: 'Đáp ứng một phần' },
                { option_text: 'Đáp ứng cơ bản' },
                { option_text: 'Hiệu quả' },
                { option_text: 'Rất hiệu quả' },
                { option_text: 'Không sử dụng' },
            ],
        },
        {
            question_text: 'Hệ thống quản lý tài khoản định danh CFeAM',
            question_name: 'Câu 2.14.8',
            question_type: 'radiogroup',
            question_options: [
                { option_text: 'Không hiệu quả' },
                { option_text: 'Đáp ứng một phần' },
                { option_text: 'Đáp ứng cơ bản' },
                { option_text: 'Hiệu quả' },
                { option_text: 'Rất hiệu quả' },
                { option_text: 'Không sử dụng' },
            ],
        },
        {
            question_text:
                'Mức độ trang bị máy tính và thiết bị CNTT tại đơn vị của Anh/Chị như thế nào?',
            question_name: 'Câu 3.1',
            question_note: 'Vui lòng chọn một đáp án phù hợp nhất',
            question_type: 'radiogroup',
            question_options: [
                { option_text: 'Hoàn toàn chưa có' },
                { option_text: 'Trang bị rất hạn chế' },
                { option_text: 'Trang bị một phần' },
                {
                    option_text:
                        'Trang bị gần đầy đủ nhưng hạn chế trong sử dụng',
                },
                { option_text: 'Trang bị đầy đủ và sử dụng hiệu quả' },
                { option_text: 'Trang bị đầy đủ và sử dụng rất hiệu quả' },
            ],
        },
        {
            question_text:
                'Đơn vị của Anh/Chị đã được trang bị về hạ tầng CNTT theo hạng mục nào dưới đây?',
            question_name: 'Câu 3.2',
            question_note: 'Có thể chọn nhiều đáp án',
            question_type: 'checkbox',
            question_options: [
                { option_text: 'Máy chủ dùng riêng cho Core Banking' },
                {
                    option_text:
                        'Máy chủ riêng cho hệ thống cơ sở dữ liệu (Database Server)',
                },
                { option_text: 'Máy chủ dự phòng (Backup Server)' },
                {
                    option_text:
                        'Hệ thống sao lưu dữ liệu (Backup Database System)',
                },
                { option_text: 'Phòng máy chủ riêng biệt' },
                { option_text: 'Máy phát điện dự phòng' },
                { option_text: 'Hệ thống chống Virus' },
                {
                    option_text:
                        'Bộ lưu điện (UPS - Uninterruptible Power Supply)',
                },
                { option_text: 'Tường lửa (Firewall Security System)' },
                { option_text: 'Mạng nội bộ' },
                { option_text: 'Hệ thống Internet tốc độ cao' },
            ],
        },
        {
            question_text:
                'Mức độ ổn định và tốc độ của mạng nội bộ và internet tại đơn vị là như thế nào?',
            question_name: 'Câu 3.3',
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
                { option_text: 'Tốt', option_note: 'ổn định, ít gián đoạn' },
                {
                    option_text: 'Rất tốt',
                    option_note: 'tốc độ cao, ổn định liên tục',
                },
            ],
        },
        {
            question_text:
                'Đơn vị có kế hoạch nâng cấp cơ sở hạ tầng CNTT trong thời gian tới không?',
            question_name: 'Câu 3.4',
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
            question_name: 'Câu 3.5',
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
                'Đơn vị đã có kế hoạch hoặc đã tích hợp điện toán đám mây vào hệ thống hiện tại chưa?',
            question_name: 'Câu 3.6',
            question_type: 'radiogroup',
            question_options: [
                { option_text: 'Chưa có kế hoạch' },
                { option_text: 'Chưa tích hợp' },
                { option_text: 'Đã tích hợp một phần' },
                { option_text: 'Tích hợp hoàn chỉnh và sử dụng chưa hiệu quả' },
                { option_text: 'Tích hợp hoàn chỉnh và sử dụng hiệu quả' },
            ],
        },
        {
            question_text:
                'Mức độ sử dụng các công nghệ AI hỗ trợ trong các quy trình tại đơn vị là như thế nào?',
            question_name: 'Câu 3.7',
            question_type: 'radiogroup',
            question_options: [
                { option_text: 'Chưa sử dụng' },
                { option_text: 'Sử dụng ở mức thử nghiệm một vài nghiệp vụ' },
                {
                    option_text:
                        'Đã sử dụng chính thức trong một vài nghiệp vụ đơn lẻ',
                },
                {
                    option_text:
                        'Đã sử dụng chính thức trong nghiệp vụ cốt lõi',
                },
                { option_text: 'Sử dụng và có hiệu quả cao' },
            ],
        },
        {
            question_text:
                'Core Banking đã được triển khai và vận hành tại đơn vị anh/chị hiện nay như thế nào?',
            question_name: 'Câu 3.8',
            question_type: 'radiogroup',
            question_options: [
                { option_text: 'Chưa triển khai Core Banking' },
                {
                    option_text:
                        'Đã triển khai Core Banking nhưng hiệu quả thấp',
                },
                {
                    option_text:
                        'Đã triển khai Core Banking đạt được hiệu quả như mong đợi',
                },
                {
                    option_text:
                        'Đã triển khai Core Banking đạt được hiệu quả trên mong đợi',
                },
                {
                    option_text:
                        'Đã triển khai Core Banking đạt được hiệu quả tối ưu',
                },
            ],
        },
        {
            question_text:
                'Đơn vị có kế hoạch triển khai hoặc mở rộng ứng dụng AI, Blockchain vào quản lý hoạt động không?',
            question_name: 'Câu 3.9',
            question_type: 'radiogroup',
            question_options: [
                { option_text: 'Chưa có kế hoạch' },
                { option_text: 'Đang xây dựng kế hoạch sơ bộ' },
                { option_text: 'Đã có kế hoạch gần hoàn chỉnh' },
                { option_text: 'Kế hoạch hoàn chỉnh' },
                { option_text: 'Đã bắt đầu triển khai' },
            ],
        },
        {
            question_text: 'Mức độ ứng dụng e-banking tại đơn vị như thế nào?',
            question_name: 'Câu 3.10',
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
                'Mức độ tích hợp Core với hệ thống Co-opBank và NHNN tại đơn vị anh/chị như thế nào?',
            question_name: 'Câu 3.11',
            question_type: 'radiogroup',
            question_options: [
                { option_text: 'Chưa có kế hoạch' },
                { option_text: 'Chưa tích hợp' },
                { option_text: 'Đã tích hợp một phần' },
                {
                    option_text:
                        'Tích hợp hoàn chỉnh nhưng sử dụng chưa hiệu quả',
                },
                { option_text: 'Tích hợp hoàn chỉnh và sử dụng hiệu quả' },
            ],
        },
        {
            question_text:
                'Mức độ tích hợp hệ thống CNTT của đơn vị với các nền tảng của NHNN & NHHTX như thế nào?',
            question_name: 'Câu 3.12',
            question_type: 'radiogroup',
            question_options: [
                { option_text: 'Hoàn toàn không tích hợp' },
                { option_text: 'Tích hợp một phần nhỏ' },
                { option_text: 'Tích hợp các quy trình chính' },
                { option_text: 'Tích hợp hầu hết các quy trình' },
                { option_text: 'Tích hợp đầy đủ' },
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
