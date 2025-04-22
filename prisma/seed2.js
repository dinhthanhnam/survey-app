import { PrismaClient } from '@prisma/client';
import { InstitutionData } from '../src/data/institutions.js';
const prisma = new PrismaClient();

const institutionsData = [...InstitutionData];

// Dữ liệu cho surveys
const surveysData = [
    {
        survey_title: 'NHÂN LỰC VÀ NĂNG LỰC NHẬN THỨC CHUYỂN ĐỔI SỐ',
        survey_description:
            'Đánh giá nhận thức, kỹ năng, mức độ sẵn sàng của nhân sự và lãnh đạo QTDND đối với chuyển đổi số (CĐS)',
    },
    {
        survey_title: 'HIỆN TRẠNG QUY TRÌNH NGHIỆP VỤ VÀ MÔ HÌNH QUẢN TRỊ SỐ',
        survey_description:
            'Đánh giá mức độ số hóa và tự động hóa trong các quy trình nghiệp vụ cốt lõi tại QTDND',
    },
    {
        survey_title: 'CƠ SỞ HẠ TẦNG CNTT VÀ MỨC ĐỘ ỨNG DỤNG CÔNG NGHỆ',
        survey_description:
            'Đánh giá mức độ hiện đại hóa hạ tầng công nghệ thông tin tại các Quỹ Tín Dụng Nhân Dân (QTDND), đảm bảo khả năng triển khai chuyển đổi số (CĐS) trong hệ thống tài chính vi mô',
    },
    {
        survey_title: 'AN NINH THÔNG TIN & QUẢN TRỊ RỦI RO CÔNG NGHỆ',
        survey_description:
            'Đánh giá mức độ an toàn thông tin và khả năng ứng phó với rủi ro công nghệ tại QTDND',
    },
    {
        survey_title: 'QUẢN LÝ VÀ KHAI THÁC DỮ LIỆU SỐ',
        survey_description:
            'Đánh giá khả năng lưu trữ, phân tích và khai thác dữ liệu số nhằm nâng cao hiệu quả hoạt động tại QTDND',
    },
    {
        survey_title: 'PHÁT TRIỂN SẢN PHẨM VÀ DỊCH VỤ NGÂN HÀNG SỐ',
        survey_description:
            'Đánh giá khả năng triển khai và phát triển các dịch vụ tài chính số tại QTDND nhằm nâng cao trải nghiệm khách hàng và năng lực cạnh tranh',
    },
    {
        survey_title: 'NGUỒN LỰC TÀI CHÍNH VÀ KHẢ NĂNG HỢP TÁC',
        survey_description:
            'Đánh giá mức độ sẵn sàng đầu tư vào công nghệ và khả năng hợp tác tài chính của QTDND trong quá trình thực hiện chuyển đổi số',
    },
    {
        survey_title: 'LỘ TRÌNH CHUYỂN ĐỔI SỐ ĐỒNG BỘ VÀ THỐNG NHẤT',
        survey_description:
            'Đánh giá tổng thể mức độ sẵn sàng của QTDND đối với quá trình chuyển đổi số',
    },
];

const pillarsData = [
    {
        name: 'Nhận thức của nhân viên & lãnh đạo về CĐS',
        weighted_percentage: 0.25,
        survey_id: 1,
    },
    {
        name: 'Chính sách và hỗ trợ đào tạo',
        weighted_percentage: 0.35,
        survey_id: 1,
    },
    {
        name: 'Nhân sự phụ trách & tuyển dụng CNTT',
        weighted_percentage: 0.2,
        survey_id: 1,
    },
    {
        name: 'Mức độ triển khai và sẵn sàng của lãnh đạo',
        weighted_percentage: 0.15,
        survey_id: 1,
    },
    {
        name: 'Hỗ trợ từ NHNN & NHHTX đối với nhân sự QTDND',
        weighted_percentage: 0.05,
        survey_id: 1,
    },

    {
        name: 'Mức độ số hóa các quy trình nghiệp vụ chính',
        weighted_percentage: 0.25,
        survey_id: 2,
    },
    {
        name: 'Khả năng tích hợp công nghệ vào quản trị vận hành và dịch vụ khách hàng',
        weighted_percentage: 0.3,
        survey_id: 2,
    },
    {
        name: 'Mức độ tự động hóa trong xử lý nghiệp vụ và vận hành nội bộ',
        weighted_percentage: 0.2,
        survey_id: 2,
    },
    {
        name: 'Mức độ tích hợp với hệ thống ngân hàng trung ương (NHNN) và ngân hàng hợp tác xã (NHHTX)',
        weighted_percentage: 0.15,
        survey_id: 2,
    },
    {
        name: 'Các rào cản và khó khăn trong quá trình chuẩn hóa và số hóa quy trình nghiệp vụ',
        weighted_percentage: 0.1,
        survey_id: 2,
    },

    { name: 'Hiện trạng hạ tầng CNTT', weighted_percentage: 0.3, survey_id: 3 },
    {
        name: 'Kế hoạch nâng cấp hạ tầng',
        weighted_percentage: 0.35,
        survey_id: 3,
    },
    {
        name: 'Ứng dụng công nghệ tiên tiến',
        weighted_percentage: 0.1,
        survey_id: 3,
    },
    {
        name: 'Mức độ tích hợp với hệ thống ngân hàng số',
        weighted_percentage: 0.25,
        survey_id: 3,
    },

    {
        name: 'Mức độ bảo mật dữ liệu KH & giao dịch',
        weighted_percentage: 0.3,
        survey_id: 4,
    },
    {
        name: 'Nhận thức & kỹ năng nhân sự',
        weighted_percentage: 0.2,
        survey_id: 4,
    },
    {
        name: 'Biện pháp ứng phó rủi ro',
        weighted_percentage: 0.25,
        survey_id: 4,
    },
    {
        name: 'Tuân thủ tiêu chuẩn NHNN',
        weighted_percentage: 0.15,
        survey_id: 4,
    },
    {
        name: 'Hỗ trợ từ tổ chức bên ngoài',
        weighted_percentage: 0.1,
        survey_id: 4,
    },
    {
        name: 'Mức độ số hóa dữ liệu và hệ thống lưu trữ',
        weighted_percentage: 0.2,
        survey_id: 5,
    },
    {
        name: 'Ứng dụng công cụ phân tích dữ liệu hiện đại',
        weighted_percentage: 0.15,
        survey_id: 5,
    },
    {
        name: 'Khai thác dữ liệu khách hàng',
        weighted_percentage: 0.2,
        survey_id: 5,
    },
    {
        name: 'Liên thông dữ liệu với hệ thống bên ngoài',
        weighted_percentage: 0.25,
        survey_id: 5,
    },
    {
        name: 'Kiểm soát và khai thác dữ liệu trong tổ chức',
        weighted_percentage: 0.2,
        survey_id: 5,
    },
    {
        name: 'Mức độ ứng dụng công nghệ trong phát triển sản phẩm/dịch vụ',
        weighted_percentage: 0.15,
        survey_id: 6,
    },
    {
        name: 'Kế hoạch triển khai dịch vụ ngân hàng số',
        weighted_percentage: 0.3,
        survey_id: 6,
    },
    {
        name: 'Mức độ hài lòng của khách hàng',
        weighted_percentage: 0.2,
        survey_id: 6,
    },
    {
        name: 'Hợp tác với tổ chức công nghệ',
        weighted_percentage: 0.35,
        survey_id: 6,
    },
    {
        name: 'Ngân sách hiện tại dành cho CNTT và chuyển đổi số',
        weighted_percentage: 0.25,
        survey_id: 7,
    },
    {
        name: 'Mức độ sẵn sàng đầu tư',
        weighted_percentage: 0.35,
        survey_id: 7,
    },
    {
        name: 'Khả năng tham gia tài chính',
        weighted_percentage: 0.2,
        survey_id: 7,
    },
    {
        name: 'Khả năng tìm kiếm và tận dụng các nguồn tài trợ',
        weighted_percentage: 0.2,
        survey_id: 7,
    },
    {
        name: 'Nhận thức tổng quan về lộ trình',
        weighted_percentage: 0.2,
        survey_id: 8,
    },
    {
        name: 'Mức độ chuẩn bị về nhân lực, hạ tầng CNTT và tài chính',
        weighted_percentage: 0.25,
        survey_id: 8,
    },
    {
        name: 'Mức độ phối hợp với các đơn vị trong hệ thống ngân hàng',
        weighted_percentage: 0.25,
        survey_id: 8,
    },
    {
        name: 'Kế hoạch cụ thể để đạt được các mục tiêu',
        weighted_percentage: 0.3,
        survey_id: 8,
    },
];

// Dữ liệu question
const questionsData = [
    {
        question_text:
            'Anh/Chị nhận thấy mức độ hiểu biết của anh chị về chuyển đổi số tại đơn vị mình như thế nào?',
        question_name: 'Câu 1.1',
        question_type: 'radiogroup',
        weighted_percentage: 0.15,
        belongs_to_pillar: 'Nhận thức của nhân viên & lãnh đạo về CĐS',
        survey_id: 1,
        question_options: [
            {
                option_text: 'Chưa có bất kỳ hiểu biết nào về chuyển đổi số.',
                option_note: 'Chỉ nghe qua mà không hiểu rõ',
                weighted_value: 0,
            },
            {
                option_text:
                    'Có hiểu biết cơ bản về chuyển đổi số nhưng chưa nắm được lợi ích và ứng dụng cụ thể.',
                weighted_value: 1,
            },
            {
                option_text:
                    'Hiểu được các khái niệm cơ bản và lợi ích của chuyển đổi số, nhưng chưa rõ ràng về cách triển khai trong thực tế.',
                weighted_value: 2,
            },
            {
                option_text:
                    'Nhận thức rõ về các khái niệm, lợi ích và các chiến lược chuyển đổi số tại đơn vị, có thể áp dụng một số phương pháp đơn giản.',
                weighted_value: 3,
            },
            {
                option_text:
                    'Hiểu rõ và có thể áp dụng chuyển đổi số vào công việc hàng ngày, đồng thời có khả năng đề xuất các sáng kiến chuyển đổi số trong đơn vị',
                weighted_value: 4,
            },
        ],
    },
    {
        question_text:
            'Anh/Chị đánh giá mức độ thành thạo của mình trong việc sử dụng phần mềm nghiệp vụ như thế nào?',
        question_name: 'Câu 1.2',
        question_type: 'radiogroup',
        weighted_percentage: 0.05,
        belongs_to_pillar: 'Mức độ triển khai và sẵn sàng của lãnh đạo',
        survey_id: 1,
        question_target: ['Cán bộ nghiệp vụ'],
        question_options: [
            { option_text: 'Hoàn toàn không thể sử dụng', weighted_value: 0 },
            {
                option_text: 'Có thể sử dụng nhưng cần hỗ trợ nhiều',
                weighted_value: 1,
            },
            { option_text: 'Có thể sử dụng ở mức cơ bản', weighted_value: 2 },
            {
                option_text: 'Sử dụng tốt và có thể làm việc độc lập',
                weighted_value: 3,
            },
            {
                option_text: 'Thành thạo và có thể hướng dẫn người khác',
                weighted_value: 4,
            },
        ],
    },
    {
        question_text:
            'Anh/Chị có được đào tạo về nguyên tắc bảo mật dữ liệu trong công việc không?',
        question_name: 'Câu 1.3',
        question_type: 'radiogroup',
        weighted_percentage: 0.1,
        belongs_to_pillar: 'Chính sách và hỗ trợ đào tạo',
        survey_id: 1,
        question_options: [
            {
                option_text:
                    'Hoàn toàn không được đào tạo, không biết về bảo mật',
                weighted_value: 0,
            },
            {
                option_text: 'Được đào tạo nhưng chưa hiểu rõ',
                weighted_value: 1,
            },
            {
                option_text: 'Được đào tạo, hiểu một số nguyên tắc cơ bản',
                weighted_value: 2,
            },
            {
                option_text: 'Được đào tạo, hiểu rõ và bước đầu tuân thủ',
                weighted_value: 3,
            },
            {
                option_text:
                    'Được đào tạo, thành thạo về bảo mật và có thể hướng dẫn người khác',
                weighted_value: 4,
            },
        ],
    },
    {
        question_text:
            'Anh/Chị có sẵn sàng tham gia các chương trình đào tạo nâng cao kỹ năng CNTT do đơn vị hoặc NHNN/NHHTX trong thời gian tới không?',
        question_name: 'Câu 1.4',
        question_type: 'radiogroup',
        weighted_percentage: 0.08,
        belongs_to_pillar: 'Chính sách và hỗ trợ đào tạo',
        survey_id: 1,
        question_options: [
            { option_text: 'Hoàn toàn không sẵn sàng', weighted_value: 0 },
            { option_text: 'Không sẵn sàng', weighted_value: 1 },
            { option_text: 'Phân vân/Chưa quyết định', weighted_value: 2 },
            { option_text: 'Sẵn sàng', weighted_value: 3 },
            { option_text: 'Hoàn toàn sẵn sàng', weighted_value: 4 },
        ],
    },
    {
        question_text:
            'Hình thức đào tạo nội bộ về CNTT và chuyển đổi số tại đơn vị đang được triển khai như thế nào?',
        question_name: 'Câu 1.5',
        question_note: 'Có thể chọn nhiều đáp án',
        question_type: 'checkbox',
        weighted_percentage: 0.12,
        belongs_to_pillar: 'Chính sách và hỗ trợ đào tạo',
        survey_id: 1,
        question_options: [
            {
                option_text: 'Không thực hiện chương trình đào tạo nào',
                weighted_value: 0,
            },
            {
                option_text: 'Tổ chức các buổi đào tạo nội bộ định kỳ',
                option_note: 'Nhân viên có kinh nghiệm hướng dẫn',
                weighted_value: 1,
            },
            {
                option_text: 'Mời chuyên gia bên ngoài đào tạo theo từng đợt',
                weighted_value: 2,
            },
            { option_text: 'Tổ chức đào tạo trực tuyến', weighted_value: 3 },
            {
                option_text:
                    'Hỗ trợ nhân sự tự học và cấp kinh phí/tài liệu đào tạo',
                weighted_value: 4,
            },
            {
                option_text:
                    'Đào tạo theo hình thức hướng dẫn thực tế khi làm việc',
            },
            {
                option_text: 'Khác',
                option_note: 'Vui lòng ghi rõ',
                require_reason: 1,
            },
        ],
    },
    {
        question_text:
            'Anh/Chị đánh giá mức độ hiệu quả của các chương trình đào tạo nội bộ về CNTT và chuyển đổi số tại đơn vị như thế nào?',
        question_name: 'Câu 1.6',
        question_type: 'radiogroup',
        weighted_percentage: 0.03,
        belongs_to_pillar: 'Chính sách và hỗ trợ đào tạo',
        survey_id: 1,
        question_target: ['Cán bộ nghiệp vụ'],
        question_options: [
            {
                option_text: 'Các chương trình không hữu ích',
                weighted_value: 0,
            },
            {
                option_text:
                    'Có chương trình nhưng nội dung chưa thực tế, khó áp dụng',
                weighted_value: 1,
            },
            {
                option_text: 'Chương trình có ích nhưng chưa thực sự hiệu quả',
                weighted_value: 2,
            },
            {
                option_text:
                    'Chương trình có nội dung phù hợp, hỗ trợ tốt cho công việc',
                weighted_value: 3,
            },
            {
                option_text:
                    'Chương trình hiệu quả, giúp nâng cao năng lực thực tế đáng kể',
                weighted_value: 4,
            },
        ],
    },
    {
        question_text:
            'Anh/Chị đánh giá mức độ hỗ trợ từ NHNN/CoopBank trong đào tạo nhân lực CNTT tại đơn vị ra sao?',
        question_name: 'Câu 1.7',
        question_type: 'radiogroup',
        weighted_percentage: 0.05,
        belongs_to_pillar: 'Hỗ trợ từ NHNN & NHHTX đối với nhân sự QTDND',
        survey_id: 1,
        question_target: ['Lãnh đạo & Quản lý'],
        question_options: [
            {
                option_text: 'Hoàn toàn không hỗ trợ/hỗ trợ không đáng kể',
                weighted_value: 0,
            },
            {
                option_text:
                    'Hỗ trợ còn hạn chế, chưa đáp ứng được nhu cầu thực tế',
                weighted_value: 1,
            },
            {
                option_text: 'Hỗ trợ khá đầy đủ nhưng ít thực tế',
                weighted_value: 2,
            },
            { option_text: 'Hỗ trợ khá đầy đủ và thực tế', weighted_value: 3 },
            {
                option_text:
                    'Hỗ trợ rất đầy đủ, hiệu quả và sát với nhu cầu thực tế',
                weighted_value: 4,
            },
        ],
    },
    {
        question_text:
            'Hiện tại, đơn vị có cán bộ phụ trách các công việc liên quan đến CNTT không? ',
        question_name: 'Câu 1.8',
        question_note: 'Có thể chọn nhiều đáp án',
        question_type: 'checkbox',
        weighted_percentage: 0.14,
        belongs_to_pillar: 'Nhân sự phụ trách & tuyển dụng CNTT',
        survey_id: 1,
        question_target: ['Lãnh đạo & Quản lý'],
        question_options: [
            { option_text: 'Không có nhân sự phụ trách', weighted_value: 0 },
            { option_text: 'Cán bộ kiêm nhiệm cho CNTT', weighted_value: 1 },
            { option_text: 'Có cán bộ phụ trách CNTT', weighted_value: 2 },
            { option_text: 'Hợp tác với đối tác bên ngoài', weighted_value: 3 },
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
        weighted_percentage: 0.06,
        belongs_to_pillar: 'Nhân sự phụ trách & tuyển dụng CNTT',
        survey_id: 1,
        question_target: ['Lãnh đạo & Quản lý'],
        question_options: [
            { option_text: 'Không có nhu cầu tuyển dụng', weighted_value: 0 },
            {
                option_text: 'Rất khó khăn',
                option_note: 'Không thể tuyển',
                weighted_value: 1,
            },
            {
                option_text: 'Khó khăn',
                option_note: 'Tuyển dụng ít, thiếu ứng viên phù hợp',
                weighted_value: 2,
            },
            {
                option_text: 'Dễ dàng',
                option_note: 'Tuyển đủ số lượng nhưng cần đào tạo thêm',
                weighted_value: 3,
            },
            {
                option_text: 'Rất dễ dàng',
                option_note: 'Có thể tuyển ngay nhân sự đáp ứng yêu cầu',
                weighted_value: 4,
            },
        ],
    },
    {
        question_text:
            'Anh/chị đã có những hành động cụ thể nào để thúc đẩy chuyển đổi số tại Quỹ?',
        question_name: 'Câu 1.10',
        question_type: 'radiogroup',
        weighted_percentage: 0.1,
        belongs_to_pillar: 'Nhận thức của nhân viên & lãnh đạo về CĐS',
        survey_id: 1,
        question_options: [
            {
                option_text:
                    'Chưa thực hiện bất kỳ hành động nào liên quan đến chuyển đổi số và không quan tâm đến vấn đề này',
                weighted_value: 0,
            },
            {
                option_text:
                    'Đã nghe nói về chuyển đổi số nhưng chỉ thực hiện một số công việc nhỏ như sử dụng email, nhập liệu trên phần mềm mà chưa chủ động tìm hiểu hoặc áp dụng thêm',
                weighted_value: 1,
            },
            {
                option_text:
                    'Có áp dụng công nghệ vào công việc hằng ngày như sử dụng phần mềm nội bộ, khai thác dữ liệu số, nhưng chưa chủ động đề xuất hoặc tham gia cải tiến quy trình số hóa',
                weighted_value: 2,
            },
            {
                option_text:
                    'Chủ động sử dụng các công cụ công nghệ vào công việc, hướng dẫn đồng nghiệp sử dụng hệ thống số hóa và có đóng góp trong các sáng kiến chuyển đổi số tại Quỹ',
                weighted_value: 3,
            },
            {
                option_text:
                    'Là người tiên phong trong chuyển đổi số, đề xuất giải pháp mới, thử nghiệm và triển khai công nghệ vào công việc, đồng thời hướng dẫn đồng nghiệp áp dụng',
                weighted_value: 4,
            },
        ],
    },
    {
        question_text:
            'Quỹ đã thực hiện/tham gia chương trình đào tạo nào về CNTT và chuyển đổi số?',
        question_name: 'Câu 1.11',
        question_note: 'Có thể chọn nhiều đáp án',
        question_type: 'checkbox',
        weighted_percentage: 0.02,
        belongs_to_pillar: 'Chính sách và hỗ trợ đào tạo',
        survey_id: 1,
        question_options: [
            { option_text: 'Chưa có chương trình nào', weighted_value: 0 },
            {
                option_text:
                    'Đang triển khai các chương trình cơ bản về ứng dụng CNTT',
                weighted_value: 1,
            },
            {
                option_text: 'Đã triển khai các chương trình về nghiệp vụ',
                weighted_value: 2,
            },
            {
                option_text:
                    'Đã triển khai các chương trình về quản trị thông tin',
                weighted_value: 3,
            },
            {
                option_text:
                    'Đã triển khai các chương trình về sử dụng cơ sở hạ tầng',
                weighted_value: 4,
            },
            {
                option_text: 'Đã triển khai các chương trình khác',
                option_note: 'Ngoài các chương trình trên',
                require_reason: 1,
            },
        ],
    },
    {
        question_text:
            'Anh/Chị đánh giá mức độ sẵn sàng của đội ngũ lãnh đạo trong việc tiếp cận và ứng dụng công nghệ số như thế nào?',
        question_name: 'Câu 1.12',
        question_type: 'radiogroup',
        weighted_percentage: 0.1,
        belongs_to_pillar: 'Mức độ triển khai và sẵn sàng của lãnh đạo',
        survey_id: 1,
        question_target: ['Lãnh đạo & Quản lý'],
        question_options: [
            {
                option_text: 'Hoàn toàn không sẵn sàng',
                option_note: 'Không quan tâm',
                weighted_value: 0,
            },
            {
                option_text: 'Không sẵn sàng',
                option_note: 'Quan tâm nhưng chưa có hành động',
                weighted_value: 1,
            },
            {
                option_text: 'Khá sẵn sàng',
                option_note: 'Có nhận thức nhưng cần thêm hỗ trợ',
                weighted_value: 2,
            },
            {
                option_text: 'Sẵn sàng',
                option_note: 'Đã có hành động ban đầu',
                weighted_value: 3,
            },
            {
                option_text: 'Hoàn toàn sẵn sàng',
                option_note: 'Đang tích cực triển khai & mở rộng',
                weighted_value: 4,
            },
        ],
    },
    {
        question_text:
            'Mức độ chuẩn bị của đơn vị trong việc số hóa quy trình nghiệp vụ và vận hành theo mô hình ngân hàng số như thế nào?',
        question_name: 'Câu 2.1',
        question_type: 'radiogroup',
        weighted_percentage: 0.1,
        belongs_to_pillar:
            'Khả năng tích hợp công nghệ vào quản trị vận hành và dịch vụ khách hàng',
        survey_id: 2,
        question_target: ['Lãnh đạo & Quản lý'],
        question_options: [
            {
                option_text: 'Chưa có kế hoạch',
                option_note:
                    'Đơn vị vẫn hoạt động theo mô hình truyền thống, chưa có định hướng chuyển đổi số, các quy trình chủ yếu thực hiện thủ công',
                weighted_value: 0,
            },
            {
                option_text: 'Mới bắt đầu tìm hiểu',
                option_note:
                    'Đơn vị đang nghiên cứu mô hình ngân hàng số, đánh giá khả năng áp dụng công nghệ nhưng chưa có kế hoạch cụ thể',
                weighted_value: 1,
            },
            {
                option_text: 'Đã có kế hoạch sơ bộ nhưng chưa triển khai',
                option_note:
                    'Đơn vị đã xác định chiến lược chuyển đổi số, bước đầu xây dựng kế hoạch nhưng chưa thực hiện do hạn chế tài chính, nhân lực hoặc công nghệ',
                weighted_value: 2,
            },
            {
                option_text: 'Đã có kế hoạch sơ bộ, đang triển khai từng phần',
                option_note:
                    'Đã bắt đầu số hóa một số mảng như dịch vụ khách hàng, quản lý nội bộ hoặc tín dụng nhưng chưa tích hợp đầy đủ hệ thống ngân hàng số',
                weighted_value: 3,
            },
            {
                option_text: 'Đã có kế hoạch hoàn chỉnh và đang thực hiện',
                option_note:
                    'Đơn vị đã có chiến lược số hóa đồng bộ, triển khai ngân hàng số với nền tảng công nghệ tích hợp, tự động hóa quy trình vận hành và trải nghiệm khách hàng số toàn diện',
                weighted_value: 4,
            },
        ],
    },
    {
        question_text:
            'Mức độ chuẩn bị của đơn vị trong việc triển khai hệ thống quản trị số (bao gồm quản lý nội bộ, tài chính, dữ liệu và ra quyết định thông minh) như thế nào?',
        question_name: 'Câu 2.2',
        question_type: 'radiogroup',
        weighted_percentage: 0.08,
        belongs_to_pillar:
            'Khả năng tích hợp công nghệ vào quản trị vận hành và dịch vụ khách hàng',
        survey_id: 2,
        question_target: ['Lãnh đạo & Quản lý'],
        question_options: [
            {
                option_text: 'Chưa có kế hoạch',
                option_note:
                    'Quản lý nội bộ vẫn chủ yếu thủ công, chưa ứng dụng công nghệ trong giám sát, điều hành và ra quyết định',
                weighted_value: 0,
            },
            {
                option_text: 'Mới bắt đầu tìm hiểu',
                option_note:
                    'Đang đánh giá mô hình quản trị số, nghiên cứu hệ thống quản lý nhưng chưa xây dựng kế hoạch cụ thể',
                weighted_value: 1,
            },
            {
                option_text: 'Đã có kế hoạch sơ bộ nhưng chưa triển khai',
                option_note:
                    'Có kế hoạch triển khai hệ thống quản trị số nhưng chưa thực hiện do hạn chế nguồn lực hoặc công nghệ',
                weighted_value: 2,
            },
            {
                option_text: 'Đã có kế hoạch sơ bộ, đang triển khai từng phần',
                option_note:
                    'Một số mảng như quản lý nhân sự, tài chính đã có hệ thống nhưng chưa đồng bộ hoặc chưa khai thác dữ liệu số để ra quyết định',
                weighted_value: 3,
            },
            {
                option_text: 'Đã có kế hoạch hoàn chỉnh và đang thực hiện',
                option_note:
                    'Đơn vị đã triển khai quản trị số đồng bộ, dữ liệu được kết nối và khai thác, có hệ thống hỗ trợ ra quyết định thông minh',
                weighted_value: 4,
            },
        ],
    },
    {
        question_text:
            'Mức độ số hóa quy trình tín dụng tại đơn vị hiện nay như thế nào? (bao gồm Core Bank, AI, tự động hóa quy trình)',
        question_name: 'Câu 2.3',
        question_type: 'radiogroup',
        weighted_percentage: 0.1,
        belongs_to_pillar: 'Mức độ số hóa các quy trình nghiệp vụ chính',
        survey_id: 2,
        question_target: ['Cán bộ nghiệp vụ'],
        question_options: [
            {
                option_text: 'Hoàn toàn thủ công',
                option_note:
                    'Tất cả quy trình thực hiện bằng giấy tờ, không có hệ thống hỗ trợ',
                weighted_value: 0,
            },
            {
                option_text: 'Số hóa một phần',
                option_note:
                    'Chỉ nhập liệu cơ bản vào hệ thống, nhưng xử lý vẫn thủ công',
                weighted_value: 1,
            },
            {
                option_text:
                    'Số hóa phần lớn nhưng còn phụ thuộc vào giấy tờ, chưa có AI hỗ trợ',
                weighted_value: 2,
            },
            {
                option_text:
                    'Hầu hết quy trình đã số hóa, tích hợp vào hệ thống Core',
                weighted_value: 3,
            },
            {
                option_text:
                    'Hoàn toàn số hóa, có hệ thống tự động hỗ trợ xét duyệt tín dụng',
                weighted_value: 4,
            },
        ],
    },
    {
        question_text:
            'Mức độ số hóa quy trình kế toán tại đơn vị hiện nay như thế nào? (Bao gồm tích hợp phần mềm kế toán, tự động hóa ghi nhận dữ liệu, báo cáo tài chính và kết nối với hệ thống NHNN/NHHTX)',
        question_name: 'Câu 2.4',
        question_type: 'radiogroup',
        weighted_percentage: 0.15,
        belongs_to_pillar: 'Mức độ số hóa các quy trình nghiệp vụ chính',
        survey_id: 2,
        question_target: ['Cán bộ nghiệp vụ'],
        question_options: [
            {
                option_text: 'Hoàn toàn thủ công',
                option_note: 'Sổ sách giấy, không có phần mềm hỗ trợ',
                weighted_value: 0,
            },
            {
                option_text: 'Số hóa một phần',
                option_note: 'Chỉ nhập liệu cơ bản, xử lý vẫn thủ công',
                weighted_value: 1,
            },
            {
                option_text:
                    'Số hóa phần lớn nhưng chưa tích hợp hệ thống Ngân hàng',
                weighted_value: 2,
            },
            {
                option_text: 'Hầu hết quy trình đã số hóa',
                option_note: 'Có tích hợp phần mềm kế toán',
                weighted_value: 3,
            },
            {
                option_text: 'Hoàn toàn số hóa và tự động hóa',
                option_note: 'Báo cáo tài chính tự động, đối soát tự động',
                weighted_value: 4,
            },
        ],
    },
    {
        question_text:
            'Mức độ tích hợp công nghệ vào các dịch vụ khách hàng (bao gồm kênh trực tuyến, Mobile Banking, Chatbot và AI) tại đơn vị như thế nào?',
        question_name: 'Câu 2.5',
        question_type: 'radiogroup',
        weighted_percentage: 0.12,
        belongs_to_pillar:
            'Khả năng tích hợp công nghệ vào quản trị vận hành và dịch vụ khách hàng',
        survey_id: 2,
        question_target: ['Cán bộ nghiệp vụ'],
        question_options: [
            {
                option_text: 'Không tích hợp',
                option_note: 'Chỉ giao dịch trực tiếp',
                weighted_value: 0,
            },
            {
                option_text: 'Mới có một số dịch vụ cơ bản',
                option_note: 'Tin nhắn, tổng đài',
                weighted_value: 1,
            },
            {
                option_text: 'Tích hợp các kênh online nhưng chưa hoàn chỉnh',
                weighted_value: 2,
            },
            {
                option_text: 'Đã có ứng dụng hoặc cổng giao dịch trực tuyến',
                weighted_value: 3,
            },
            {
                option_text:
                    'Hoàn toàn số hóa, có hệ thống quản trị nội bộ đồng bộ',
                weighted_value: 4,
            },
        ],
    },
    {
        question_text:
            'Anh/chị cho biết mức độ tích hợp (liên thông) giữa các hệ thống thông tin trong đơn vị hiện nay như thế nào?',
        question_name: 'Câu 2.6',
        question_type: 'radiogroup',
        weighted_percentage: 0.1,
        belongs_to_pillar:
            'Mức độ tự động hóa trong xử lý nghiệp vụ và vận hành nội bộ',
        survey_id: 2,
        question_target: ['Cán bộ nghiệp vụ'],
        question_options: [
            { option_text: 'Hoàn toàn chưa tích hợp', weighted_value: 0 },
            {
                option_text: 'Đã tích hợp các nghiệp vụ trong core nội bộ',
                weighted_value: 1,
            },
            {
                option_text:
                    'Đã tích hợp được nghiệp vụ trong core và một số ứng dụng CNTT khác tại nội bộ đơn vị',
                weighted_value: 2,
            },
            {
                option_text:
                    'Đã tích hợp được nghiệp vụ trong core và tất cả các ứng dụng CNTT khác tại nội bộ đơn vị',
                weighted_value: 3,
            },
            {
                option_text:
                    'Đã tích hợp được tất cả các ứng dụng CNTT tại đơn vị với các hệ thống của NHNN và Coop – Bank.',
                weighted_value: 4,
            },
        ],
    },
    {
        question_text:
            'Đơn vị có kế hoạch tự động hóa các quy trình nghiệp vụ, bao gồm ứng dụng AI, RPA và quy trình vận hành tự động, như thế nào?',
        question_name: 'Câu 2.7',
        question_type: 'radiogroup',
        weighted_percentage: 0.1,
        belongs_to_pillar:
            'Mức độ tự động hóa trong xử lý nghiệp vụ và vận hành nội bộ',
        survey_id: 2,
        question_target: ['Lãnh đạo & Quản lý'],
        question_options: [
            { option_text: 'Chưa có kế hoạch', weighted_value: 0 },
            {
                option_text: 'Chưa có kế hoạch nhưng có nhu cầu',
                weighted_value: 1,
            },
            {
                option_text: 'Có kế hoạch sơ bộ và đang triển khai từng phần',
                weighted_value: 2,
            },
            {
                option_text:
                    'Có kế hoạch hoàn chỉnh và đã triển khai nhưng chưa hoàn thiện',
                weighted_value: 3,
            },
            {
                option_text: 'Đã triển khai hoàn thiện và đang tối ưu',
                weighted_value: 4,
            },
        ],
    },
    {
        question_text:
            'Đơn vị đang gặp những rào cản nào khi chuẩn hóa quy trình để số hóa?',
        question_name: 'Câu 2.8',
        question_note: 'Có thể chọn nhiều đáp án',
        question_type: 'checkbox',
        weighted_percentage: 0.03,
        belongs_to_pillar:
            'Các rào cản và khó khăn trong quá trình chuẩn hóa và số hóa quy trình nghiệp vụ',
        survey_id: 2,
        question_target: ['Lãnh đạo & Quản lý'],
        question_options: [
            {
                option_text:
                    'Ngân sách hạn chế cho việc đầu tư vào công nghệ và số hóa quy trình',
                weighted_value: 0,
            },
            {
                option_text:
                    'Không đủ nhân sự có kỹ năng chuyên sâu về CNTT và chuyển đổi số',
                weighted_value: 1,
            },
            {
                option_text:
                    'Công nghệ hiện tại không đủ để hỗ trợ các quy trình số hóa',
                weighted_value: 2,
            },
            {
                option_text:
                    'Thiếu chiến lược chuyển đổi số rõ ràng và thực tế',
                weighted_value: 3,
            },
            {
                option_text:
                    'Khó khăn trong việc thay đổi thói quen và quy trình làm việc cũ',
                weighted_value: 4,
            },
            {
                option_text:
                    'Vui lòng mô tả thêm về khó khăn lớn nhất mà đơn vị đang gặp phải trong quá trình số hóa quy trình:…',
                require_reason: 1,
            },
        ],
    },
    {
        question_text:
            'Anh/Chị vui lòng cho biết những rào cản và khó khăn trong việc sử dụng các hệ thống thông tin  tại đơn vị?',
        question_name: 'Câu 2.9',
        question_note:
            'Vui lòng chọn tối đa 3 lý do chính cản trở việc ứng dụng hiệu quả các HTTT tại đơn vị',
        weighted_percentage: 0.03,
        belongs_to_pillar:
            'Các rào cản và khó khăn trong quá trình chuẩn hóa và số hóa quy trình nghiệp vụ',
        survey_id: 2,
        question_type: 'checkbox',
        question_options: [
            { option_text: 'Giao diện khó sử dụng, nhân viên chưa thành thạo' },
            { option_text: 'Chưa có đủ tài liệu/hướng dẫn sử dụng hệ thống' },
            { option_text: 'Tính năng chưa đáp ứng đủ yêu cầu của nghiệp vụ' },
            { option_text: 'Hệ thống thường xuyên lỗi, gián đoạn hoạt động' },
            {
                option_text:
                    'Chưa có sự kết nối/liên thông tốt với các hệ thống khác',
            },
            { option_text: 'Chi phí vận hành & duy trì hệ thống quá cao' },
            { option_text: 'Nhân sự chưa được đào tạo đầy đủ về hệ thống' },
            {
                option_text: 'Khác',
                option_note: 'Vui lòng ghi rõ',
                require_reason: 1,
            },
        ],
    },
    {
        question_text:
            'Đơn vị có kế hoạch gì để khắc phục các rào cản( khó khăn) trong số hóa quy trình?',
        question_name: 'Câu 2.10',
        question_type: 'radiogroup',
        weighted_percentage: 0.02,
        belongs_to_pillar:
            'Các rào cản và khó khăn trong quá trình chuẩn hóa và số hóa quy trình nghiệp vụ',
        survey_id: 2,
        question_options: [
            { option_text: 'Chưa có kế hoạch cụ thể', weighted_value: 0 },
            {
                option_text: 'Đang xây dựng kế hoạch nhưng chưa triển khai',
                weighted_value: 1,
            },
            {
                option_text:
                    'Có kế hoạch nhưng chưa thực hiện được do hạn chế nguồn lực',
                weighted_value: 2,
            },
            {
                option_text: 'Đã triển khai một phần nhưng chưa hoàn chỉnh',
                weighted_value: 3,
            },
            {
                option_text: 'Đã có kế hoạch hoàn chỉnh và đang thực hiện',
                weighted_value: 4,
            },
        ],
    },
    {
        question_text:
            'Theo Anh/Chị, các giải pháp công nghệ số nào sau đây là cần thiết và phù hợp để triển khai dùng chung giữa các QTDND?',
        question_name: 'Câu 2.11',
        question_note: 'Có thể chọn nhiều đáp án',
        question_type: 'checkbox',
        weighted_percentage: 0.02,
        belongs_to_pillar:
            'Các rào cản và khó khăn trong quá trình chuẩn hóa và số hóa quy trình nghiệp vụ',
        survey_id: 2,
        question_options: [
            {
                option_text: 'Hệ thống nghiệp vụ ngân hàng lõi (CoreBanking)',
                weighted_value: 1,
            },
            {
                option_text:
                    'Hệ thống Mobile Banking cho thành viên/khách hàng',
                weighted_value: 2,
            },
            {
                option_text: 'Hệ thống thanh toán chuyển tiền CF-eBank',
                weighted_value: 2,
            },
            {
                option_text: 'Hệ thống chấm điểm tín dụng khách hàng',
                weighted_value: 2,
            },
            {
                option_text: 'Hệ thống báo cáo quản trị điều hành',
                weighted_value: 3,
            },
            {
                option_text: 'Hệ thống mã định danh tài khoản thu hộ/chi hộ',
                weighted_value: 2,
            },
            {
                option_text:
                    'Hệ thống trục thanh toán Payment Hub kết nối với NHHT',
                weighted_value: 3,
            },
            {
                option_text: 'Khác',
                option_note: 'Vui lòng ghi rõ',
                require_reason: 1,
            },
        ],
    },
    {
        question_text:
            'Anh/Chị vui lòng cho biết đơn vị đang sử dụng các ứng nào của các hệ thống Co-opBank cung cấp cho QTDND sau đây tại đơn vị?',
        question_name: 'Câu 2.12',
        question_type: 'checkbox',
        weighted_percentage: 0.08,
        belongs_to_pillar:
            'Mức độ tích hợp với hệ thống ngân hàng trung ương (NHNN) và ngân hàng hợp tác xã (NHHTX)',
        survey_id: 2,
        question_note: 'Có thể chọn nhiều đáp án',
        question_target: ['Cán bộ nghiệp vụ'],
        question_options: [
            {
                option_text: 'Hệ thống thanh toán chuyển tiền CF-eBank',
                weighted_value: 1,
            },
            {
                option_text: 'Hệ thống khởi tạo dịch vụ từ xa CFePCF',
                weighted_value: 2,
            },
            {
                option_text: 'Ứng dụng di động Co-opBank Mobile Banking',
                weighted_value: 2,
            },
            {
                option_text: 'Ứng dụng Mobile Banking dành cho QTDND (CFeBiz)',
                weighted_value: 3,
            },
            {
                option_text: 'Ứng dụng giáo dục tài chính Co-opSmart',
                weighted_value: 2,
            },
            {
                option_text: 'Hệ thống trục thanh toán Payment Hub',
                weighted_value: 3,
            },
            {
                option_text: 'Hệ thống quản lý tài khoản định danh CfeAM',
                weighted_value: 2,
            },
            {
                option_text: 'Không sử dụng bất kỳ hệ thống nào',
                weighted_value: 0,
            },
            {
                option_text: 'Khác',
                option_note: 'Vui lòng ghi rõ',
                require_reason: 1,
            },
        ],
    },
    {
        question_text:
            'Anh/Chị vui lòng cho biết mức độ hiệu quả của các hệ thống Co-opBank đã triển khai tại đơn vị?',
        question_name: 'Câu 2.13',
        question_type: 'group',
        survey_id: 2,
        question_target: ['Cán bộ nghiệp vụ'],
    },
    {
        question_text: 'Hệ thống thanh toán chuyển tiền CF-eBank',
        question_name: 'Câu 2.13.1',
        question_type: 'radiogroup',
        survey_id: 2,
        question_target: ['Cán bộ nghiệp vụ'],
        weighted_percentage: 0.07 / 8,
        belongs_to_pillar:
            'Mức độ tích hợp với hệ thống ngân hàng trung ương (NHNN) và ngân hàng hợp tác xã (NHHTX)',
        parent: 'Câu 2.13',
        question_options: [
            { option_text: 'Không hiệu quả', weighted_value: 0 },
            { option_text: 'Đáp ứng một phần', weighted_value: 1 },
            { option_text: 'Đáp ứng cơ bản', weighted_value: 2 },
            { option_text: 'Hiệu quả', weighted_value: 3 },
            { option_text: 'Rất hiệu quả', weighted_value: 4 },
            { option_text: 'Không sử dụng', weighted_value: 0 },
        ],
    },
    {
        question_text: 'Hệ thống khởi tạo dịch vụ từ xa CFePCF',
        question_name: 'Câu 2.13.2',
        question_type: 'radiogroup',
        survey_id: 2,
        question_target: ['Cán bộ nghiệp vụ'],
        weighted_percentage: 0.07 / 8,
        belongs_to_pillar:
            'Mức độ tích hợp với hệ thống ngân hàng trung ương (NHNN) và ngân hàng hợp tác xã (NHHTX)',
        parent: 'Câu 2.13',
        question_options: [
            { option_text: 'Không hiệu quả', weighted_value: 0 },
            { option_text: 'Đáp ứng một phần', weighted_value: 1 },
            { option_text: 'Đáp ứng cơ bản', weighted_value: 2 },
            { option_text: 'Hiệu quả', weighted_value: 3 },
            { option_text: 'Rất hiệu quả', weighted_value: 4 },
            { option_text: 'Không sử dụng', weighted_value: 0 },
        ],
    },
    {
        question_text: 'Hệ thống Báo cáo giám sát QTDND - PRMS',
        question_name: 'Câu 2.13.3',
        question_type: 'radiogroup',
        survey_id: 2,
        question_target: ['Cán bộ nghiệp vụ'],
        weighted_percentage: 0.07 / 8,
        belongs_to_pillar:
            'Mức độ tích hợp với hệ thống ngân hàng trung ương (NHNN) và ngân hàng hợp tác xã (NHHTX)',
        parent: 'Câu 2.13',
        question_options: [
            { option_text: 'Không hiệu quả', weighted_value: 0 },
            { option_text: 'Đáp ứng một phần', weighted_value: 1 },
            { option_text: 'Đáp ứng cơ bản', weighted_value: 2 },
            { option_text: 'Hiệu quả', weighted_value: 3 },
            { option_text: 'Rất hiệu quả', weighted_value: 4 },
            { option_text: 'Không sử dụng', weighted_value: 0 },
        ],
    },
    {
        question_text: 'Ứng dụng di động Co-opBank Mobile Banking',
        question_name: 'Câu 2.13.4',
        question_type: 'radiogroup',
        survey_id: 2,
        question_target: ['Cán bộ nghiệp vụ'],
        weighted_percentage: 0.07 / 8,
        belongs_to_pillar:
            'Mức độ tích hợp với hệ thống ngân hàng trung ương (NHNN) và ngân hàng hợp tác xã (NHHTX)',
        parent: 'Câu 2.13',
        question_options: [
            { option_text: 'Không hiệu quả', weighted_value: 0 },
            { option_text: 'Đáp ứng một phần', weighted_value: 1 },
            { option_text: 'Đáp ứng cơ bản', weighted_value: 2 },
            { option_text: 'Hiệu quả', weighted_value: 3 },
            { option_text: 'Rất hiệu quả', weighted_value: 4 },
            { option_text: 'Không sử dụng', weighted_value: 0 },
        ],
    },
    {
        question_text: 'Ứng dụng Mobile Banking dành cho QTDND (CFeBiz)',
        question_name: 'Câu 2.13.5',
        question_type: 'radiogroup',
        survey_id: 2,
        question_target: ['Cán bộ nghiệp vụ'],
        weighted_percentage: 0.07 / 8,
        belongs_to_pillar:
            'Mức độ tích hợp với hệ thống ngân hàng trung ương (NHNN) và ngân hàng hợp tác xã (NHHTX)',
        parent: 'Câu 2.13',
        question_options: [
            { option_text: 'Không hiệu quả', weighted_value: 0 },
            { option_text: 'Đáp ứng một phần', weighted_value: 1 },
            { option_text: 'Đáp ứng cơ bản', weighted_value: 2 },
            { option_text: 'Hiệu quả', weighted_value: 3 },
            { option_text: 'Rất hiệu quả', weighted_value: 4 },
            { option_text: 'Không sử dụng', weighted_value: 0 },
        ],
    },
    {
        question_text: 'Ứng dụng giao dịch tài chính Co-opSmart',
        question_name: 'Câu 2.13.6',
        question_type: 'radiogroup',
        survey_id: 2,
        question_target: ['Cán bộ nghiệp vụ'],
        weighted_percentage: 0.07 / 8,
        belongs_to_pillar:
            'Mức độ tích hợp với hệ thống ngân hàng trung ương (NHNN) và ngân hàng hợp tác xã (NHHTX)',
        parent: 'Câu 2.13',
        question_options: [
            { option_text: 'Không hiệu quả', weighted_value: 0 },
            { option_text: 'Đáp ứng một phần', weighted_value: 1 },
            { option_text: 'Đáp ứng cơ bản', weighted_value: 2 },
            { option_text: 'Hiệu quả', weighted_value: 3 },
            { option_text: 'Rất hiệu quả', weighted_value: 4 },
            { option_text: 'Không sử dụng', weighted_value: 0 },
        ],
    },
    {
        question_text: 'Hệ thống trục thanh toán Payment Hub',
        question_name: 'Câu 2.13.7',
        question_type: 'radiogroup',
        survey_id: 2,
        question_target: ['Cán bộ nghiệp vụ'],
        weighted_percentage: 0.07 / 8,
        belongs_to_pillar:
            'Mức độ tích hợp với hệ thống ngân hàng trung ương (NHNN) và ngân hàng hợp tác xã (NHHTX)',
        parent: 'Câu 2.13',
        question_options: [
            { option_text: 'Không hiệu quả', weighted_value: 0 },
            { option_text: 'Đáp ứng một phần', weighted_value: 1 },
            { option_text: 'Đáp ứng cơ bản', weighted_value: 2 },
            { option_text: 'Hiệu quả', weighted_value: 3 },
            { option_text: 'Rất hiệu quả', weighted_value: 4 },
            { option_text: 'Không sử dụng', weighted_value: 0 },
        ],
    },
    {
        question_text: 'Hệ thống quản lý tài khoản định danh CFeAM',
        question_name: 'Câu 2.13.8',
        question_type: 'radiogroup',
        survey_id: 2,
        question_target: ['Cán bộ nghiệp vụ'],
        weighted_percentage: 0.07 / 8,
        belongs_to_pillar:
            'Mức độ tích hợp với hệ thống ngân hàng trung ương (NHNN) và ngân hàng hợp tác xã (NHHTX)',
        parent: 'Câu 2.13',
        question_options: [
            { option_text: 'Không hiệu quả', weighted_value: 0 },
            { option_text: 'Đáp ứng một phần', weighted_value: 1 },
            { option_text: 'Đáp ứng cơ bản', weighted_value: 2 },
            { option_text: 'Hiệu quả', weighted_value: 3 },
            { option_text: 'Rất hiệu quả', weighted_value: 4 },
            { option_text: 'Không sử dụng', weighted_value: 0 },
        ],
    },
    {
        question_text:
            'Mức độ trang bị máy tính và thiết bị CNTT tại đơn vị của Anh/Chị như thế nào?',
        question_name: 'Câu 3.1',
        question_note: 'Vui lòng chọn một đáp án phù hợp nhất',
        question_type: 'radiogroup',
        weighted_percentage: 0.09,
        belongs_to_pillar: 'Hiện trạng hạ tầng CNTT',
        survey_id: 3,
        question_target: ['Lãnh đạo & Quản lý'],
        question_options: [
            { option_text: 'Hoàn toàn chưa có', weighted_value: 0 },
            { option_text: 'Trang bị rất hạn chế', weighted_value: 1 },
            { option_text: 'Trang bị một phần', weighted_value: 2 },
            {
                option_text: 'Trang bị gần đầy đủ nhưng hạn chế trong sử dụng',
                weighted_value: 3,
            },
            {
                option_text: 'Trang bị đầy đủ và sử dụng hiệu quả',
                weighted_value: 4,
            },
            {
                option_text: 'Trang bị đầy đủ và sử dụng rất hiệu quả',
                weighted_value: 5,
            },
        ],
    },
    {
        question_text:
            'Đơn vị của Anh/Chị đã được trang bị về hạ tầng CNTT theo hạng mục nào dưới đây?',
        question_name: 'Câu 3.2',
        question_note: 'Có thể chọn nhiều đáp án',
        question_type: 'checkbox',
        weighted_percentage: 0.08,
        belongs_to_pillar: 'Hiện trạng hạ tầng CNTT',
        survey_id: 3,
        question_target: ['Lãnh đạo & Quản lý'],
        question_options: [
            { option_text: 'Máy chủ dùng riêng cho Hệ thống Core' },
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
            { option_text: 'Bộ lưu điện (UPS - Uninterruptible Power Supply)' },
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
        weighted_percentage: 0.06,
        belongs_to_pillar: 'Hiện trạng hạ tầng CNTT',
        survey_id: 3,
        question_target: ['Cán bộ nghiệp vụ'],
        question_options: [
            {
                option_text: 'Rất kém',
                option_note: 'thường xuyên mất kết nối',
                weighted_value: 0,
            },
            {
                option_text: 'Kém',
                option_note: 'mạng chậm, không ổn định',
                weighted_value: 1,
            },
            {
                option_text: 'Trung bình',
                option_note: 'đáp ứng nhu cầu cơ bản',
                weighted_value: 2,
            },
            {
                option_text: 'Tốt',
                option_note: 'ổn định, ít gián đoạn',
                weighted_value: 3,
            },
            {
                option_text: 'Rất tốt',
                option_note: 'tốc độ cao, ổn định liên tục',
                weighted_value: 4,
            },
        ],
    },
    {
        question_text:
            'Đơn vị có kế hoạch nâng cấp cơ sở hạ tầng CNTT trong thời gian tới không?',
        question_name: 'Câu 3.4',
        question_type: 'radiogroup',
        weighted_percentage: 0.35,
        belongs_to_pillar: 'Kế hoạch nâng cấp hạ tầng',
        survey_id: 3,
        question_target: ['Lãnh đạo & Quản lý'],
        question_options: [
            { option_text: 'Chưa có kế hoạch', weighted_value: 0 },
            { option_text: 'Có kế hoạch sơ bộ', weighted_value: 1 },
            { option_text: 'Đang hoàn thiện kế hoạch', weighted_value: 2 },
            { option_text: 'Kế hoạch đầy đủ', weighted_value: 3 },
            {
                option_text: 'Kế hoạch đầy đủ sẵn sàng triển khai',
                weighted_value: 4,
            },
        ],
    },
    {
        question_text:
            'Quỹ đã có kế hoạch hoặc triển khai ứng dụng công nghệ điện toán đám mây vào hệ thống CNTT hiện tại ở mức độ nào?',
        question_name: 'Câu 3.5',
        question_type: 'radiogroup',
        weighted_percentage: 0.03,
        belongs_to_pillar: 'Ứng dụng công nghệ tiên tiến',
        survey_id: 3,
        question_target: ['Lãnh đạo & Quản lý'],
        question_options: [
            { option_text: 'Chưa có kế hoạch triển khai', weighted_value: 0 },
            {
                option_text: 'Đã có kế hoạch nhưng chưa triển khai',
                weighted_value: 1,
            },
            {
                option_text: 'Đã triển khai chính thức một phần',
                weighted_value: 2,
            },
            {
                option_text:
                    'Đã triển khai hoàn chỉnh nhưng chưa khai thác hiệu quả',
                weighted_value: 3,
            },
            {
                option_text:
                    'Đã triển khai hoàn chỉnh và đang khai thác hiệu quả',
                weighted_value: 4,
            },
        ],
    },
    {
        question_text:
            'Mức độ sử dụng các công nghệ AI hỗ trợ trong các quy trình tại đơn vị là như thế nào?',
        question_name: 'Câu 3.6',
        question_type: 'radiogroup',
        weighted_percentage: 0.02,
        belongs_to_pillar: 'Ứng dụng công nghệ tiên tiến',
        survey_id: 3,
        question_target: ['Lãnh đạo & Quản lý'],
        question_options: [
            { option_text: 'Chưa sử dụng', weighted_value: 0 },
            {
                option_text: 'Sử dụng ở mức thử nghiệm một vài nghiệp vụ',
                weighted_value: 1,
            },
            {
                option_text:
                    'Đã sử dụng chính thức trong một vài nghiệp vụ đơn lẻ',
                weighted_value: 2,
            },
            {
                option_text: 'Đã sử dụng chính thức trong nghiệp vụ lõi',
                weighted_value: 3,
            },
            { option_text: 'Sử dụng và có hiệu quả cao', weighted_value: 4 },
        ],
    },
    {
        question_text:
            'Hệ thống Core đã được triển khai và vận hành tại đơn vị anh/chị hiện nay như thế nào?',
        question_name: 'Câu 3.7',
        question_type: 'radiogroup',
        weighted_percentage: 0.05,
        belongs_to_pillar: 'Hiện trạng hạ tầng CNTT',
        survey_id: 3,
        question_target: ['Cán bộ nghiệp vụ'],
        question_options: [
            { option_text: 'Chưa triển khai Hệ thống Core', weighted_value: 0 },
            {
                option_text: 'Đã triển khai Hệ thống Core nhưng hiệu quả thấp',
                weighted_value: 1,
            },
            {
                option_text:
                    'Đã triển khai Hệ thống Core đạt được hiệu quả như mong đợi',
                weighted_value: 2,
            },
            {
                option_text:
                    'Đã triển khai Hệ thống Core đạt được hiệu quả trên mong đợi',
                weighted_value: 3,
            },
            {
                option_text:
                    'Đã triển khai Hệ thống Core đạt được hiệu quả tối ưu',
                weighted_value: 4,
            },
        ],
    },
    {
        question_text:
            'Đơn vị có kế hoạch triển khai hoặc mở rộng ứng dụng AI, Blockchain vào quản lý hoạt động không?',
        question_name: 'Câu 3.8',
        question_type: 'radiogroup',
        weighted_percentage: 0.02,
        belongs_to_pillar: 'Ứng dụng công nghệ tiên tiến',
        survey_id: 3,
        question_target: ['Lãnh đạo & Quản lý'],
        question_options: [
            { option_text: 'Chưa có kế hoạch', weighted_value: 0 },
            { option_text: 'Đang xây dựng kế hoạch sơ bộ', weighted_value: 1 },
            { option_text: 'Đã có kế hoạch gần hoàn chỉnh', weighted_value: 2 },
            { option_text: 'Kế hoạch hoàn chỉnh', weighted_value: 3 },
            { option_text: 'Đã bắt đầu triển khai', weighted_value: 4 },
        ],
    },
    {
        question_text: 'Mức độ ứng dụng e-banking tại đơn vị như thế nào?',
        question_name: 'Câu 3.9',
        question_type: 'radiogroup',
        weighted_percentage: 0.02,
        belongs_to_pillar: 'Ứng dụng công nghệ tiên tiến',
        survey_id: 3,
        question_target: ['Cán bộ nghiệp vụ'],
        question_options: [
            { option_text: 'Không sử dụng', weighted_value: 0 },
            { option_text: 'Sử dụng thử nghiệm', weighted_value: 1 },
            { option_text: 'Sử dụng nhưng còn hạn chế', weighted_value: 2 },
            { option_text: 'Sử dụng tốt', weighted_value: 3 },
            { option_text: 'Sử dụng rất hiệu quả', weighted_value: 4 },
        ],
    },
    {
        question_text:
            'Mức độ tích hợp Core với hệ thống Co-opBank và NHNN tại đơn vị anh/chị như thế nào?',
        question_name: 'Câu 3.10',
        question_type: 'radiogroup',
        weighted_percentage: 0.15,
        belongs_to_pillar: 'Mức độ tích hợp với hệ thống ngân hàng số',
        survey_id: 3,
        question_target: ['Cán bộ nghiệp vụ'],
        question_options: [
            { option_text: 'Chưa có kế hoạch', weighted_value: 0 },
            { option_text: 'Chưa tích hợp', weighted_value: 1 },
            { option_text: 'Đã tích hợp một phần', weighted_value: 2 },
            {
                option_text: 'Tích hợp hoàn chỉnh nhưng sử dụng chưa hiệu quả',
                weighted_value: 3,
            },
            {
                option_text: 'Tích hợp hoàn chỉnh và sử dụng hiệu quả',
                weighted_value: 4,
            },
        ],
    },
    {
        question_text:
            'Mức độ tích hợp hệ thống CNTT của đơn vị với các nền tảng của NHNN & NHHTX như thế nào?',
        question_name: 'Câu 3.11',
        question_type: 'radiogroup',
        weighted_percentage: 0.1,
        belongs_to_pillar: 'Mức độ tích hợp với hệ thống ngân hàng số',
        survey_id: 3,
        question_target: ['Cán bộ nghiệp vụ'],
        question_options: [
            { option_text: 'Hoàn toàn không tích hợp', weighted_value: 0 },
            { option_text: 'Tích hợp một phần nhỏ', weighted_value: 1 },
            { option_text: 'Tích hợp các quy trình chính', weighted_value: 2 },
            {
                option_text: 'Tích hợp hầu hết các quy trình',
                weighted_value: 3,
            },
            { option_text: 'Tích hợp đầy đủ', weighted_value: 4 },
        ],
    },
    {
        question_text:
            'Mức độ sẵn sàng của nhân sự trong việc vận hành công nghệ mới như AI, điện toán đám mây tại đơn vị?',
        question_name: 'Câu 3.12',
        question_type: 'radiogroup',
        weighted_percentage: 0.01,
        belongs_to_pillar: 'Ứng dụng công nghệ tiên tiến',
        survey_id: 3,
        question_target: ['Lãnh đạo & Quản lý'],
        question_options: [
            { option_text: 'Hoàn toàn không sẵn sàng', weighted_value: 0 },
            { option_text: 'Không sẵn sàng', weighted_value: 1 },
            {
                option_text: 'Sẵn sàng nhưng cần đào tạo thêm',
                weighted_value: 2,
            },
            {
                option_text: 'Sẵn sàng và có thể ứng dụng ngay',
                weighted_value: 3,
            },
            {
                option_text:
                    'Hoàn toàn sẵn sàng và có thể hướng dẫn người khác',
                weighted_value: 4,
            },
        ],
    },
    {
        question_text:
            'Đơn vị đã xây dựng và vận hành hệ thống hạ tầng CNTT như thế nào theo các tiêu chí sau?',
        question_name: 'Câu 3.13',
        question_type: 'group',
        survey_id: 3,
        question_target: ['Lãnh đạo & Quản lý'],
    },
    {
        question_text:
            'Hạ tầng CNTT tuân thủ tiêu chuẩn kỹ thuật ngành ngân hàng',
        question_name: 'Câu 3.13.1',
        question_type: 'radiogroup',
        weighted_percentage: 0.2 / 4,
        belongs_to_pillar: 'Mức độ tích hợp với hệ thống ngân hàng số',
        survey_id: 3,
        question_target: ['Lãnh đạo & Quản lý'],
        parent: 'Câu 3.13',
        question_options: [
            { option_text: 'Chưa có', weighted_value: 0 },
            { option_text: 'Mới xây dựng sơ bộ', weighted_value: 1 },
            { option_text: 'Đang triển khai', weighted_value: 2 },
            { option_text: 'Vận hành hiệu quả', weighted_value: 3 },
            { option_text: 'Vận hành tối ưu', weighted_value: 4 },
        ],
    },
    {
        question_text: 'Có khả năng mở rộng khi tăng quy mô hoạt động',
        question_name: 'Câu 3.13.2',
        question_type: 'radiogroup',
        weighted_percentage: 0.2 / 4,
        belongs_to_pillar: 'Mức độ tích hợp với hệ thống ngân hàng số',
        survey_id: 3,
        question_target: ['Lãnh đạo & Quản lý'],
        parent: 'Câu 3.13',
        question_options: [
            { option_text: 'Chưa có', weighted_value: 0 },
            { option_text: 'Mới xây dựng sơ bộ', weighted_value: 1 },
            { option_text: 'Đang triển khai', weighted_value: 2 },
            { option_text: 'Vận hành hiệu quả', weighted_value: 3 },
            { option_text: 'Vận hành tối ưu', weighted_value: 4 },
        ],
    },
    {
        question_text: 'Có kế hoạch bảo trì định kỳ và phân công rõ ràng',
        question_name: 'Câu 3.13.3',
        question_type: 'radiogroup',
        weighted_percentage: 0.2 / 4,
        belongs_to_pillar: 'Mức độ tích hợp với hệ thống ngân hàng số',
        survey_id: 3,
        question_target: ['Lãnh đạo & Quản lý'],
        parent: 'Câu 3.13',
        question_options: [
            { option_text: 'Chưa có', weighted_value: 0 },
            { option_text: 'Mới xây dựng sơ bộ', weighted_value: 1 },
            { option_text: 'Đang triển khai', weighted_value: 2 },
            { option_text: 'Vận hành hiệu quả', weighted_value: 3 },
            { option_text: 'Vận hành tối ưu', weighted_value: 4 },
        ],
    },
    {
        question_text:
            'Có phần mềm quản lý tập trung toàn bộ thiết bị CNTT trong đơn vị',
        question_name: 'Câu 3.13.4',
        question_type: 'radiogroup',
        weighted_percentage: 0.2 / 4,
        belongs_to_pillar: 'Mức độ tích hợp với hệ thống ngân hàng số',
        survey_id: 3,
        question_target: ['Lãnh đạo & Quản lý'],
        parent: 'Câu 3.13',
        question_options: [
            { option_text: 'Chưa có', weighted_value: 0 },
            { option_text: 'Mới xây dựng sơ bộ', weighted_value: 1 },
            { option_text: 'Đang triển khai', weighted_value: 2 },
            { option_text: 'Vận hành hiệu quả', weighted_value: 3 },
            { option_text: 'Vận hành tối ưu', weighted_value: 4 },
        ],
    },
    {
        question_text:
            'Đơn vị có sử dụng các sản phẩm công nghệ dùng chung giữa QTDND, NHNN và NHHTX không?',
        question_name: 'Câu 3.14',
        question_type: 'radiogroup',
        survey_id: 3,
        question_target: ['Lãnh đạo & Quản lý'],
        question_options: [
            {
                option_text:
                    'Không sử dụng bất kỳ sản phẩm công nghệ nào dùng chung',
            },
            {
                option_text:
                    'Sử dụng một số sản phẩm công nghệ dùng chung ở mức cơ bản',
                option_note: 'Ví dụ: phần mềm thanh toán, báo cáo',
            },
            {
                option_text:
                    'Đã triển khai một số sản phẩm công nghệ dùng chung, nhưng còn phân tán và chưa đồng bộ',
            },
            {
                option_text:
                    'Đã triển khai và sử dụng đầy đủ các sản phẩm công nghệ dùng chung trong các nghiệp vụ cốt lõi',
                option_note: 'Ví dụ: hệ thống thanh toán, ngân hàng lõi',
            },
            {
                option_text:
                    'Đã hoàn thiện việc tích hợp và sử dụng các sản phẩm công nghệ dùng chung một cách toàn diện, đồng bộ và hiệu quả',
                option_note:
                    'Bao gồm tất cả các công cụ và dịch vụ từ NHNN, NHHTX',
            },
        ],
    },
    {
        question_text:
            'Mức độ an toàn của hệ thống CNTT tại đơn vị trong việc bảo vệ dữ liệu khách hàng và giao dịch như thế nào?',
        question_name: 'Câu 4.1',
        question_type: 'radiogroup',
        weighted_percentage: 0.08,
        belongs_to_pillar: 'Mức độ bảo mật dữ liệu KH & giao dịch',
        survey_id: 4,
        question_options: [
            { option_text: 'Hoàn toàn không an toàn', weighted_value: 0 },
            { option_text: 'Không an toàn', weighted_value: 1 },
            { option_text: 'Tương đối an toàn', weighted_value: 2 },
            { option_text: 'An toàn', weighted_value: 3 },
            { option_text: 'Rất an toàn', weighted_value: 4 },
        ],
    },
    {
        question_text: 'Đơn vị có chính sách bảo mật dữ liệu rõ ràng không?',
        question_name: 'Câu 4.2',
        question_type: 'radiogroup',
        weighted_percentage: 0.05,
        belongs_to_pillar: 'Mức độ bảo mật dữ liệu KH & giao dịch',
        survey_id: 4,
        question_options: [
            { option_text: 'Không có chính sách', weighted_value: 0 },
            {
                option_text: 'Có chính sách nhưng chưa áp dụng',
                weighted_value: 1,
            },
            {
                option_text: 'Có chính sách nhưng tuân thủ chưa đầy đủ',
                weighted_value: 2,
            },
            {
                option_text: 'Chính sách bảo mật được tuân thủ tốt',
                weighted_value: 3,
            },
            {
                option_text: 'Chính sách bảo mật được tuân thủ rất tốt',
                weighted_value: 4,
            },
        ],
    },
    {
        question_text:
            'Nhân viên tại đơn vị có nhận thức đầy đủ về rủi ro an ninh mạng và bảo mật dữ liệu không?',
        question_name: 'Câu 4.3',
        question_type: 'radiogroup',
        weighted_percentage: 0.08,
        belongs_to_pillar: 'Nhận thức & kỹ năng nhân sự',
        survey_id: 4,
        question_target: ['Cán bộ nghiệp vụ'],
        question_options: [
            { option_text: 'Hoàn toàn không nhận thức', weighted_value: 0 },
            { option_text: 'Nhận thức hạn chế', weighted_value: 1 },
            { option_text: 'Nhận thức tương đối', weighted_value: 2 },
            { option_text: 'Nhận thức tốt', weighted_value: 3 },
            { option_text: 'Nhận thức rất tốt', weighted_value: 4 },
        ],
    },
    {
        question_text:
            'Đơn vị có tổ chức đào tạo định kỳ về nhận thức an ninh mạng và phòng chống rủi ro công nghệ không?',
        question_name: 'Câu 4.4',
        question_type: 'radiogroup',
        weighted_percentage: 0.07,
        belongs_to_pillar: 'Nhận thức & kỹ năng nhân sự',
        survey_id: 4,
        question_target: ['Cán bộ nghiệp vụ'],
        question_options: [
            { option_text: 'Chưa có chương trình đào tạo', weighted_value: 0 },
            {
                option_text: 'Đã có kế hoạch nhưng chưa thực hiện đào tạo',
                weighted_value: 1,
            },
            {
                option_text: 'Có tổ chức đào tạo nhưng không theo định kỳ',
                option_note: 'Thỉnh thoảng, không thường xuyên',
                weighted_value: 2,
            },
            {
                option_text: 'Tổ chức đào tạo định kỳ với hiệu quả tốt',
                weighted_value: 3,
            },
            {
                option_text: 'Đào tạo thường xuyên có hiệu quả',
                weighted_value: 4,
            },
            {
                option_text:
                    'Tổ chức đào tạo định kỳ hiệu quả tốt và sát với thực tiễn công việc',
                weighted_value: 4,
            },
        ],
    },
    {
        question_text:
            'Khi gặp sự cố an ninh mạng (rò rỉ dữ liệu, tấn công mạng, virus…), anh/chị có biết cách xử lý không?',
        question_name: 'Câu 4.5',
        question_type: 'radiogroup',
        weighted_percentage: 0.05,
        belongs_to_pillar: 'Nhận thức & kỹ năng nhân sự',
        survey_id: 4,
        question_options: [
            {
                option_text:
                    'Không biết cách xử lý và không biết cần báo cáo cho ai',
                weighted_value: 0,
            },
            {
                option_text:
                    'Biết cần báo cáo cho bộ phận IT nhưng không biết rõ quy trình',
                weighted_value: 1,
            },
            {
                option_text: 'Biết báo cáo và hiểu rõ quy trình xử lý sự cố',
                weighted_value: 2,
            },
            {
                option_text:
                    'Có thể thực hiện các biện pháp bảo vệ cơ bản trước khi báo IT',
                weighted_value: 3,
            },
            {
                option_text:
                    'Thành thạo xử lý sự cố và có thể hướng dẫn đồng nghiệp',
                weighted_value: 4,
            },
        ],
    },
    {
        question_text:
            'Đơn vị đã có kế hoạch ứng phó rõ ràng khi xảy ra sự cố an ninh mạng chưa?',
        question_name: 'Câu 4.6',
        question_type: 'radiogroup',
        weighted_percentage: 0.05,
        belongs_to_pillar: 'Biện pháp ứng phó rủi ro',
        survey_id: 4,
        question_target: ['Lãnh đạo & Quản lý'],
        question_options: [
            { option_text: 'Chưa có kế hoạch', weighted_value: 0 },
            { option_text: 'Có kế hoạch một phần', weighted_value: 1 },
            {
                option_text: 'Kế hoạch đầy đủ nhưng chưa được thử nghiệm',
                weighted_value: 2,
            },
            {
                option_text: 'Kế hoạch đầy đủ và bắt đầu thử nghiệm',
                weighted_value: 3,
            },
            { option_text: 'Kế hoạch đầy đủ và đã áp dụng', weighted_value: 4 },
        ],
    },
    {
        question_text:
            'Đơn vị đã thực hiện diễn tập các kịch bản ứng phó với sự cố an ninh mạng chưa?',
        question_name: 'Câu 4.7',
        question_type: 'radiogroup',
        weighted_percentage: 0.05,
        belongs_to_pillar: 'Biện pháp ứng phó rủi ro',
        survey_id: 4,
        question_options: [
            { option_text: 'Chưa thực hiện diễn tập', weighted_value: 0 },
            { option_text: 'Đã thực hiện sơ bộ', weighted_value: 1 },
            { option_text: 'Đã thực hiện một phần', weighted_value: 2 },
            { option_text: 'Đã thực hiện đầy đủ', weighted_value: 3 },
            { option_text: 'Đã thực hiện thường xuyên', weighted_value: 4 },
        ],
    },
    {
        question_text:
            'Khi gặp sự cố thực tế, đơn vị có thể xử lý ngay lập tức không?',
        question_name: 'Câu 4.8',
        question_type: 'radiogroup',
        weighted_percentage: 0.05,
        belongs_to_pillar: 'Biện pháp ứng phó rủi ro',
        survey_id: 4,
        question_options: [
            { option_text: 'Hoàn toàn không có phương án', weighted_value: 0 },
            {
                option_text: 'Cần thời gian dài để khắc phục',
                weighted_value: 1,
            },
            { option_text: 'Xử lý cơ bản nhưng cần hỗ trợ', weighted_value: 2 },
            { option_text: 'Xử lý nhanh & hiệu quả', weighted_value: 3 },
            {
                option_text: 'Xử lý rất tốt & có thể phòng ngừa sự cố',
                weighted_value: 4,
            },
        ],
    },
    {
        question_text: 'Đơn vị đã từng gặp phải sự cố an ninh mạng nào chưa?',
        question_name: 'Câu 4.9',
        question_type: 'checkbox',
        weighted_percentage: 0.05,
        belongs_to_pillar: 'Biện pháp ứng phó rủi ro',
        survey_id: 4,
        question_target: ['Cán bộ nghiệp vụ'],
        question_note: 'Có thể chọn nhiều đáp án',
        question_options: [
            { option_text: 'Lộ dữ liệu khách hàng', weighted_value: 0 },
            {
                option_text: 'Bị tấn công mạng',
                option_note: 'DDoS, Malware, Phishing',
                weighted_value: 1.5,
            },
            {
                option_text: 'Virus/Trojan ảnh hưởng đến hệ thống',
                weighted_value: 1.5,
            },
            {
                option_text: 'Nhân viên vô tình gây ra lỗi bảo mật',
                weighted_value: 2,
            },
            { option_text: 'Chưa từng gặp sự cố nào', weighted_value: 4 },
            {
                option_text: 'Khác',
                require_reason: 1,
                option_note: 'Ghi tên sự cố đã gặp',
            },
        ],
    },
    {
        question_text:
            'Đơn vị đã trang bị các công cụ giám sát an ninh mạng đầy đủ chưa?',
        question_name: 'Câu 4.10',
        question_type: 'radiogroup',
        weighted_percentage: 0.04,
        belongs_to_pillar: 'Mức độ bảo mật dữ liệu KH & giao dịch',
        survey_id: 4,
        question_target: ['Cán bộ nghiệp vụ'],
        question_options: [
            { option_text: 'Chưa có công cụ', weighted_value: 0 },
            {
                option_text: 'Trang bị cơ bản nhưng chưa sử dụng hiệu quả',
                weighted_value: 1,
            },
            { option_text: 'Đã trang bị đầy đủ', weighted_value: 2 },
            {
                option_text: 'Đã trang bị đầy đủ và sử dụng hiệu quả',
                weighted_value: 3,
            },
            {
                option_text: 'Đã trang bị và liên tục cải tiến',
                weighted_value: 4,
            },
        ],
    },
    {
        question_text:
            'Các công cụ giám sát an ninh mạng tại đơn vị có hoạt động hiệu quả không?',
        question_name: 'Câu 4.11',
        question_type: 'radiogroup',
        weighted_percentage: 0.05,
        belongs_to_pillar: 'Mức độ bảo mật dữ liệu KH & giao dịch',
        survey_id: 4,
        question_target: ['Cán bộ nghiệp vụ'],
        question_options: [
            { option_text: 'Không hiệu quả', weighted_value: 0 },
            { option_text: 'Hiệu quả thấp', weighted_value: 1 },
            { option_text: 'Hiệu quả trung bình', weighted_value: 2 },
            { option_text: 'Hiệu quả tốt', weighted_value: 3 },
            { option_text: 'Rất hiệu quả', weighted_value: 4 },
        ],
    },
    {
        question_text:
            'Mức độ tuân thủ các tiêu chuẩn bảo mật theo quy định của NHNN và ngành ngân hàng tại đơn vị như thế nào?',
        question_name: 'Câu 4.12',
        question_type: 'radiogroup',
        weighted_percentage: 0.1,
        belongs_to_pillar: 'Tuân thủ tiêu chuẩn NHNN',
        survey_id: 4,
        question_target: ['Cán bộ nghiệp vụ'],
        question_options: [
            { option_text: 'Hoàn toàn không tuân thủ', weighted_value: 0 },
            { option_text: 'Tuân thủ ở mức cơ bản', weighted_value: 1 },
            {
                option_text: 'Tuân thủ và có kiểm tra định kỳ',
                weighted_value: 2,
            },
            { option_text: 'Hoàn toàn tuân thủ', weighted_value: 3 },
            {
                option_text: 'Hoàn toàn tuân thủ và liên tục cập nhật',
                weighted_value: 4,
            },
        ],
    },
    {
        question_text:
            'Đơn vị có nhận được sự hỗ trợ từ các tổ chức bên ngoài trong việc đảm bảo an ninh mạng không?',
        question_name: 'Câu 4.13',
        weighted_percentage: 0.07,
        belongs_to_pillar: 'Hỗ trợ từ tổ chức bên ngoài',
        survey_id: 4,
        question_type: 'radiogroup',
        question_options: [
            { option_text: 'Không có hỗ trợ', weighted_value: 0 },
            { option_text: 'Hỗ trợ hạn chế', weighted_value: 1 },
            { option_text: 'Hỗ trợ trung bình', weighted_value: 2 },
            { option_text: 'Hỗ trợ tốt', weighted_value: 3 },
            { option_text: 'Hỗ trợ rất tốt', weighted_value: 4 },
        ],
    },
    {
        question_text:
            'Anh/Chị vui lòng cho biết mức độ đồng tình của mình đối với các phát biểu sau đây về công tác quản trị CNTT của QTDND trong đảm bảo an ninh thông tin và quản trị rủi ro công nghệ:',
        question_name: 'Câu 4.14',
        survey_id: 4,
        question_type: 'group',
    },
    {
        question_text:
            'QTDND đã xây dựng và cập nhật thường xuyên các chính sách quản trị CNTT theo quy định của NHNN nhằm đảm bảo an ninh thông tin',
        question_name: 'Câu 4.14.1',
        question_type: 'radiogroup',
        weighted_percentage: 0.01,
        belongs_to_pillar: 'Mức độ bảo mật dữ liệu KH & giao dịch',
        survey_id: 4,
        parent: 'Câu 4.14',
        question_options: [
            { option_text: 'Hoàn toàn không đồng ý', weighted_value: 0 },
            { option_text: 'Không đồng ý', weighted_value: 1 },
            { option_text: 'Trung lập', weighted_value: 2 },
            { option_text: 'Đồng ý', weighted_value: 3 },
            { option_text: 'Hoàn toàn đồng ý', weighted_value: 4 },
        ],
    },
    {
        question_text:
            'Việc ứng dụng CNTT trong quản trị có đảm bảo các quy chế, quy trình nghiệp vụ với các chốt kiểm soát bảo mật đầy đủ',
        question_name: 'Câu 4.14.2',
        question_type: 'radiogroup',
        weighted_percentage: 0.01,
        belongs_to_pillar: 'Mức độ bảo mật dữ liệu KH & giao dịch',
        survey_id: 4,
        parent: 'Câu 4.14',
        question_options: [
            { option_text: 'Hoàn toàn không đồng ý', weighted_value: 0 },
            { option_text: 'Không đồng ý', weighted_value: 1 },
            { option_text: 'Trung lập', weighted_value: 2 },
            { option_text: 'Đồng ý', weighted_value: 3 },
            { option_text: 'Hoàn toàn đồng ý', weighted_value: 4 },
        ],
    },
    {
        question_text:
            'Việc ứng dụng CNTT tại QTDND giúp phát hiện và giảm thiểu các lỗ hổng bảo mật trong quy trình nghiệp vụ',
        question_name: 'Câu 4.14.3',
        question_type: 'radiogroup',
        weighted_percentage: 0.01,
        belongs_to_pillar: 'Mức độ bảo mật dữ liệu KH & giao dịch',
        survey_id: 4,
        parent: 'Câu 4.14',
        question_options: [
            { option_text: 'Hoàn toàn không đồng ý', weighted_value: 0 },
            { option_text: 'Không đồng ý', weighted_value: 1 },
            { option_text: 'Trung lập', weighted_value: 2 },
            { option_text: 'Đồng ý', weighted_value: 3 },
            { option_text: 'Hoàn toàn đồng ý', weighted_value: 4 },
        ],
    },
    {
        question_text:
            'QTDND đã có cơ chế giám sát và kiểm tra định kỳ hệ thống CNTT nhằm đảm bảo an toàn thông tin',
        question_name: 'Câu 4.14.4',
        question_type: 'radiogroup',
        weighted_percentage: 0.05 / 3,
        belongs_to_pillar: 'Tuân thủ tiêu chuẩn NHNN',
        survey_id: 4,
        parent: 'Câu 4.14',
        question_options: [
            { option_text: 'Hoàn toàn không đồng ý', weighted_value: 0 },
            { option_text: 'Không đồng ý', weighted_value: 1 },
            { option_text: 'Trung lập', weighted_value: 2 },
            { option_text: 'Đồng ý', weighted_value: 3 },
            { option_text: 'Hoàn toàn đồng ý', weighted_value: 4 },
        ],
    },
    {
        question_text:
            'Đơn vị có quy trình xử lý sự cố bảo mật CNTT rõ ràng và hiệu quả khi có rủi ro xảy ra',
        question_name: 'Câu 4.14.5',
        question_type: 'radiogroup',
        weighted_percentage: 0.02 / 3,
        belongs_to_pillar: 'Biện pháp ứng phó rủi ro',
        survey_id: 4,
        parent: 'Câu 4.14',
        question_options: [
            { option_text: 'Hoàn toàn không đồng ý', weighted_value: 0 },
            { option_text: 'Không đồng ý', weighted_value: 1 },
            { option_text: 'Trung lập', weighted_value: 2 },
            { option_text: 'Đồng ý', weighted_value: 3 },
            { option_text: 'Hoàn toàn đồng ý', weighted_value: 4 },
        ],
    },
    {
        question_text:
            'QTDND đã triển khai các tài liệu hướng dẫn sử dụng hệ thống CNTT, bao gồm check-list kiểm tra vận hành và quy trình bảo trì định kỳ',
        question_name: 'Câu 4.14.6',
        question_type: 'radiogroup',
        weighted_percentage: 0.02 / 3,
        belongs_to_pillar: 'Biện pháp ứng phó rủi ro',
        survey_id: 4,
        parent: 'Câu 4.14',
        question_options: [
            { option_text: 'Hoàn toàn không đồng ý', weighted_value: 0 },
            { option_text: 'Không đồng ý', weighted_value: 1 },
            { option_text: 'Trung lập', weighted_value: 2 },
            { option_text: 'Đồng ý', weighted_value: 3 },
            { option_text: 'Hoàn toàn đồng ý', weighted_value: 4 },
        ],
    },
    {
        question_text:
            'Đơn vị có quy trình rõ ràng để xử lý sự cố CNTT và sự cố bảo mật, giúp giảm thiểu rủi ro công nghệ',
        question_name: 'Câu 4.14.7',
        question_type: 'radiogroup',
        weighted_percentage: 0.02 / 3,
        belongs_to_pillar: 'Biện pháp ứng phó rủi ro',
        survey_id: 4,
        parent: 'Câu 4.14',
        question_options: [
            { option_text: 'Hoàn toàn không đồng ý', weighted_value: 0 },
            { option_text: 'Không đồng ý', weighted_value: 1 },
            { option_text: 'Trung lập', weighted_value: 2 },
            { option_text: 'Đồng ý', weighted_value: 3 },
            { option_text: 'Hoàn toàn đồng ý', weighted_value: 4 },
        ],
    },
    {
        question_text:
            'Hệ thống CNTT của QTDND có ghi nhận và lưu trữ nhật ký truy cập (log system) để kiểm tra và theo dõi bảo mật',
        question_name: 'Câu 4.14.8',
        question_type: 'radiogroup',
        weighted_percentage: 0.05 / 3,
        belongs_to_pillar: 'Tuân thủ tiêu chuẩn NHNN',
        survey_id: 4,
        parent: 'Câu 4.14',
        question_options: [
            { option_text: 'Hoàn toàn không đồng ý', weighted_value: 0 },
            { option_text: 'Không đồng ý', weighted_value: 1 },
            { option_text: 'Trung lập', weighted_value: 2 },
            { option_text: 'Đồng ý', weighted_value: 3 },
            { option_text: 'Hoàn toàn đồng ý', weighted_value: 4 },
        ],
    },
    {
        question_text:
            'Đơn vị đã xây dựng quy trình phân loại lỗi, sự cố và tiêu chuẩn dịch vụ (SLA) cho việc giải quyết, khắc phục lỗi CNTT',
        question_name: 'Câu 4.14.9',
        question_type: 'radiogroup',
        weighted_percentage: 0.05 / 3,
        belongs_to_pillar: 'Tuân thủ tiêu chuẩn NHNN',
        survey_id: 4,
        parent: 'Câu 4.14',
        question_options: [
            { option_text: 'Hoàn toàn không đồng ý', weighted_value: 0 },
            { option_text: 'Không đồng ý', weighted_value: 1 },
            { option_text: 'Trung lập', weighted_value: 2 },
            { option_text: 'Đồng ý', weighted_value: 3 },
            { option_text: 'Hoàn toàn đồng ý', weighted_value: 4 },
        ],
    },
    {
        question_text:
            'Hầu hết các lỗi hoặc sự cố về CNTT đều được xử lý, khắc phục theo đúng quy định và thời gian SLA cam kết',
        question_name: 'Câu 4.14.10',
        question_type: 'radiogroup',
        weighted_percentage: 0.03 / 2,
        belongs_to_pillar: 'Hỗ trợ từ tổ chức bên ngoài',
        survey_id: 4,
        parent: 'Câu 4.14',
        question_options: [
            { option_text: 'Hoàn toàn không đồng ý', weighted_value: 0 },
            { option_text: 'Không đồng ý', weighted_value: 1 },
            { option_text: 'Trung lập', weighted_value: 2 },
            { option_text: 'Đồng ý', weighted_value: 3 },
            { option_text: 'Hoàn toàn đồng ý', weighted_value: 4 },
        ],
    },
    {
        question_text:
            'Các sự cố an ninh mạng và CNTT tại đơn vị được ghi nhận, phân loại và lưu trữ để phục vụ công tác thống kê, đánh giá và cải thiện vận hành',
        question_name: 'Câu 4.14.11',
        question_type: 'radiogroup',
        weighted_percentage: 0.03 / 2,
        belongs_to_pillar: 'Hỗ trợ từ tổ chức bên ngoài',
        survey_id: 4,
        parent: 'Câu 4.14',
        question_options: [
            { option_text: 'Hoàn toàn không đồng ý', weighted_value: 0 },
            { option_text: 'Không đồng ý', weighted_value: 1 },
            { option_text: 'Trung lập', weighted_value: 2 },
            { option_text: 'Đồng ý', weighted_value: 3 },
            { option_text: 'Hoàn toàn đồng ý', weighted_value: 4 },
        ],
    },
    {
        question_text:
            'Mức độ thực hiện các biện pháp bảo mật và quản lý rủi ro công nghệ tại đơn vị như thế nào?',
        question_name: 'Câu 4.15',
        question_type: 'group',
        survey_id: 4,
        question_target: ['Lãnh đạo & Quản lý'],
    },
    {
        question_text:
            'Thiết lập và phân quyền truy cập theo vai trò người dùng',
        question_name: 'Câu 4.15.1',
        question_type: 'radiogroup',
        survey_id: 4,
        parent: 'Câu 4.15',
        weighted_percentage: 0.05 / 4,
        belongs_to_pillar: 'Mức độ bảo mật dữ liệu KH & giao dịch',
        question_target: ['Lãnh đạo & Quản lý'],
        question_options: [
            { option_text: 'Chưa thực hiện', weighted_value: 0 },
            { option_text: 'Có kế hoạch', weighted_value: 1 },
            { option_text: 'Đang triển khai', weighted_value: 2 },
            { option_text: 'Đã triển khai', weighted_value: 3 },
            { option_text: 'Triển khai hiệu quả', weighted_value: 4 },
        ],
    },
    {
        question_text: 'Có kế hoạch ứng phó sự cố an ninh mạng',
        question_name: 'Câu 4.15.2',
        question_type: 'radiogroup',
        survey_id: 4,
        parent: 'Câu 4.15',
        weighted_percentage: 0.05 / 4,
        belongs_to_pillar: 'Mức độ bảo mật dữ liệu KH & giao dịch',
        question_target: ['Lãnh đạo & Quản lý'],
        question_options: [
            { option_text: 'Chưa thực hiện', weighted_value: 0 },
            { option_text: 'Có kế hoạch', weighted_value: 1 },
            { option_text: 'Đang triển khai', weighted_value: 2 },
            { option_text: 'Đã triển khai', weighted_value: 3 },
            { option_text: 'Triển khai hiệu quả', weighted_value: 4 },
        ],
    },
    {
        question_text: 'Cập nhật phần mềm và bản vá bảo mật thường xuyên',
        question_name: 'Câu 4.15.3',
        question_type: 'radiogroup',
        survey_id: 4,
        parent: 'Câu 4.15',
        weighted_percentage: 0.05 / 4,
        belongs_to_pillar: 'Mức độ bảo mật dữ liệu KH & giao dịch',
        question_target: ['Lãnh đạo & Quản lý'],
        question_options: [
            { option_text: 'Chưa thực hiện', weighted_value: 0 },
            { option_text: 'Có kế hoạch', weighted_value: 1 },
            { option_text: 'Đang triển khai', weighted_value: 2 },
            { option_text: 'Đã triển khai', weighted_value: 3 },
            { option_text: 'Triển khai hiệu quả', weighted_value: 4 },
        ],
    },
    {
        question_text:
            'Áp dụng xác thực đa yếu tố (2FA) cho tài khoản truy cập nội bộ và khách hàng',
        question_name: 'Câu 4.15.4',
        question_type: 'radiogroup',
        survey_id: 4,
        parent: 'Câu 4.15',
        weighted_percentage: 0.05 / 4,
        belongs_to_pillar: 'Mức độ bảo mật dữ liệu KH & giao dịch',
        question_target: ['Lãnh đạo & Quản lý'],
        question_options: [
            { option_text: 'Chưa thực hiện', weighted_value: 0 },
            { option_text: 'Có kế hoạch', weighted_value: 1 },
            { option_text: 'Đang triển khai', weighted_value: 2 },
            { option_text: 'Đã triển khai', weighted_value: 3 },
            { option_text: 'Triển khai hiệu quả', weighted_value: 4 },
        ],
    },
    {
        question_text:
            'Đơn vị có triển khai hoặc có kế hoạch triển khai hệ thống tự động hóa báo cáo giám sát và kiểm tra từ xa cho NHNN và NHHTX không?',
        question_name: 'Câu 4.16',
        question_type: 'radiogroup',
        survey_id: 4,
        weighted_percentage: 0.03,
        belongs_to_pillar: 'Mức độ bảo mật dữ liệu KH & giao dịch',
        question_target: ['Cán bộ nghiệp vụ'],
        question_options: [
            { option_text: 'Chưa có kế hoạch triển khai', weighted_value: 0 },
            {
                option_text: 'Đang trong quá trình triển khai, chưa hoàn thiện',
                weighted_value: 1,
            },
            {
                option_text: 'Đã triển khai một phần, nhưng chưa đồng bộ',
                weighted_value: 2,
            },
            {
                option_text:
                    'Đã triển khai hoàn chỉnh và đang hoạt động hiệu quả',
                weighted_value: 3,
            },
            {
                option_text:
                    'Đang tối ưu hóa và mở rộng hệ thống báo cáo tự động hóa',
                weighted_value: 4,
            },
        ],
    },
    {
        question_text:
            'Đơn vị hiện đang ở mức độ nào trong quá trình số hóa dữ liệu? (Số hóa bao gồm việc chuyển đổi dữ liệu từ dạng giấy tờ sang dạng số và có hệ thống lưu trữ, quản lý tập trung)',
        question_name: 'Câu 5.1',
        question_type: 'radiogroup',
        survey_id: 5,
        weighted_percentage: 0.05,
        belongs_to_pillar: 'Mức độ số hóa dữ liệu và hệ thống lưu trữ',
        question_note:
            'Vui lòng chọn mức độ phù hợp nhất với tình trạng số hóa dữ liệu tại đơn vị của Anh/Chị',
        question_options: [
            {
                option_text: 'Chưa số hóa',
                option_note:
                    'Dữ liệu chủ yếu được lưu trữ thủ công, không có hệ thống máy tính hỗ trợ.',
                weighted_value: 0,
            },
            {
                option_text: 'Số hóa một phần',
                option_note:
                    'Chỉ có một số dữ liệu được lưu trên máy tính nhưng chưa có hệ thống quản lý tập trung.',
                weighted_value: 1,
            },
            {
                option_text: 'Số hóa gần hoàn chỉnh',
                option_note:
                    'Hầu hết dữ liệu đã lưu trên hệ thống nhưng chưa kết nối đồng bộ.',
                weighted_value: 2,
            },
            {
                option_text: 'Số hóa hoàn chỉnh',
                option_note:
                    'Dữ liệu được lưu trữ hoàn toàn trên hệ thống, có khả năng truy xuất nhanh chóng.',
                weighted_value: 3,
            },
            {
                option_text:
                    'Số hóa hoàn chỉnh nhưng chưa có chiến lược khai thác',
                option_note:
                    'Dữ liệu đã số hóa đầy đủ nhưng chưa được sử dụng hiệu quả để hỗ trợ ra quyết định hoặc phân tích.',
                weighted_value: 4,
            },
            {
                option_text: 'Số hóa hoàn chỉnh và tối ưu',
                option_note:
                    'Dữ liệu được số hóa toàn diện, có hệ thống phân tích tự động, hỗ trợ ra quyết định và tối ưu hóa quy trình.',
                weighted_value: 5,
            },
        ],
    },
    {
        question_text:
            'Hệ thống lưu trữ dữ liệu tại đơn vị có đảm bảo khả năng truy xuất và khai thác dữ liệu hiệu quả không?',
        question_name: 'Câu 5.2',
        question_type: 'radiogroup',
        survey_id: 5,
        weighted_percentage: 0.05,
        belongs_to_pillar: 'Mức độ số hóa dữ liệu và hệ thống lưu trữ',
        question_note: 'Vui lòng chọn mức độ phù hợp nhất.',
        question_options: [
            { option_text: 'Không biết/không rõ', weighted_value: 0 },
            {
                option_text: 'Dữ liệu lưu trữ phân tán, khó truy xuất',
                weighted_value: 1,
            },
            {
                option_text:
                    'Lưu trữ có hệ thống nhưng chưa đảm bảo truy xuất dễ dàng',
                weighted_value: 2,
            },
            {
                option_text:
                    'Dữ liệu lưu trữ tập trung, dễ truy xuất nhưng chưa có công cụ phân tích',
                weighted_value: 3,
            },
            {
                option_text:
                    'Hệ thống lưu trữ đầy đủ, truy xuất nhanh, có tích hợp công cụ khai thác dữ liệu.',
                weighted_value: 4,
            },
        ],
    },
    {
        question_text:
            'Đơn vị đang sử dụng loại công cụ phân tích dữ liệu nào?',
        question_name: 'Câu 5.3',
        question_type: 'radiogroup',
        survey_id: 5,
        weighted_percentage: 0.05,
        belongs_to_pillar: 'Ứng dụng công cụ phân tích dữ liệu hiện đại',
        question_target: ['Cán bộ nghiệp vụ'],
        question_note: 'Vui lòng chọn mức độ phù hợp nhất.',
        question_options: [
            { option_text: 'Không biết', weighted_value: 0 },
            { option_text: 'Không sử dụng', weighted_value: 0 },
            {
                option_text: 'Sử dụng Excel, báo cáo thủ công',
                weighted_value: 1,
            },
            {
                option_text: 'Sử dụng phần mềm phân tích dữ liệu truyền thống',
                weighted_value: 2,
            },
            {
                option_text: 'Sử dụng phân tích dữ liệu hiện đại',
                option_note: 'BI, Dashboard.',
                weighted_value: 3,
            },
            {
                option_text: 'Sử dụng công nghệ phân tích tiên tiến',
                option_note: 'AI/Big Data.',
                weighted_value: 5,
            },
        ],
    },
    {
        question_text:
            'Công cụ phân tích dữ liệu hiện tại của đơn vị được sử dụng ở mức độ nào?',
        question_name: 'Câu 5.4',
        survey_id: 5,
        weighted_percentage: 0.05,
        belongs_to_pillar: 'Ứng dụng công cụ phân tích dữ liệu hiện đại',
        question_type: 'radiogroup',
        question_options: [
            {
                option_text: 'Không sử dụng',
                option_note: 'Chưa có hệ thống phân tích dữ liệu.',
                weighted_value: 0,
            },
            {
                option_text:
                    'Chỉ sử dụng báo cáo thủ công, chưa có công cụ phân tích',
                weighted_value: 1,
            },
            {
                option_text: 'Có sử dụng công cụ phân tích nhưng còn rời rạc',
                weighted_value: 2,
            },
            {
                option_text: 'Sử dụng thường xuyên nhưng chưa tối ưu',
                weighted_value: 3,
            },
            {
                option_text:
                    'Sử dụng đầy đủ, dữ liệu hỗ trợ tốt cho ra quyết định',
                weighted_value: 5,
            },
        ],
    },
    {
        question_text:
            'Đơn vị có sử dụng dữ liệu khách hàng vào các hoạt động sau không?',
        question_name: 'Câu 5.5',
        survey_id: 5,
        weighted_percentage: 0.1,
        belongs_to_pillar: 'Khai thác dữ liệu khách hàng',
        question_type: 'checkbox',
        question_target: ['Cán bộ nghiệp vụ'],
        question_note: 'Có thể chọn nhiều đáp án.',
        question_options: [
            { option_text: 'Không sử dụng', weighted_value: 0 },
            { option_text: 'Cá nhân hóa sản phẩm/dịch vụ', weighted_value: 2 },
            { option_text: 'Phân tích hành vi khách hàng', weighted_value: 3 },
            { option_text: 'Quản lý tín dụng & rủi ro', weighted_value: 4 },
            { option_text: 'Dự báo nhu cầu thị trường', weighted_value: 5 },
            { option_text: 'Không biết/không rõ' },
        ],
    },
    {
        question_text:
            'Đơn vị đã có chiến lược cụ thể để khai thác dữ liệu khách hàng nhằm quản trị rủi ro tín dụng và hỗ trợ ra quyết định chưa?',
        question_name: 'Câu 5.6',
        survey_id: 5,
        weighted_percentage: 0.1,
        belongs_to_pillar: 'Khai thác dữ liệu khách hàng',
        question_type: 'radiogroup',
        question_target: ['Lãnh đạo & Quản lý'],
        question_options: [
            {
                option_text: 'Chưa có chiến lược',
                option_note:
                    'Dữ liệu khách hàng chưa được thu thập, quản lý tập trung hoặc khai thác.',
                weighted_value: 0,
            },
            {
                option_text: 'Có chiến lược sơ bộ',
                option_note:
                    'Đơn vị đã có định hướng khai thác dữ liệu nhưng chưa triển khai giải pháp cụ thể.',
                weighted_value: 1,
            },
            {
                option_text: 'Chiến lược gần hoàn chỉnh',
                option_note:
                    'Đã có kế hoạch quản lý dữ liệu tập trung, từng bước ứng dụng AI & phân tích dữ liệu nhưng chưa triển khai đồng bộ.',
                weighted_value: 2,
            },
            {
                option_text: 'Chiến lược hoàn chỉnh',
                option_note:
                    'Hệ thống quản lý dữ liệu tập trung đã được triển khai, có kế hoạch ứng dụng AI & phân tích dữ liệu lớn.',
                weighted_value: 4,
            },
            {
                option_text: 'Chiến lược hoàn chỉnh và đang triển khai',
                option_note:
                    'Dữ liệu đã được số hóa và khai thác bằng AI/Big Data để quản trị rủi ro, tối ưu hóa hoạt động và hỗ trợ ra quyết định chiến lược.',
                weighted_value: 5,
            },
        ],
    },
    {
        question_text:
            'Đơn vị có sử dụng dữ liệu phân tích để cải thiện hiệu suất kinh doanh không?',
        question_name: 'Câu 5.7',
        survey_id: 5,
        weighted_percentage: 0.05,
        belongs_to_pillar: 'Ứng dụng công cụ phân tích dữ liệu hiện đại',
        question_type: 'radiogroup',
        question_target: ['Cán bộ nghiệp vụ'],
        question_options: [
            { option_text: 'Không sử dụng', weighted_value: 0 },
            {
                option_text: 'Có kế hoạch nhưng chưa triển khai',
                weighted_value: 1,
            },
            { option_text: 'Sử dụng một phần', weighted_value: 2 },
            {
                option_text: 'Sử dụng thường xuyên nhưng chưa đạt hiệu quả cao',
                weighted_value: 3,
            },
            { option_text: 'Sử dụng có hiệu quả cao', weighted_value: 5 },
        ],
    },
    {
        question_text:
            'Dữ liệu nào đã được liên thông với hệ thống NHNN/NHHTX?',
        question_name: 'Câu 5.8',
        survey_id: 5,
        weighted_percentage: 0.15,
        belongs_to_pillar: 'Liên thông dữ liệu với hệ thống bên ngoài',
        question_type: 'checkbox',
        question_target: ['Lãnh đạo & Quản lý'],
        question_note: 'Có thể chọn nhiều đáp án.',
        question_options: [
            { option_text: 'Chưa liên thông dữ liệu nào', weighted_value: 0 },
            { option_text: 'Giao dịch tín dụng', weighted_value: 2 },
            { option_text: 'Dữ liệu tài khoản', weighted_value: 3 },
            { option_text: 'Thông tin khách hàng', weighted_value: 4 },
            { option_text: 'Báo cáo tài chính', weighted_value: 5 },
            {
                option_text: 'Khác',
                require_reason: 1,
                option_note: 'Vui lòng ghi rõ...',
            },
        ],
    },
    {
        question_text:
            'Mức độ liên thông dữ liệu của hệ thống tại đơn vị với các nền tảng ngân hàng số và hệ thống bên ngoài như thế nào?',
        question_name: 'Câu 5.9',
        survey_id: 5,
        weighted_percentage: 0.1,
        belongs_to_pillar: 'Liên thông dữ liệu với hệ thống bên ngoài',
        question_type: 'radiogroup',
        question_options: [
            {
                option_text: 'Hoàn toàn không có kết nối liên thông',
                weighted_value: 0,
            },
            {
                option_text: 'Chỉ liên thông một số nghiệp vụ cơ bản',
                weighted_value: 1,
            },
            {
                option_text:
                    'Đã liên thông nhưng nhưng còn gặp hạn chế về mặt kỹ thuật',
                weighted_value: 2,
            },
            {
                option_text: 'Đã liên thông nhưng hoạt động chưa ổn định',
                weighted_value: 3,
            },
            {
                option_text:
                    'Liên thông hoàn chỉnh, hoạt động ổn định và hiệu quả',
                weighted_value: 5,
            },
        ],
    },
    {
        question_text:
            'Anh/Chị hãy đánh giá mức độ đồng ý của mình đối với các nhận định liên quan đến việc quản lý thông tin, dữ liệu phục vụ công việc của QTDND.',
        question_name: 'Câu 5.10',
        survey_id: 5,
        question_type: 'group',
        question_target: ['Cán bộ nghiệp vụ'],
    },
    {
        question_text: 'Có thể dễ dàng có đầy đủ các thông tin theo yêu cầu',
        question_name: 'Câu 5.10.1',
        question_type: 'radiogroup',
        survey_id: 5,
        weighted_percentage: 0.08 / 4,
        belongs_to_pillar: 'Kiểm soát và khai thác dữ liệu trong tổ chức',
        parent: 'Câu 5.10',
        question_target: ['Cán bộ nghiệp vụ'],
        question_options: [
            { option_text: 'Hoàn toàn không đồng ý', weighted_value: 0 },
            { option_text: 'Không đồng ý', weighted_value: 1 },
            { option_text: 'Trung lập', weighted_value: 2 },
            { option_text: 'Đồng ý', weighted_value: 3 },
            { option_text: 'Hoàn toàn đồng ý', weighted_value: 4 },
        ],
    },
    {
        question_text:
            'Việc tập hợp thông tin, dữ liệu được thực hiện nhanh chóng',
        question_name: 'Câu 5.10.2',
        question_type: 'radiogroup',
        survey_id: 5,
        weighted_percentage: 0.08 / 4,
        belongs_to_pillar: 'Kiểm soát và khai thác dữ liệu trong tổ chức',
        parent: 'Câu 5.10',
        question_target: ['Cán bộ nghiệp vụ'],
        question_options: [
            { option_text: 'Hoàn toàn không đồng ý', weighted_value: 0 },
            { option_text: 'Không đồng ý', weighted_value: 1 },
            { option_text: 'Trung lập', weighted_value: 2 },
            { option_text: 'Đồng ý', weighted_value: 3 },
            { option_text: 'Hoàn toàn đồng ý', weighted_value: 4 },
        ],
    },
    {
        question_text:
            'Các thông tin được cung cấp luôn đảm bảo sự chính xác và nhất quán',
        question_name: 'Câu 5.10.3',
        question_type: 'radiogroup',
        survey_id: 5,
        weighted_percentage: 0.08 / 4,
        belongs_to_pillar: 'Kiểm soát và khai thác dữ liệu trong tổ chức',
        parent: 'Câu 5.10',
        question_target: ['Cán bộ nghiệp vụ'],
        question_options: [
            { option_text: 'Hoàn toàn không đồng ý', weighted_value: 0 },
            { option_text: 'Không đồng ý', weighted_value: 1 },
            { option_text: 'Trung lập', weighted_value: 2 },
            { option_text: 'Đồng ý', weighted_value: 3 },
            { option_text: 'Hoàn toàn đồng ý', weighted_value: 4 },
        ],
    },
    {
        question_text:
            'Việc tập hợp thông tin, dữ liệu mất nhiều thời gian, công sức và có thể không đầy đủ ',
        question_name: 'Câu 5.10.4',
        question_type: 'radiogroup',
        survey_id: 5,
        weighted_percentage: 0.08 / 4,
        belongs_to_pillar: 'Kiểm soát và khai thác dữ liệu trong tổ chức',
        parent: 'Câu 5.10',
        question_target: ['Cán bộ nghiệp vụ'],
        question_options: [
            { option_text: 'Hoàn toàn không đồng ý', weighted_value: 0 },
            { option_text: 'Không đồng ý', weighted_value: 1 },
            { option_text: 'Trung lập', weighted_value: 2 },
            { option_text: 'Đồng ý', weighted_value: 3 },
            { option_text: 'Hoàn toàn đồng ý', weighted_value: 4 },
        ],
    },
    {
        question_text:
            'Hiện tại, QTDND đang áp dụng phương thức nào để quản lý thông tin khách hàng?',
        question_name: 'Câu 5.11',
        question_target: ['Cán bộ nghiệp vụ'],
        survey_id: 5,
        weighted_percentage: 0.05,
        belongs_to_pillar: 'Mức độ số hóa dữ liệu và hệ thống lưu trữ',
        question_type: 'checkbox',
        question_note: 'Chọn tất cả phương án phù hợp.',
        question_options: [
            {
                option_text:
                    'Quản lý tập trung trên phần mềm quản trị khách hàng (CRM) chuyên dụng',
                weighted_value: 2,
            },
            {
                option_text:
                    'Chưa có phần mềm CRM nhưng đã có đầu mối xây dựng và cập nhật thông tin khách hàng định kỳ',
                weighted_value: 1,
            },
            {
                option_text:
                    'Thông tin khách hàng do nhiều người quản lý, dưới các hình thức CSDL khác nhau để đảm bảo tính linh hoạt',
                weighted_value: 2,
            },
            {
                option_text:
                    'Quản lý thông tin khách hàng trong phần mềm nghiệp vụ ngân hàng lõi',
                weighted_value: 3,
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
        question_name: 'Câu 5.14',
        question_type: 'checkbox',
        question_target: ['Cán bộ nghiệp vụ'],
        survey_id: 5,
        weighted_percentage: 0.05,
        belongs_to_pillar: 'Mức độ số hóa dữ liệu và hệ thống lưu trữ',
        question_note: 'Chọn tất cả các phương án phù hợp.',
        question_options: [
            {
                option_text: 'Lưu trữ trên máy tính cá nhân',
                option_note:
                    'Mỗi cá nhân tự tổ chức quản lý dữ liệu theo cách riêng của mình.',
                weighted_value: 1,
            },
            {
                option_text: 'Lưu trữ trên Server dùng chung',
                option_note:
                    'Có quy định tổ chức quản lý dữ liệu và được thống nhất trong đơn vị.',
                weighted_value: 2,
            },
            {
                option_text: 'Lưu trữ trên Web Server dùng chung',
                option_note:
                    'Dữ liệu được tổ chức quản lý theo quy định chung và có thể truy cập từ xa.',
                weighted_value: 2,
            },
            {
                option_text: 'Lưu trữ trên dịch vụ đám mây',
                option_note:
                    'Google Drive, OneDrive, Dropbox… để chia sẻ và đồng bộ dữ liệu.',
                weighted_value: 3,
            },
            {
                option_text: 'Lưu trữ trên hệ thống quản lý tài liệu nội bộ',
                option_note:
                    'DMS, ECM, v.v. Hệ thống được thiết kế để quản lý, tìm kiếm và phân loại dữ liệu một cách khoa học.',
                weighted_value: 4,
            },
            {
                option_text:
                    'Lưu trữ trên hệ thống Core Banking hoặc phần mềm chuyên dụng khác',
                option_note:
                    'Thông tin lưu trên hệ thống ngân hàng lõi hoặc các phần mềm chuyên biệt.',
                weighted_value: 5,
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
        survey_id: 5,
        weighted_percentage: 0.07,
        belongs_to_pillar: 'Kiểm soát và khai thác dữ liệu trong tổ chức',
        question_target: ['Cán bộ nghiệp vụ'],
        question_note: 'Chọn nhiều đáp án',
        question_options: [
            {
                option_text: 'Dữ liệu không đầy đủ, thiếu chính xác',
                weighted_value: 1,
            },
            {
                option_text: 'Dữ liệu bị phân tán, không đồng bộ',
                weighted_value: 2,
            },
            {
                option_text: 'Thiếu công cụ phân tích dữ liệu hiệu quả',
                weighted_value: 2,
            },
            {
                option_text: 'Nhân sự chưa có kỹ năng khai thác dữ liệu',
                weighted_value: 2,
            },
            {
                option_text: 'Lo ngại về bảo mật dữ liệu và quyền riêng tư',
                weighted_value: 2,
            },
            {
                option_text: 'Không có dữ liệu lịch sử để phân tích',
                weighted_value: 2,
            },
        ],
    },
    {
        question_text:
            'Theo anh/chị, đơn vị có gặp khó khăn gì trong việc số hóa và khai thác dữ liệu?',
        question_name: 'Câu 5.14',
        question_type: 'checkbox',
        survey_id: 5,
        weighted_percentage: 0.05,
        belongs_to_pillar: 'Kiểm soát và khai thác dữ liệu trong tổ chức',
        question_target: ['Cán bộ nghiệp vụ'],
        question_options: [
            {
                option_text: 'Thiếu cơ sở hạ tầng công nghệ',
                option_note:
                    'Chưa có hệ thống phần mềm quản lý tập trung, thiếu máy chủ, hệ thống lưu trữ chưa tối ưu...',
                weighted_value: 1,
            },
            {
                option_text:
                    'Thiếu nhân sự có chuyên môn về phân tích & khai thác dữ liệu',
                option_note:
                    'Nhân sự chưa được đào tạo chuyên sâu về quản trị dữ liệu, chưa có bộ phận chuyên trách...',
                weighted_value: 2,
            },
            {
                option_text: 'Thiếu công cụ hỗ trợ phân tích dữ liệu',
                option_note:
                    'Chưa có phần mềm phân tích chuyên sâu, chủ yếu dùng Excel hoặc báo cáo thủ công...',
                weighted_value: 2,
            },
            {
                option_text: 'Lo ngại về bảo mật & an toàn dữ liệu',
                option_note:
                    'Dữ liệu có nguy cơ rò rỉ, chưa có hệ thống kiểm soát truy cập chặt chẽ...',
                weighted_value: 2,
            },
            {
                option_text: 'Chi phí đầu tư cao, ngân sách hạn chế',
                option_note:
                    'Chưa có nguồn vốn đủ để triển khai hệ thống số hóa đồng bộ...',
                weighted_value: 2,
            },
            {
                option_text: 'Rào cản từ tư duy lãnh đạo & nhân viên',
                option_note:
                    'Ngại thay đổi, chưa sẵn sàng áp dụng công nghệ mới...',
                weighted_value: 2,
            },
            {
                option_text: 'Khác',
                option_note: 'Vui lòng mô tả thêm...',
            },
        ],
    },
    {
        question_text:
            'QTDND của anh chị đã và đang triển khai thực hiện cung ứng sản phẩm dịch vụ ngân hàng số ở cấp độ nào?',
        question_name: 'Câu 6.1',
        question_note: 'Chọn nhiều đáp án',
        question_type: 'checkbox',
        survey_id: 6,
        weighted_percentage: 0.15,
        belongs_to_pillar:
            'Mức độ ứng dụng công nghệ trong phát triển sản phẩm/dịch vụ',
        question_target: ['Lãnh đạo & Quản lý'],
        question_options: [
            {
                option_text:
                    'Chưa thực hiện cung ứng sản phẩm dịch vụ ngân hàng số',
                weighted_value: 0,
            },
            {
                option_text:
                    'Cung ứng sản phẩm dịch vụ ngân hàng số cho NHHTX',
                weighted_value: 1,
            },
            {
                option_text:
                    'Cung ứng sản phẩm dịch vụ ngân hàng điện tử cho các Tổ chức tín dụng khác và các công ty Fintech…',
                weighted_value: 2,
            },
            {
                option_text:
                    'Tự cung ứng sản phẩm dịch vụ ngân hàng số qua app riêng của Quỹ',
                weighted_value: 3,
            },
            {
                option_text:
                    'Tự triển khai dịch vụ ngân hàng số và có hợp tác với các TCTD khác để cung ứng dịch vụ',
                weighted_value: 4,
            },
        ],
    },
    {
        question_text:
            'Cho phép khách hàng, thành viên của Quỹ thanh toán/chuyển tiền 247 chưa?',
        question_name: 'Câu 6.2',
        question_type: 'radiogroup',
        survey_id: 6,
        weighted_percentage: 0.12,
        belongs_to_pillar: 'Kế hoạch triển khai dịch vụ ngân hàng số',
        question_note: 'Chọn đáp án đúng nhất với đơn vị.',
        question_options: [
            { option_text: 'Chưa có kế hoạch triển khai', weighted_value: 0 },
            {
                option_text: 'Có kế hoạch thực hiện trong thời gian 5 năm tới',
                weighted_value: 1,
            },
            {
                option_text: 'Có kế hoạch thực hiện trong thời gian 3 năm tới',
                weighted_value: 2,
            },
            {
                option_text: 'Có kế hoạch thực hiện trong thời gian 1 năm tới',
                weighted_value: 3,
            },
            {
                option_text: 'Đã triển khai nhưng chưa hiệu quả',
                weighted_value: 4,
            },
            {
                option_text: 'Đã triển khai và hoạt động tốt',
                weighted_value: 5,
            },
            { option_text: 'Không biết/không rõ' },
        ],
    },
    {
        question_text:
            'Cho phép khách hàng, thành viên của Quỹ mở sổ tiết kiệm online:',
        question_name: 'Câu 6.3',
        survey_id: 6,
        weighted_percentage: 0.1,
        belongs_to_pillar: 'Kế hoạch triển khai dịch vụ ngân hàng số',
        question_target: ['Lãnh đạo & Quản lý'],
        question_type: 'radiogroup',
        question_note: 'Chọn đáp án đúng nhất với đơn vị.',
        question_options: [
            { option_text: 'Chưa có kế hoạch triển khai', weighted_value: 0 },
            {
                option_text: 'Có kế hoạch thực hiện trong thời gian 5 năm tới',
                weighted_value: 1,
            },
            {
                option_text: 'Có kế hoạch thực hiện trong thời gian 3 năm tới',
                weighted_value: 2,
            },
            {
                option_text: 'Có kế hoạch thực hiện trong thời gian 1 năm tới',
                weighted_value: 3,
            },
            {
                option_text: 'Đã triển khai nhưng chưa hiệu quả',
                weighted_value: 4,
            },
            {
                option_text: 'Đã triển khai và hoạt động tốt',
                weighted_value: 5,
            },
            { option_text: 'Không biết/không rõ' },
        ],
    },
    {
        question_text:
            'Cho phép khách hàng, thành viên của Quỹ đăng ký vay vốn online:',
        question_name: 'Câu 6.4',
        survey_id: 6,
        weighted_percentage: 0.08,
        belongs_to_pillar: 'Kế hoạch triển khai dịch vụ ngân hàng số',
        question_target: ['Cán bộ nghiệp vụ'],
        question_type: 'radiogroup',
        question_note: 'Chọn đáp án đúng nhất với đơn vị.',
        question_options: [
            { option_text: 'Chưa có kế hoạch triển khai', weighted_value: 0 },
            {
                option_text: 'Có kế hoạch thực hiện trong thời gian 5 năm tới',
                weighted_value: 1,
            },
            {
                option_text: 'Có kế hoạch thực hiện trong thời gian 3 năm tới',
                weighted_value: 2,
            },
            {
                option_text: 'Có kế hoạch thực hiện trong thời gian 1 năm tới',
                weighted_value: 3,
            },
            {
                option_text: 'Đã triển khai nhưng chưa hiệu quả',
                weighted_value: 4,
            },
            {
                option_text: 'Đã triển khai và hoạt động tốt',
                weighted_value: 5,
            },
            { option_text: 'Không biết/không rõ' },
        ],
    },
    {
        question_text:
            'Khách hàng đánh giá mức độ hài lòng với việc được hướng dẫn và hỗ trợ tiếp cận các sản phẩm, dịch vụ ngân hàng số tại Quỹ như thế nào?',
        question_name: 'Câu 6.5',
        question_type: 'radiogroup',
        survey_id: 6,
        weighted_percentage: 0.12,
        belongs_to_pillar: 'Mức độ hài lòng của khách hàng',
        question_target: ['Cán bộ nghiệp vụ'],
        question_options: [
            {
                option_text: 'Rất không hài lòng',
                option_note: 'Không được hướng dẫn, không hiểu rõ sản phẩm.',
                weighted_value: 0,
            },
            {
                option_text: 'Không hài lòng',
                option_note:
                    'Có hướng dẫn nhưng thiếu thông tin, không rõ ràng.',
                weighted_value: 1,
            },
            {
                option_text: 'Trung lập',
                option_note: 'Có hỗ trợ nhưng chưa thật sự hiệu quả.',
                weighted_value: 2,
            },
            {
                option_text: 'Hài lòng',
                option_note: 'Được hỗ trợ rõ ràng, dễ hiểu.',
                weighted_value: 3,
            },
            {
                option_text: 'Rất hài lòng',
                option_note:
                    'Được hướng dẫn tận tình, dễ tiếp cận, giải thích đầy đủ.',
                weighted_value: 4,
            },
        ],
    },
    {
        question_text:
            'Đơn vị có kế hoạch hợp tác với các tổ chức công nghệ để phát triển sản phẩm & dịch vụ ngân hàng số không?',
        question_name: 'Câu 6.6',
        question_type: 'radiogroup',
        survey_id: 6,
        weighted_percentage: 0.15,
        belongs_to_pillar: 'Hợp tác với tổ chức công nghệ',
        question_target: ['Lãnh đạo & Quản lý'],
        question_options: [
            { option_text: 'Không có kế hoạch hợp tác', weighted_value: 0 },
            {
                option_text: 'Đã cân nhắc nhưng chưa lập kế hoạch cụ thể',
                weighted_value: 1,
            },
            {
                option_text: 'Đang nghiên cứu và lên kế hoạch sơ bộ',
                weighted_value: 2,
            },
            { option_text: 'Đã kế hoạch hoàn chỉnh', weighted_value: 3 },
            {
                option_text: 'Đã có kế hoạch hoàn chỉnh và bắt đầu triển khai',
                weighted_value: 4,
            },
        ],
    },
    {
        question_text:
            'Mức độ hợp tác hiện tại của đơn vị với các tổ chức công nghệ (Fintech, TCTD, NHHTX) để nâng cao dịch vụ ngân hàng số như thế nào? (Bao gồm hợp tác phát triển sản phẩm số, tích hợp công nghệ, thanh toán điện tử...)',
        question_name: 'Câu 6.7',
        question_type: 'radiogroup',
        survey_id: 6,
        weighted_percentage: 0.1,
        belongs_to_pillar: 'Hợp tác với tổ chức công nghệ',
        question_target: ['Lãnh đạo & Quản lý'],
        question_options: [
            {
                option_text: 'Chưa có hợp tác',
                option_note:
                    'Chưa có bất kỳ hoạt động nào liên quan đến hợp tác với tổ chức công nghệ.',
                weighted_value: 0,
            },
            {
                option_text: 'Đã tiếp cận đối tác nhưng chưa ký kết',
                option_note:
                    'Đang tìm hiểu, trao đổi với các tổ chức công nghệ nhưng chưa có thỏa thuận chính thức.',
                weighted_value: 1,
            },
            {
                option_text: 'Hợp tác một phần',
                option_note:
                    'Đã ký kết hợp tác nhưng mới triển khai thử nghiệm hoặc chỉ áp dụng trong một số dịch vụ đơn lẻ.',
                weighted_value: 2,
            },
            {
                option_text: 'Hợp tác gần hoàn chỉnh',
                option_note:
                    'Đã có hợp tác chính thức, một số dịch vụ đã tích hợp nhưng chưa khai thác hiệu quả hoặc chưa đồng bộ với hệ thống ngân hàng số.',
                weighted_value: 3,
            },
            {
                option_text: 'Hợp tác toàn diện & đang mở rộng',
                option_note:
                    'Đã tích hợp sâu với tổ chức công nghệ, hệ thống vận hành ổn định & đang tiếp tục mở rộng hợp tác.',
                weighted_value: 4,
            },
        ],
    },
    {
        question_text:
            'Quỹ đã có kế hoạch tích hợp, kết nối mở rộng với các tổ chức nào để mở rộng hệ sinh thái số và đa dạng hoá sản phẩm dịch vụ Ngân hàng số của mình?',
        question_name: 'Câu 6.8',
        survey_id: 6,
        weighted_percentage: 0.05,
        belongs_to_pillar: 'Mức độ hài lòng của khách hàng',
        question_target: ['Lãnh đạo & Quản lý'],
        question_type: 'radiogroup',
        question_options: [
            { option_text: 'Các công ty Fintech', weighted_value: 2 },
            { option_text: 'Các tổ chức tài chính vi mô', weighted_value: 2 },
            {
                option_text: 'Các nhà mạng cung cấp dịch vụ viễn thông',
                weighted_value: 2,
            },
            {
                option_text: 'Các công ty thương mại điện tử',
                option_note: 'Shopee, Tiki, Sendo, Lazada…',
                weighted_value: 3,
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
        question_name: 'Câu 6.9',
        question_type: 'radiogroup',
        survey_id: 6,
        weighted_percentage: 0.08,
        belongs_to_pillar: 'Mức độ hài lòng của khách hàng',
        question_target: ['Cán bộ nghiệp vụ'],
        question_options: [
            {
                option_text: 'Rất không hài lòng',
                option_note:
                    'Dịch vụ kém, khó sử dụng, nhiều lỗi kỹ thuật, không đáp ứng được nhu cầu',
                weighted_value: 0,
            },
            {
                option_text: 'Không hài lòng',
                option_note:
                    'Có dịch vụ nhưng còn nhiều hạn chế, trải nghiệm chưa tốt, thường xuyên gặp lỗi',
                weighted_value: 1,
            },
            {
                option_text: 'Trung lập',
                option_note:
                    'Dịch vụ ở mức chấp nhận được, không có ấn tượng đặc biệt',
                weighted_value: 2,
            },
            {
                option_text: 'Hài lòng',
                option_note: 'Dịch vụ tốt, đáp ứng nhu cầu, ít lỗi, dễ sử dụng',
                weighted_value: 3,
            },
            {
                option_text: 'Rất hài lòng',
                option_note:
                    'Dịch vụ xuất sắc, vượt mong đợi, trải nghiệm mượt mà, tiện lợi',
                weighted_value: 4,
            },
        ],
    },
    {
        question_text:
            'Đơn vị có hợp tác với các công ty Fintech, đối tác trung gian để mở rộng và phát triển hệ sinh thái tài chính số không?',
        question_name: 'Câu 6.10',
        question_type: 'radiogroup',
        survey_id: 6,
        weighted_percentage: 0.05,
        belongs_to_pillar: 'Hợp tác với tổ chức công nghệ',
        question_target: ['Lãnh đạo & Quản lý'],
        question_options: [
            {
                option_text: 'Chưa có kế hoạch hợp tác',
                weighted_value: 0,
            },
            {
                option_text:
                    'Đang trong quá trình tìm hiểu và nghiên cứu hợp tác',
                weighted_value: 1,
            },
            {
                option_text: 'Đã hợp tác nhưng ở quy mô nhỏ, chưa đủ mạnh mẽ',
                weighted_value: 2,
            },
            {
                option_text:
                    'Đang triển khai hợp tác mạnh mẽ và có nhiều đối tác chiến lược',
                weighted_value: 3,
            },
            {
                option_text:
                    'Đã có hệ sinh thái tài chính toàn diện, bao gồm nhiều đối tác Fintech và dịch vụ ngân hàng số',
                weighted_value: 4,
            },
        ],
    },
    {
        question_text:
            'Ngân sách hiện tại dành cho CNTT và chuyển đổi số của đơn vị hàng năm là bao nhiêu?',
        question_name: 'Câu 7.1',
        question_type: 'radiogroup',
        survey_id: 7,
        weighted_percentage: 0.15,
        belongs_to_pillar: 'Ngân sách hiện tại dành cho CNTT và chuyển đổi số',
        question_target: ['Lãnh đạo & Quản lý'],
        question_note: 'Chọn đáp án phù hợp nhất',
        question_options: [
            { option_text: 'Dưới 50 triệu VNĐ', weighted_value: 0 },
            { option_text: '50 - 100 triệu VNĐ', weighted_value: 1 },
            { option_text: '101 - 500 triệu VNĐ', weighted_value: 2 },
            { option_text: '501 triệu - 1 tỷ VNĐ', weighted_value: 3 },
            { option_text: 'Trên 1 tỷ VNĐ', weighted_value: 4 },
        ],
    },
    {
        question_text:
            'Ngân sách dành cho CNTT hiện tại đáp ứng được ở mức độ nào đối với các hoạt động vận hành và các dự án chuyển đổi số của đơn vị?',
        question_name: 'Câu 7.2',
        question_type: 'radiogroup',
        survey_id: 7,
        weighted_percentage: 0.1,
        belongs_to_pillar: 'Ngân sách hiện tại dành cho CNTT và chuyển đổi số',
        question_target: ['Lãnh đạo & Quản lý'],
        question_options: [
            { option_text: 'Hoàn toàn không đáp ứng được', weighted_value: 0 },
            { option_text: 'Ít đáp ứng được ', weighted_value: 1 },
            {
                option_text: 'Chỉ đủ để duy trì các hoạt động vận hành cơ bản',
                weighted_value: 2,
            },
            {
                option_text:
                    'Đủ đáp ứng các hoạt động và dự án hiện tại, nhưng cần bổ sung thêm ngân sách nếu muốn mở rộng',
                weighted_value: 3,
            },
            {
                option_text:
                    'Hoàn toàn đáp ứng đủ và sẵn sàng cho việc mở rộng, phát triển thêm',
                weighted_value: 4,
            },
        ],
    },
    {
        question_text:
            'Quỹ của anh/chị sẵn sàng đầu tư chi phí cơ sở hạ tầng CNTT phục vụ cho chuyển đổi số ở mức nào?',
        question_name: 'Câu 7.3',
        question_type: 'radiogroup',
        survey_id: 7,
        weighted_percentage: 0.1,
        belongs_to_pillar: 'Mức độ sẵn sàng đầu tư',
        question_target: ['Lãnh đạo & Quản lý'],
        question_options: [
            { option_text: '0% chi phí hoạt động' },
            {
                option_text: 'Khoảng 0% - 2% chi phí hoạt động',
            },
            {
                option_text: 'Khoảng 2% - 4% chi phí hoạt động',
            },
            {
                option_text: 'Khoảng 4% - 5% chi phí hoạt động',
            },
            {
                option_text: 'Khoảng 5% - 6% chi phí hoạt động',
            },
        ],
    },
    {
        question_text:
            'Quỹ vui lòng cho biết mức độ sẵn sàng của đơn vị trong việc bổ sung ngân sách để đầu tư vào công nghệ và chuyển đổi số trong thời gian tới:',
        question_name: 'Câu 7.4',
        question_type: 'radiogroup',
        survey_id: 7,
        weighted_percentage: 0.1,
        belongs_to_pillar: 'Mức độ sẵn sàng đầu tư',
        question_target: ['Lãnh đạo & Quản lý'],
        question_options: [
            { option_text: 'Hoàn toàn không sẵn sàng', weighted_value: 0 },
            { option_text: 'Ít sẵn sàng', weighted_value: 1 },
            {
                option_text: 'Đang cân nhắc, chưa có kế hoạch',
                weighted_value: 2,
            },
            {
                option_text: 'Sẵn sàng đầu tư khi có điều kiện thuận lợi',
                weighted_value: 3,
            },
            {
                option_text: 'Hoàn toàn sẵn sàng, đã có kế hoạch',
                weighted_value: 4,
            },
        ],
    },
    {
        question_text:
            'Ngân sách dự kiến để mở rộng đầu tư công nghệ tại đơn vị trong 3 năm tới là bao nhiêu?',
        question_name: 'Câu 7.5',
        question_type: 'radiogroup',
        survey_id: 7,
        weighted_percentage: 0.08,
        belongs_to_pillar: 'Mức độ sẵn sàng đầu tư',
        question_options: [
            { option_text: 'Dưới 100 triệu VNĐ', weighted_value: 0 },
            { option_text: '100 - 300 triệu VNĐ', weighted_value: 1 },
            { option_text: '301 - 500 triệu VNĐ', weighted_value: 2 },
            { option_text: '501 triệu - 1 tỷ VNĐ', weighted_value: 3 },
            { option_text: 'Trên 1 tỷ VNĐ', weighted_value: 4 },
        ],
    },
    {
        question_text:
            'Đơn vị có kế hoạch dài hạn để tăng ngân sách đầu tư CNTT không?',
        question_name: 'Câu 7.6',
        question_type: 'radiogroup',
        survey_id: 7,
        weighted_percentage: 0.07,
        belongs_to_pillar: 'Mức độ sẵn sàng đầu tư',
        question_target: ['Lãnh đạo & Quản lý'],
        question_options: [
            { option_text: 'Không có kế hoạch', weighted_value: 0 },
            {
                option_text: 'Đang cân nhắc nhưng chưa có kế hoạch cụ thể',
                weighted_value: 1,
            },
            { option_text: 'Đã có kế hoạch sơ bộ', weighted_value: 2 },
            { option_text: 'Kế hoạch gần hoàn chỉnh', weighted_value: 3 },
            {
                option_text: 'Kế hoạch đầy đủ và đang triển khai',
                weighted_value: 4,
            },
        ],
    },
    {
        question_text:
            'Đơn vị có sẵn sàng tham gia tài chính vào các dự án CNTT dùng chung với NHNN/NHHTX không?',
        question_name: 'Câu 7.7',
        question_type: 'radiogroup',
        survey_id: 7,
        weighted_percentage: 0.12,
        belongs_to_pillar: 'Khả năng tham gia tài chính',
        question_target: ['Lãnh đạo & Quản lý'],
        question_options: [
            { option_text: 'Hoàn toàn không sẵn sàng', weighted_value: 0 },
            { option_text: 'Không sẵn sàng', weighted_value: 1 },
            {
                option_text: 'Đang cân nhắc nhưng chưa có cam kết',
                weighted_value: 2,
            },
            {
                option_text: 'Sẵn sàng tham gia nếu có hỗ trợ',
                weighted_value: 3,
            },
            {
                option_text:
                    'Hoàn toàn sẵn sàng và đang tìm kiếm cơ hội hợp tác',
                weighted_value: 4,
            },
        ],
    },
    {
        question_text:
            'Đơn vị đánh giá mức độ hiệu quả của việc tham gia vào các dự án CNTT dùng chung như thế nào?',
        question_name: 'Câu 7.8',
        question_type: 'radiogroup',
        survey_id: 7,
        weighted_percentage: 0.08,
        belongs_to_pillar: 'Khả năng tham gia tài chính',
        question_target: ['Lãnh đạo & Quản lý'],
        question_options: [
            { option_text: 'Chưa có dự án dùng chung', weighted_value: 0 },
            { option_text: 'Hoàn toàn không hiệu quả', weighted_value: 1 },
            { option_text: 'Hiệu quả rất thấp', weighted_value: 2 },
            { option_text: 'Hiệu quả trung bình', weighted_value: 3 },
            { option_text: 'Hiệu quả tốt', weighted_value: 4 },
            {
                option_text: 'Rất hiệu quả và mang lại giá trị rõ ràng',
                weighted_value: 5,
            },
        ],
    },
    {
        question_text:
            'Đơn vị có thể tận dụng nguồn tài trợ/ưu đãi từ các tổ chức công nghệ trong và ngoài nước (Fintech, quỹ đổi mới sáng tạo, doanh nghiệp CNTT...) để hỗ trợ chuyển đổi số không?',
        question_name: 'Câu 7.9',
        question_type: 'radiogroup',
        survey_id: 7,
        weighted_percentage: 0.2,
        question_note: 'Vui lòng chọn mức độ phù hợp nhất',
        belongs_to_pillar: 'Khả năng tìm kiếm và tận dụng các nguồn tài trợ',
        question_target: ['Lãnh đạo & Quản lý'],
        question_options: [
            { option_text: 'Hoàn toàn không thể' },
            {
                option_text: 'Khó khăn trong tiếp cận',
                option_note: 'Chỉ tận dụng được rất ít nguồn lực',
            },
            {
                option_text: 'Có thể ở mức trung bình',
                option_note: 'Đã tiếp cận một số chương trình',
            },
            {
                option_text: 'Dễ dàng tiếp cận',
                option_note: 'Có quan hệ đối tác ổn định',
            },
            {
                option_text: 'Có quan hệ đối tác ổn định',
                option_note: 'Nhận được nhiều ưu đãi đặc biệt',
            },
        ],
    },
    {
        question_text:
            'Mức độ ứng dụng định danh điện tử (eKYC) tại đơn vị như thế nào?',
        question_name: 'Câu 7.10',
        question_type: 'radiogroup',
        survey_id: 7,
        question_target: ['Cán bộ nghiệp vụ'],
        question_options: [
            { option_text: 'Chưa áp dụng', weighted_value: 0 },
            {
                option_text: 'Có kế hoạch triển khai',
                weighted_value: 1,
            },
            { option_text: 'Đang thử nghiệm', weighted_value: 2 },
            {
                option_text: 'Đã triển khai nhưng chưa mở rộng toàn bộ dịch vụ',
                weighted_value: 3,
            },
            {
                option_text:
                    'Đã triển khai đồng bộ và tích hợp sâu với hệ thống dịch vụ số',
                weighted_value: 4,
            },
        ],
    },
    {
        question_text:
            'Dự kiến từ năm 2025 đến năm 2030, tỷ lệ các nghiệp vụ ngân hàng của Quỹ (thanh toán, mở tài khoản, vay vốn...) có thể thực hiện trên môi trường số là bao nhiêu?',
        question_name: 'Câu 8.1',
        question_type: 'radiogroup',
        survey_id: 8,
        weighted_percentage: 0.1,
        belongs_to_pillar: 'Nhận thức tổng quan về lộ trình',
        question_target: ['Lãnh đạo & Quản lý'],
        question_options: [
            { option_text: '10% - 20%', weighted_value: 1 },
            { option_text: '30% - 50%', weighted_value: 2 },
            { option_text: '60% - 70%', weighted_value: 3 },
            { option_text: '80% - 90%', weighted_value: 4 },
            { option_text: '95% - 100%', weighted_value: 5 },
        ],
    },
    {
        question_text:
            'Đến năm 2035, các nghiệp vụ ngân hàng của Quỹ có thể cho phép khách hàng và thành viên thực hiện trên môi trường số là bao nhiêu?',
        question_name: 'Câu 8.2',
        question_type: 'radiogroup',
        survey_id: 8,
        weighted_percentage: 0.1,
        belongs_to_pillar: 'Nhận thức tổng quan về lộ trình',
        question_target: ['Lãnh đạo & Quản lý'],
        question_options: [
            { option_text: '~20%', weighted_value: 1 },
            { option_text: '~50%', weighted_value: 2 },
            { option_text: '~70%', weighted_value: 3 },
            { option_text: '~90%', weighted_value: 4 },
            { option_text: '~100%', weighted_value: 5 },
        ],
    },
    {
        question_text:
            'Từ nay đến năm 2030, các nghiệp vụ ngân hàng được ưu tiên thực hiện trên môi trường số tại Quỹ',
        question_name: 'Câu 8.3',
        question_type: 'checkbox',
        survey_id: 8,
        weighted_percentage: 0.15,
        belongs_to_pillar: 'Kế hoạch cụ thể để đạt được các mục tiêu',
        question_target: ['Lãnh đạo & Quản lý'],
        question_note: 'Có thể chọn nhiều phương án',
        question_options: [
            { option_text: 'Thanh toán 247', weighted_value: 2 },
            { option_text: 'Tiết kiệm', weighted_value: 3 },
            { option_text: 'Vay vốn', weighted_value: 3 },
            { option_text: 'Các dịch vụ phi tài chính', weighted_value: 2 },
        ],
    },
    {
        question_text:
            'Từ nay đến năm 2035, các nghiệp vụ ngân hàng được ưu tiên thực hiện trên môi trường số tại Quỹ',
        question_name: 'Câu 8.4',
        survey_id: 8,
        weighted_percentage: 0.15,
        belongs_to_pillar: 'Kế hoạch cụ thể để đạt được các mục tiêu',
        question_target: ['Lãnh đạo & Quản lý'],
        question_type: 'checkbox',
        question_note: 'Có thể chọn nhiều phương án',
        question_options: [
            { option_text: 'Thanh toán 247', weighted_value: 3 },
            { option_text: 'Tiết kiệm', weighted_value: 3 },
            { option_text: 'Vay vốn', weighted_value: 4 },
            { option_text: 'Các dịch vụ phi tài chính', weighted_value: 3 },
        ],
    },
    {
        question_text:
            'Đơn vị đã xây dựng lộ trình cụ thể để thực hiện chuyển đổi số theo định hướng của ngành ngân hàng chưa? (Bao gồm kế hoạch chi tiết về hạ tầng CNTT, nhân sự, tài chính và hợp tác với NHHTX, TCTD...)',
        question_name: 'Câu 8.5',
        survey_id: 8,
        weighted_percentage: 0.25,
        belongs_to_pillar:
            'Mức độ chuẩn bị về nhân lực, hạ tầng CNTT và tài chính',
        question_target: ['Lãnh đạo & Quản lý'],
        question_type: 'radiogroup',
        question_options: [
            {
                option_text: 'Chưa xây dựng',
                option_note:
                    'Chưa có kế hoạch hoặc chỉ mới có ý tưởng sơ bộ, chưa có tài liệu chính thức',
                weighted_value: 0,
            },
            {
                option_text: 'Xây dựng sơ bộ',
                option_note:
                    'Đã có định hướng chung nhưng chưa có kế hoạch chi tiết về tài chính, nhân sự, hạ tầng',
                weighted_value: 1,
            },
            {
                option_text: 'Gần hoàn chỉnh',
                option_note:
                    'Đã có kế hoạch tổng thể, xác định ngân sách & nguồn lực nhưng chưa chính thức phê duyệt',
                weighted_value: 2,
            },
            {
                option_text: 'Hoàn chỉnh',
                option_note:
                    'Kế hoạch đã hoàn tất, có phê duyệt nhưng chưa bắt đầu triển khai thực tế',
                weighted_value: 3,
            },
            {
                option_text: 'Hoàn chỉnh & đang triển khai',
                option_note:
                    'Đã triển khai theo kế hoạch, có sự phối hợp với NHHTX, TCTD hoặc các đối tác công nghệ',
                weighted_value: 4,
            },
        ],
    },
    {
        question_text:
            'Mức độ phối hợp của Quỹ với NHHTX trong quá trình thực hiện chuyển đổi số như thế nào? (Bao gồm hỗ trợ kỹ thuật, kết nối hệ thống, tài chính...)',
        question_name: 'Câu 8.6',
        survey_id: 8,
        weighted_percentage: 0.08,
        belongs_to_pillar:
            'Mức độ phối hợp với các đơn vị trong hệ thống ngân hàng',
        question_target: ['Lãnh đạo & Quản lý'],
        question_type: 'radiogroup',
        question_options: [
            {
                option_text: 'Chưa phối hợp',
                option_note:
                    'Chưa có bất kỳ hoạt động phối hợp nào với NHHTX về chuyển đổi số',
                weighted_value: 0,
            },
            {
                option_text: 'Có phối hợp nhưng rất hạn chế',
                option_note:
                    'Chỉ trao đổi thông tin cơ bản, chưa có hỗ trợ kỹ thuật hay tài chính',
                weighted_value: 1,
            },
            {
                option_text: 'Phối hợp ở mức trung bình',
                option_note:
                    'Có hỗ trợ kỹ thuật hoặc kết nối hệ thống, nhưng chưa đồng bộ hoặc chưa đầy đủ',
                weighted_value: 2,
            },
            {
                option_text: 'Phối hợp đầy đủ',
                option_note:
                    'Hợp tác tích cực, có hỗ trợ kỹ thuật và kết nối hệ thống nhưng chưa tối ưu',
                weighted_value: 3,
            },
            {
                option_text: 'Phối hợp chặt chẽ & có kế hoạch mở rộng',
                option_note:
                    'Đã có hợp tác toàn diện với NHHTX và đang lên kế hoạch nâng cấp, mở rộng hợp tác',
                weighted_value: 4,
            },
        ],
    },
    {
        question_text:
            'Mức độ phối hợp của Quỹ với các TCTD, công ty Fintech trong quá trình thực hiện chuyển đổi số như thế nào? (Bao gồm hợp tác công nghệ, kết nối API, dịch vụ số...)',
        question_name: 'Câu 8.7',
        question_type: 'radiogroup',
        survey_id: 8,
        weighted_percentage: 0.07,
        belongs_to_pillar:
            'Mức độ phối hợp với các đơn vị trong hệ thống ngân hàng',
        question_target: ['Lãnh đạo & Quản lý'],
        question_options: [
            {
                option_text: 'Chưa phối hợp',
                option_note:
                    'Không có bất kỳ hợp tác nào với TCTD, Fintech về chuyển đổi số',
                weighted_value: 0,
            },
            {
                option_text: 'Có tiếp cận nhưng chưa có hợp tác cụ thể',
                option_note:
                    'Đã có trao đổi, tìm hiểu nhưng chưa ký kết hợp tác',
                weighted_value: 1,
            },
            {
                option_text: 'Hợp tác ở mức cơ bản',
                option_note:
                    'Có hợp tác ở một số dịch vụ nhưng chưa tích hợp hệ thống hoặc chưa khai thác hiệu quả',
                weighted_value: 2,
            },
            {
                option_text: 'Hợp tác chặt chẽ',
                option_note:
                    'Đã có hợp tác thực tế, kết nối hệ thống và cung cấp sản phẩm/dịch vụ số nhưng chưa tối ưu',
                weighted_value: 3,
            },
            {
                option_text: 'Hợp tác toàn diện & có kế hoạch mở rộng',
                option_note:
                    'Đã tích hợp đầy đủ công nghệ với TCTD, Fintech và đang mở rộng hợp tác',
                weighted_value: 4,
            },
        ],
    },
    {
        question_text:
            'Quỹ có kế hoạch tăng cường hợp tác với NHHTX, NHNN, Fintech và các TCTD khác để thúc đẩy chuyển đổi số không?',
        question_name: 'Câu 8.8',
        question_type: 'radiogroup',
        survey_id: 8,
        weighted_percentage: 0.05,
        belongs_to_pillar:
            'Mức độ phối hợp với các đơn vị trong hệ thống ngân hàng',
        question_target: ['Lãnh đạo & Quản lý'],
        question_options: [
            {
                option_text: 'Không có kế hoạch hợp tác',
                option_note:
                    'Chưa có ý định phối hợp với các tổ chức này về chuyển đổi số',
                weighted_value: 0,
            },
            {
                option_text: 'Có cân nhắc nhưng chưa có kế hoạch cụ thể',
                option_note:
                    'Đang nghiên cứu khả năng hợp tác nhưng chưa có kế hoạch chính thức',
                weighted_value: 1,
            },
            {
                option_text: 'Có kế hoạch sơ bộ',
                option_note:
                    'Đã lên ý tưởng hợp tác nhưng chưa có cam kết hoặc nguồn lực rõ ràng',
                weighted_value: 2,
            },
            {
                option_text: 'Có kế hoạch chi tiết',
                option_note:
                    'Đã xác định mục tiêu hợp tác và có bước triển khai cụ thể',
                weighted_value: 3,
            },
            {
                option_text: 'Đã triển khai & đang mở rộng hợp tác',
                option_note:
                    'Hợp tác đã được thực hiện và đang tìm cách mở rộng thêm đối tác',
                weighted_value: 4,
            },
        ],
    },
    {
        question_text:
            'Mức độ phối hợp giữa các bộ phận trong nội bộ đơn vị trong triển khai kế hoạch chuyển đổi số?',
        question_name: 'Câu 8.9',
        question_type: 'radiogroup',
        survey_id: 8,
        weighted_percentage: 0.05,
        belongs_to_pillar:
            'Mức độ phối hợp với các đơn vị trong hệ thống ngân hàng',
        question_target: ['Cán bộ nghiệp vụ'],
        question_options: [
            {
                option_text: 'Không có sự phối hợp',
                weighted_value: 0,
            },
            {
                option_text: 'Phối hợp ở mức rất hạn chế',
                weighted_value: 1,
            },
            {
                option_text: 'Có phối hợp cơ bản nhưng thiếu liên kết',
                weighted_value: 2,
            },
            {
                option_text: 'Phối hợp tốt, có chia sẻ dữ liệu và quy trình',
                weighted_value: 3,
            },
            {
                option_text:
                    'Phối hợp chặt chẽ, hoạt động như một thể thống nhất',
                weighted_value: 4,
            },
        ],
    },
];

// for (const question of questionsData) {
//     const createdQuestion = await prisma.questions.create({
//         data: {
//             question_name: question.question_name,
//             question_text: question.question_text,
//             question_note: question.question_note,
//             question_type: question.question_type,
//             question_target: question.question_target,
//         },
//     });
//
//     if (question.question_options && question.question_options.length > 0) {
//         const optionsData = question.question_options.map((option) => ({
//             option_text: option.option_text,
//             require_reason: option.require_reason ?? 0,
//             option_note: option.option_note ?? null, // Thêm dòng này
//             question_id: createdQuestion.id,
//         }));
//
//         // Tạo tất cả question_options liên quan đến câu hỏi trong 1 lần
//         await prisma.question_options.createMany({
//             data: optionsData,
//         });
//     }
// }

// const totalQuestions = 119; // Tổng số câu hỏi
// const surveyData = [
//     { surveyId: 1, numQuestions: 14 },
//     { surveyId: 2, numQuestions: 22 },
//     { surveyId: 3, numQuestions: 13 },
//     { surveyId: 4, numQuestions: 25 },
//     { surveyId: 5, numQuestions: 18 },
//     { surveyId: 6, numQuestions: 11 },
//     { surveyId: 7, numQuestions: 8 },
//     { surveyId: 8, numQuestions: 8 },
// ];
//
// let currentQuestion = 1;
// const questionSurveyData = [];
//
// for (const survey of surveyData) {
//     for (let i = 0; i < survey.numQuestions; i++) {
//         if (currentQuestion > totalQuestions) break; // Dừng nếu vượt quá số câu hỏi
//
//         questionSurveyData.push({
//             survey_id: survey.surveyId,
//             question_id: currentQuestion,
//         });
//
//         currentQuestion++;
//     }
// }
//
// // Chèn dữ liệu vào database
// await prisma.question_survey.createMany({
//     data: questionSurveyData,
// });
// const questionIds = [
//     29, 30, 31, 32, 33, 34, 35, 36, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73,
//     74, 85, 86, 87, 88,
// ]; // Chỉ cần thêm ID vào đây
//
// // Dùng map để tạo danh sách nhóm câu hỏi
// const questionGroups = questionIds.map((id) => ({ question_id: id }));
//
// // Chạy seed dữ liệu vào `question_group`
// await prisma.question_group.createMany({
//     data: questionGroups,
// });
// console.log('Seeding completed!')

// Hàm ánh xạ pillar name thành ID
async function mapPillarNameToId(pillarName) {
    const pillar = await prisma.survey_pillars.findFirst({
        where: { name: pillarName },
        select: { id: true },
    });
    if (!pillar) {
        throw new Error(`Pillar with name "${pillarName}" not found`);
    }
    return pillar.id;
}

async function mapQuestionNameToId(questionName) {
    const question = await prisma.questions.findFirst({
        where: { question_name: questionName },
        select: { id: true },
    });
    if (!question) {
        throw new Error(`Question with name "${questionName}" not found`);
    }
    return question.id;
}

// Hàm main để seed dữ liệu
async function main() {
    try {
        console.log('Seeding institution...');
        for (const institution of institutionsData) {
            await prisma.institutions.create({
                data: institution,
            });
        }
        console.log('Seed institution done!...');
        // 1. Seed surveys
        console.log('Seeding surveys...');
        for (const survey of surveysData) {
            const createdSurvey = await prisma.surveys.create({
                data: {
                    survey_title: survey.survey_title,
                    survey_description: survey.survey_description,
                },
            });
            console.log(`Created survey: ${createdSurvey.survey_title}`);
        }

        // 2. Seed pillars
        console.log('Seeding pillars...');
        const pillarMap = new Map(); // Lưu ánh xạ name -> id
        for (const pillar of pillarsData) {
            const createdPillar = await prisma.survey_pillars.create({
                data: {
                    name: pillar.name,
                    weighted_percentage: pillar.weighted_percentage,
                    survey_id: pillar.survey_id,
                },
            });
            pillarMap.set(pillar.name, createdPillar.id);
            console.log(`Created pillar: ${createdPillar.name}`);
        }

        // 3. Seed questions và question_options
        console.log('Seeding questions and options...');
        for (const question of questionsData) {
            let pillarId;
            if (question.belongs_to_pillar) {
                pillarId = await mapPillarNameToId(question.belongs_to_pillar);
            }

            let parentId;
            if (question.parent) {
                parentId = await mapQuestionNameToId(question.parent);
            }
            const createdQuestion = await prisma.questions.create({
                data: {
                    question_name: question.question_name,
                    question_text: question.question_text,
                    question_note: question.question_note,
                    question_type: question.question_type,
                    question_target: question.question_target,
                    weighted_percentage: question.weighted_percentage,
                    belongs_to_pillar: pillarId,
                    parent_id: parentId,
                },
            });
            console.log(`Created question: ${createdQuestion.question_name}`);

            // Seed question_options
            if (
                question.question_options &&
                question.question_options.length > 0
            ) {
                for (const option of question.question_options) {
                    await prisma.question_options.create({
                        data: {
                            question_id: createdQuestion.id,
                            option_text: option.option_text || null,
                            option_note: option.option_note,
                            require_reason: option.require_reason || 0,
                            weighted_value: option.weighted_value,
                        },
                    });
                }
                console.log(
                    `Created options for question: ${createdQuestion.question_name}`
                );
            }

            // Liên kết question với survey (giả định tất cả thuộc survey đầu tiên)
            if (question.survey_id) {
                await prisma.question_survey.create({
                    data: {
                        survey_id: question.survey_id,
                        question_id: createdQuestion.id,
                    },
                });
            }
        }

        console.log('Seeding completed successfully!');
    } finally {
        await prisma.$disconnect();
    }
}

main();
