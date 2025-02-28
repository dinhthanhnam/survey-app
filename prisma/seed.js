import {PrismaClient} from "@prisma/client"
import { InstitutionsData } from "../src/data/institutions.js";
const prisma = new PrismaClient();

async function main() {
    // Dữ liệu cho credit_funds
    const institutionsData = [...InstitutionsData]; // Shallow copy

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
                'Đánh giá nhận thức, kỹ năng, mức độ sẵn sàng của nhân sự và lãnh đạo QTDND đối với chuyển đổi số (CĐS)',
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
        {
            name: 'John Doe',
            email: 'john.doe@example.com',
            phone: '0125623123',
            institution_id: 1,
            auth_status: 'unauthorized',
            belong_to_group: 'Leader', // ✅ Dùng đúng enum
        },
        {
            name: 'Jane Smith',
            email: 'jane.smith@example.com',
            phone: '0123213123',
            institution_id: 2,
            auth_status: 'unauthorized',
            belong_to_group: 'Officer', // ✅ Dùng đúng enum
        },
        {
            name: 'Alice Johnson',
            email: 'alice.johnson@example.com',
            phone: '0123123923',
            institution_id: 3,
            auth_status: 'unauthorized',
            belong_to_group: 'ITSup', // ✅ Dùng đúng enum
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
            question_target: ['Cán bộ nghiệp vụ'],
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
                'Anh/Chị có được đào tạo về nguyên tắc bảo mật dữ liệu trong công việc không?',
            question_name: 'Câu 1.3',
            question_type: 'radiogroup',
            question_target: [
                'Cán bộ nghiệp vụ',
                'Nhân viên CNTT & Hỗ trợ kỹ thuật',
            ],
            question_options: [
                {
                    option_text:
                        'Hoàn toàn không được đào tạo, không biết về bảo mật',
                },
                {
                    option_text: 'Được đào tạo nhưng chưa hiểu rõ',
                },
                {
                    option_text: 'Hiểu một số nguyên tắc cơ bản',
                },
                {
                    option_text: 'Hiểu rõ và bước đầu tuân thủ',
                },
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
            question_target: [
                'Cán bộ nghiệp vụ',
                'Nhân viên CNTT & Hỗ trợ kỹ thuật',
            ],
            question_options: [
                {
                    option_text: 'Không thực hiện chương trình đào tạo nào',
                    option_note: 'Nhân viên có kinh nghiệm hướng dẫn',
                },
                {
                    option_text: 'Tổ chức các buổi đào tạo nội bộ định kỳ',
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
                { 
                    option_text: 'Khác ...',
                    require_reason: 1,
                },
            ],
        },
        {
            question_text:
                'Anh/Chị đánh giá mức độ hiệu quả của các chương trình đào tạo nội bộ về CNTT và chuyển đổi số tại đơn vị như thế nào?',
            question_name: 'Câu 1.6',
            question_type: 'radiogroup',
            question_target: [
                'Cán bộ nghiệp vụ',
                'Nhân viên CNTT & Hỗ trợ kỹ thuật',
            ],
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
            question_target: [
                'Lãnh đạo & Quản lý',
                'Nhân viên CNTT & Hỗ trợ kỹ thuật',
            ],
            question_options: [
                { option_text: 'Không có nhân sự phụ trách' },
                { option_text: 'Cán bộ kiêm nhiệm cho CNTT' },
                { option_text: 'Có cán bộ phụ trách CNTT' },
                { option_text: 'Hợp tác với đối tác bên ngoài' },
                { 
                    option_text: 'Khác ...',
                    require_reason: 1,
                },
            ],
        },
        {
            question_text:
                'Đơn vị có gặp khó khăn trong việc tuyển dụng nhân sự CNTT chuyên trách không?',
            question_name: 'Câu 1.9',
            question_type: 'radiogroup',
            question_target: [
                'Lãnh đạo & Quản lý',
                'Nhân viên CNTT & Hỗ trợ kỹ thuật',
            ],
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
            question_target: ['Lãnh đạo & Quản lý', 'Cán bộ nghiệp vụ'],
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
            question_target: ['Lãnh đạo & Quản lý'],
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
            question_target: ['Lãnh đạo & Quản lý'],
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
            question_target: ['Lãnh đạo & Quản lý'],
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
            question_target: ['Cán bộ nghiệp vụ'],
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
            question_target: ['Cán bộ nghiệp vụ'],
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
            question_target: ['Cán bộ nghiệp vụ'],
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
            question_target: ['Cán bộ nghiệp vụ'],
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
            question_target: ['Lãnh đạo & Quản lý', 'Cán bộ nghiệp vụ'],
            question_options: [
                { option_text: 'Không có kế hoạch' },
                { option_text: 'Không có kế hoạch nhưng có nhu cầu' },
                {
                    option_text:
                        'Có kế hoạch sơ bộ và đang triển khai từng phần',
                },
                {
                    option_text:
                        'Có kế hoạch hoàn chỉnh và đã triển khai nhưng chưa hoàn thiện',
                },
                { option_text: 'Đã hoàn thiện và đang tối ưu' },
            ],
        },
        {
            question_text:
                'Mức độ tuân thủ các tiêu chuẩn ngành ngân hàng (NHNN, Basel II/III, ISO 20022, IFRS) trong quy trình nghiệp vụ tại đơn vị như thế nào?',
            question_name: 'Câu 2.8',
            question_type: 'radiogroup',
            question_target: ['Lãnh đạo & Quản lý'],
            question_options: [
                {
                    option_text: 'Hoàn toàn không tuân thủ',
                    option_note:
                        'Các quy trình chưa được chuẩn hóa, chưa áp dụng bất kỳ tiêu chuẩn nào của NHNN, Basel, ISO 20022 hoặc IFRS',
                },
                {
                    option_text: 'Không tuân thủ đầy đủ',
                    option_note:
                        'Có áp dụng một số quy định của NHNN nhưng chưa đáp ứng các tiêu chuẩn Basel, ISO 20022 hoặc IFRS',
                },
                {
                    option_text: 'Tuân thủ một phần',
                    option_note:
                        'Đã áp dụng một số tiêu chuẩn ngành nhưng chưa hoàn chỉnh hoặc chưa có sự đồng bộ giữa các hệ thống',
                },
                {
                    option_text: 'Tuân thủ tương đối tốt',
                    option_note:
                        'Hầu hết quy trình đã tuân thủ các tiêu chuẩn NHNN và một phần tiêu chuẩn quốc tế, nhưng chưa hoàn thiện về tích hợp dữ liệu hoặc hệ thống quản trị rủi ro',
                },
                {
                    option_text: 'Hoàn toàn tuân thủ',
                    option_note:
                        'Quy trình nghiệp vụ của đơn vị đã tuân thủ đầy đủ các quy định của NHNN, Basel, ISO 20022 và IFRS, có hệ thống tích hợp để đảm bảo tuân thủ tự động',
                },
            ],
        },
        {
            question_text:
                'Đơn vị đang gặp những rào cản nào khi chuẩn hóa quy trình để số hóa?',
            question_name: 'Câu 2.9',
            question_note: 'Có thể chọn nhiều đáp án',
            question_type: 'checkbox',
            question_target: ['Lãnh đạo & Quản lý'],
            question_options: [
                { option_text: 'Thiếu tài chính' },
                { option_text: 'Thiếu nhân lực chuyên môn' },
                { option_text: 'Thiếu hạ tầng công nghệ' },
                { option_text: 'Chưa có kế hoạch rõ ràng' },
                { 
                    option_text: 'Các rào cản khác',
                    require_reason: 1,
                },
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
                { 
                    option_text: 'Khác', 
                    require_reason: 1,
                },
            ],
        },
        {
            question_text:
                'Đơn vị có kế hoạch gì để khắc phục các rào cản trong số hóa quy trình?',
            question_name: 'Câu 2.11',
            question_type: 'radiogroup',
            question_target: ['Lãnh đạo & Quản lý'],
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
                { 
                    option_text: 'Giải pháp khác',
                    require_reason: 1, 
                },
            ],
        },
        {
            question_text:
                'Anh/Chị vui lòng cho biết đơn vị đang sử dụng các ứng dụng nào của các hệ thống Co-opBank cung cấp cho QTDND sau đây tại đơn vị?',
            question_name: 'Câu 2.13',
            question_type: 'checkbox',
            question_note: 'Có thể chọn nhiều đáp án',
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
                { 
                    option_text: 'Khác',
                    require_reason: 1,
                },
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
            question_target: ['Lãnh đạo & Quản lý'],
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
            question_target: ['Lãnh đạo & Quản lý'],
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
            question_target: ['Cán bộ nghiệp vụ'],
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
            question_target: ['Lãnh đạo & Quản lý'],
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
            question_target: ['Lãnh đạo & Quản lý'],
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
            question_target: ['Lãnh đạo & Quản lý'],
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
            question_target: [
                'Cán bộ nghiệp vụ',
                'Nhân viên CNTT & Hỗ trợ kỹ thuật',
            ],
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
            question_target: [
                'Cán bộ nghiệp vụ',
                'Nhân viên CNTT & Hỗ trợ kỹ thuật',
            ],
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
            question_target: ['Lãnh đạo & Quản lý'],
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
            question_target: [
                'Cán bộ nghiệp vụ',
                'Nhân viên CNTT & Hỗ trợ kỹ thuật',
            ],
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
            question_target: [
                'Cán bộ nghiệp vụ',
                'Nhân viên CNTT & Hỗ trợ kỹ thuật',
            ],
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
            question_target: ['Lãnh đạo & Quản lý'],
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
                'Mức độ sẵn sàng của nhân sự trong việc vận hành công nghệ mới như AI, điện toán đám mây tại đơn vị?',
            question_name: 'Câu 3.13',
            question_type: 'radiogroup',
            question_target: ['Lãnh đạo & Quản lý'],
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
                'Mức độ an toàn của hệ thống CNTT tại đơn vị trong việc bảo vệ dữ liệu khách hàng và giao dịch như thế nào?',
            question_name: 'Câu 4.1',
            question_type: 'radiogroup',
            question_target: ['Lãnh đạo & Quản lý'],
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
                'Đơn vị có chính sách bảo mật dữ liệu rõ ràng không?',
            question_name: 'Câu 4.2',
            question_type: 'radiogroup',
            question_target: ['Lãnh đạo & Quản lý'],
            question_options: [
                { option_text: 'Không có chính sách' },
                { option_text: 'Có chính sách nhưng chưa áp dụng' },
                { option_text: 'Có chính sách nhưng tuân thủ chưa đầy đủ' },
                { option_text: 'Chính sách bảo mật được tuân thủ tốt' },
                { option_text: 'Chính sách bảo mật được tuân thủ rất tốt' },
            ],
        },
        {
            question_text:
                'Nhân viên tại đơn vị có nhận thức đầy đủ về rủi ro an ninh mạng và bảo mật dữ liệu không?',
            question_name: 'Câu 4.3',
            question_type: 'radiogroup',
            question_target: ['Cán bộ nghiệp vụ'],
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
                'Đơn vị có tổ chức đào tạo định kỳ về nhận thức an ninh mạng và phòng chống rủi ro công nghệ không?',
            question_name: 'Câu 4.4',
            question_type: 'radiogroup',
            question_target: ['Nhân viên CNTT & Hỗ trợ kỹ thuật'],
            question_options: [
                { option_text: 'Chưa có chương trình đào tạo' },
                { option_text: 'Có kế hoạch nhưng chưa đào tạo' },
                { option_text: 'Đào tạo không thường xuyên' },
                { option_text: 'Đào tạo thường xuyên nhưng chưa hiệu quả' },
                { option_text: 'Đào tạo thường xuyên có hiệu quả' },
                {
                    option_text:
                        'Đào tạo thường xuyên có hiệu quả và bám sát thực tế',
                },
            ],
        },
        {
            question_text:
                'Khi gặp sự cố an ninh mạng (rò rỉ dữ liệu, tấn công mạng, virus…), anh/chị có biết cách xử lý không?',
            question_name: 'Câu 4.5',
            question_type: 'radiogroup',
            question_target: ['Cán bộ nghiệp vụ'],
            question_options: [
                { option_text: 'Không biết cách xử lý' },
                { option_text: 'Có thể xử lý với sự hỗ trợ từ IT' },
                { option_text: 'Có thể xử lý cơ bản' },
                { option_text: 'Có thể xử lý thành thạo' },
                { option_text: 'Thành thạo & có thể hướng dẫn người khác' },
            ],
        },
        {
            question_text:
                'Đơn vị đã có kế hoạch ứng phó rõ ràng khi xảy ra sự cố an ninh mạng chưa?',
            question_name: 'Câu 4.6',
            question_type: 'radiogroup',
            question_target: ['Lãnh đạo & Quản lý'],
            question_options: [
                { option_text: 'Chưa có kế hoạch' },
                { option_text: 'Có kế hoạch một phần' },
                { option_text: 'Kế hoạch đầy đủ nhưng chưa được thử nghiệm' },
                { option_text: 'Kế hoạch đầy đủ và bắt đầu thử nghiệm' },
                { option_text: 'Kế hoạch đầy đủ và đã áp dụng' },
            ],
        },
        {
            question_text:
                'Đơn vị đã thực hiện diễn tập các kịch bản ứng phó với sự cố an ninh mạng chưa?',
            question_name: 'Câu 4.7',
            question_type: 'radiogroup',
            question_target: ['Nhân viên CNTT & Hỗ trợ kỹ thuật'],
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
                'Khi gặp sự cố thực tế, đơn vị có thể xử lý ngay lập tức không?',
            question_name: 'Câu 4.8',
            question_type: 'radiogroup',
            question_target: ['Cán bộ nghiệp vụ'],
            question_options: [
                { option_text: 'Hoàn toàn không có phương án' },
                { option_text: 'Cần thời gian dài để khắc phục' },
                { option_text: 'Xử lý cơ bản nhưng cần hỗ trợ' },
                { option_text: 'Xử lý nhanh & hiệu quả' },
                { option_text: 'Xử lý rất tốt & có thể phòng ngừa sự cố' },
            ],
        },
        {
            question_text:
                'Đơn vị đã từng gặp phải sự cố an ninh mạng nào chưa?',
            question_name: 'Câu 4.9',
            question_type: 'checkbox',
            question_target: ['Lãnh đạo & Quản lý'],
            question_note: 'Có thể chọn nhiều đáp án',
            question_options: [
                { option_text: 'Lộ dữ liệu khách hàng' },
                {
                    option_text: 'Bị tấn công mạng',
                    option_note: 'DDoS, Malware, Phishing',
                },
                { option_text: 'Virus/Trojan ảnh hưởng đến hệ thống' },
                { option_text: 'Nhân viên vô tình gây ra lỗi bảo mật' },
                { option_text: 'Chưa từng gặp sự cố nào' },
                { 
                    option_text: 'Khác',
                    require_reason: 1, 
                    option_note: 'Ghi tên sự cố đã gặp' 
                },
            ],
        },
        {
            question_text:
                'Đơn vị đã trang bị các công cụ giám sát an ninh mạng đầy đủ chưa?',
            question_name: 'Câu 4.10',
            question_type: 'radiogroup',
            question_target: ['Nhân viên CNTT & Hỗ trợ kỹ thuật'],
            question_options: [
                { option_text: 'Chưa có công cụ' },
                { option_text: 'Trang bị cơ bản nhưng chưa sử dụng hiệu quả' },
                { option_text: 'Đã trang bị đầy đủ' },
                { option_text: 'Đã trang bị đầy đủ và sử dụng hiệu quả' },
                { option_text: 'Đã trang bị và liên tục cải tiến' },
            ],
        },
        {
            question_text:
                'Các công cụ giám sát an ninh mạng tại đơn vị có hoạt động hiệu quả không?',
            question_name: 'Câu 4.11',
            question_type: 'radiogroup',
            question_target: ['Cán bộ nghiệp vụ'],
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
                'Mức độ tuân thủ các tiêu chuẩn bảo mật theo quy định của NHNN và ngành ngân hàng tại đơn vị như thế nào?',
            question_name: 'Câu 4.12',
            question_type: 'radiogroup',
            question_target: ['Lãnh đạo & Quản lý'],
            question_options: [
                { option_text: 'Hoàn toàn không tuân thủ' },
                { option_text: 'Tuân thủ ở mức cơ bản' },
                { option_text: 'Tuân thủ và có kiểm tra định kỳ' },
                { option_text: 'Hoàn toàn tuân thủ' },
                { option_text: 'Hoàn toàn tuân thủ và liên tục cập nhật' },
            ],
        },
        {
            question_text:
                'Đơn vị có nhận được sự hỗ trợ từ các tổ chức bên ngoài trong việc đảm bảo an ninh mạng không?',
            question_name: 'Câu 4.13',
            question_type: 'radiogroup',
            question_target: ['Nhân viên CNTT & Hỗ trợ kỹ thuật'],
            question_options: [
                { option_text: 'Không có hỗ trợ' },
                { option_text: 'Hỗ trợ hạn chế' },
                { option_text: 'Hỗ trợ trung bình' },
                { option_text: 'Hỗ trợ tốt' },
                { option_text: 'Hỗ trợ rất tốt' },
            ],
        },
        {
            question_text:
                'Anh/Chị đánh giá như thế nào về công tác quản trị CNTT của QTDND trong việc đảm bảo an ninh thông tin và quản trị rủi ro công nghệ?',
            question_name: 'Câu 4.14',
            question_type: 'group',
            question_target: ['Lãnh đạo & Quản lý'],
        },
        {
            question_text:
                'QTDND đã xây dựng và cập nhật thường xuyên các chính sách quản trị CNTT theo quy định của NHNN nhằm đảm bảo an ninh thông tin.',
            question_name: 'Câu 4.14.1',
            question_type: 'radiogroup',
            question_target: ['Lãnh đạo & Quản lý'],
            question_options: [
                { option_text: 'Hoàn toàn không đồng ý' },
                { option_text: 'Không đồng ý' },
                { option_text: 'Trung lập' },
                { option_text: 'Đồng ý' },
                { option_text: 'Hoàn toàn đồng ý' },
            ],
        },
        {
            question_text:
                'Việc ứng dụng CNTT trong quản trị có đảm bảo các quy chế, quy trình nghiệp vụ với các chốt kiểm soát bảo mật đầy đủ.',
            question_name: 'Câu 4.14.2',
            question_type: 'radiogroup',
            question_target: ['Lãnh đạo & Quản lý'],
            question_options: [
                { option_text: 'Hoàn toàn không đồng ý' },
                { option_text: 'Không đồng ý' },
                { option_text: 'Trung lập' },
                { option_text: 'Đồng ý' },
                { option_text: 'Hoàn toàn đồng ý' },
            ],
        },
        {
            question_text:
                'Việc ứng dụng CNTT tại QTDND giúp phát hiện và giảm thiểu các lỗ hổng bảo mật trong quy trình nghiệp vụ.',
            question_name: 'Câu 4.14.3',
            question_type: 'radiogroup',
            question_target: ['Lãnh đạo & Quản lý'],
            question_options: [
                { option_text: 'Hoàn toàn không đồng ý' },
                { option_text: 'Không đồng ý' },
                { option_text: 'Trung lập' },
                { option_text: 'Đồng ý' },
                { option_text: 'Hoàn toàn đồng ý' },
            ],
        },
        {
            question_text:
                'QTDND đã có cơ chế giám sát và kiểm tra định kỳ hệ thống CNTT nhằm đảm bảo an toàn thông tin',
            question_name: 'Câu 4.14.4',
            question_type: 'radiogroup',
            question_target: ['Lãnh đạo & Quản lý'],
            question_options: [
                { option_text: 'Hoàn toàn không đồng ý' },
                { option_text: 'Không đồng ý' },
                { option_text: 'Trung lập' },
                { option_text: 'Đồng ý' },
                { option_text: 'Hoàn toàn đồng ý' },
            ],
        },
        {
            question_text:
                'Đơn vị có quy trình xử lý sự cố bảo mật CNTT rõ ràng và hiệu quả khi có rủi ro xảy ra.',
            question_name: 'Câu 4.14.5',
            question_type: 'radiogroup',
            question_target: ['Lãnh đạo & Quản lý'],
            question_options: [
                { option_text: 'Hoàn toàn không đồng ý' },
                { option_text: 'Không đồng ý' },
                { option_text: 'Trung lập' },
                { option_text: 'Đồng ý' },
                { option_text: 'Hoàn toàn đồng ý' },
            ],
        },
        {
            question_text:
                'QTDND đã triển khai các tài liệu hướng dẫn sử dụng hệ thống CNTT, bao gồm check-list kiểm tra vận hành và quy trình bảo trì định kỳ',
            question_name: 'Câu 4.14.6',
            question_type: 'radiogroup',
            question_target: ['Lãnh đạo & Quản lý'],
            question_options: [
                { option_text: 'Hoàn toàn không đồng ý' },
                { option_text: 'Không đồng ý' },
                { option_text: 'Trung lập' },
                { option_text: 'Đồng ý' },
                { option_text: 'Hoàn toàn đồng ý' },
            ],
        },
        {
            question_text:
                'Đơn vị có quy trình rõ ràng để xử lý sự cố CNTT và sự cố bảo mật, giúp giảm thiểu rủi ro công nghệ.',
            question_name: 'Câu 4.14.7',
            question_type: 'radiogroup',
            question_target: ['Lãnh đạo & Quản lý'],
            question_options: [
                { option_text: 'Hoàn toàn không đồng ý' },
                { option_text: 'Không đồng ý' },
                { option_text: 'Trung lập' },
                { option_text: 'Đồng ý' },
                { option_text: 'Hoàn toàn đồng ý' },
            ],
        },
        {
            question_text:
                'Hệ thống CNTT của QTDND có ghi nhận và lưu trữ nhật ký truy cập (log system) để kiểm tra và theo dõi bảo mật.',
            question_name: 'Câu 4.14.8',
            question_type: 'radiogroup',
            question_target: ['Lãnh đạo & Quản lý'],
            question_options: [
                { option_text: 'Hoàn toàn không đồng ý' },
                { option_text: 'Không đồng ý' },
                { option_text: 'Trung lập' },
                { option_text: 'Đồng ý' },
                { option_text: 'Hoàn toàn đồng ý' },
            ],
        },
        {
            question_text:
                'Đơn vị đã xây dựng quy trình phân loại lỗi, sự cố và tiêu chuẩn dịch vụ (SLA) cho việc giải quyết, khắc phục lỗi CNTT.',
            question_name: 'Câu 4.14.9',
            question_type: 'radiogroup',
            question_target: ['Lãnh đạo & Quản lý'],
            question_options: [
                { option_text: 'Hoàn toàn không đồng ý' },
                { option_text: 'Không đồng ý' },
                { option_text: 'Trung lập' },
                { option_text: 'Đồng ý' },
                { option_text: 'Hoàn toàn đồng ý' },
            ],
        },
        {
            question_text:
                'Hầu hết các lỗi hoặc sự cố về CNTT đều được xử lý, khắc phục theo đúng quy định và thời gian SLA cam kết',
            question_name: 'Câu 4.14.10',
            question_type: 'radiogroup',
            question_target: ['Lãnh đạo & Quản lý'],
            question_options: [
                { option_text: 'Hoàn toàn không đồng ý' },
                { option_text: 'Không đồng ý' },
                { option_text: 'Trung lập' },
                { option_text: 'Đồng ý' },
                { option_text: 'Hoàn toàn đồng ý' },
            ],
        },
        {
            question_text:
                'Các sự cố an ninh mạng và CNTT tại đơn vị được ghi nhận, phân loại và lưu trữ để phục vụ công tác thống kê, đánh giá và cải thiện vận hành.',
            question_name: 'Câu 4.14.11',
            question_type: 'radiogroup',
            question_target: ['Lãnh đạo & Quản lý'],
            question_options: [
                { option_text: 'Hoàn toàn không đồng ý' },
                { option_text: 'Không đồng ý' },
                { option_text: 'Trung lập' },
                { option_text: 'Đồng ý' },
                { option_text: 'Hoàn toàn đồng ý' },
            ],
        },
        {
            question_text:
                'Đơn vị hiện đang ở mức độ nào trong quá trình số hóa dữ liệu? (Số hóa bao gồm việc chuyển đổi dữ liệu từ dạng giấy tờ sang dạng số và có hệ thống lưu trữ, quản lý tập trung.',
            question_name: 'Câu 5.1',
            question_type: 'radiogroup',
            question_target: [
                'Lãnh đạo & Quản lý',
                'Nhân viên CNTT & Hỗ trợ kỹ thuật',
            ],
            question_note:
                'Vui lòng chọn mức độ phù hợp nhất với tình trạng số hóa dữ liệu tại đơn vị của Anh/Chị',
            question_options: [
                {
                    option_text: 'Chưa số hóa',
                    option_note:
                        'Dữ liệu chủ yếu được lưu trữ thủ công, không có hệ thống máy tính hỗ trợ.',
                },
                {
                    option_text: 'Số hóa một phần',
                    option_note:
                        'Chỉ có một số dữ liệu được lưu trên máy tính nhưng chưa có hệ thống quản lý tập trung.',
                },
                {
                    option_text: 'Số hóa gần hoàn chỉnh',
                    option_note:
                        'Hầu hết dữ liệu đã lưu trên hệ thống nhưng chưa kết nối đồng bộ.',
                },
                {
                    option_text: 'Số hóa hoàn chỉnh',
                    option_note:
                        'Dữ liệu được lưu trữ hoàn toàn trên hệ thống, có khả năng truy xuất nhanh chóng.',
                },
                {
                    option_text:
                        'Số hóa hoàn chỉnh nhưng chưa có chiến lược khai thác',
                    option_note:
                        'Dữ liệu đã số hóa đầy đủ nhưng chưa được sử dụng hiệu quả để hỗ trợ ra quyết định hoặc phân tích.',
                },
                {
                    option_text: 'Số hóa hoàn chỉnh và tối ưu',
                    option_note:
                        'Dữ liệu được số hóa toàn diện, có hệ thống phân tích tự động, hỗ trợ ra quyết định và tối ưu hóa quy trình.',
                },
            ],
        },
        {
            question_text:
                'Hệ thống lưu trữ dữ liệu tại đơn vị có đảm bảo khả năng truy xuất và khai thác dữ liệu hiệu quả không?',
            question_name: 'Câu 5.2',
            question_type: 'radiogroup',
            question_target: [
                'Lãnh đạo & Quản lý',
                'Nhân viên CNTT & Hỗ trợ kỹ thuật',
            ],
            question_note: 'Vui lòng chọn mức độ phù hợp nhất.',
            question_options: [
                { option_text: 'Không biết/không rõ' },
                { option_text: 'Dữ liệu lưu trữ phân tán, khó truy xuất' },
                {
                    option_text:
                        'Lưu trữ có hệ thống nhưng chưa đảm bảo truy xuất dễ dàng',
                },
                {
                    option_text:
                        'Dữ liệu lưu trữ tập trung, dễ truy xuất nhưng chưa có công cụ phân tích',
                },
                {
                    option_text:
                        'Hệ thống lưu trữ đầy đủ, truy xuất nhanh, có tích hợp công cụ khai thác dữ liệu.',
                },
            ],
        },
        {
            question_text:
                'Đơn vị đang sử dụng loại công cụ phân tích dữ liệu nào?',
            question_name: 'Câu 5.3',
            question_type: 'radiogroup',
            question_target: ['Cán bộ nghiệp vụ'],
            question_note: 'Vui lòng chọn mức độ phù hợp nhất.',
            question_options: [
                { option_text: 'Không biết/không rõ' },
                { option_text: 'Không sử dụng' },
                { option_text: 'Sử dụng Excel, báo cáo thủ công' },
                {
                    option_text:
                        'Sử dụng phần mềm phân tích dữ liệu truyền thống',
                },
                {
                    option_text: 'Sử dụng phân tích dữ liệu hiện đại',
                    option_note: 'BI, Dashboard.',
                },
                {
                    option_text: 'Sử dụng công nghệ phân tích tiên tiến',
                    option_note: 'AI/Big Data.',
                },
            ],
        },
        {
            question_text:
                'Công cụ phân tích dữ liệu hiện tại của đơn vị được sử dụng ở mức độ nào?',
            question_name: 'Câu 5.4',
            question_type: 'radiogroup',
            question_target: [
                'Lãnh đạo & Quản lý',
                'Nhân viên CNTT & Hỗ trợ kỹ thuật',
            ],
            question_options: [
                {
                    option_text: 'Không sử dụng',
                    option_note: 'Chưa có hệ thống phân tích dữ liệu.',
                },
                {
                    option_text:
                        'Chỉ sử dụng báo cáo thủ công, chưa có công cụ phân tích',
                },
                {
                    option_text:
                        'Có sử dụng công cụ phân tích nhưng còn rời rạc',
                },
                { option_text: 'Sử dụng thường xuyên nhưng chưa tối ưu' },
                {
                    option_text:
                        'Sử dụng đầy đủ, dữ liệu hỗ trợ tốt cho ra quyết định',
                },
            ],
        },
        {
            question_text:
                'Đơn vị có sử dụng dữ liệu khách hàng vào các hoạt động sau không?',
            question_name: 'Câu 5.5',
            question_type: 'checkbox',
            question_target: ['Cán bộ nghiệp vụ'],
            question_note: 'Có thể chọn nhiều đáp án.',
            question_options: [
                { option_text: 'Không sử dụng' },
                { option_text: 'Cá nhân hóa sản phẩm/dịch vụ' },
                { option_text: 'Phân tích hành vi khách hàng' },
                { option_text: 'Quản lý tín dụng & rủi ro' },
                { option_text: 'Dự báo nhu cầu thị trường' },
                { option_text: 'Không biết/không rõ' },
            ],
        },
        {
            question_text:
                'Đơn vị đã có chiến lược cụ thể để khai thác dữ liệu khách hàng nhằm quản trị rủi ro tín dụng và hỗ trợ ra quyết định chưa?',
            question_name: 'Câu 5.6',
            question_type: 'radiogroup',
            question_target: ['Cán bộ nghiệp vụ'],
            question_options: [
                {
                    option_text: 'Chưa có chiến lược',
                    option_note:
                        'Dữ liệu khách hàng chưa được thu thập, quản lý tập trung hoặc khai thác.',
                },
                {
                    option_text: 'Có chiến lược sơ bộ',
                    option_note:
                        'Đơn vị đã có định hướng khai thác dữ liệu nhưng chưa triển khai giải pháp cụ thể.',
                },
                {
                    option_text: 'Chiến lược gần hoàn chỉnh',
                    option_note:
                        'Đã có kế hoạch quản lý dữ liệu tập trung, từng bước ứng dụng AI & phân tích dữ liệu nhưng chưa triển khai đồng bộ.',
                },
                {
                    option_text: 'Chiến lược hoàn chỉnh',
                    option_note:
                        'Hệ thống quản lý dữ liệu tập trung đã được triển khai, có kế hoạch ứng dụng AI & phân tích dữ liệu lớn.',
                },
                {
                    option_text: 'Chiến lược hoàn chỉnh và đang triển khai',
                    option_note:
                        'Dữ liệu đã được số hóa và khai thác bằng AI/Big Data để quản trị rủi ro, tối ưu hóa hoạt động và hỗ trợ ra quyết định chiến lược.',
                },
            ],
        },
        {
            question_text:
                'Đơn vị có sử dụng dữ liệu phân tích để cải thiện hiệu suất kinh doanh không?',
            question_name: 'Câu 5.7',
            question_type: 'radiogroup',
            question_target: ['Cán bộ nghiệp vụ'],
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
                'Dữ liệu nào đã được liên thông với hệ thống NHNN/NHHTX?',
            question_name: 'Câu 5.8',
            question_type: 'checkbox',
            question_target: ['Lãnh đạo & Quản lý'],
            question_note: 'Có thể chọn nhiều đáp án.',
            question_options: [
                { option_text: 'Chưa liên thông dữ liệu nào' },
                { option_text: 'Giao dịch tín dụng' },
                { option_text: 'Dữ liệu tài khoản' },
                { option_text: 'Thông tin khách hàng' },
                { option_text: 'Báo cáo tài chính' },
                { 
                    option_text: 'Khác',
                    require_reason: 1,
                    option_note: 'Vui lòng ghi rõ...' },
            ],
        },
        {
            question_text:
                'Mức độ liên thông dữ liệu của hệ thống tại đơn vị với các nền tảng ngân hàng số và hệ thống bên ngoài như thế nào?',
            question_name: 'Câu 5.9',
            question_type: 'radiogroup',
            question_target: [
                'Lãnh đạo & Quản lý',
                'Nhân viên CNTT & Hỗ trợ kỹ thuật',
            ],
            question_options: [
                { option_text: 'Hoàn toàn không có kết nối liên thông' },
                { option_text: 'Chỉ liên thông một số nghiệp vụ cơ bản' },
                {
                    option_text:
                        'Đã liên thông nhưng nhưng còn gặp hạn chế về mặt kỹ thuật',
                },
                { option_text: 'Đã liên thông nhưng hoạt động chưa ổn định' },
                {
                    option_text:
                        'Liên thông hoàn chỉnh, hoạt động ổn định và hiệu quả',
                },
            ],
        },
        {
            question_text:
                'Anh/Chị hãy đánh giá mức độ đồng ý của mình đối với các nhận định liên quan đến việc quản lý thông tin, dữ liệu phục vụ công việc của QTDND.',
            question_name: 'Câu 5.10',
            question_type: 'group',
            question_target: ['Lãnh đạo & Quản lý'],
        },
        {
            question_text:
                'Có thể dễ dàng có đầy đủ các thông tin theo yêu cầu',
            question_name: 'Câu 5.10.1',
            question_type: 'radiogroup',
            question_target: ['Lãnh đạo & Quản lý'],
            question_options: [
                { option_text: 'Hoàn toàn không đồng ý' },
                { option_text: 'Không đồng ý' },
                { option_text: 'Trung lập' },
                { option_text: 'Đồng ý' },
                { option_text: 'Hoàn toàn đồng ý' },
            ],
        },
        {
            question_text:
                'Việc tập hợp thông tin, dữ liệu được thực hiện nhanh chóng',
            question_name: 'Câu 5.10.2',
            question_type: 'radiogroup',
            question_target: ['Lãnh đạo & Quản lý'],
            question_options: [
                { option_text: 'Hoàn toàn không đồng ý' },
                { option_text: 'Không đồng ý' },
                { option_text: 'Trung lập' },
                { option_text: 'Đồng ý' },
                { option_text: 'Hoàn toàn đồng ý' },
            ],
        },
        {
            question_text:
                'Các thông tin được cung cấp luôn đảm bảo sự chính xác và nhất quán',
            question_name: 'Câu 5.10.3',
            question_type: 'radiogroup',
            question_target: ['Lãnh đạo & Quản lý'],
            question_options: [
                { option_text: 'Hoàn toàn không đồng ý' },
                { option_text: 'Không đồng ý' },
                { option_text: 'Trung lập' },
                { option_text: 'Đồng ý' },
                { option_text: 'Hoàn toàn đồng ý' },
            ],
        },
        {
            question_text:
                'Việc tập hợp thông tin, dữ liệu mất nhiều thời gian, công sức và có thể không đầy đủ ',
            question_name: 'Câu 5.10.4',
            question_type: 'radiogroup',
            question_target: ['Lãnh đạo & Quản lý'],
            question_options: [
                { option_text: 'Hoàn toàn không đồng ý' },
                { option_text: 'Không đồng ý' },
                { option_text: 'Trung lập' },
                { option_text: 'Đồng ý' },
                { option_text: 'Hoàn toàn đồng ý' },
            ],
        },
        {
            question_text:
                'Hiện tại, QTDND đang áp dụng phương thức nào để quản lý thông tin khách hàng?',
            question_name: 'Câu 5.11',
            question_target: ['Lãnh đạo & Quản lý'],
            question_type: 'checkbox',
            question_note: 'Chọn tất cả phương án phù hợp.',
            question_options: [
                {
                    option_text:
                        'Quản lý tập trung trên phần mềm quản trị khách hàng',
                    option_note: 'CRM chuyên dụng.',
                },
                {
                    option_text:
                        'Chưa có phần mềm CRM nhưng đã có đầu mối xây dựng và cập nhật thông tin khách hàng định kỳ',
                },
                {
                    option_text:
                        'Thông tin khách hàng do nhiều người quản lý, dưới các hình thức CSDL khác nhau để đảm bảo tính linh hoạt',
                },
                {
                    option_text:
                        'Quản lý thông tin khách hàng trong phần mềm nghiệp vụ ngân hàng lõi',
                    option_note: 'Core Banking.',
                },
                {
                    option_text: 'Cách thức khác',
                    require_reason: 1,
                    option_note: 'Vui lòng mô tả...',
                },
            ],
        },
        {
            question_text:
                'Hiện tại, Anh/Chị đang sử dụng các phương thức nào để lưu trữ thông tin và dữ liệu phục vụ công việc?',
            question_name: 'Câu 5.12',
            question_type: 'checkbox',
            question_target: ['Nhân viên CNTT & Hỗ trợ kỹ thuật'],
            question_note: 'Chọn tất cả các phương án phù hợp.',
            question_options: [
                {
                    option_text: 'Lưu trữ trên máy tính cá nhân',
                    option_note:
                        'Mỗi cá nhân tự tổ chức quản lý dữ liệu theo cách riêng của mình.',
                },
                {
                    option_text: 'Lưu trữ trên Server dùng chung',
                    option_note:
                        'Có quy định tổ chức quản lý dữ liệu và được thống nhất trong đơn vị.',
                },
                {
                    option_text: 'Lưu trữ trên Web Server dùng chung',
                    option_note:
                        'Dữ liệu được tổ chức quản lý theo quy định chung và có thể truy cập từ xa.',
                },
                {
                    option_text: 'Lưu trữ trên dịch vụ đám mây',
                    option_note:
                        'Google Drive, OneDrive, Dropbox… để chia sẻ và đồng bộ dữ liệu.',
                },
                {
                    option_text:
                        'Lưu trữ trên hệ thống quản lý tài liệu nội bộ',
                    option_note:
                        'DMS, ECM, v.v. Hệ thống được thiết kế để quản lý, tìm kiếm và phân loại dữ liệu một cách khoa học.',
                },
                {
                    option_text:
                        'Lưu trữ trên hệ thống Core Banking hoặc phần mềm chuyên dụng khác',
                    option_note:
                        'Thông tin lưu trên hệ thống ngân hàng lõi hoặc các phần mềm chuyên biệt.',
                },
                {
                    option_text: 'Cách thức khác',
                    require_reason: 1,
                    option_note: 'Vui lòng mô tả...',
                },
            ],
        },
        {
            question_text:
                'Đơn vị có gặp khó khăn gì khi khai thác dữ liệu số để phục vụ kinh doanh?',
            question_name: 'Câu 5.13',
            question_type: 'checkbox',
            question_target: [
                'Cán bộ nghiệp vụ',
                'Nhân viên CNTT & Hỗ trợ kỹ thuật',
            ],
            question_note: 'Có thể chọn nhiều đáp án.',
            question_options: [
                { option_text: 'Dữ liệu không đầy đủ, thiếu chính xác' },
                { option_text: 'Dữ liệu bị phân tán, không đồng bộ' },
                { option_text: 'Thiếu công cụ phân tích dữ liệu hiệu quả' },
                { option_text: 'Nhân sự chưa có kỹ năng khai thác dữ liệu' },
                { option_text: 'Lo ngại về bảo mật dữ liệu và quyền riêng tư' },
                { option_text: 'Không có dữ liệu lịch sử để phân tích' },
            ],
        },
        {
            question_text:
                'Theo anh/chị, đơn vị có gặp khó khăn gì trong việc số hóa và khai thác dữ liệu?',
            question_name: 'Câu 5.14',
            question_type: 'radiogroup',
            question_options: [
                {
                    option_text: 'Thiếu cơ sở hạ tầng công nghệ',
                    option_note:
                        'Chưa có hệ thống phần mềm quản lý tập trung, thiếu máy chủ, hệ thống lưu trữ chưa tối ưu...',
                },
                {
                    option_text:
                        'Thiếu nhân sự có chuyên môn về phân tích & khai thác dữ liệu',
                    option_note:
                        'Nhân sự chưa được đào tạo chuyên sâu về quản trị dữ liệu, chưa có bộ phận chuyên trách...',
                },
                {
                    option_text: 'Thiếu công cụ hỗ trợ phân tích dữ liệu',
                    option_note:
                        'Chưa có phần mềm phân tích chuyên sâu, chủ yếu dùng Excel hoặc báo cáo thủ công...',
                },
                {
                    option_text: 'Lo ngại về bảo mật & an toàn dữ liệu',
                    option_note:
                        'Dữ liệu có nguy cơ rò rỉ, chưa có hệ thống kiểm soát truy cập chặt chẽ...',
                },
                {
                    option_text: 'Chi phí đầu tư cao, ngân sách hạn chế',
                    option_note:
                        'Chưa có nguồn vốn đủ để triển khai hệ thống số hóa đồng bộ...',
                },
                {
                    option_text: 'Rào cản từ tư duy lãnh đạo & nhân viên',
                    option_note:
                        'Ngại thay đổi, chưa sẵn sàng áp dụng công nghệ mới...',
                },
                {
                    option_text: 'KKhác',
                    option_note: 'Vui lòng mô tả thêm...',
                },
            ],
        },
        {
            question_text:
                'QTDND của anh chị đã và đang triển khai thực hiện cung ứng sản phẩm dịch vụ ngân hàng số ở cấp độ nào?',
            question_name: 'Câu 6.1',
            question_type: 'radiogroup',
            question_target: ['Lãnh đạo & Quản lý'],
            question_options: [
                {
                    option_text:
                        'Chưa thực hiện cung ứng sản phẩm dịch vụ ngân hàng số',
                },
                {
                    option_text:
                        'Làm đại lý cung ứng sản phẩm dịch vụ ngân hàng số cho NHHTX',
                },
                {
                    option_text:
                        'Làm đại lý cung ứng sản phẩm dịch vụ ngân hàng điện tử cho các Tổ chức tín dụng khác và các công ty Fintech…',
                },
                {
                    option_text:
                        'Tự cung ứng sản phẩm dịch vụ ngân hàng số qua app riêng của Quỹ',
                },
                {
                    option_text:
                        'Tự triển khai dịch vụ ngân hàng số và có hợp tác với các TCTD khác để cung ứng dịch vụ',
                },
            ],
        },
        {
            question_text:
                'Cho phép khách hàng, thành viên của Quỹ thanh toán/chuyển tiền 247 chưa?',
            question_name: 'Câu 6.2',
            question_type: 'radiogroup',
            question_target: ['Lãnh đạo & Quản lý'],
            question_note: 'Chọn đáp án đúng nhất với đơn vị.',
            question_options: [
                { option_text: 'Chưa có kế hoạch triển khai' },
                {
                    option_text:
                        'Có kế hoạch thực hiện trong thời gian 5 năm tới',
                },
                {
                    option_text:
                        'Có kế hoạch thực hiện trong thời gian 3 năm tới',
                },
                {
                    option_text:
                        'Có kế hoạch thực hiện trong thời gian 1 năm tới',
                },
                { option_text: 'Đã triển khai nhưng chưa hiệu quả' },
                { option_text: 'Đã triển khai và hoạt động tốt' },
                { option_text: 'Không biết/không rõ' },
            ],
        },
        {
            question_text:
                'Cho phép khách hàng, thành viên của Quỹ mở sổ tiết kiệm online:',
            question_name: 'Câu 6.3',
            question_target: ['Lãnh đạo & Quản lý', 'Cán bộ nghiệp vụ'],
            question_type: 'radiogroup',
            question_note: 'Chọn đáp án đúng nhất với đơn vị.',
            question_options: [
                { option_text: 'Chưa có kế hoạch triển khai' },
                {
                    option_text:
                        'Có kế hoạch thực hiện trong thời gian 5 năm tới',
                },
                {
                    option_text:
                        'Có kế hoạch thực hiện trong thời gian 3 năm tới',
                },
                {
                    option_text:
                        'Có kế hoạch thực hiện trong thời gian 1 năm tới',
                },
                { option_text: 'Đã triển khai nhưng chưa hiệu quả' },
                { option_text: 'Đã triển khai và hoạt động tốt' },
                { option_text: 'Không biết/không rõ' },
            ],
        },
        {
            question_text:
                'Cho phép khách hàng, thành viên của Quỹ đăng ký vay vốn online:',
            question_name: 'Câu 6.4',
            question_target: ['Lãnh đạo & Quản lý', 'Cán bộ nghiệp vụ'],
            question_type: 'radiogroup',
            question_note: 'Chọn đáp án đúng nhất với đơn vị.',
            question_options: [
                { option_text: 'Chưa có kế hoạch triển khai' },
                {
                    option_text:
                        'Có kế hoạch thực hiện trong thời gian 5 năm tới',
                },
                {
                    option_text:
                        'Có kế hoạch thực hiện trong thời gian 3 năm tới',
                },
                {
                    option_text:
                        'Có kế hoạch thực hiện trong thời gian 1 năm tới',
                },
                { option_text: 'Đã triển khai nhưng chưa hiệu quả' },
                { option_text: 'Đã triển khai và hoạt động tốt' },
                { option_text: 'Không biết/không rõ' },
            ],
        },
        {
            question_text:
                'Cho phép khách hàng, thành viên của Quỹ tra cứu số dư, quản lý các loại tài khoản tiền gửi, tiền vay online:',
            question_name: 'Câu 6.5',
            question_target: ['Lãnh đạo & Quản lý', 'Cán bộ nghiệp vụ'],
            question_type: 'radiogroup',
            question_note: 'Chọn đáp án đúng nhất với đơn vị.',
            question_options: [
                { option_text: 'Chưa có kế hoạch triển khai' },
                {
                    option_text:
                        'Có kế hoạch thực hiện trong thời gian 5 năm tới',
                },
                {
                    option_text:
                        'Có kế hoạch thực hiện trong thời gian 3 năm tới',
                },
                {
                    option_text:
                        'Có kế hoạch thực hiện trong thời gian 1 năm tới',
                },
                { option_text: 'Đã triển khai nhưng chưa hiệu quả' },
                { option_text: 'Đã triển khai và hoạt động tốt' },
                { option_text: 'Không biết/không rõ' },
            ],
        },
        {
            question_text:
                'Cho phép khách hàng, thành viên của Quỹ thực hiện dịch vụ phi ngân hàng (Đặt vé xem phim, mua vé máy bay, thanh toán hóa đơn...) online:',
            question_name: 'Câu 6.6',
            question_target: ['Lãnh đạo & Quản lý', 'Cán bộ nghiệp vụ'],
            question_type: 'radiogroup',
            question_note: 'Chọn đáp án đúng nhất với đơn vị.',
            question_options: [
                { option_text: 'Chưa có kế hoạch triển khai' },
                {
                    option_text:
                        'Có kế hoạch thực hiện trong thời gian 5 năm tới',
                },
                {
                    option_text:
                        'Có kế hoạch thực hiện trong thời gian 3 năm tới',
                },
                {
                    option_text:
                        'Có kế hoạch thực hiện trong thời gian 1 năm tới',
                },
                { option_text: 'Đã triển khai nhưng chưa hiệu quả' },
                { option_text: 'Đã triển khai và hoạt động tốt' },
                { option_text: 'Không biết/không rõ' },
            ],
        },
        {
            question_text:
                'Khách hàng đánh giá mức độ hài lòng với các sản phẩm số hóa đã được cung cấp tại Quỹ như thế nào?',
            question_name: 'Câu 6.7',
            question_type: 'radiogroup',
            question_target: ['Lãnh đạo & Quản lý', 'Cán bộ nghiệp vụ'],
            question_options: [
                {
                    option_text: 'Rất không hài lòng',
                    option_note: 'Dịch vụ kém, khó sử dụng, nhiều lỗi.',
                },
                {
                    option_text: 'Không hài lòng',
                    option_note:
                        'Chưa đáp ứng được nhu cầu, còn hạn chế tính năng.',
                },
                {
                    option_text: 'Trung lập',
                    option_note:
                        'Dịch vụ bình thường, không có ấn tượng đặc biệt.',
                },
                {
                    option_text: 'Hài lòng',
                    option_note: 'Dịch vụ tốt, đáp ứng nhu cầu.',
                },
                {
                    option_text: 'Rất hài lòng',
                    option_note: 'Dịch vụ xuất sắc, vượt mong đợi.',
                },
            ],
        },
        {
            question_text:
                'Đơn vị có kế hoạch hợp tác với các tổ chức công nghệ để phát triển sản phẩm & dịch vụ ngân hàng số không?',
            question_name: 'Câu 6.8',
            question_type: 'radiogroup',
            question_target: ['Lãnh đạo & Quản lý', 'Cán bộ nghiệp vụ'],
            question_options: [
                { option_text: 'Không có kế hoạch hợp tác' },
                { option_text: 'Đã cân nhắc nhưng chưa lập kế hoạch cụ thể' },
                { option_text: 'Đang nghiên cứu và lên kế hoạch sơ bộ' },
                { option_text: 'Đã kế hoạch hoàn chỉnh' },
                {
                    option_text:
                        'Đã có kế hoạch hoàn chỉnh và bắt đầu triển khai',
                },
            ],
        },
        {
            question_text:
                'Mức độ hợp tác hiện tại của đơn vị với các tổ chức công nghệ (Fintech, TCTD, NHHTX) để nâng cao dịch vụ ngân hàng số như thế nào? (Bao gồm hợp tác phát triển sản phẩm số, tích hợp công nghệ, thanh toán điện tử...)',
            question_name: 'Câu 6.9',
            question_type: 'radiogroup',
            question_target: [
                'Lãnh đạo & Quản lý',
                'Nhân viên CNTT & Hỗ trợ kỹ thuật',
            ],
            question_options: [
                {
                    option_text: 'Chưa có hợp tác',
                    option_note:
                        'Chưa có bất kỳ hoạt động nào liên quan đến hợp tác với tổ chức công nghệ.',
                },
                {
                    option_text: 'Đã tiếp cận đối tác nhưng chưa ký kết',
                    option_note:
                        'Đang tìm hiểu, trao đổi với các tổ chức công nghệ nhưng chưa có thỏa thuận chính thức.',
                },
                {
                    option_text: 'Hợp tác một phần',
                    option_note:
                        'Đã ký kết hợp tác nhưng mới triển khai thử nghiệm hoặc chỉ áp dụng trong một số dịch vụ đơn lẻ.',
                },
                {
                    option_text: 'Hợp tác gần hoàn chỉnh',
                    option_note:
                        'Đã có hợp tác chính thức, một số dịch vụ đã tích hợp nhưng chưa khai thác hiệu quả hoặc chưa đồng bộ với hệ thống ngân hàng số.',
                },
                {
                    option_text: 'Hợp tác toàn diện & đang mở rộng',
                    option_note:
                        'Đã tích hợp sâu với tổ chức công nghệ, hệ thống vận hành ổn định & đang tiếp tục mở rộng hợp tác.',
                },
            ],
        },
        {
            question_text:
                'Quỹ đã có kế hoạch tích hợp, kết nối mở rộng với các tổ chức nào để mở rộng hệ sinh thái số?',
            question_name: 'Câu 6.10',
            question_target: [
                'Lãnh đạo & Quản lý',
                'Nhân viên CNTT & Hỗ trợ kỹ thuật',
            ],
            question_type: 'checkbox',
            question_options: [
                { option_text: 'Các công ty Fintech' },
                { option_text: 'Các tổ chức tài chính vi mô' },
                { option_text: 'Các nhà mạng cung cấp dịch vụ viễn thông' },
                {
                    option_text: 'Các công ty thương mại điện tử',
                    option_note: 'Shopee, Tiki, Sendo, Lazada…',
                },
                { 
                    option_text: 'Các bên khác',
                    require_reason: 1,
                },
            ],
        },
        {
            question_text:
                'Khách hàng đánh giá mức độ hài lòng với các sản phẩm số hóa đã được cung cấp tại Quỹ như thế nào?',
            question_name: 'Câu 6.11',
            question_type: 'radiogroup',
            question_target: [
                'Lãnh đạo & Quản lý',
                'Nhân viên CNTT & Hỗ trợ kỹ thuật',
            ],
            question_options: [
                {
                    option_text: 'Rất không hài lòng',
                    option_note:
                        'Dịch vụ kém, khó sử dụng, nhiều lỗi kỹ thuật, không đáp ứng được nhu cầu',
                },
                {
                    option_text: 'Không hài lòng',
                    option_note:
                        'Có dịch vụ nhưng còn nhiều hạn chế, trải nghiệm chưa tốt, thường xuyên gặp lỗi',
                },
                {
                    option_text: 'Trung lập',
                    option_note:
                        'Dịch vụ ở mức chấp nhận được, không có ấn tượng đặc biệt',
                },
                {
                    option_text: 'Hài lòng',
                    option_note:
                        'Dịch vụ tốt, đáp ứng nhu cầu, ít lỗi, dễ sử dụng',
                },
                {
                    option_text: 'Rất hài lòng',
                    option_note:
                        'Dịch vụ xuất sắc, vượt mong đợi, trải nghiệm mượt mà, tiện lợi',
                },
            ],
        },
        {
            question_text:
                'Ngân sách hiện tại dành cho CNTT và chuyển đổi số của đơn vị hàng năm là bao nhiêu?',
            question_name: 'Câu 7.1',
            question_type: 'radiogroup',
            question_target: ['Lãnh đạo & Quản lý', 'Cán bộ nghiệp vụ'],
            question_note: 'Chọn đáp án phù hợp nhất',
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
                'Ngân sách dành cho CNTT hiện tại có đảm bảo đủ cho các hoạt động và dự án chuyển đổi số không?',
            question_name: 'Câu 7.2',
            question_type: 'radiogroup',
            question_target: ['Lãnh đạo & Quản lý', 'Cán bộ nghiệp vụ'],
            question_options: [
                { option_text: 'Hoàn toàn không đủ' },
                { option_text: 'Không đủ' },
                { option_text: 'Đủ cho duy trì hoạt động cơ bản' },
                { option_text: 'Đủ nhưng cần thêm đầu tư để mở rộng' },
                { option_text: 'Hoàn toàn đủ và có khả năng mở rộng thêm' },
            ],
        },
        {
            question_text:
                'Mức độ sẵn sàng của đơn vị trong việc đầu tư thêm ngân sách cho công nghệ và chuyển đổi số là như thế nào?',
            question_name: 'Câu 7.3',
            question_type: 'radiogroup',
            question_target: ['Lãnh đạo & Quản lý', 'Cán bộ nghiệp vụ'],
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
            question_name: 'Câu 7.4',
            question_type: 'radiogroup',
            question_target: ['Lãnh đạo & Quản lý', 'Cán bộ nghiệp vụ'],
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
                'Đơn vị có kế hoạch dài hạn để tăng ngân sách đầu tư CNTT không?',
            question_name: 'Câu 7.5',
            question_type: 'radiogroup',
            question_target: ['Lãnh đạo & Quản lý', 'Cán bộ nghiệp vụ'],
            question_options: [
                { option_text: 'Không có kế hoạch' },
                { option_text: 'Đang cân nhắc nhưng chưa có kế hoạch cụ thể' },
                { option_text: 'Đã có kế hoạch sơ bộ' },
                { option_text: 'Kế hoạch gần hoàn chỉnh' },
                { option_text: 'Kế hoạch đầy đủ và đang triển khai' },
            ],
        },
        {
            question_text:
                'Đơn vị có sẵn sàng tham gia tài chính vào các dự án CNTT dùng chung với NHNN/NHHTX không?',
            question_name: 'Câu 7.6',
            question_type: 'radiogroup',
            question_target: ['Lãnh đạo & Quản lý', 'Cán bộ nghiệp vụ'],
            question_options: [
                { option_text: 'Hoàn toàn không sẵn sàng' },
                { option_text: 'Không sẵn sàng' },
                { option_text: 'Đang cân nhắc nhưng chưa có cam kết' },
                { option_text: 'Sẵn sàng tham gia nếu có hỗ trợ' },
                {
                    option_text:
                        'Hoàn toàn sẵn sàng và đang tìm kiếm cơ hội hợp tác',
                },
            ],
        },
        {
            question_text:
                'Đơn vị đánh giá mức độ hiệu quả của việc tham gia vào các dự án CNTT dùng chung như thế nào?',
            question_name: 'Câu 7.7',
            question_type: 'radiogroup',
            question_target: [
                'Lãnh đạo & Quản lý',
                'Nhân viên CNTT & Hỗ trợ kỹ thuật',
            ],
            question_options: [
                { option_text: 'Hoàn toàn không hiệu quả' },
                { option_text: 'Hiệu quả rất thấp' },
                { option_text: 'Hiệu quả trung bình' },
                { option_text: 'Hiệu quả tốt' },
                { option_text: 'Rất hiệu quả và mang lại giá trị rõ ràng' },
            ],
        },
        {
            question_text:
                'Đơn vị có nhận được hỗ trợ tài chính từ các tổ chức để thực hiện chuyển đổi số không?',
            question_name: 'Câu 7.8',
            question_type: 'radiogroup',
            question_target: ['Lãnh đạo & Quản lý', 'Cán bộ nghiệp vụ'],
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
                'Dự kiến từ năm 2025 đến năm 2030, tỷ lệ các nghiệp vụ ngân hàng của Quỹ (thanh toán, mở tài khoản, vay vốn...) có thể thực hiện trên môi trường số là bao nhiêu?',
            question_name: 'Câu 8.1',
            question_type: 'radiogroup',
            question_target: ['Lãnh đạo & Quản lý'],
            question_options: [
                { option_text: '20%' },
                { option_text: '50%' },
                { option_text: '70%' },
                { option_text: '90%' },
                { option_text: '100%' },
            ],
        },
        {
            question_text:
                'Đến năm 2035, các nghiệp vụ ngân hàng của Quỹ có thể cho phép khách hàng và thành viên thực hiện trên môi trường số là bao nhiêu?',
            question_name: 'Câu 8.2',
            question_type: 'radiogroup',
            question_target: ['Lãnh đạo & Quản lý'],
            question_options: [
                { option_text: '20%' },
                { option_text: '50%' },
                { option_text: '70%' },
                { option_text: '90%' },
                { option_text: '100%' },
            ],
        },
        {
            question_text:
                'Từ nay đến năm 2030, các nghiệp vụ ngân hàng được ưu tiên thực hiện trên môi trường số tại Quỹ',
            question_name: 'Câu 8.3',
            question_type: 'checkbox',
            question_target: ['Lãnh đạo & Quản lý', 'Cán bộ nghiệp vụ'],
            question_note: 'Có thể chọn nhiều phương án',
            question_options: [
                { option_text: 'Thanh toán 247' },
                { option_text: 'Mở tài khoản thanh toán và quản lý tài khoản' },
                { option_text: 'Tiết kiệm' },
                { option_text: 'Vay vốn' },
                { option_text: 'Các dịch vụ phi tài chính' },
            ],
        },
        {
            question_text:
                'Từ nay đến năm 2035, các nghiệp vụ ngân hàng được ưu tiên thực hiện trên môi trường số tại Quỹ',
            question_name: 'Câu 8.4',
            question_target: ['Lãnh đạo & Quản lý', 'Cán bộ nghiệp vụ'],
            question_type: 'checkbox',
            question_note: 'Có thể chọn nhiều phương án',
            question_options: [
                { option_text: 'Thanh toán 247' },
                { option_text: 'Mở tài khoản thanh toán và quản lý tài khoản' },
                { option_text: 'Tiết kiệm' },
                { option_text: 'Vay vốn' },
                { option_text: 'Các dịch vụ phi tài chính' },
            ],
        },
        {
            question_text:
                'Đơn vị đã xây dựng lộ trình cụ thể để thực hiện chuyển đổi số theo định hướng của ngành ngân hàng chưa? (Bao gồm kế hoạch chi tiết về hạ tầng CNTT, nhân sự, tài chính và hợp tác với NHHTX, TCTD...)',
            question_name: 'Câu 8.5',
            question_target: ['Lãnh đạo & Quản lý'],
            question_type: 'radiogroup',
            question_options: [
                {
                    option_text: 'Chưa xây dựng',
                    option_note:
                        'Chưa có kế hoạch hoặc chỉ mới có ý tưởng sơ bộ, chưa có tài liệu chính thức',
                },
                {
                    option_text: 'Xây dựng sơ bộ',
                    option_note:
                        'Đã có định hướng chung nhưng chưa có kế hoạch chi tiết về tài chính, nhân sự, hạ tầng',
                },
                {
                    option_text: 'Gần hoàn chỉnh',
                    option_note:
                        'Đã có kế hoạch tổng thể, xác định ngân sách & nguồn lực nhưng chưa chính thức phê duyệt',
                },
                {
                    option_text: 'Hoàn chỉnh',
                    option_note:
                        'Kế hoạch đã hoàn tất, có phê duyệt nhưng chưa bắt đầu triển khai thực tế',
                },
                {
                    option_text: 'Hoàn chỉnh & đang triển khai',
                    option_note:
                        'Đã triển khai theo kế hoạch, có sự phối hợp với NHHTX, TCTD hoặc các đối tác công nghệ',
                },
            ],
        },
        {
            question_text:
                'Mức độ phối hợp của Quỹ với NHHTX trong quá trình thực hiện chuyển đổi số như thế nào? (Bao gồm hỗ trợ kỹ thuật, kết nối hệ thống, tài chính...)',
            question_name: 'Câu 8.6',
            question_type: 'radiogroup',
            question_options: [
                {
                    option_text: 'Chưa phối hợp',
                    option_note:
                        'Chưa có bất kỳ hoạt động phối hợp nào với NHHTX về chuyển đổi số',
                },
                {
                    option_text: 'Có phối hợp nhưng rất hạn chế',
                    option_note:
                        'Chỉ trao đổi thông tin cơ bản, chưa có hỗ trợ kỹ thuật hay tài chính',
                },
                {
                    option_text: 'Phối hợp ở mức trung bình',
                    option_note:
                        'Có hỗ trợ kỹ thuật hoặc kết nối hệ thống, nhưng chưa đồng bộ hoặc chưa đầy đủ',
                },
                {
                    option_text: 'Phối hợp đầy đủ',
                    option_note:
                        'Hợp tác tích cực, có hỗ trợ kỹ thuật và kết nối hệ thống nhưng chưa tối ưu',
                },
                {
                    option_text: 'Phối hợp chặt chẽ & có kế hoạch mở rộng',
                    option_note:
                        'Đã có hợp tác toàn diện với NHHTX và đang lên kế hoạch nâng cấp, mở rộng hợp tác',
                },
            ],
        },
        {
            question_text:
                'Mức độ phối hợp của Quỹ với các TCTD, công ty Fintech trong quá trình thực hiện chuyển đổi số như thế nào? (Bao gồm hợp tác công nghệ, kết nối API, dịch vụ số...)',
            question_name: 'Câu 8.7',
            question_type: 'radiogroup',
            question_options: [
                {
                    option_text: 'Chưa phối hợp',
                    option_note:
                        'Không có bất kỳ hợp tác nào với TCTD, Fintech về chuyển đổi số',
                },
                {
                    option_text: 'Có tiếp cận nhưng chưa có hợp tác cụ thể',
                    option_note:
                        'Đã có trao đổi, tìm hiểu nhưng chưa ký kết hợp tác',
                },
                {
                    option_text: 'Hợp tác ở mức cơ bản',
                    option_note:
                        'Có hợp tác ở một số dịch vụ nhưng chưa tích hợp hệ thống hoặc chưa khai thác hiệu quả',
                },
                {
                    option_text: 'Hợp tác chặt chẽ',
                    option_note:
                        'Đã có hợp tác thực tế, kết nối hệ thống và cung cấp sản phẩm/dịch vụ số nhưng chưa tối ưu',
                },
                {
                    option_text: 'Hợp tác toàn diện & có kế hoạch mở rộng',
                    option_note:
                        'Đã tích hợp đầy đủ công nghệ với TCTD, Fintech và đang mở rộng hợp tác',
                },
            ],
        },
        {
            question_text:
                'Quỹ có kế hoạch tăng cường hợp tác với NHHTX, NHNN, Fintech và các TCTD khác để thúc đẩy chuyển đổi số không?',
            question_name: 'Câu 8.8',
            question_type: 'radiogroup',
            question_options: [
                {
                    option_text: 'Không có kế hoạch hợp tác',
                    option_note:
                        'Chưa có ý định phối hợp với các tổ chức này về chuyển đổi số',
                },
                {
                    option_text: 'Có cân nhắc nhưng chưa có kế hoạch cụ thể',
                    option_note:
                        'Đang nghiên cứu khả năng hợp tác nhưng chưa có kế hoạch chính thức',
                },
                {
                    option_text: 'Có kế hoạch sơ bộ',
                    option_note:
                        'Đã lên ý tưởng hợp tác nhưng chưa có cam kết hoặc nguồn lực rõ ràng',
                },
                {
                    option_text: 'Có kế hoạch chi tiết',
                    option_note:
                        'Đã xác định mục tiêu hợp tác và có bước triển khai cụ thể',
                },
                {
                    option_text: 'Đã triển khai & đang mở rộng hợp tác',
                    option_note:
                        'Hợp tác đã được thực hiện và đang tìm cách mở rộng thêm đối tác',
                },
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
                question_target: question.question_target,
            },
        });

        if (question.question_options && question.question_options.length > 0) {
            const optionsData = question.question_options.map((option) => ({
                option_text: option.option_text,
                require_reason: option.require_reason ?? 0,
                option_note: option.option_note ?? null, // Thêm dòng này
                question_id: createdQuestion.id,
            }));

            // Tạo tất cả question_options liên quan đến câu hỏi trong 1 lần
            await prisma.question_options.createMany({
                data: optionsData,
            });
        }
    }

    const totalQuestions = 118; // Tổng số câu hỏi
    const surveyData = [
        { surveyId: 1, numQuestions: 14 },
        { surveyId: 2, numQuestions: 22 },
        { surveyId: 3, numQuestions: 13 },
        { surveyId: 4, numQuestions: 25 },
        { surveyId: 5, numQuestions: 17 },
        { surveyId: 6, numQuestions: 11 },
        { surveyId: 7, numQuestions: 8 },
        { surveyId: 8, numQuestions: 8 },
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
    const questionIds = [
        29, 30, 31, 32, 33, 34, 35, 36, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73,
        74, 85, 86, 87, 88,
    ]; // Chỉ cần thêm ID vào đây

    // Dùng map để tạo danh sách nhóm câu hỏi
    const questionGroups = questionIds.map((id) => ({ question_id: id }));

    // Chạy seed dữ liệu vào `question_group`
    await prisma.question_group.createMany({
        data: questionGroups,
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
